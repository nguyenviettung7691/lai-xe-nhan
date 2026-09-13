import { describe, expect, it } from 'vitest'
import {
  REVIEW_INTERVALS_DAYS,
  dueEntries,
  isDue,
  nextStage,
  passedQuickCheck,
  quickCheckScore,
  scheduleNextReview
} from './index'
import type { ReviewScheduleEntry } from '../../types'

describe('dịch vụ lặp lại ngắt quãng (spaced repetition)', () => {
  it('tăng dần giai đoạn khi trả lời đúng, tối đa dừng ở giai đoạn 3', () => {
    expect(nextStage(0, true)).toBe(1)
    expect(nextStage(1, true)).toBe(2)
    expect(nextStage(2, true)).toBe(3)
    expect(nextStage(3, true)).toBe(3)
  })

  it('quay về giai đoạn 0 ngay khi trả lời sai', () => {
    expect(nextStage(2, false)).toBe(0)
    expect(nextStage(3, false)).toBe(0)
  })

  it('đặt lịch ôn lần đầu sau đúng 1 ngày khi mới học', () => {
    const now = new Date('2026-09-13T00:00:00.000Z')
    const entry = scheduleNextReview({ cardId: 'parking-start', passed: true, now })
    expect(entry.stage).toBe(0)
    expect(entry.dueAt).toBe(new Date(now.getTime() + REVIEW_INTERVALS_DAYS[0] * 86400000).toISOString())
    expect(entry.lastResult).toBe('pass')
  })

  it('kéo dài chu kỳ ôn theo 1 → 3 → 7 → 14 ngày khi liên tục trả lời đúng', () => {
    const now = new Date('2026-09-13T00:00:00.000Z')
    let previous: ReviewScheduleEntry | undefined
    const observedDays: number[] = []
    for (let i = 0; i < 4; i += 1) {
      const entry = scheduleNextReview({ cardId: 'card-x', passed: true, previous, now })
      const days = Math.round((new Date(entry.dueAt).getTime() - now.getTime()) / 86400000)
      observedDays.push(days)
      previous = entry
    }
    expect(observedDays).toEqual([1, 3, 7, 14])
  })

  it('rút ngắn lại về 1 ngày ngay khi có một lần trả lời sai giữa chừng', () => {
    const now = new Date('2026-09-13T00:00:00.000Z')
    const afterTwoCorrect = scheduleNextReview({
      cardId: 'card-y',
      passed: true,
      previous: scheduleNextReview({ cardId: 'card-y', passed: true, now }),
      now
    })
    expect(afterTwoCorrect.stage).toBe(1)
    const afterFail = scheduleNextReview({ cardId: 'card-y', passed: false, previous: afterTwoCorrect, now })
    expect(afterFail.stage).toBe(0)
    expect(afterFail.lastResult).toBe('fail')
  })

  it('xác định đúng thẻ nào đã tới hạn ôn', () => {
    const now = new Date('2026-09-13T00:00:00.000Z')
    const overdue: ReviewScheduleEntry = { cardId: 'a', stage: 0, dueAt: '2026-09-12T00:00:00.000Z', lastResult: 'pass', updatedAt: '2026-09-11T00:00:00.000Z' }
    const upcoming: ReviewScheduleEntry = { cardId: 'b', stage: 1, dueAt: '2026-09-20T00:00:00.000Z', lastResult: 'pass', updatedAt: '2026-09-13T00:00:00.000Z' }
    expect(isDue(overdue, now)).toBe(true)
    expect(isDue(upcoming, now)).toBe(false)
  })

  it('lọc và sắp xếp các thẻ tới hạn theo hạn gần nhất trước', () => {
    const now = new Date('2026-09-13T00:00:00.000Z')
    const schedule: Record<string, ReviewScheduleEntry> = {
      a: { cardId: 'a', stage: 0, dueAt: '2026-09-12T00:00:00.000Z', lastResult: 'fail', updatedAt: now.toISOString() },
      b: { cardId: 'b', stage: 0, dueAt: '2026-09-10T00:00:00.000Z', lastResult: 'fail', updatedAt: now.toISOString() },
      c: { cardId: 'c', stage: 2, dueAt: '2026-09-25T00:00:00.000Z', lastResult: 'pass', updatedAt: now.toISOString() }
    }
    const due = dueEntries(schedule, now)
    expect(due.map((entry) => entry.cardId)).toEqual(['b', 'a'])
  })

  it('tính tỷ lệ đúng và ngưỡng đạt quick check ở 70%', () => {
    expect(quickCheckScore(2, 3)).toBeCloseTo(0.667, 2)
    expect(passedQuickCheck(3, 3)).toBe(true)
    expect(passedQuickCheck(2, 3)).toBe(false)
    expect(passedQuickCheck(0, 0)).toBe(false)
  })
})
