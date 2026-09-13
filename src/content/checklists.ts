import type { Checklist } from '../types'

/** Checklist theo ngữ cảnh, gắn với thẻ học qua `checklistId`. */
export const checklists: Checklist[] = [
  {
    id: 'pre_drive',
    scope: 'pre_drive',
    title: 'Trước khi nổ máy',
    description: 'Thói quen 20 giây giúp phát hiện sớm vấn đề trước mỗi chuyến đi.',
    items: [
      { id: 'seat', itemNo: 1, label: 'Ghế chỉnh đúng tư thế', criticalLevel: 'must', hint: 'Đạp hết phanh mà đầu gối vẫn hơi cong.' },
      { id: 'mirrors', itemNo: 2, label: 'Gương trái, phải và giữa', criticalLevel: 'must', hint: 'Mỗi gương thấy một phần thân xe để định vị.' },
      { id: 'belt', itemNo: 3, label: 'Dây an toàn đã cài', criticalLevel: 'must' },
      { id: 'brake', itemNo: 4, label: 'Phanh tay và trạng thái số', criticalLevel: 'must', hint: 'Số P, phanh tay còn giữ trước khi nổ máy.' },
      { id: 'fuel', itemNo: 5, label: 'Nhiên liệu đủ cho hành trình', criticalLevel: 'should' },
      { id: 'warning', itemNo: 6, label: 'Không có đèn cảnh báo bất thường', criticalLevel: 'must', hint: 'Đèn đỏ còn sáng sau khi nổ máy là dấu hiệu cần dừng.' }
    ]
  },
  {
    id: 'pre_reverse',
    scope: 'pre_reverse',
    title: 'Trước khi lùi',
    description: 'Áp dụng ngay trước mỗi lần lùi chuồng hoặc ghép ngang.',
    items: [
      { id: 'reverse-space', itemNo: 1, label: 'Ô đỗ đủ rộng và không có vật cản thấp', criticalLevel: 'must' },
      { id: 'reverse-people', itemNo: 2, label: 'Không có người hoặc xe máy phía sau', criticalLevel: 'must' },
      { id: 'reverse-mirrors', itemNo: 3, label: 'Đã quét đủ ba gương và điểm mù', criticalLevel: 'must' },
      { id: 'reverse-camera', itemNo: 4, label: 'Camera và cảm biến hoạt động bình thường', criticalLevel: 'should', hint: 'Camera bẩn hoặc mờ thì căn bằng gương.' },
      { id: 'reverse-speed', itemNo: 5, label: 'Sẵn sàng giữ tốc độ dưới 5 km/h', criticalLevel: 'must' }
    ]
  },
  {
    id: 'post_park',
    scope: 'post_park',
    title: 'Trước khi rời xe',
    description: 'Một thói quen nhỏ giúp chuyến đi sau bắt đầu nhẹ nhàng hơn.',
    items: [
      { id: 'park-gear', itemNo: 1, label: 'Về P sau khi xe đã đứng hẳn', criticalLevel: 'must' },
      { id: 'park-handbrake', itemNo: 2, label: 'Kéo phanh tay, nhất là khi đỗ dốc', criticalLevel: 'must' },
      { id: 'park-lights', itemNo: 3, label: 'Tắt đèn và tắt máy', criticalLevel: 'should' },
      { id: 'park-window', itemNo: 4, label: 'Đóng kín cửa kính và cửa sổ trời', criticalLevel: 'should' },
      { id: 'park-door', itemNo: 5, label: 'Quan sát xe máy trước khi mở cửa', criticalLevel: 'must', hint: 'Mở cửa bằng tay xa để tự nhìn về phía sau.' }
    ]
  },
  {
    id: 'pre_highway',
    scope: 'pre_highway',
    title: 'Trước khi lên cao tốc',
    description: 'Kiểm tra nhanh trước khi vào đoạn đường tốc độ cao.',
    items: [
      { id: 'hw-tire', itemNo: 1, label: 'Áp suất và gai lốp còn tốt', criticalLevel: 'must' },
      { id: 'hw-fuel', itemNo: 2, label: 'Nhiên liệu đủ đến trạm dừng kế tiếp', criticalLevel: 'must' },
      { id: 'hw-wiper', itemNo: 3, label: 'Gạt mưa và nước rửa kính hoạt động', criticalLevel: 'should' },
      { id: 'hw-route', itemNo: 4, label: 'Đã xem trước lối ra cần đi', criticalLevel: 'should' },
      { id: 'hw-rest', itemNo: 5, label: 'Người lái tỉnh táo, không buồn ngủ', criticalLevel: 'must' },
      { id: 'hw-phone', itemNo: 6, label: 'Điện thoại gắn giá đỡ, đã bật dẫn đường', criticalLevel: 'should' }
    ]
  },
  {
    id: 'bad_weather',
    scope: 'bad_weather',
    title: 'Khẩn cấp thời tiết xấu',
    description: 'Dùng khi gặp mưa lớn, ngập nước hoặc đổ đèo dài.',
    items: [
      { id: 'bw-lights', itemNo: 1, label: 'Bật đèn chiếu gần, không dùng đèn pha trong mưa', criticalLevel: 'must' },
      { id: 'bw-speed', itemNo: 2, label: 'Giảm tốc theo điều kiện mặt đường', criticalLevel: 'must' },
      { id: 'bw-gap', itemNo: 3, label: 'Giãn khoảng cách lên 4–5 giây', criticalLevel: 'must' },
      { id: 'bw-brake', itemNo: 4, label: 'Phanh còn ăn, không có mùi khét', criticalLevel: 'must', hint: 'Kiểm tra sau mỗi đoạn đổ đèo dài.' },
      { id: 'bw-stop', itemNo: 5, label: 'Đã xác định nơi dừng an toàn gần nhất', criticalLevel: 'should' }
    ]
  }
]
