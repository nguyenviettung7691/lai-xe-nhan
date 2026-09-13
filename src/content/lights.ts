import type { DashboardLight } from '../types'

/** Tra cứu nhanh đèn cảnh báo táp-lô; mô tả ưu tiên hành động an toàn. */
export const dashboardLights: DashboardLight[] = [
  {
    id: 'engine',
    icon: '⌁',
    name: 'Động cơ',
    english: 'Check engine',
    severity: 'warn',
    description: 'Hệ thống động cơ hoặc khí thải phát hiện bất thường.',
    actions: ['Nếu đèn sáng liên tục, đi chậm đến gara gần nhất.', 'Nếu đèn nhấp nháy, giảm tốc và dừng ở nơi an toàn.', 'Ghi lại hiện tượng rung, hụt ga hoặc mùi lạ.'],
    avoid: 'Không tiếp tục chạy xa khi đèn nhấp nháy hoặc xe rung mạnh.'
  },
  {
    id: 'brake',
    icon: '!',
    name: 'Hệ thống phanh',
    english: 'Brake system',
    severity: 'critical',
    description: 'Có thể liên quan đến dầu phanh, má phanh hoặc phanh tay.',
    actions: ['Dừng xe an toàn và kiểm tra phanh tay.', 'Nếu pedal mềm hoặc xe lệch, gọi cứu hộ.', 'Không lái tiếp khi đèn vẫn đỏ sau khi nhả phanh tay.'],
    avoid: 'Không thử chạy nhanh để kiểm tra phanh.'
  },
  {
    id: 'battery',
    icon: '▣',
    name: 'Ắc quy',
    english: 'Battery',
    severity: 'warn',
    description: 'Hệ thống sạc hoặc ắc quy có thể đang gặp vấn đề.',
    actions: ['Tắt thiết bị điện không cần thiết.', 'Đi đến gara gần nhất nếu xe vẫn vận hành bình thường.', 'Dừng an toàn nếu nhiệt độ tăng hoặc xe mất điện.'],
    avoid: 'Không tắt máy ở nơi không thể khởi động lại.'
  },
  {
    id: 'temperature',
    icon: '♨',
    name: 'Nhiệt độ động cơ',
    english: 'Coolant temperature',
    severity: 'critical',
    description: 'Động cơ có nguy cơ quá nhiệt.',
    actions: ['Tấp vào nơi an toàn và tắt máy.', 'Chờ nguội hoàn toàn trước khi mở nắp capo.', 'Gọi cứu hộ nếu nước làm mát bị rò hoặc đèn không tắt.'],
    avoid: 'Không mở nắp két nước khi động cơ còn nóng.'
  },
  {
    id: 'abs',
    icon: '◉',
    name: 'ABS',
    english: 'Anti-lock brake',
    severity: 'warn',
    description: 'Chống bó cứng phanh có thể không hoạt động.',
    actions: ['Giảm tốc và tăng khoảng cách.', 'Tránh phanh gấp trên mặt đường trơn.', 'Đặt lịch kiểm tra ABS sớm.'],
    avoid: 'Không chủ quan vì phanh cơ bản vẫn có thể còn hoạt động.'
  },
  {
    id: 'airbag',
    icon: '✦',
    name: 'Túi khí',
    english: 'Airbag',
    severity: 'warn',
    description: 'Hệ thống túi khí hoặc cảm biến có lỗi.',
    actions: ['Thắt dây an toàn cho mọi người trên xe.', 'Đưa xe đi kiểm tra sớm.', 'Không tự tháo giắc hoặc sửa cảm biến.'],
    avoid: 'Không chở trẻ nhỏ ở ghế trước khi chưa có biện pháp phù hợp.'
  },
  {
    id: 'oil',
    icon: '◔',
    name: 'Áp suất dầu',
    english: 'Oil pressure',
    severity: 'critical',
    description: 'Áp suất dầu bôi trơn xuống thấp, động cơ có thể hư hỏng nhanh.',
    actions: ['Tấp vào lề và tắt máy ngay khi an toàn.', 'Kiểm tra mức dầu sau khi máy nguội.', 'Gọi cứu hộ nếu mức dầu bình thường mà đèn vẫn sáng.'],
    avoid: 'Không chạy tiếp dù chỉ vài ki-lô-mét khi đèn dầu còn sáng.'
  },
  {
    id: 'tpms',
    icon: '◎',
    name: 'Áp suất lốp',
    english: 'Tire pressure',
    severity: 'warn',
    description: 'Một hoặc nhiều lốp non hơi so với mức khuyến nghị.',
    actions: ['Giảm tốc và tìm chỗ dừng an toàn để kiểm tra lốp.', 'Bơm lại đúng áp suất ghi trên khung cửa xe.', 'Kiểm tra vết đinh hoặc rạn nứt trước khi đi tiếp.'],
    avoid: 'Không chạy tốc độ cao trên cao tốc khi lốp đang non hơi.'
  }
]
