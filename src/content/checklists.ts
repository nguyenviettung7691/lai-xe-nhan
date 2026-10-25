import type { Checklist } from '../types'

/** Checklist theo ngữ cảnh, gắn với thẻ học qua `checklistId`. */
export const checklists: Checklist[] = [
  {
    id: 'pre_drive',
    scope: 'pre_drive',
    title: 'Trước khi nổ máy',
    description: 'Rà soát xe và người ngồi trước mỗi chuyến đi; thời gian kiểm tra tùy tình trạng xe và hành trình.',
    items: [
      { id: 'walkaround', itemNo: 1, label: 'Lốp không xẹp/hư hỏng rõ; quanh xe không có người hoặc vật cản', criticalLevel: 'must', hint: 'Quan sát từ bên ngoài trước khi lên xe. Nếu thấy lốp xẹp, hư hỏng hoặc rò rỉ bất thường, không khởi hành cho tới khi được kiểm tra.' },
      { id: 'seat', itemNo: 2, label: 'Ghế, tựa đầu và vô-lăng chỉnh để điều khiển thoải mái', criticalLevel: 'must', hint: 'Đạp hết bàn đạp mà đầu gối vẫn hơi cong; ngồi tựa lưng, với tới vô-lăng mà vai không rời tựa ghế.' },
      { id: 'mirrors', itemNo: 3, label: 'Gương chỉnh phù hợp; sẵn sàng kiểm tra điểm mù trực tiếp', criticalLevel: 'must', hint: 'Chỉnh để thấy đủ khu vực phía sau và giảm phần thân xe lọt vào gương; gương không loại bỏ điểm mù, vẫn quan sát trực tiếp khi cần.' },
      { id: 'belt', itemNo: 4, label: 'Người lái và mọi hành khách thắt dây đúng cách; trẻ có ghế phù hợp', criticalLevel: 'must', hint: 'Dây hông nằm thấp qua hông, dây vai qua giữa ngực; chọn ghế trẻ em phù hợp với trẻ và xe theo hướng dẫn của nhà sản xuất.' },
      { id: 'brake', itemNo: 5, label: 'Xe đứng yên; trạng thái số và phanh đỗ phù hợp với xe', criticalLevel: 'must', hint: 'Giữ phanh đỗ; chọn P/N trên xe tự động hoặc số N trên xe số sàn theo hướng dẫn của xe trước khi khởi động.' },
      { id: 'fuel', itemNo: 6, label: 'Nhiên liệu hoặc mức sạc đủ cho hành trình dự kiến', criticalLevel: 'should', hint: 'Tính cả chặng dự phòng hoặc điểm sạc/nạp phù hợp; không dựa hoàn toàn vào ước tính tầm hoạt động tối đa trên màn hình.' },
      { id: 'warning', itemNo: 7, label: 'Đã phân biệt đèn tự kiểm tra với cảnh báo còn hiện', criticalLevel: 'must', hint: 'Không đánh giá chỉ theo màu đèn. Đọc sách xe; nếu xe báo dừng hoặc có cảnh báo nghiêm trọng như phanh, áp suất dầu hay quá nhiệt, không tiếp tục lái và gọi hỗ trợ.' },
      { id: 'driver-ready', itemNo: 8, label: 'Người lái tỉnh táo, đủ sức khỏe và không bị chất gây ảnh hưởng', criticalLevel: 'must', hint: 'Không lái sau khi uống rượu bia, dùng chất/thuốc gây ảnh hưởng hoặc khi buồn ngủ, không khỏe; đổi người lái hoặc hoãn chuyến đi.' },
      { id: 'load-secure', itemNo: 9, label: 'Cửa đã đóng; hành lý và vật dụng trong xe được cố định', criticalLevel: 'should', hint: 'Không để đồ che tầm nhìn hoặc có thể văng vào người khi phanh gấp.' }
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
      { id: 'reverse-camera', itemNo: 4, label: 'Camera và cảm biến hoạt động bình thường', criticalLevel: 'should', hint: 'Camera và cảm biến chỉ hỗ trợ; kết hợp gương và quan sát trực tiếp, dừng nếu chưa rõ khoảng trống.' },
      { id: 'reverse-speed', itemNo: 5, label: 'Sẵn sàng giữ tốc độ dưới 5 km/h', criticalLevel: 'must', hint: 'Đây là giới hạn, không phải tốc độ mục tiêu; bò chậm hơn khi cần, luôn dừng được ngay.' }
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
      { id: 'bw-lights', itemNo: 1, label: 'Bật đèn chiếu gần, không dùng đèn pha trong mưa', criticalLevel: 'must', hint: 'Kiểm tra cả đèn hậu; không mặc định AUTO hoặc đèn ban ngày đã bật đủ đèn. Gạt mưa và sấy kính phải giúp nhìn rõ.' },
      { id: 'bw-speed', itemNo: 2, label: 'Giảm tốc theo điều kiện mặt đường', criticalLevel: 'must', hint: 'Theo biển, độ bám và tầm nhìn để dừng trong khoảng thấy rõ; không có tỷ lệ giảm tốc chung. Tắt cruise hoặc ACC theo sách xe khi mưa trơn.' },
      { id: 'bw-gap', itemNo: 3, label: 'Tăng cự ly theo biển, tốc độ, độ bám và tầm nhìn', criticalLevel: 'must', hint: 'Đáp ứng cự ly theo quy định và tăng thêm khi mưa, trơn; 4–5 giây không phải khoảng cách bảo đảm cho mọi điều kiện.' },
      { id: 'bw-brake', itemNo: 4, label: 'Phanh hoạt động bình thường, không có dấu hiệu bất thường', criticalLevel: 'must', hint: 'Kiểm tra trước khi xuống dốc; phanh mềm, giảm hiệu lực hoặc có mùi khét thì dừng an toàn và gọi hỗ trợ, không chờ hết dốc.' },
      { id: 'bw-stop', itemNo: 5, label: 'Đã xác định nơi dừng an toàn gần nhất', criticalLevel: 'should', hint: 'Khi có ngập, chọn nơi khô cao được phép, không chờ ở chỗ trũng hoặc cản dòng xe; đổi nơi chờ nếu nước dâng. Mưa làm thiếu tầm nhìn thì tìm điểm dừng sớm, không trú mưa trên làn khẩn cấp cao tốc; không thể đi tiếp an toàn thì cảnh báo và gọi hỗ trợ khi dừng.' },
      { id: 'bw-flood', itemNo: 6, label: 'Gặp đường ngập: không vào, chọn lối khô hợp pháp', criticalLevel: 'must', hint: 'Không dựa vào nửa bánh xe trước, không lội đo hoặc vòng rào; chỉ quay đầu khi quan sát đủ và có khoảng trống an toàn.' }
    ]
  }
]
