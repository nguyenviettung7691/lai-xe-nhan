import type { ConfidenceScore, ExpertReview, ReviewDecision } from '../types'

/**
 * Hồ sơ duyệt chuyên môn (lớp B). Tên người duyệt trong bản seed là hồ sơ minh họa
 * dùng để kiểm thử quy trình; khi phát hành thật phải thay bằng thông tin thẩm định viên có thực.
 */
const reviewers = {
  slope: { name: 'Giáo viên sát hạch hạng C (hồ sơ mẫu)', credential: 'GPLX hạng C, 12 năm dạy thực hành — dữ liệu minh họa' },
  urban: { name: 'Giáo viên dạy lái đô thị (hồ sơ mẫu)', credential: 'GPLX hạng B, 9 năm dạy học viên mới — dữ liệu minh họa' },
  safety: { name: 'Chuyên viên an toàn vận tải (hồ sơ mẫu)', credential: 'Chứng chỉ an toàn giao thông, 8 năm hiện trường — dữ liệu minh họa' }
} as const

type ReviewerKey = keyof typeof reviewers

const review = (
  cardId: string,
  key: ReviewerKey,
  notes: string,
  confidenceScore: ConfidenceScore,
  reviewedAt: string,
  decision: ReviewDecision = 'approved'
): ExpertReview => ({
  id: `${cardId}-rv`,
  cardId,
  reviewer: reviewers[key].name,
  credential: reviewers[key].credential,
  decision,
  notes,
  confidenceScore,
  reviewedAt
})

export const expertReviews: ExpertReview[] = [
  review('weather-heavy-rain', 'safety', 'Mô tả hiện tượng trượt nước và cách xử lý chính xác.', 5, '2026-09-12')
]
