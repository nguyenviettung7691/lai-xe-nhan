import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 2 — Đi trong ngõ hẹp, tránh xe và nhường đường. */
export const narrowCards: Card[] = [
  defineCard({
    id: 'narrow-creep',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Bò chậm qua ngõ hẹp',
    context: 'Ngõ rộng chưa tới ba mét, hai bên là tường và xe máy dựng sát mép. Tốc độ chỉ vài ki-lô-mét mỗi giờ nhưng sai số cho phép rất nhỏ.',
    objective: 'Giữ xe đi đều ở tốc độ bò mà không phải phanh gấp.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Nhả phanh cho xe tự bò, giữ chân trên bàn đạp phanh.', cueType: 'feel', cueText: 'Chân luôn chờ trên phanh', speedHint: 'dưới 10 km/h' },
      { instruction: 'Gập gương khi lối đi hẹp hơn hai mét rưỡi.', cueType: 'marker', cueText: 'Lối đi hẹp hơn 2,5 m' },
      { instruction: 'Đặt mắt nhìn xa khoảng mười mét thay vì nhìn sát đầu xe.', cueType: 'marker', cueText: 'Điểm nhìn cách xe 10 m' },
      { instruction: 'Giữ vô-lăng bằng hai tay và sửa lái bằng nhịp nhỏ.', cueType: 'feel', cueText: 'Hai tay ở vị trí 9 và 3 giờ', steeringHint: 'sửa nhỏ từng nhịp' },
      { instruction: 'Dừng lại khi không nhìn rõ khoảng trống phía trước.', cueType: 'marker', cueText: 'Mất tầm nhìn thì dừng' }
    ],
    mistakes: [
      'Đệm ga rồi rà phanh liên tục khiến xe giật cục.',
      'Nhìn chăm chăm vào một bên tường nên xe lệch về phía đó.',
      'Đi tiếp khi chưa chắc chắn còn đủ chỗ.'
    ],
    recovery: 'Dừng hẳn, hạ kính và quan sát hai bên trước khi đi tiếp. Nếu ngõ hẹp hơn dự kiến, lùi ra điểm rộng gần nhất.',
    safety: 'Trẻ nhỏ và xe máy có thể xuất hiện đột ngột từ cửa nhà hai bên ngõ.',
    mnemonic: { text: 'Bò đều, nhìn xa, tay giữ vững vô-lăng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi bò chậm qua ngõ hẹp, chân phải nên đặt ở đâu?', options: ['Luôn sẵn sàng trên bàn đạp phanh', 'Đặt hẳn lên chân ga', 'Để nghỉ ngoài bàn đạp'], correctIndex: 0 },
      { prompt: 'Điểm nhìn phù hợp khi đi trong ngõ hẹp là gì?', options: ['Nhìn sát đầu xe', 'Nhìn xa khoảng mười mét phía trước', 'Chỉ nhìn vào gương chiếu hậu'], correctIndex: 1 },
      { prompt: 'Khi không nhìn rõ khoảng trống phía trước trong ngõ, bạn nên?', options: ['Đi tiếp và quan sát sau', 'Dừng lại ngay', 'Tăng tốc để vượt qua nhanh'], correctIndex: 1 }
    ],
    reviewStatus: 'approved',
    version: '1.1.0',
    updatedAt: '2026-09-10',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ bò chậm trong ngõ.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Bổ sung mốc gập gương và điểm nhìn xa cụ thể.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'narrow-mirror',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Canh khoảng cách bằng gương',
    context: 'Trong ngõ, hai bên xe chỉ còn vài chục xăng-ti-mét nên mắt thường khó ước lượng. Gương là công cụ đo đáng tin nhất lúc này.',
    objective: 'Dùng gương để giữ khoảng trống đều hai bên thân xe.',
    risk: 'low',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'calm' },
    steps: [
      { instruction: 'Chỉnh gương sao cho thấy một phần thân xe ở mép trong.', cueType: 'mirror', cueText: 'Thấy một phần thân xe' },
      { instruction: 'Chọn một mốc cố định trên tường làm chuẩn so sánh.', cueType: 'marker', cueText: 'Mốc cố định trên tường' },
      { instruction: 'Liếc gương trái rồi gương phải theo nhịp đều, mỗi lần dưới một giây.', cueType: 'timing', cueText: 'Mỗi lần liếc dưới một giây' },
      { instruction: 'Sửa lái một nhịp nhỏ khi một bên hẹp hơn bên kia rõ rệt.', cueType: 'mirror', cueText: 'Hai bên chênh lệch rõ', steeringHint: 'sửa nhỏ từng nhịp' },
      { instruction: 'Dừng xe nếu gương chạm vật cản hoặc không còn thấy khoảng trống.', cueType: 'mirror', cueText: 'Gương mất khoảng trống' }
    ],
    mistakes: [
      'Chỉnh gương quá hướng xuống nên không thấy phần thân xe.',
      'Nhìn gương quá lâu làm xe lệch hướng khi đang lăn bánh.',
      'Tin vào cảm giác thay vì hình ảnh thực trong gương.'
    ],
    recovery: 'Dừng xe, chỉnh lại gương rồi mới đi tiếp. Trong ngõ quá hẹp, gập gương và nhờ người đi cùng quan sát bên ngoài.',
    safety: 'Gập gương làm mất một phần tầm nhìn phía sau nên chỉ dùng ở tốc độ bò.',
    mnemonic: { text: 'Gương thấy thân xe, khoảng trống mới thật.', rhythm: 'doi-ve' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Gương nên được chỉnh thế nào khi đi trong ngõ hẹp?', options: ['Chỉ thấy đường phía sau', 'Thấy một phần thân xe ở mép trong', 'Chỉnh hướng lên trời'], correctIndex: 1 },
      { prompt: 'Nên liếc gương theo nhịp như thế nào?', options: ['Nhìn gương liên tục không rời mắt', 'Liếc đều hai bên, mỗi lần dưới một giây', 'Chỉ nhìn một bên suốt hành trình'], correctIndex: 1 },
      { prompt: 'Trong ngõ cực hẹp, khi cần thêm hỗ trợ quan sát, bạn nên?', options: ['Gập gương và nhờ người đi cùng quan sát ngoài xe', 'Tháo gương ra', 'Nhắm mắt đi chậm'], correctIndex: 0 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về cách canh khoảng cách bằng gương.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'narrow-corner',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Ôm cua vuông góc trong ngõ',
    context: 'Ngõ rẽ vuông góc, tường xây sát mép đường nên bánh sau dễ cắt vào góc trong. Đây là lỗi va quệt phổ biến của tài mới.',
    objective: 'Đưa cả bốn bánh qua góc cua mà không chạm tường.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Đi sát mép ngoài của ngõ trước khi vào cua.', cueType: 'marker', cueText: 'Bám mép ngoài trước cua' },
      { instruction: 'Đưa vai xe vượt qua góc tường rồi mới bắt đầu đánh lái.', cueType: 'marker', cueText: 'Vai xe vượt góc tường' },
      { instruction: 'Đánh lái đều tay và giữ tốc độ bò suốt góc cua.', cueType: 'feel', cueText: 'Tốc độ không đổi trong cua', speedHint: 'dưới 10 km/h', steeringHint: 'đánh lái đều tay' },
      { instruction: 'Nhìn gương phía trong cua để theo dõi bánh sau.', cueType: 'mirror', cueText: 'Bánh sau trong gương phía trong' },
      { instruction: 'Trả lái ngay khi đầu xe đã hướng vào giữa ngõ mới.', cueType: 'marker', cueText: 'Đầu xe hướng giữa ngõ', steeringHint: 'trả lái về thẳng' }
    ],
    mistakes: [
      'Đánh lái sớm nên bánh sau cắt vào chân tường.',
      'Tăng tốc giữa cua làm xe văng ra mép đối diện.',
      'Chỉ nhìn đầu xe mà quên bánh sau đi theo quỹ đạo hẹp hơn.'
    ],
    recovery: 'Dừng lại, lùi thẳng một đoạn ngắn rồi vào cua lại với điểm bắt đầu xa hơn.',
    safety: 'Bấm còi ngắn khi vào cua khuất tầm nhìn và sẵn sàng dừng cho xe máy đi ngược chiều.',
    mnemonic: { text: 'Ra rộng, vào muộn, bánh sau theo sau.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi vào cua vuông góc trong ngõ, nên đi sát bên nào trước khi vào cua?', options: ['Mép trong của ngõ', 'Mép ngoài của ngõ', 'Chính giữa ngõ'], correctIndex: 1 },
      { prompt: 'Vì sao bánh sau dễ cắt vào góc tường nếu đánh lái quá sớm?', options: ['Vì bánh sau đi theo quỹ đạo hẹp hơn đầu xe', 'Vì bánh sau lớn hơn bánh trước', 'Vì gương không phản chiếu bánh sau'], correctIndex: 0 },
      { prompt: 'Khi vào cua khuất tầm nhìn trong ngõ, nên làm gì?', options: ['Tăng tốc để qua nhanh', 'Bấm còi ngắn và sẵn sàng dừng', 'Không cần tín hiệu gì thêm'], correctIndex: 1 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng ôm cua vuông góc.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'narrow-yield',
    lessonId: 'narrow-negotiation',
    topicId: 'narrow',
    title: 'Nhường đường khi gặp xe ngược chiều',
    context: 'Hai ô tô gặp nhau giữa ngõ chỉ đủ một làn, phía sau bạn còn vài xe máy. Quyết định nhường nhanh giúp cả hai bên thoát kẹt.',
    objective: 'Chọn điểm tránh phù hợp và ra hiệu rõ ràng cho xe đối diện.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Dừng xe khi còn cách xe đối diện ít nhất mười mét.', cueType: 'marker', cueText: 'Cách xe đối diện 10 m' },
      { instruction: 'Quan sát hai bên tìm khoảng lõm hoặc lối rẽ gần nhất.', cueType: 'marker', cueText: 'Khoảng lõm hoặc lối rẽ' },
      { instruction: 'Ra hiệu bằng đèn hoặc tay để báo bên nào sẽ lùi.', cueType: 'marker', cueText: 'Tín hiệu thống nhất hai bên' },
      { instruction: 'Lùi chậm về điểm tránh và giữ khoảng cách với tường.', cueType: 'mirror', cueText: 'Khoảng cách tường trong gương', speedHint: 'dưới 5 km/h' },
      { instruction: 'Chờ xe kia đi qua hẳn rồi mới trở lại giữa ngõ.', cueType: 'marker', cueText: 'Xe kia đã qua hẳn' }
    ],
    mistakes: [
      'Cố tiến thêm vài mét khiến cả hai xe mắc kẹt sát nhau.',
      'Lùi nhanh mà không nhìn xe máy phía sau.',
      'Chờ đối phương nhường trong khi phía sau ùn dài.'
    ],
    recovery: 'Nếu không còn chỗ tránh, bật đèn cảnh báo, xuống xe trao đổi và cùng thống nhất một bên lùi ra.',
    safety: 'Ưu tiên nhường cho xe cứu thương, xe cứu hỏa và xe công vụ ưu tiên theo quy định.',
    mnemonic: { text: 'Dừng sớm, tìm chỗ tránh, ra hiệu rõ ràng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi gặp xe ngược chiều trong ngõ một làn, nên dừng lại từ khoảng cách nào?', options: ['Sát ngay trước mũi xe đối diện', 'Ít nhất mười mét', 'Không cần dừng, cứ đi tiếp'], correctIndex: 1 },
      { prompt: 'Sau khi thống nhất tín hiệu nhường đường, bên lùi nên làm gì?', options: ['Lùi nhanh cho xong', 'Lùi chậm, giữ khoảng cách với tường', 'Lùi mà không cần nhìn gương'], correctIndex: 1 },
      { prompt: 'Trong tình huống nhường đường, ai luôn được ưu tiên đi trước?', options: ['Xe cứu thương, cứu hỏa, xe công vụ ưu tiên', 'Xe đến trước theo thứ tự', 'Xe to hơn'], correctIndex: 0 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về nhường đường trong ngõ một làn.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'narrow-cutoff',
    lessonId: 'narrow-negotiation',
    topicId: 'narrow',
    title: 'Xử lý khi xe máy tạt đầu',
    context: 'Ra khỏi ngõ ở ngã ba đông đúc, xe máy thường cắt ngang mũi xe mà không giảm tốc. Phản xạ đúng lúc này quan trọng hơn quyền ưu tiên.',
    objective: 'Giữ khoảng trống an toàn và tránh phanh gấp bất ngờ.',
    risk: 'high',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'urban', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giảm tốc trước khi đầu xe nhô ra khỏi ngõ.', cueType: 'marker', cueText: 'Giảm tốc trước khi nhô ra', speedHint: 'dưới 10 km/h' },
      { instruction: 'Nhô đầu xe từng đoạn ngắn để người đi đường nhìn thấy.', cueType: 'marker', cueText: 'Nhô từng đoạn 30 cm' },
      { instruction: 'Quan sát hướng có xe máy đông trước, sau đó mới đến hướng còn lại.', cueType: 'marker', cueText: 'Hướng đông xe quan sát trước' },
      { instruction: 'Phanh đều và giữ hướng thẳng khi có xe tạt đầu.', cueType: 'feel', cueText: 'Phanh đều, không đánh lái gấp' },
      { instruction: 'Chờ khoảng trống đủ dài rồi mới hòa vào dòng xe.', cueType: 'timing', cueText: 'Khoảng trống đủ dài' }
    ],
    mistakes: [
      'Đánh lái gấp để tránh khiến xe lấn sang làn ngược chiều.',
      'Bấm còi dài thay vì giảm tốc và nhường đường.',
      'Nhô cả đầu xe ra ngã ba khi chưa quan sát đủ hai hướng.'
    ],
    recovery: 'Dừng hẳn và nhường cho dòng xe máy đi qua. Chờ khoảng trống rõ ràng rồi mới ra, tránh chen ngang.',
    safety: 'Luôn nhường người đi bộ tại nơi có vạch sang đường, kể cả khi bạn đã dừng đúng vị trí.',
    mnemonic: { text: 'Nhô từng chút, phanh đều, không lái gấp.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi ra khỏi ngõ tại ngã ba đông xe máy, nên nhô đầu xe như thế nào?', options: ['Nhô hết cả xe ra một lần', 'Nhô từng đoạn ngắn để người khác nhìn thấy', 'Không cần giảm tốc trước khi nhô'], correctIndex: 1 },
      { prompt: 'Khi có xe máy tạt đầu bất ngờ, phản ứng đúng là gì?', options: ['Đánh lái gấp sang làn ngược chiều', 'Phanh đều và giữ hướng thẳng', 'Bấm còi thật to và tăng tốc'], correctIndex: 1 },
      { prompt: 'Khi nào bạn phải nhường và không nên ra khỏi ngõ dù đã quan sát?', options: ['Khi có người đi bộ đang qua vạch sang đường', 'Khi ngõ có bóng đèn màu vàng', 'Khi xe máy đi rất chậm phía xa'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống xe máy tạt đầu.', author: 'Biên tập nội dung' }]
  })
]
