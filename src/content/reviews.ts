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
  review('parking-start', 'urban', 'Mốc canh vai xe khớp với cách dạy trong sân tập; đã kiểm tra lại trên hai mẫu xe phổ thông.', 5, '2026-09-12'),
  review('parking-align', 'urban', 'Bước so hai vạch trong gương dễ thực hiện cho học viên mới.', 4, '2026-09-12'),
  review('parking-correct', 'urban', 'Nhấn mạnh tiến ra rồi lùi lại là cách sửa lệch an toàn nhất trong hầm.', 4, '2026-09-12'),
  review('parking-parallel', 'urban', 'Khoảng cách 80 cm và mốc ngang đuôi xe trước phù hợp với xe hạng B.', 4, '2026-09-12'),
  review('parking-slope', 'slope', 'Cảnh báo trôi dốc và yêu cầu về P sau khi dừng là bắt buộc, nội dung đạt.', 5, '2026-09-12'),
  review('parking-lowlight', 'slope', 'Khuyến nghị khảo sát một lượt trước khi lùi rất hợp lý với hầm cũ.', 4, '2026-09-12'),
  review('narrow-creep', 'urban', 'Điểm nhìn xa 10 m giúp học viên bớt bám sát đầu xe, nội dung chính xác.', 5, '2026-09-12'),
  review('narrow-mirror', 'urban', 'Cách chỉnh gương thấy một phần thân xe là chuẩn phổ biến khi dạy.', 4, '2026-09-12'),
  review('narrow-corner', 'urban', 'Quy tắc ra rộng vào muộn đúng với quỹ đạo bánh sau của xe con.', 5, '2026-09-12'),
  review('narrow-yield', 'safety', 'Bổ sung ưu tiên xe cứu thương là điểm cần thiết, nội dung đạt.', 4, '2026-09-12'),
  review('narrow-cutoff', 'safety', 'Nhấn mạnh phanh đều và không đánh lái gấp phù hợp thực tế đô thị.', 5, '2026-09-12'),
  review('highway-merge', 'safety', 'Khoảng trống ba giây và phương án khi hết làn tăng tốc đều chính xác.', 5, '2026-09-12'),
  review('highway-exit', 'safety', 'Nguyên tắc chỉ phanh trong làn giảm tốc rất quan trọng, đã kiểm chứng.', 5, '2026-09-12'),
  review('highway-signs', 'safety', 'Cách diễn đạt về làn và tốc độ bám sát quy định hiện hành.', 4, '2026-09-12'),
  review('highway-gap', 'safety', 'Quy tắc đếm ba giây dễ nhớ và an toàn hơn ước lượng theo mét.', 5, '2026-09-12'),
  review('highway-overtake-truck', 'safety', 'Yêu cầu thoát nhanh khỏi vùng điểm mù là điểm mấu chốt.', 4, '2026-09-12'),
  review('highway-tailgater', 'safety', 'Cần bổ sung hướng dẫn khi bị ép xe kéo dài và cách ghi nhận bằng camera hành trình.', 3, '2026-09-12', 'needs_revision'),
  review('weather-downhill', 'slope', 'Phanh động cơ là nội dung cốt lõi, dấu hiệu phanh quá nhiệt mô tả đúng.', 5, '2026-09-12'),
  review('weather-uphill-start', 'slope', 'Trình tự giữ phanh tay đến khi có lực kéo là cách an toàn cho tài mới.', 5, '2026-09-12'),
  review('weather-engine-brake', 'slope', 'Lưu ý đọc sách hướng dẫn của nhà sản xuất là cần thiết vì ký hiệu khác nhau.', 4, '2026-09-12'),
  review('weather-flood-cross', 'safety', 'Ngưỡng nửa bánh xe và khuyến cáo quay đầu phù hợp khuyến nghị an toàn.', 5, '2026-09-12'),
  review('weather-heavy-rain', 'safety', 'Mô tả hiện tượng trượt nước và cách xử lý chính xác.', 5, '2026-09-12')
]
