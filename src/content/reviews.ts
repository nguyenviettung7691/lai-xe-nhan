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
  review('highway-gap', 'safety', 'Quy tắc đếm ba giây dễ nhớ và an toàn hơn ước lượng theo mét.', 5, '2026-09-12'),
  review('highway-overtake-truck', 'safety', 'Yêu cầu thoát nhanh khỏi vùng điểm mù là điểm mấu chốt.', 4, '2026-09-12'),
  review('highway-tailgater', 'safety', 'Cần bổ sung hướng dẫn khi bị ép xe kéo dài và cách ghi nhận bằng camera hành trình.', 3, '2026-09-12', 'needs_revision'),
  review('weather-downhill', 'slope', 'Phanh động cơ là nội dung cốt lõi, dấu hiệu phanh quá nhiệt mô tả đúng.', 5, '2026-09-12'),
  review('weather-uphill-start', 'slope', 'Trình tự giữ phanh tay đến khi có lực kéo là cách an toàn cho tài mới.', 5, '2026-09-12'),
  review('weather-engine-brake', 'slope', 'Lưu ý đọc sách hướng dẫn của nhà sản xuất là cần thiết vì ký hiệu khác nhau.', 4, '2026-09-12'),
  review('weather-flood-cross', 'safety', 'Ngưỡng nửa bánh xe và khuyến cáo quay đầu phù hợp khuyến nghị an toàn.', 5, '2026-09-12'),
  review('weather-heavy-rain', 'safety', 'Mô tả hiện tượng trượt nước và cách xử lý chính xác.', 5, '2026-09-12')
]
