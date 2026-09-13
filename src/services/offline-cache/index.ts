import { openDB, type IDBPDatabase } from 'idb'
import type { ChecklistSession, ContentPack } from '../../types'
import { ContentPackSchema, type ZSyncEvent } from '../../lib/schema'

const DB_NAME = 'lxn-offline-store'
const DB_VERSION = 3

interface OfflineDBSchema {
  content_packs: {
    key: string
    value: {
      version: string
      pack: ContentPack
      cachedAt: number
    }
  }
  user_progress: {
    key: string
    value: {
      userId: string
      completed: string[]
      updatedAt: number
    }
  }
  checklist_states: {
    key: string
    value: {
      scope: string
      checked: Record<string, boolean>
      updatedAt: number
    }
  }
  checklist_sessions: {
    key: string
    value: ChecklistSession
    indexes: { 'by-scope': string; 'by-completed-at': string }
  }
  checklist_active: {
    key: string
    value: {
      scope: string
      startedAt: string
    }
  }
  sync_queue: {
    key: string
    value: ZSyncEvent
    indexes: { 'by-status': string; 'by-timestamp': number }
  }
  cached_metadata: {
    key: string
    value: unknown
  }
}

let dbPromise: Promise<IDBPDatabase<OfflineDBSchema> | null> | null = null

function getDB(): Promise<IDBPDatabase<OfflineDBSchema> | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null)
  }

  if (!dbPromise) {
    dbPromise = openDB<OfflineDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('content_packs')) {
          db.createObjectStore('content_packs', { keyPath: 'version' })
        }
        if (!db.objectStoreNames.contains('user_progress')) {
          db.createObjectStore('user_progress', { keyPath: 'userId' })
        }
        if (!db.objectStoreNames.contains('checklist_states')) {
          db.createObjectStore('checklist_states', { keyPath: 'scope' })
        }
        if (!db.objectStoreNames.contains('checklist_sessions')) {
          const sessionStore = db.createObjectStore('checklist_sessions', { keyPath: 'id' })
          sessionStore.createIndex('by-scope', 'scope')
          sessionStore.createIndex('by-completed-at', 'completedAt')
        }
        if (!db.objectStoreNames.contains('checklist_active')) {
          db.createObjectStore('checklist_active', { keyPath: 'scope' })
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          const syncStore = db.createObjectStore('sync_queue', { keyPath: 'id' })
          syncStore.createIndex('by-status', 'status')
          syncStore.createIndex('by-timestamp', 'timestamp')
        }
        if (!db.objectStoreNames.contains('cached_metadata')) {
          db.createObjectStore('cached_metadata')
        }
      }
    }).catch((err) => {
      console.warn('[IndexedDB] Không thể khởi tạo database:', err)
      return null
    })
  }

  return dbPromise
}

/** Lưu content pack vào IndexedDB */
export async function saveContentPackToIDB(pack: ContentPack): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    const validated = ContentPackSchema.safeParse(pack)
    if (!validated.success) {
      console.warn('[IndexedDB] Content pack không đúng schema:', validated.error)
      return false
    }

    const tx = db.transaction(['content_packs', 'cached_metadata'], 'readwrite')
    await tx.objectStore('content_packs').put({
      version: pack.version,
      pack,
      cachedAt: Date.now()
    })
    await tx.objectStore('cached_metadata').put(pack.version, 'latest_content_version')
    await tx.done
    return true
  } catch (err) {
    console.error('[IndexedDB] Lỗi khi lưu content pack:', err)
    return false
  }
}

/** Lấy content pack mới nhất từ IndexedDB */
export async function getContentPackFromIDB(version?: string): Promise<ContentPack | null> {
  const db = await getDB()
  if (!db) return null
  try {
    let targetVersion = version
    if (!targetVersion) {
      const latest = (await db.get('cached_metadata', 'latest_content_version')) as string | undefined
      if (!latest) return null
      targetVersion = latest
    }
    const entry = await db.get('content_packs', targetVersion)
    return entry ? entry.pack : null
  } catch (err) {
    console.error('[IndexedDB] Lỗi khi đọc content pack:', err)
    return null
  }
}

/** Lưu user progress vào IDB */
export async function saveProgressToIDB(userId = 'local', completed: string[]): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.put('user_progress', {
      userId,
      completed,
      updatedAt: Date.now()
    })
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không lưu được tiến độ:', err)
    return false
  }
}

/** Lấy user progress từ IDB */
export async function getProgressFromIDB(userId = 'local'): Promise<string[] | null> {
  const db = await getDB()
  if (!db) return null
  try {
    const record = await db.get('user_progress', userId)
    return record ? record.completed : null
  } catch {
    return null
  }
}

/** Lưu checklist state theo scope vào IDB */
export async function saveChecklistToIDB(
  scope: string,
  checked: Record<string, boolean>
): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.put('checklist_states', {
      scope,
      checked,
      updatedAt: Date.now()
    })
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không lưu được trạng thái checklist:', err)
    return false
  }
}

/** Lấy checklist state theo scope từ IDB */
export async function getChecklistFromIDB(scope: string): Promise<Record<string, boolean> | null> {
  const db = await getDB()
  if (!db) return null
  try {
    const record = await db.get('checklist_states', scope)
    return record ? record.checked : null
  } catch {
    return null
  }
}

/** Lấy toàn bộ trạng thái checklist từ IDB */
export async function getAllChecklistsFromIDB(): Promise<Record<string, boolean>> {
  const db = await getDB()
  if (!db) return {}
  try {
    const all = await db.getAll('checklist_states')
    const combined: Record<string, boolean> = {}
    for (const item of all) {
      Object.assign(combined, item.checked)
    }
    return combined
  } catch {
    return {}
  }
}

/** Lưu thời điểm bắt đầu checklist đang dở để không mất thời lượng khi reload. */
export async function saveActiveChecklistToIDB(
  scope: string,
  startedAt: string
): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.put('checklist_active', { scope, startedAt })
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không lưu được checklist đang dở:', err)
    return false
  }
}

/** Lấy các checklist đang dở từ IndexedDB. */
export async function getActiveChecklistsFromIDB(): Promise<Record<string, string>> {
  const db = await getDB()
  if (!db) return {}
  try {
    const all = await db.getAll('checklist_active')
    return Object.fromEntries(all.map((item) => [item.scope, item.startedAt]))
  } catch {
    return {}
  }
}

/** Xóa checklist đang dở sau khi hoàn tất hoặc reset. */
export async function deleteActiveChecklistFromIDB(scope: string): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.delete('checklist_active', scope)
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không xóa được checklist đang dở:', err)
    return false
  }
}

/** Lưu một lượt checklist đã hoàn tất vào lịch sử offline */
export async function saveChecklistSessionToIDB(session: ChecklistSession): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.put('checklist_sessions', session)
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không lưu được lịch sử checklist:', err)
    return false
  }
}

/** Lấy lịch sử checklist, mới nhất trước; có thể lọc theo loại checklist */
export async function getChecklistSessionsFromIDB(
  scope?: string,
  limit = 20
): Promise<ChecklistSession[]> {
  const db = await getDB()
  if (!db) return []
  try {
    const all = await db.getAll('checklist_sessions')
    return all
      .filter((session) => (scope ? session.scope === scope : true))
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, limit)
  } catch {
    return []
  }
}

/** Đưa một sự kiện vào hàng đợi đồng bộ (Sync Queue) */export async function enqueueSyncEvent(event: ZSyncEvent): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.put('sync_queue', event)
    return true
  } catch (err) {
    console.warn('[IndexedDB] Không đưa được sự kiện vào hàng đợi đồng bộ:', err)
    return false
  }
}

/** Lấy danh sách các sự kiện cần đồng bộ */
export async function getPendingSyncEvents(): Promise<ZSyncEvent[]> {
  const db = await getDB()
  if (!db) return []
  try {
    const all = await db.getAll('sync_queue')
    return all
      .filter((e) => e.status === 'pending' || e.status === 'failed')
      .sort((a, b) => a.timestamp - b.timestamp)
  } catch {
    return []
  }
}

/** Cập nhật trạng thái sự kiện sync */
export async function updateSyncEventStatus(
  id: string,
  status: ZSyncEvent['status'],
  error?: string
): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    const event = await db.get('sync_queue', id)
    if (!event) return false
    event.status = status
    if (status === 'failed') {
      event.retryCount = (event.retryCount || 0) + 1
      event.error = error
    }
    await db.put('sync_queue', event)
    return true
  } catch {
    return false
  }
}

/** Xoá sự kiện đã sync thành công */
export async function removeSyncEvent(id: string): Promise<boolean> {
  const db = await getDB()
  if (!db) return false
  try {
    await db.delete('sync_queue', id)
    return true
  } catch {
    return false
  }
}

/** Đo dung lượng offline đã lưu (ước tính) */
export async function getOfflineStorageEstimate(): Promise<{ usageKb: number; quotaKb: number }> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const { usage, quota } = await navigator.storage.estimate()
      return {
        usageKb: Math.round((usage || 0) / 1024),
        quotaKb: Math.round((quota || 0) / 1024)
      }
    } catch {
      // Fallback
    }
  }
  return { usageKb: 0, quotaKb: 0 }
}
