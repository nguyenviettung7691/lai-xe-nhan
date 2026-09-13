import type { ZSyncEvent } from '../../lib/schema'
import {
  enqueueSyncEvent,
  getPendingSyncEvents,
  removeSyncEvent,
  updateSyncEventStatus
} from '../offline-cache'
import {
  isSupabaseConfigured,
  getCurrentUser,
  syncProgressToCloud,
  syncChecklistToCloud,
  fetchProgressFromCloud,
  fetchChecklistsFromCloud
} from '../../lib/supabase'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline'

export interface SyncEngineState {
  status: SyncStatus
  pendingCount: number
  lastSyncedAt: number | null
  lastError: string | null
}

type SyncListener = (state: SyncEngineState) => void

class SyncEngine {
  private state: SyncEngineState = {
    status: 'idle',
    pendingCount: 0,
    lastSyncedAt: null,
    lastError: null
  }

  private listeners: Set<SyncListener> = new Set()
  private isProcessing = false
  private autoSyncInterval: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.notify('idle')
        this.processQueue()
      })
      window.addEventListener('offline', () => {
        this.notify('offline')
      })
    }
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener)
    listener(this.getState())
    return () => this.listeners.delete(listener)
  }

  public getState(): SyncEngineState {
    return { ...this.state }
  }

  private notify(status?: SyncStatus, error?: string | null) {
    if (status) this.state.status = status
    if (error !== undefined) this.state.lastError = error
    for (const listener of this.listeners) {
      listener(this.getState())
    }
  }

  /** Bắt đầu auto sync định kỳ (VD: mỗi 60s nếu online) */
  public startAutoSync(intervalMs = 60000) {
    if (this.autoSyncInterval) clearInterval(this.autoSyncInterval)
    this.autoSyncInterval = window.setInterval(() => {
      if (navigator.onLine && isSupabaseConfigured()) {
        this.processQueue()
      }
    }, intervalMs)
  }

  public stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval)
      this.autoSyncInterval = null
    }
  }

  /** Đẩy một tác vụ vào Sync Queue và xử lý ngay nếu đang online */
  public async queueAction(
    type: ZSyncEvent['type'],
    payload: Record<string, unknown>,
    userId = 'local'
  ): Promise<void> {
    const event: ZSyncEvent = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type,
      userId,
      payload,
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0
    }

    await enqueueSyncEvent(event)
    await this.updatePendingCount()

    if (navigator.onLine && isSupabaseConfigured()) {
      void this.processQueue()
    }
  }

  /** Đếm số lượng tác vụ đang chờ */
  public async updatePendingCount(): Promise<number> {
    const pending = await getPendingSyncEvents()
    this.state.pendingCount = pending.length
    this.notify()
    return pending.length
  }

  /** Xử lý hàng đợi đồng bộ */
  public async processQueue(): Promise<boolean> {
    if (this.isProcessing) return false
    if (!navigator.onLine) {
      this.notify('offline')
      return false
    }

    if (!isSupabaseConfigured()) {
      // Offline/Local only mode
      this.notify('idle')
      return true
    }

    const user = await getCurrentUser()
    if (!user) {
      // Người dùng chưa đăng nhập, giữ queue ở local
      this.notify('idle')
      return true
    }

    this.isProcessing = true
    this.notify('syncing')

    try {
      const pendingEvents = await getPendingSyncEvents()
      this.state.pendingCount = pendingEvents.length

      for (const event of pendingEvents) {
        if (event.retryCount >= 3) {
          // Bỏ qua sự kiện lỗi quá 3 lần
          continue
        }

        let success = false
        try {
          if (event.type === 'progress_update') {
            const cardIds = (event.payload.completedCardIds as string[]) || []
            success = await syncProgressToCloud(user.id, cardIds)
          } else if (event.type === 'checklist_toggle' || event.type === 'checklist_reset') {
            const scope = (event.payload.scope as string) || 'pre_drive'
            const checkedItems = (event.payload.checkedItems as Record<string, boolean>) || {}
            success = await syncChecklistToCloud(user.id, scope, checkedItems)
          }

          if (success) {
            await removeSyncEvent(event.id)
          } else {
            await updateSyncEventStatus(event.id, 'failed', 'Network/BaaS error')
          }
        } catch (err) {
          await updateSyncEventStatus(event.id, 'failed', (err as Error).message)
        }
      }

      await this.updatePendingCount()
      this.state.lastSyncedAt = Date.now()
      this.notify(this.state.pendingCount === 0 ? 'synced' : 'error', null)
      return true
    } catch (err) {
      this.notify('error', (err as Error).message)
      return false
    } finally {
      this.isProcessing = false
    }
  }

  /**
   * Giải quyết xung đột dữ liệu (Conflict Resolution):
   * - Progress: Hợp nhất ID (Set union) hoặc Last Write Wins
   * - Checklist: Item-level merge (giữ nguyên trạng thái checked)
   */
  public resolveProgressConflict(localIds: string[], cloudIds: string[]): string[] {
    const combined = new Set([...localIds, ...cloudIds])
    return Array.from(combined)
  }

  public resolveChecklistConflict(
    localItems: Record<string, boolean>,
    cloudItems: Record<string, boolean>
  ): Record<string, boolean> {
    const merged: Record<string, boolean> = { ...cloudItems }
    for (const [key, value] of Object.entries(localItems)) {
      if (value === true) {
        merged[key] = true
      } else if (merged[key] === undefined) {
        merged[key] = value
      }
    }
    return merged
  }

  /** Đồng bộ 2 chiều khi người dùng đăng nhập */
  public async pullAndMergeCloudData(
    localProgress: string[],
    localChecklists: Record<string, Record<string, boolean>>
  ): Promise<{
    mergedProgress: string[]
    mergedChecklists: Record<string, Record<string, boolean>>
  } | null> {
    if (!navigator.onLine || !isSupabaseConfigured()) return null
    const user = await getCurrentUser()
    if (!user) return null

    try {
      const [cloudProgress, cloudChecklists] = await Promise.all([
        fetchProgressFromCloud(user.id),
        fetchChecklistsFromCloud(user.id)
      ])

      const mergedProgress = cloudProgress
        ? this.resolveProgressConflict(localProgress, cloudProgress)
        : localProgress

      const mergedChecklists: Record<string, Record<string, boolean>> = { ...localChecklists }
      if (cloudChecklists) {
        for (const [scope, cloudItems] of Object.entries(cloudChecklists)) {
          mergedChecklists[scope] = this.resolveChecklistConflict(
            localChecklists[scope] || {},
            cloudItems
          )
        }
      }

      // Đẩy dữ liệu sau hợp nhất lên lại cloud
      await Promise.all([
        syncProgressToCloud(user.id, mergedProgress),
        ...Object.entries(mergedChecklists).map(([scope, items]) =>
          syncChecklistToCloud(user.id, scope, items)
        )
      ])

      return { mergedProgress, mergedChecklists }
    } catch (err) {
      console.warn('[SyncEngine] Lỗi khi pull & merge từ cloud:', err)
      return null
    }
  }
}

export const syncEngine = new SyncEngine()
