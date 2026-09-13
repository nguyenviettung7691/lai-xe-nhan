import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 3 — Nhập làn, giữ khoảng cách và rời cao tốc. */
export const highwayCards: Card[] = [
  defineCard({
    id: 'highway-merge',
    lessonId: 'highway-entry',
    topicId: 'highway',
    title: 'Nhập làn cao tốc an toàn',
    context: 'Làn tăng tốc ngắn, xe phía sau đang chạy nhanh hơn bạn khoảng ba mươi ki-lô-mét mỗi giờ. Bạn chỉ có vài giây để quyết định.',
    objective: 'Hòa vào dòng xe với chênh lệch tốc độ nhỏ nhất có thể.',
    risk: 'high',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'good', stress: 'high' },
    steps: [
      { instruction: 'Bật xi-nhan trái ngay khi vào làn tăng tốc.', cueType: 'marker', cueText: 'Vào làn tăng tốc là bật xi-nhan' },
      { instruction: 'Tăng tốc bám theo tốc độ dòng xe trên làn ngoài cùng.', cueType: 'feel', cueText: 'Tốc độ gần bằng dòng xe', speedHint: 'theo dòng xe, tối đa bằng biển báo' },
      { instruction: 'Liếc gương trái và ngoái nhìn điểm mù một nhịp.', cueType: 'mirror', cueText: 'Gương trái và điểm mù' },
      { instruction: 'Chọn khoảng trống dài ít nhất ba giây giữa hai xe.', cueType: 'timing', cueText: 'Khoảng trống ba giây' },
      { instruction: 'Chuyển làn bằng một nhịp lái mượt, không cắt chéo.', cueType: 'feel', cueText: 'Một nhịp lái mượt', steeringHint: 'lái mượt một nhịp' },
      { instruction: 'Tắt xi-nhan và giữ đều tốc độ sau khi đã vào làn.', cueType: 'marker', cueText: 'Đã vào giữa làn' }
    ],
    mistakes: [
      'Đi hết làn tăng tốc mới bắt đầu xin nhập làn.',
      'Nhập làn với tốc độ thấp hơn dòng xe rất nhiều.',
      'Dừng lại ở cuối làn tăng tốc để chờ khoảng trống.'
    ],
    recovery: 'Nếu hết làn tăng tốc mà chưa có khoảng trống, đi tiếp vào làn dừng khẩn cấp, giữ thẳng lái rồi chờ khe trống an toàn.',
    safety: 'Làn dừng khẩn cấp chỉ dùng khi thật sự cần; không dừng đỗ để nghỉ hoặc nghe điện thoại.',
    mnemonic: { text: 'Xi-nhan, tăng tốc, nhìn gương rồi nhập làn.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Khi nhập làn cao tốc, nên tăng tốc đến mức nào?', options: ['Chậm hơn dòng xe nhiều để an toàn', 'Bám theo tốc độ của dòng xe trên làn ngoài', 'Giữ nguyên tốc độ đường phố'], correctIndex: 1 },
      { prompt: 'Khoảng trống tối thiểu để chuyển làn nhập vào cao tốc là bao lâu?', options: ['Một giây', 'Ba giây', 'Không cần tính bằng thời gian'], correctIndex: 1 },
      { prompt: 'Nếu hết làn tăng tốc mà chưa có khoảng trống an toàn, bạn nên làm gì?', options: ['Dừng hẳn giữa làn tăng tốc để chờ', 'Đi tiếp vào làn dừng khẩn cấp, giữ thẳng lái chờ khe hở', 'Tạt đầu xe đang chạy để có chỗ'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.1.0',
    updatedAt: '2026-09-10',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ nhập làn cao tốc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thêm mốc khoảng trống ba giây và phương án khi hết làn tăng tốc.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'highway-exit',
    lessonId: 'highway-entry',
    topicId: 'highway',
    title: 'Rời cao tốc đúng lối ra',
    context: 'Biển báo lối ra xuất hiện khi bạn còn ở làn trong cùng và dòng xe khá dày. Nhiều vụ va chạm xảy ra do tài xế đổi làn gấp ở phút chót.',
    objective: 'Chuyển dần ra làn ngoài và giảm tốc đúng trong làn giảm tốc.',
    risk: 'high',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Đọc biển báo lối ra từ khoảng cách hai ki-lô-mét.', cueType: 'sign', cueText: 'Biển báo cách 2 km' },
      { instruction: 'Chuyển từng làn một, mỗi lần cách nhau vài giây.', cueType: 'timing', cueText: 'Mỗi làn cách nhau vài giây' },
      { instruction: 'Bật xi-nhan phải trước lối ra ít nhất ba trăm mét.', cueType: 'marker', cueText: 'Xi-nhan trước 300 m' },
      { instruction: 'Giữ nguyên tốc độ cho đến khi bánh xe vào làn giảm tốc.', cueType: 'marker', cueText: 'Bánh xe đã vào làn giảm tốc' },
      { instruction: 'Giảm tốc đều trong làn giảm tốc, không phanh trên làn chính.', cueType: 'feel', cueText: 'Phanh chỉ trong làn giảm tốc' },
      { instruction: 'Nhìn đồng hồ tốc độ trước khi vào đường nhánh.', cueType: 'marker', cueText: 'Tốc độ theo biển đường nhánh' }
    ],
    mistakes: [
      'Cắt chéo nhiều làn khi đã tới sát lối ra.',
      'Phanh gấp trên làn chính vì sợ lỡ lối ra.',
      'Giữ tốc độ cao khi đã vào đường nhánh cong.'
    ],
    recovery: 'Lỡ lối ra thì đi tiếp tới lối ra kế tiếp. Không lùi, không dừng trên làn chính để chờ quay lại.',
    safety: 'Nếu không kịp vào làn ra an toàn, đi tiếp tới lối ra kế tiếp; không cắt làn hoặc phanh gấp trên làn chính.',
    mnemonic: { text: 'Ra sớm từng làn, giảm tốc trong làn ra.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Nên đọc biển báo lối ra từ khoảng cách nào để chuẩn bị?', options: ['Ngay sát lối ra', 'Khoảng hai ki-lô-mét trước', 'Không cần đọc biển báo'], correctIndex: 1 },
      { prompt: 'Cách chuyển làn ra khỏi cao tốc đúng là gì?', options: ['Cắt chéo nhiều làn cùng lúc khi gần tới lối ra', 'Chuyển từng làn một, cách nhau vài giây', 'Phanh gấp trên làn chính rồi rẽ'], correctIndex: 1 },
      { prompt: 'Nếu lỡ mất lối ra mong muốn, bạn nên làm gì?', options: ['Lùi xe lại trên làn chính', 'Đi tiếp tới lối ra kế tiếp', 'Dừng khẩn cấp trên làn chính để quay lại'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng rời cao tốc.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'highway-signs',
    lessonId: 'highway-entry',
    topicId: 'highway',
    title: 'Đọc biển báo tốc độ và làn đường',
    context: 'Trên cao tốc, biển báo tốc độ tối đa và tối thiểu có thể thay đổi theo từng đoạn. Đi sai làn hoặc sai tốc độ đều bị xử phạt.',
    objective: 'Chọn đúng làn và tốc độ phù hợp với biển báo hiện hành.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'highway', spaceConstraint: 'open', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Đọc biển tốc độ ngay khi vào cao tốc và ghi nhớ con số.', cueType: 'sign', cueText: 'Biển tốc độ đầu tuyến' },
      { instruction: 'Chọn làn theo tốc độ thực tế của mình, chậm hơn thì đi làn bên phải.', cueType: 'marker', cueText: 'Chậm hơn thì đi bên phải' },
      { instruction: 'Quan sát biển báo tại mỗi nút giao vì giới hạn có thể thay đổi.', cueType: 'sign', cueText: 'Biển báo tại mỗi nút giao' },
      { instruction: 'Giữ tốc độ trong khoảng giữa mức tối thiểu và tối đa.', cueType: 'marker', cueText: 'Giữa hai mức tốc độ' },
      { instruction: 'Trở lại làn bên phải sau khi vượt xong.', cueType: 'marker', cueText: 'Vượt xong là về bên phải' }
    ],
    mistakes: [
      'Bám làn trái dù đang chạy chậm hơn dòng xe.',
      'Chạy dưới tốc độ tối thiểu ghi trên biển.',
      'Chỉ nhìn biển đầu tuyến rồi giữ nguyên tốc độ suốt hành trình.'
    ],
    recovery: 'Khi lỡ đi sai làn, bật xi-nhan và chuyển làn ở đoạn trống, tránh đổi làn liên tục.',
    safety: 'Quy định tốc độ và làn đường theo Luật Trật tự, an toàn giao thông đường bộ và biển báo tại chỗ luôn được ưu tiên.',
    mnemonic: { text: 'Biển nói gì, chân ga nghe nấy.', rhythm: 'doi-ve' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Nếu đang chạy chậm hơn dòng xe, bạn nên đi ở làn nào?', options: ['Làn trong cùng bên trái', 'Làn bên phải', 'Làn nào cũng được'], correctIndex: 1 },
      { prompt: 'Giới hạn tốc độ trên cao tốc có thể thay đổi khi nào?', options: ['Chỉ ở đầu tuyến', 'Tại mỗi nút giao, cần quan sát biển báo liên tục', 'Không bao giờ thay đổi'], correctIndex: 1 },
      { prompt: 'Sau khi vượt xong một xe khác, bạn nên làm gì?', options: ['Giữ nguyên làn trái', 'Trở lại làn bên phải', 'Bật đèn cảnh báo'], correctIndex: 1 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về đọc biển báo trên cao tốc.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'highway-gap',
    lessonId: 'highway-flow',
    topicId: 'highway',
    title: 'Giữ khoảng cách ba giây',
    context: 'Ở tốc độ tám mươi ki-lô-mét mỗi giờ, xe cần hơn năm mươi mét để dừng. Khoảng cách theo thời gian dễ áp dụng hơn ước lượng theo mét.',
    objective: 'Giữ khoảng cách tối thiểu ba giây với xe phía trước.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'highway', spaceConstraint: 'open', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Chọn một mốc cố định bên đường như cột biển báo.', cueType: 'marker', cueText: 'Mốc cố định bên đường' },
      { instruction: 'Đếm từ lúc xe trước qua mốc đến khi xe mình qua mốc.', cueType: 'timing', cueText: 'Đếm một, hai, ba' },
      { instruction: 'Nhả ga khi đếm được dưới ba giây.', cueType: 'timing', cueText: 'Dưới ba giây là quá gần' },
      { instruction: 'Tăng lên bốn đến năm giây khi trời mưa hoặc đường ướt.', cueType: 'timing', cueText: 'Mưa thì bốn đến năm giây' },
      { instruction: 'Kiểm tra lại khoảng cách sau mỗi lần vượt hoặc chuyển làn.', cueType: 'mirror', cueText: 'Sau mỗi lần chuyển làn' }
    ],
    mistakes: [
      'Ước lượng khoảng cách bằng mét trong khi tốc độ thay đổi liên tục.',
      'Bám sát xe trước để tránh bị xe khác chen vào.',
      'Giữ nguyên ba giây khi mặt đường đã ướt.'
    ],
    recovery: 'Khi bị chen ngang, nhả ga để tạo lại khoảng cách thay vì phanh gấp giữa dòng xe.',
    safety: 'Khoảng cách an toàn tối thiểu theo tốc độ được quy định trong luật giao thông đường bộ hiện hành.',
    mnemonic: { text: 'Đếm ba giây, mưa thì đếm năm.', rhythm: 'doi-ve' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Cách đơn giản để giữ khoảng cách an toàn là gì?', options: ['Ước lượng bằng mét', 'Đếm thời gian từ khi xe trước qua một mốc cố định', 'Nhìn theo cảm giác'], correctIndex: 1 },
      { prompt: 'Khoảng cách an toàn tối thiểu trong điều kiện thường là bao nhiêu?', options: ['Một giây', 'Ba giây', 'Mười giây'], correctIndex: 1 },
      { prompt: 'Khi trời mưa hoặc đường ướt, nên tăng khoảng cách lên bao nhiêu?', options: ['Giữ nguyên ba giây', 'Bốn đến năm giây', 'Giảm xuống hai giây'], correctIndex: 1 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về quy tắc khoảng cách ba giây.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'highway-overtake-truck',
    lessonId: 'highway-flow',
    topicId: 'highway',
    title: 'Vượt xe tải dài',
    context: 'Xe container dài hơn mười lăm mét có vùng điểm mù rộng và luồng gió mạnh khi vượt. Thời gian nằm cạnh xe tải càng ngắn càng an toàn.',
    objective: 'Vượt dứt khoát và thoát khỏi vùng điểm mù nhanh nhất có thể.',
    risk: 'high',
    difficulty: 4,
    minutes: 4,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giữ khoảng cách đủ xa để nhìn thấy gương của xe tải.', cueType: 'mirror', cueText: 'Thấy gương xe tải' },
      { instruction: 'Quan sát làn trái trống hẳn trước khi bật xi-nhan.', cueType: 'mirror', cueText: 'Làn trái trống hẳn' },
      { instruction: 'Tăng tốc trước khi tiến vào vùng cạnh thùng xe.', cueType: 'feel', cueText: 'Tăng tốc trước khi áp sát' },
      { instruction: 'Giữ ga đều và đi thẳng khi ngang thân xe tải.', cueType: 'feel', cueText: 'Ga đều khi ngang thân xe' },
      { instruction: 'Nhìn gương phải thấy cả đầu xe tải rồi mới chuyển làn.', cueType: 'mirror', cueText: 'Thấy đầu xe tải trong gương' },
      { instruction: 'Trở về làn phải và giữ khoảng cách ba giây.', cueType: 'timing', cueText: 'Khoảng cách ba giây' }
    ],
    mistakes: [
      'Đi song song xe tải trong nhiều giây ở vùng điểm mù.',
      'Cắt vào ngay trước đầu xe tải khi chưa đủ khoảng cách.',
      'Vượt khi trời mưa lớn và bụi nước che kín tầm nhìn.'
    ],
    recovery: 'Nếu tốc độ không đủ để vượt dứt điểm, nhả ga và lùi lại phía sau xe tải, chờ đoạn đường rộng hơn.',
    safety: 'Không vượt ở nơi có vạch liền, tầm nhìn hạn chế hoặc biển cấm vượt.',
    mnemonic: { text: 'Vượt nhanh, thoát điểm mù, về làn phải.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Vì sao nên tránh đi song song lâu bên cạnh xe tải dài?', options: ['Vì tốn xăng hơn', 'Vì đó là vùng điểm mù rộng của xe tải', 'Vì luật cấm đi cạnh xe tải'], correctIndex: 1 },
      { prompt: 'Trước khi chuyển làn để vượt xe tải, cần quan sát gì?', options: ['Chỉ cần bật xi-nhan là đủ', 'Làn trái phải trống hẳn qua gương', 'Không cần quan sát nếu đường vắng'], correctIndex: 1 },
      { prompt: 'Khi nào không nên thực hiện việc vượt xe tải?', options: ['Khi trời mưa lớn và bụi nước che kín tầm nhìn', 'Khi xe tải đi hơi chậm', 'Khi đường có ba làn'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng vượt xe tải dài.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'highway-tailgater',
    lessonId: 'highway-flow',
    topicId: 'highway',
    title: 'Khi bị xe sau bám sát',
    context: 'Xe phía sau bám cách đuôi chưa tới một thân xe và nháy đèn liên tục. Phản ứng nóng giận lúc này dễ dẫn tới va chạm liên hoàn.',
    objective: 'Tạo thêm khoảng trống phía trước và nhường đường sớm.',
    risk: 'high',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'good', stress: 'high' },
    steps: [
      { instruction: 'Giữ tốc độ ổn định và tránh phản ứng đột ngột.', cueType: 'feel', cueText: 'Tốc độ không dao động' },
      { instruction: 'Tăng khoảng cách với xe phía trước lên bốn giây.', cueType: 'timing', cueText: 'Khoảng cách bốn giây' },
      { instruction: 'Bật xi-nhan phải và chuyển sang làn bên phải khi có khoảng trống.', cueType: 'marker', cueText: 'Khoảng trống làn phải' },
      { instruction: 'Giữ hướng thẳng cho xe sau vượt qua.', cueType: 'feel', cueText: 'Xe sau đang vượt' },
      { instruction: 'Trở lại nhịp chạy bình thường sau khi xe sau đã đi xa.', cueType: 'mirror', cueText: 'Xe sau đã đi xa' }
    ],
    mistakes: [
      'Đạp phanh cảnh cáo xe phía sau.',
      'Giảm tốc đột ngột để buộc xe sau lùi lại.',
      'Bám lại xe phía trước cho đỡ bị ép.'
    ],
    recovery: 'Nếu xe sau tiếp tục bám sát, tấp vào trạm dừng nghỉ gần nhất và chờ vài phút cho dòng xe đi qua.',
    safety: 'Không tranh chấp trên đường; ghi nhớ biển số và báo cơ quan chức năng nếu bị đe dọa.',
    mnemonic: { text: 'Giữ đều, giãn trước, nhường phải, đi tiếp.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Khi bị xe sau bám sát và nháy đèn, phản ứng đúng là gì?', options: ['Đạp phanh cảnh cáo', 'Giữ tốc độ ổn định, tránh phản ứng đột ngột', 'Tăng tốc bỏ chạy'], correctIndex: 1 },
      { prompt: 'Nên làm gì để tạo điều kiện cho xe sau vượt an toàn?', options: ['Bám sát xe phía trước hơn', 'Bật xi-nhan phải, chuyển làn khi có khoảng trống', 'Giảm tốc đột ngột giữa làn'], correctIndex: 1 },
      { prompt: 'Nếu xe phía sau tiếp tục bám sát và có dấu hiệu đe dọa, bạn nên?', options: ['Tấp vào trạm dừng nghỉ gần nhất và chờ', 'Dừng hẳn giữa cao tốc để tranh cãi', 'Tăng tốc tối đa để bỏ xa'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'needs_revision',
    version: '0.9.0',
    updatedAt: '2026-09-12',
    changelog: [{ version: '0.9.0', date: '2026-09-12', summary: 'Chờ bổ sung hướng dẫn xử lý tình huống bị ép xe kéo dài.', author: 'Biên tập nội dung' }]
  })
]
