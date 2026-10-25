import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 2 — Đi trong ngõ hẹp, tránh xe và nhường đường. */
export const narrowCards: Card[] = [
  defineCard({
    id: 'narrow-creep',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Bò chậm qua ngõ hẹp',
    context: 'Ngõ có tường, xe máy dựng sát mép và cửa nhà khuất tầm nhìn; khoảng trống có thể thay đổi bất ngờ. Bài này minh họa xe số tự động trên nền bằng, chỉ đi vào khi toàn bộ xe kể cả gương còn đủ khoảng hở và có thể quan sát để dừng an toàn.',
    objective: 'Kiểm soát xe ở tốc độ bò, quan sát liên tục và dừng trong khoảng đường nhìn rõ còn trống.',
    risk: 'medium',
    difficulty: 2,
    minutes: 5,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Dừng trước đoạn thắt hẹp để kiểm tra lối đi được phép, khoảng hở cho cả thân, gương, góc xe và vật cản thấp; chưa chắc đủ chỗ thì không vào, chọn đường khác.', cueType: 'marker', cueText: 'Bề rộng ngõ không tự chứng minh xe lọt; chú ý tay lái xe máy, cửa có thể mở và người hai bên' },
      { instruction: 'Giữ gương mở để quan sát; chỉ cân nhắc gập khi xe đã dừng, theo hướng dẫn của xe và vẫn bảo đảm quan sát, khoảng hở toàn xe, nếu không thì đổi lối đi.', cueType: 'mirror', cueText: 'Không có mốc bề rộng chung để gập gương; mở lại ngay khi đủ chỗ an toàn' },
      { instruction: 'Giữ phanh chân khi chọn D lúc xe đã đứng hẳn; với xe có chế độ tự bò, giảm lực phanh có kiểm soát bằng chân phải để đi ở tốc độ đi bộ hoặc chậm hơn, luôn dừng được trong phần đường nhìn rõ còn trống.', cueType: 'feel', cueText: 'Không đạp ga và phanh cùng lúc; xe không tự bò thì dừng, làm theo hướng dẫn của xe, không đệm ga để cố vượt chỗ hẹp', speedHint: 'tốc độ đi bộ hoặc chậm hơn; giảm nữa hoặc dừng khi tầm nhìn ngắn' },
      { instruction: 'Quét mắt luân phiên xa và gần, hai bên cửa nhà, gương và điểm mù; theo dõi trẻ nhỏ, người đi bộ, xe máy và khoảng trống phía trước, không nhìn cố định một điểm.', cueType: 'marker', cueText: 'Không có điểm nhìn cố định 10 m; camera và cảm biến chỉ hỗ trợ' },
      { instruction: 'Giữ vô-lăng bằng hai tay ở vị trí phù hợp với xe, sửa lái từng nhịp nhỏ và kiểm tra cả góc đầu xe, thân, gương và đường bánh sau đi qua.', cueType: 'feel', cueText: 'Không bám mắt vào một bên tường; chưa rõ khoảng hở thì dừng trước khi sửa tiếp', steeringHint: 'sửa nhỏ, tránh đánh lái gấp để lách người hoặc xe máy' },
      { instruction: 'Đạp phanh dừng hẳn và giữ xe khi có người hoặc xe cắt ngang, mất tầm nhìn, cảnh báo va chạm hoặc chưa chắc khoảng hở; không cố lách, không tự lùi vào vùng khuất.', cueType: 'marker', cueText: 'Dừng trước vùng xung đột; không chọn P khi xe còn chuyển động' },
      { instruction: 'Quan sát lại phía trước, hai bên, gương và điểm mù; chỉ đi tiếp khi người và xe đã qua, lối đi rõ và đủ khoảng hở, nếu không thì tiếp tục giữ xe và tìm hỗ trợ.', cueType: 'marker', cueText: 'Không tự bò theo xe máy vừa qua; không coi còi hay cảm biến im lặng là đường đã an toàn' }
    ],
    mistakes: [
      'Lấy tốc độ giới hạn làm mục tiêu hoặc đệm ga để cố vượt chỗ hẹp.',
      'Chỉ nhìn xa hoặc bám một bên tường, bỏ sót người và vật cản sát xe.',
      'Gập gương để cố lọt hoặc tự lùi khi chưa kiểm tra an toàn phía sau.'
    ],
    recovery: 'Đạp phanh dừng hẳn và giữ xe, không chọn P khi đang lăn; hạ kính chỉ hỗ trợ nghe và nhìn, không chứng minh đủ khoảng hở. Nếu cần xuống kiểm tra, giữ phanh chân, dùng phanh đỗ và P theo hướng dẫn của xe, bảo đảm xe đứng chắc và mở cửa an toàn. Nhờ người hướng dẫn đứng ngoài đường xe chạy và vùng quét của xe, không giữa xe với tường, luôn thấy nhau; mất liên lạc thì dừng. Chỉ lùi khi được phép, quan sát rõ hai bên và phía sau, có tín hiệu lùi và đường lùi an toàn; không lùi trên đường một chiều hoặc nơi tầm nhìn bị che khuất. Nếu không bảo đảm, giữ xe an toàn và gọi hỗ trợ thay vì tự lùi về chỗ rộng.',
    safety: 'Trẻ nhỏ, người đi bộ, xe máy hoặc cửa nhà có thể xuất hiện sát xe; đi chậm đến mức dừng được trong khoảng đường nhìn rõ còn trống. Khi nguy hiểm, đạp phanh dừng hẳn và giữ xe, không đánh lái lách hay tự lùi vào vùng khuất; chỉ đi tiếp sau khi quan sát lại và đủ khoảng hở. Chế độ tự bò, Auto Hold và xe điện khác nhau theo mẫu xe, phải đọc hướng dẫn và tập ở nơi an toàn; không mặc định nhả phanh là xe bò. Bài này không thay hướng dẫn côn cho xe số sàn hoặc kiểm soát xe trên dốc.',
    mnemonic: { text: 'Bò chậm, quét mắt, chưa rõ thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Với xe số tự động có chế độ tự bò trên nền bằng, nên kiểm soát tốc độ thế nào?', options: ['Chân phải điều chỉnh phanh, đi bộ hoặc chậm hơn, dừng được trong phần đường nhìn rõ còn trống', 'Đạp ga và phanh cùng lúc cho xe đi đều', 'Nhả hết phanh vì xe tự bò luôn đủ chậm'], correctIndex: 0 },
      { prompt: 'Cách quan sát và quyết định gập gương nào phù hợp trong ngõ hẹp?', options: ['Chỉ nhìn xa 10 m và gập gương khi ngõ dưới 2,5 m', 'Quét xa, gần, hai bên và gương; dừng để đánh giá toàn xe, không dùng mốc bề rộng chung để gập gương', 'Gập cả hai gương rồi dựa vào cảm biến để đi tiếp'], correctIndex: 1 },
      { prompt: 'Khi xe máy cắt ngang hoặc không còn nhìn rõ khoảng trống, bạn nên?', options: ['Lách qua hoặc tự lùi ngay về chỗ rộng', 'Đạp phanh dừng hẳn và giữ xe; chỉ đi tiếp sau khi quan sát lại và lối đi rõ, đủ khoảng hở', 'Đi tiếp nếu cảm biến chưa báo'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ bò chậm trong ngõ.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Bổ sung mốc gập gương và điểm nhìn xa cụ thể.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Bỏ mốc gập gương, tốc độ và điểm nhìn cố định; làm rõ xe tự động, điều kiện dừng, lùi an toàn và hai sơ đồ; bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
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
