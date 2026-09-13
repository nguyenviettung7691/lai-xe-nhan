import type { ReviewScheduleEntry, ReviewStage } from '../../types'

/**
 * Lịch ôn ngắt quãng theo mục 8 của kế hoạch chuyên đề thực hành:
 * ôn lại sau 1 ngày → 3 ngày → 7 ngày → 14 ngày.
 * Trả lời sai quick check thì quay về chu kỳ ngắn hơn (giai đoạn 0).
 */
export const REVIEW_INTERVALS_DAYS: Record<ReviewStage, number> = {
  0: 1,
  1: 3,
  2: 7,
  3: 14
}

export const MAX_REVIEW_STAGE: ReviewStage = 3

const DAY_MS = 24 * 60 * 60 * 1000

const addDays = (from: Date, days: number): Date => new Date(from.getTime() + days * DAY_MS)

/** Giai đoạn kế tiếp: tăng dần khi đúng, quay về 0 ngay khi trả lời sai. */
export const nextStage = (current: ReviewStage, passed: boolean): ReviewStage => {
  if (!passed) return 0
  return (current < MAX_REVIEW_STAGE ? current + 1 : MAX_REVIEW_STAGE) as ReviewStage
}

export interface ScheduleReviewInput {
  cardId: string
  passed: boolean
  previous?: ReviewScheduleEntry
  now?: Date
}

/** Tính lịch ôn kế tiếp cho một thẻ dựa trên kết quả quick check mới nhất. */
export const scheduleNextReview = ({ cardId, passed, previous, now = new Date() }: ScheduleReviewInput): ReviewScheduleEntry => {
  // Chưa ôn lần nào: đúng thì bắt đầu ở giai đoạn 0 (1 ngày), sai vẫn ở giai đoạn 0.
  const stage = previous ? nextStage(previous.stage, passed) : 0
  const dueAt = addDays(now, REVIEW_INTERVALS_DAYS[stage])
  return {
    cardId,
    stage,
    dueAt: dueAt.toISOString(),
    lastResult: passed ? 'pass' : 'fail',
    updatedAt: now.toISOString()
  }
}

/** Một thẻ tới hạn ôn khi đã có lịch và ngày đến hạn không ở tương lai. */
export const isDue = (entry: ReviewScheduleEntry, now = new Date()): boolean => new Date(entry.dueAt).getTime() <= now.getTime()

/** Lọc và sắp xếp các thẻ tới hạn ôn theo hạn gần nhất trước. */
export const dueEntries = (schedule: Record<string, ReviewScheduleEntry>, now = new Date()): ReviewScheduleEntry[] =>
  Object.values(schedule)
    .filter((entry) => isDue(entry, now))
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())

/** Tỷ lệ đúng của một lượt quick check (0–1), dùng để quyết định pass/fail. */
export const quickCheckScore = (correctCount: number, totalQuestions: number): number =>
  totalQuestions === 0 ? 0 : correctCount / totalQuestions

/** Ngưỡng đạt quick check theo mục 9.3: đúng tối thiểu 70%. */
export const QUICK_CHECK_PASS_THRESHOLD = 0.7

export const passedQuickCheck = (correctCount: number, totalQuestions: number): boolean =>
  quickCheckScore(correctCount, totalQuestions) >= QUICK_CHECK_PASS_THRESHOLD
