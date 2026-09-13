import type { LearningPath } from '../types'

/**
 * Lộ trình học theo năng lực người dùng (mục 7 kế hoạch chuyên đề thực hành):
 * gợi ý thứ tự chuyên đề phù hợp với kinh nghiệm lái xe hiện tại.
 */
export const learningPaths: LearningPath[] = [
  {
    level: 'beginner',
    title: 'Người mới hoàn toàn (0–2 tháng)',
    summary: 'Bắt đầu với không gian hẹp và tốc độ thấp để làm quen cảm giác xe trước khi ra đường lớn.',
    goal: 'Kiểm soát xe tốt ở tốc độ thấp và không va quẹt trong không gian hẹp.',
    topicOrder: ['parking', 'narrow']
  },
  {
    level: 'intermediate',
    title: 'Đã đi phố cơ bản (2–6 tháng)',
    summary: 'Đã quen luồn lách trong phố, giờ bổ sung kỹ năng nhập làn và giữ nhịp trên cao tốc.',
    goal: 'Nhập làn, chuyển làn và giữ khoảng cách an toàn trên cao tốc một cách tự tin.',
    topicOrder: ['parking', 'narrow', 'highway']
  },
  {
    level: 'experienced',
    title: 'Đã chạy thường xuyên',
    summary: 'Nâng cao khả năng xử lý rủi ro ở đèo dốc, mưa ngập và các tình huống bất thường.',
    goal: 'Ra quyết định an toàn trong điều kiện thời tiết xấu và địa hình khó.',
    topicOrder: ['parking', 'narrow', 'highway', 'weather']
  }
]

export const getLearningPath = (level: LearningPath['level']): LearningPath | undefined =>
  learningPaths.find((path) => path.level === level)
