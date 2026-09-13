import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 4 — Đổ đèo, khởi hành ngang dốc và lái xe khi thời tiết xấu. */
export const weatherCards: Card[] = [
  defineCard({
    id: 'weather-downhill',
    lessonId: 'weather-slope',
    topicId: 'weather',
    title: 'Đổ đèo dài an toàn',
    context: 'Đèo dài hơn mười ki-lô-mét, trời mưa nhỏ và mặt đường trơn. Rà phanh liên tục sẽ làm phanh nóng và mất tác dụng.',
    objective: 'Dùng phanh động cơ là chính để giữ tốc độ ổn định suốt đoạn đổ đèo.',
    risk: 'high',
    difficulty: 4,
    minutes: 5,
    tags: { speedRange: 'suburban', spaceConstraint: 'medium', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giảm tốc về mức an toàn ngay trước khi vào đoạn dốc.', cueType: 'sign', cueText: 'Biển báo dốc xuống', speedHint: 'theo biển báo' },
      { instruction: 'Về số thấp để động cơ hãm bớt tốc độ.', cueType: 'sound', cueText: 'Tiếng máy cao hơn bình thường' },
      { instruction: 'Giữ tốc độ ổn định bằng vòng tua thay vì đạp phanh liên tục.', cueType: 'feel', cueText: 'Vòng tua ổn định' },
      { instruction: 'Đạp phanh thành từng nhịp ngắn khi cần giảm thêm.', cueType: 'feel', cueText: 'Từng nhịp phanh ngắn' },
      { instruction: 'Nhìn xa vào cuối cua để chọn quỹ đạo sớm.', cueType: 'marker', cueText: 'Điểm nhìn cuối cua' },
      { instruction: 'Tấp vào điểm dừng an toàn khi ngửi thấy mùi khét từ phanh.', cueType: 'sound', cueText: 'Mùi khét hoặc phanh mềm' }
    ],
    mistakes: [
      'Rà phanh liên tục suốt đoạn dốc làm phanh quá nhiệt.',
      'Về số N để xe trôi tự do xuống dốc.',
      'Vào cua với tốc độ cao rồi phanh gấp giữa cua.'
    ],
    recovery: 'Khi phanh có dấu hiệu mềm, về số thấp hơn, dùng phanh động cơ và tấp vào điểm lánh nạn gần nhất để phanh nguội.',
    safety: 'Điểm cứu nạn trên đèo được thiết kế để dừng xe mất phanh; hãy ghi nhớ vị trí khi đi qua.',
    mnemonic: { text: 'Số thấp giữ đèo, phanh chỉ điểm xuyết.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    reviewStatus: 'approved',
    version: '1.1.0',
    updatedAt: '2026-09-10',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ đổ đèo dài.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Nhấn mạnh phanh động cơ và dấu hiệu phanh quá nhiệt.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'weather-uphill-start',
    lessonId: 'weather-slope',
    topicId: 'weather',
    title: 'Khởi hành ngang dốc',
    context: 'Xe dừng giữa dốc do kẹt đường, phía sau chỉ cách khoảng một mét. Xe dễ trôi trong khoảnh khắc chuyển chân từ phanh sang ga.',
    objective: 'Khởi hành lên dốc mà xe không trôi về phía sau.',
    risk: 'high',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'high' },
    steps: [
      { instruction: 'Đạp phanh giữ xe đứng yên và kéo phanh tay.', cueType: 'feel', cueText: 'Xe đứng hẳn trên dốc' },
      { instruction: 'Cài số D và giữ chân trên bàn đạp phanh.', cueType: 'feel', cueText: 'Số D, chân còn trên phanh' },
      { instruction: 'Đặt nhẹ chân ga đến khi cảm nhận xe muốn tiến lên.', cueType: 'feel', cueText: 'Xe hơi chồm về trước' },
      { instruction: 'Nhả phanh tay từ từ trong khi giữ đều chân ga.', cueType: 'feel', cueText: 'Phanh tay nhả dần' },
      { instruction: 'Quan sát gương sau để chắc chắn xe không lùi lại.', cueType: 'mirror', cueText: 'Khoảng cách xe sau không đổi' }
    ],
    mistakes: [
      'Nhả phanh trước khi xe có lực kéo nên xe trôi về sau.',
      'Đạp ga quá mạnh làm bánh trượt trên mặt dốc ẩm.',
      'Dừng quá sát xe phía trước nên không còn chỗ xử lý.'
    ],
    recovery: 'Nếu xe bắt đầu trôi, đạp phanh dứt khoát, kéo phanh tay và thực hiện lại từ đầu.',
    safety: 'Giữ khoảng cách ít nhất một thân xe khi dừng trên dốc để có không gian xử lý.',
    mnemonic: { text: 'Có lực kéo rồi mới nhả phanh tay.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng khởi hành ngang dốc.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'weather-engine-brake',
    lessonId: 'weather-slope',
    topicId: 'weather',
    title: 'Dùng phanh động cơ đúng cách',
    context: 'Nhiều xe số tự động có chế độ số tay hoặc chế độ L. Biết dùng đúng lúc giúp phanh nguội và xe ổn định hơn khi xuống dốc.',
    objective: 'Chọn cấp số phù hợp để động cơ giữ tốc độ thay cho phanh.',
    risk: 'medium',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'suburban', spaceConstraint: 'open', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Nhả ga hoàn toàn trước khi chuyển sang chế độ số tay.', cueType: 'feel', cueText: 'Chân rời hẳn chân ga' },
      { instruction: 'Chuyển cần số sang chế độ số tay hoặc vị trí L.', cueType: 'marker', cueText: 'Ký hiệu M hoặc L trên cần số' },
      { instruction: 'Về từng cấp số một và nghe tiếng máy tăng lên.', cueType: 'sound', cueText: 'Tiếng máy tăng đều' },
      { instruction: 'Giữ vòng tua trong vùng an toàn ghi trên đồng hồ.', cueType: 'marker', cueText: 'Kim tua trong vùng an toàn' },
      { instruction: 'Đạp phanh thêm từng nhịp ngắn nếu tốc độ vẫn tăng.', cueType: 'feel', cueText: 'Tốc độ vẫn tăng dần' },
      { instruction: 'Trở lại chế độ D khi hết đoạn dốc.', cueType: 'marker', cueText: 'Hết đoạn dốc' }
    ],
    mistakes: [
      'Về liền hai đến ba cấp số khi xe đang chạy nhanh.',
      'Giữ vòng tua quá cao trong thời gian dài.',
      'Chuyển sang số tay khi đang ôm cua gấp.'
    ],
    recovery: 'Nếu vòng tua vượt vùng an toàn, lên lại một cấp số rồi giảm tốc bằng nhịp phanh ngắn trước khi về số thấp.',
    safety: 'Mỗi dòng xe có ký hiệu và giới hạn khác nhau; đọc sách hướng dẫn của nhà sản xuất trước khi áp dụng.',
    mnemonic: { text: 'Nhả ga, về một cấp, nghe máy hãm.', rhythm: 'ba-nhip' },
    checklistId: 'bad_weather',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới giải thích cách dùng phanh động cơ.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'weather-flood-cross',
    lessonId: 'weather-flood',
    topicId: 'weather',
    title: 'Quyết định khi gặp đường ngập',
    context: 'Đường phố ngập sau cơn mưa lớn, các xe phía trước vẫn đi qua và tạo sóng nước. Nước vào họng gió có thể làm hỏng động cơ.',
    objective: 'Đánh giá đúng mức nước và chọn phương án đi hoặc quay đầu.',
    risk: 'high',
    difficulty: 4,
    minutes: 4,
    tags: { speedRange: 'creep', spaceConstraint: 'medium', visibility: 'poor', stress: 'high' },
    steps: [
      { instruction: 'Dừng xe ở vị trí khô ráo để quan sát mức nước.', cueType: 'marker', cueText: 'Điểm dừng khô ráo' },
      { instruction: 'Xác định mức nước qua bánh xe của phương tiện đi trước.', cueType: 'marker', cueText: 'Nước ngập tới đâu trên bánh xe' },
      { instruction: 'Quay đầu khi nước cao quá nửa bánh xe hoặc chảy xiết.', cueType: 'marker', cueText: 'Nước quá nửa bánh xe' },
      { instruction: 'Chọn phần đường cao nhất, thường là giữa tim đường.', cueType: 'marker', cueText: 'Phần đường cao nhất' },
      { instruction: 'Đi đều một mạch ở số thấp, không dừng giữa vùng ngập.', cueType: 'feel', cueText: 'Ga đều, không dừng', speedHint: 'dưới 10 km/h' },
      { instruction: 'Rà phanh nhẹ vài lần sau khi qua khỏi vùng ngập.', cueType: 'feel', cueText: 'Phanh còn ăn trở lại' }
    ],
    mistakes: [
      'Đi theo xe tải lớn và bị sóng nước dội vào khoang máy.',
      'Dừng giữa vùng ngập để nhường xe ngược chiều.',
      'Khởi động lại ngay khi xe đã chết máy trong nước.'
    ],
    recovery: 'Xe chết máy trong vùng ngập thì giữ nguyên chìa khóa, mở cửa thoát ra nơi cao và gọi cứu hộ.',
    safety: 'Nước chảy xiết chỉ cần sâu ba mươi xăng-ti-mét đã có thể cuốn trôi ô tô; quay đầu luôn là lựa chọn an toàn.',
    mnemonic: { text: 'Nước quá nửa bánh, quay đầu tìm đường khác.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho quyết định đi qua đường ngập.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'weather-heavy-rain',
    lessonId: 'weather-flood',
    topicId: 'weather',
    title: 'Lái xe trong mưa lớn',
    context: 'Mưa rào làm gạt mưa chạy hết tốc độ vẫn không kịp, mặt đường đọng nước thành vệt dài. Nguy cơ trượt nước tăng nhanh theo tốc độ.',
    objective: 'Giảm nguy cơ trượt nước và giữ tầm nhìn ở mức chấp nhận được.',
    risk: 'high',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'suburban', spaceConstraint: 'open', visibility: 'poor', stress: 'high' },
    steps: [
      { instruction: 'Bật đèn chiếu gần để xe khác nhìn thấy mình.', cueType: 'marker', cueText: 'Đèn chiếu gần đã bật' },
      { instruction: 'Giảm tốc xuống dưới mức bình thường ít nhất hai mươi phần trăm.', cueType: 'feel', cueText: 'Chậm hơn ngày khô rõ rệt' },
      { instruction: 'Tăng khoảng cách với xe trước lên bốn đến năm giây.', cueType: 'timing', cueText: 'Khoảng cách bốn đến năm giây' },
      { instruction: 'Bám theo vệt bánh xe phía trước để tránh vùng đọng nước.', cueType: 'marker', cueText: 'Vệt bánh xe khô hơn' },
      { instruction: 'Nhả ga giữ thẳng lái nếu vô-lăng bỗng nhẹ hẫng.', cueType: 'feel', cueText: 'Vô-lăng nhẹ hẫng là trượt nước' },
      { instruction: 'Tấp vào nơi an toàn khi không còn nhìn rõ vạch kẻ đường.', cueType: 'marker', cueText: 'Mất tầm nhìn vạch kẻ' }
    ],
    mistakes: [
      'Bật đèn pha làm ánh sáng phản xạ ngược vào mắt.',
      'Phanh gấp khi xe vừa mất bám đường.',
      'Giữ nguyên tốc độ vì nghĩ lốp còn mới.'
    ],
    recovery: 'Khi xe trượt nước, nhả ga, giữ vô-lăng thẳng và chờ lốp bám lại rồi mới điều chỉnh hướng.',
    safety: 'Dừng nghỉ khi mưa quá lớn là lựa chọn hợp lý; bật đèn cảnh báo và đỗ ngoài phần đường xe chạy.',
    mnemonic: { text: 'Chậm hơn, xa hơn, sáng đèn, giữ thẳng.', rhythm: 'ba-nhip' },
    checklistId: 'bad_weather',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng lái xe trong mưa lớn.', author: 'Biên tập nội dung' }]
  })
]
