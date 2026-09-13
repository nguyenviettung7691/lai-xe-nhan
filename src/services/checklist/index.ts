import type { Checklist, ChecklistScope, ChecklistSession } from '../../types'

/** Số lượt checklist gần nhất được giữ lại trên máy (mục 3.4). */
export const MAX_CHECKLIST_HISTORY = 20

export interface ChecklistProgress {
  done: number
  total: number
  ratio: number
  /** Các mục bắt buộc (`must`) chưa tick — dùng để nhắc trước khi lăn bánh. */
  missingMust: string[]
  isComplete: boolean
}

/** Tiến độ của một checklist dựa trên map trạng thái đã tick. */
export const checklistProgress = (
  checklist: Checklist,
  checked: Record<string, boolean>
): ChecklistProgress => {
  const total = checklist.items.length
  const done = checklist.items.filter((item) => checked[item.id]).length
  const missingMust = checklist.items
    .filter((item) => item.criticalLevel === 'must' && !checked[item.id])
    .map((item) => item.id)
  return {
    done,
    total,
    ratio: total === 0 ? 0 : done / total,
    missingMust,
    isComplete: total > 0 && done === total
  }
}

export interface CreateSessionInput {
  scope: ChecklistScope
  startedAt: string
  completedItems: number
  totalItems: number
  completedAt?: string
  id?: string
}

/** Tạo bản ghi lịch sử cho một lượt checklist vừa hoàn tất. */
export const createChecklistSession = ({
  scope,
  startedAt,
  completedItems,
  totalItems,
  completedAt = new Date().toISOString(),
  id
}: CreateSessionInput): ChecklistSession => {
  const startMs = new Date(startedAt).getTime()
  const endMs = new Date(completedAt).getTime()
  const durationMs = Number.isFinite(startMs) && Number.isFinite(endMs) ? Math.max(0, endMs - startMs) : 0
  return {
    id: id ?? `chk_${Number.isFinite(endMs) ? endMs : 0}_${Math.random().toString(36).slice(2, 8)}`,
    scope,
    startedAt,
    completedAt,
    durationMs,
    completedItems,
    totalItems
  }
}

/** Thêm một lượt vào lịch sử, mới nhất lên đầu và giới hạn số bản ghi. */
export const appendSession = (
  history: ChecklistSession[],
  session: ChecklistSession,
  limit = MAX_CHECKLIST_HISTORY
): ChecklistSession[] => [session, ...history.filter((item) => item.id !== session.id)].slice(0, limit)

/** Lượt hoàn tất gần nhất của một loại checklist. */
export const latestSession = (
  history: ChecklistSession[],
  scope: ChecklistScope
): ChecklistSession | undefined => history.find((session) => session.scope === scope)

/** Thời gian hoàn tất hiển thị dạng ngắn: "18 giây" hoặc "1 phút 05 giây". */
export const formatDuration = (durationMs: number): string => {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000))
  if (totalSeconds < 60) return `${totalSeconds} giây`
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes} phút ${String(seconds).padStart(2, '0')} giây`
}

/** Rung phản hồi nhẹ khi tick một mục, bỏ qua khi thiết bị không hỗ trợ. */
export const hapticTick = (pattern: VibratePattern = 12): void => {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Thiết bị chặn rung: bỏ qua, không ảnh hưởng luồng chính.
  }
}
