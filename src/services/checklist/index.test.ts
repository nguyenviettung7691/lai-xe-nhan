import { describe, expect, it } from 'vitest'
import {
  appendSession,
  checklistProgress,
  createChecklistSession,
  formatDuration,
  latestSession,
  MAX_CHECKLIST_HISTORY
} from './index'
import { checklists } from '../../content'
import type { ChecklistSession } from '../../types'

const preDrive = checklists.find((checklist) => checklist.id === 'pre_drive')!

describe('Checklist tương tác (tiến độ, lịch sử, đồng bộ)', () => {
  it('tính tiến độ và nhắc các mục bắt buộc còn thiếu', () => {
    const empty = checklistProgress(preDrive, {})
    expect(empty.done).toBe(0)
    expect(empty.ratio).toBe(0)
    expect(empty.isComplete).toBe(false)
    expect(empty.missingMust.length).toBeGreaterThan(0)

    const partial = checklistProgress(preDrive, { seat: true, mirrors: true })
    expect(partial.done).toBe(2)
    expect(partial.total).toBe(preDrive.items.length)
    expect(partial.isComplete).toBe(false)

    const full = checklistProgress(
      preDrive,
      Object.fromEntries(preDrive.items.map((item) => [item.id, true]))
    )
    expect(full.isComplete).toBe(true)
    expect(full.missingMust).toHaveLength(0)
    expect(full.ratio).toBe(1)
  })

  it('ghi lại thời điểm và thời gian hoàn tất một lượt checklist', () => {
    const session = createChecklistSession({
      scope: 'pre_drive',
      startedAt: '2026-01-01T08:00:00.000Z',
      completedAt: '2026-01-01T08:00:18.000Z',
      completedItems: 6,
      totalItems: 6
    })

    expect(session.scope).toBe('pre_drive')
    expect(session.durationMs).toBe(18000)
    expect(session.completedItems).toBe(6)
    expect(session.id).toBeTruthy()
  })

  it('không trả về thời lượng âm khi đồng hồ thiết bị lệch', () => {
    const session = createChecklistSession({
      scope: 'post_park',
      startedAt: '2026-01-01T09:00:00.000Z',
      completedAt: '2026-01-01T08:59:00.000Z',
      completedItems: 5,
      totalItems: 5
    })
    expect(session.durationMs).toBe(0)
  })

  it('giữ lịch sử mới nhất lên đầu và giới hạn số bản ghi', () => {
    let history: ChecklistSession[] = []
    for (let index = 0; index < MAX_CHECKLIST_HISTORY + 5; index += 1) {
      history = appendSession(
        history,
        createChecklistSession({
          id: `session-${index}`,
          scope: index % 2 === 0 ? 'pre_drive' : 'post_park',
          startedAt: '2026-01-01T08:00:00.000Z',
          completedAt: '2026-01-01T08:00:20.000Z',
          completedItems: 5,
          totalItems: 5
        })
      )
    }

    expect(history).toHaveLength(MAX_CHECKLIST_HISTORY)
    expect(history[0].id).toBe(`session-${MAX_CHECKLIST_HISTORY + 4}`)
    expect(latestSession(history, 'post_park')?.scope).toBe('post_park')
    expect(latestSession(history, 'bad_weather')).toBeUndefined()
  })

  it('hiển thị thời gian hoàn tất dễ đọc', () => {
    expect(formatDuration(18_000)).toBe('18 giây')
    expect(formatDuration(65_000)).toBe('1 phút 05 giây')
    expect(formatDuration(-500)).toBe('0 giây')
  })
})
