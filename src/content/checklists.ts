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
      { id: 'reverse-space', itemNo: 1, label: 'Đã kiểm tra toàn bộ đường lùi, khoảng trống và vật cản', criticalLevel: 'must', hint: 'Xem cả vật thấp, vật nhô cao, lối xe sẽ đi ra và khoảng sáng phía trên; không lùi nếu chưa chắc xe lọt qua.' },
      { id: 'reverse-people', itemNo: 2, label: 'Đã quan sát người và phương tiện quanh vùng lùi', criticalLevel: 'must', hint: 'Quan sát trực tiếp trước khi lùi và tiếp tục theo dõi; người đi bộ, trẻ em hoặc xe máy có thể đi vào đường xe bất cứ lúc nào.' },
      { id: 'reverse-mirrors', itemNo: 3, label: 'Đã quan sát quanh xe và các điểm mù', criticalLevel: 'must', hint: 'Dùng gương, nhìn trực tiếp qua vai/kính và quan sát lại khi xe dịch chuyển; không chỉ nhìn một gương hoặc màn hình.' },
      { id: 'reverse-camera', itemNo: 4, label: 'Nếu có camera/cảm biến, đã kiểm tra và chỉ dùng để hỗ trợ', criticalLevel: 'should', hint: 'Màn hình có thể có vùng khuất, méo khoảng cách hoặc không báo vật thấp; kết hợp quan sát trực tiếp và dừng nếu chưa rõ.' },
      { id: 'reverse-speed', itemNo: 5, label: 'Có thể lùi thật chậm và dừng ngay khi cần', criticalLevel: 'must', hint: 'Không có một tốc độ số phù hợp mọi chỗ đỗ; chỉ di chuyển khi còn quan sát được và xe có thể dừng trong khoảng trống đã kiểm tra.' },
      { id: 'reverse-spotter', itemNo: 6, label: 'Đã có phương án an toàn nếu tầm nhìn bị che khuất', criticalLevel: 'must', hint: 'Chọn vị trí khác hoặc nhờ người hướng dẫn thống nhất tín hiệu và luôn nằm trong tầm nhìn; dừng ngay khi mất dấu người hướng dẫn hoặc có người đi vào đường xe.' }
    ]
  },
  {
    id: 'post_park',
    scope: 'post_park',
    title: 'Trước khi rời xe',
    description: 'Xác nhận xe đã được đỗ an toàn và không bỏ quên người hay vật nuôi trong xe.',
    items: [
      { id: 'park-gear', itemNo: 1, label: 'Xe đã đứng hẳn; đã chọn P hoặc số theo hướng dẫn xe', criticalLevel: 'must', hint: 'Không chọn P khi xe còn lăn. Xe số sàn không có P; dùng số và quy trình được nhà sản xuất hướng dẫn.' },
      { id: 'park-handbrake', itemNo: 2, label: 'Đã kích hoạt phanh đỗ và xác nhận xe được giữ', criticalLevel: 'must', hint: 'Dùng phanh tay hoặc phanh đỗ điện tử theo hướng dẫn xe; đặc biệt xác nhận xe được giữ chắc trên dốc.' },
      { id: 'park-occupants', itemNo: 3, label: 'Đã kiểm tra mọi người, trẻ em và vật nuôi rời xe', criticalLevel: 'must', hint: 'Kiểm tra đủ các hàng ghế trước khi khóa xe; không để trẻ em hoặc vật nuôi một mình trong xe.' },
      { id: 'park-lights', itemNo: 4, label: 'Đã đưa xe về trạng thái tắt/đỗ đúng hướng dẫn', criticalLevel: 'should', hint: 'Kiểm tra đèn và phụ tải; chế độ tự động có thể khác nhau giữa các xe.' },
      { id: 'park-window', itemNo: 5, label: 'Đã đóng cửa kính và cửa sổ trời', criticalLevel: 'should' },
      { id: 'park-door', itemNo: 6, label: 'Đã kiểm tra dòng xe trước khi mở cửa ra đường', criticalLevel: 'must', hint: 'Quan sát gương rồi nhìn trực tiếp cả xe máy, xe đạp và người đi bộ; chờ đường trống, mở hé trước. Dùng tay xa giúp quay người nhưng không thay thế việc quan sát.' },
      { id: 'park-lock', itemNo: 7, label: 'Đã khóa xe và cất đồ giá trị khỏi tầm nhìn', criticalLevel: 'should', hint: 'Giữ chìa khóa bên mình và xác nhận xe đã khóa theo cách dùng của mẫu xe.' }
    ]
  },
  {
    id: 'pre_highway',
    scope: 'pre_highway',
    title: 'Trước khi lên cao tốc',
    description: 'Kiểm tra nhanh trước khi vào đoạn đường tốc độ cao.',
    items: [
      { id: 'hw-tire', itemNo: 1, label: 'Lốp đủ áp suất khuyến nghị và không hư hỏng rõ', criticalLevel: 'must', hint: 'Đo khi lốp nguội theo nhãn xe/sách hướng dẫn; kiểm tra gai, vết nứt, phồng hoặc thủng. Không lấy áp suất tối đa in trên hông lốp làm mức khuyến nghị.' },
      { id: 'hw-brake-lights', itemNo: 2, label: 'Phanh và đèn trước/sau hoạt động bình thường', criticalLevel: 'must', hint: 'Không khởi hành nếu phanh có cảm giác bất thường, đèn thiết yếu hỏng hoặc xe báo lỗi nghiêm trọng; kiểm tra/sửa chữa trước chuyến đi.' },
      { id: 'hw-fuel', itemNo: 3, label: 'Nhiên liệu hoặc mức sạc đủ cho chặng đã định', criticalLevel: 'must', hint: 'Tính cả đường vòng và điểm dừng phù hợp; không dựa hoàn toàn vào tầm hoạt động ước tính tối đa của xe.' },
      { id: 'hw-wiper', itemNo: 4, label: 'Gạt mưa, nước rửa kính và sấy kính hoạt động', criticalLevel: 'should', hint: 'Kiểm tra để duy trì tầm nhìn khi mưa/ẩm; nếu kính không thể giữ đủ rõ, hoãn đi hoặc dừng ở nơi an toàn.' },
      { id: 'hw-route', itemNo: 5, label: 'Đã xem trước tuyến, lối ra và điểm dừng dự kiến', criticalLevel: 'should', hint: 'Cài dẫn đường và kiểm tra tuyến trước khi xe chạy; không cố rẽ hoặc dừng đột ngột khi lỡ lối ra.' },
      { id: 'hw-rest', itemNo: 6, label: 'Người lái tỉnh táo, đủ sức khỏe và không bị chất gây ảnh hưởng', criticalLevel: 'must', hint: 'Không lái khi buồn ngủ, uống rượu bia, dùng chất/thuốc ảnh hưởng hoặc không khỏe; đổi người lái, nghỉ hoặc hoãn chuyến.' },
      { id: 'hw-phone', itemNo: 7, label: 'Điện thoại/dẫn đường đã đặt trước; không cần cầm khi xe chạy', criticalLevel: 'should', hint: 'Gắn chắc giá đỡ và nhập điểm đến khi xe đang đỗ; dừng ở nơi an toàn nếu cần đổi tuyến hoặc xử lý điện thoại.' },
      { id: 'hw-load', itemNo: 8, label: 'Hành lý được cố định và không che tầm nhìn', criticalLevel: 'should', hint: 'Không chở quá tải; đặt đồ nặng chắc chắn, tránh để vật có thể văng vào người khi phanh.' }
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
