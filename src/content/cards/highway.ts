import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 3 — Nhập làn, giữ khoảng cách và rời cao tốc. */
export const highwayCards: Card[] = [
  defineCard({
    id: 'highway-merge',
    lessonId: 'highway-entry',
    topicId: 'highway',
    title: 'Nhập làn cao tốc an toàn',
    context: 'Bạn vào cao tốc từ nhánh bên phải có làn tăng tốc, trong khi xe trên làn chính có thể chạy nhanh hoặc đang ùn lại. Cần quan sát và chọn khoảng trống sớm, không đua tới cuối làn để cố chen vào.',
    objective: 'Nhường xe trên cao tốc và chỉ nhập vào làn sát bên phải khi tốc độ, khoảng hở trước sau và vạch đường cho phép.',
    risk: 'high',
    difficulty: 3,
    minutes: 5,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'good', stress: 'high' },
    steps: [
      { instruction: 'Đọc biển, vạch và chiều dài làn tăng tốc; quan sát dòng xe ở làn sát bên phải cao tốc và nhường xe đang chạy trên đó.', cueType: 'sign', cueText: 'Dùng làn tăng tốc trước khi nhập; không cắt vạch liền hoặc vùng gạch chéo' },
      { instruction: 'Bật xi-nhan trái trước khi nhập; kiểm tra gương trong, gương trái và xe phía sau đang tiến đến trên làn nhận.', cueType: 'mirror', cueText: 'Xi-nhan không tạo quyền ưu tiên; theo dõi xe đến nhanh và điểm mù xe tải' },
      { instruction: 'Chỉnh tốc độ trong làn tăng tốc để gần tốc độ dòng xe khi an toàn, không vượt giới hạn và luôn quan sát đường phía trước.', cueType: 'feel', cueText: 'Dòng xe chậm thì giảm theo, không tăng tốc máy móc', speedHint: 'theo biển báo, độ bám, tầm nhìn và dòng xe' },
      { instruction: 'Chọn khoảng hở đủ cả phía trước lẫn phía sau sau khi xe mình nhập vào, xét tốc độ xe sau đang thu hẹp khoảng cách; không ép xe khác phanh gấp hoặc đánh lái tránh.', cueType: 'timing', cueText: 'Khe ba giây giữa hai xe không mặc nhiên đủ chỗ cho xe thứ ba' },
      { instruction: 'Kiểm tra lại gương và điểm mù bên trái ngay trước khi dịch ngang, chỉ liếc ngắn rồi nhìn lại phía trước; hoãn nhập nếu chưa chắc an toàn.', cueType: 'mirror', cueText: 'Quan sát trực tiếp bổ sung cho gương; cảnh báo điểm mù chỉ hỗ trợ' },
      { instruction: 'Giảm tốc sớm trong làn tăng tốc nếu chưa có khe an toàn; nếu buộc phải dừng để tránh va chạm, dừng trước cuối làn, không ép nhập hoặc chạy tiếp ra làn dừng khẩn cấp hay lề đường.', cueType: 'marker', cueText: 'Không chờ tới chỗ thu hẹp mới phanh; dừng chỉ là phương án cuối' },
      { instruction: 'Chuyển êm qua vạch đứt khi đủ điều kiện vào đúng làn sát bên phải, không cắt nhiều làn; nếu làn nhập tiếp tục thành làn chạy riêng thì giữ làn đó theo biển và vạch.', cueType: 'marker', cueText: 'Nhập một làn, không lao sang làn giữa hoặc làn trái', steeringHint: 'dịch ngang êm, không giật lái' },
      { instruction: 'Tắt xi-nhan sau khi xe đã ổn định trong làn, điều chỉnh tốc độ và giữ khoảng cách với xe trước theo biển báo, tốc độ và điều kiện đường.', cueType: 'timing', cueText: 'Tăng khoảng cách khi mưa, trơn hoặc tầm nhìn kém; chưa vội vượt' }
    ],
    mistakes: [
      'Tới cuối làn mới quan sát, rồi phanh gấp hoặc cố chen vì đã bật xi-nhan.',
      'Chỉ nhìn khe phía trước, bỏ sót xe sau đến nhanh hoặc lao ngang nhiều làn.',
      'Dùng làn dừng khẩn cấp làm phần kéo dài của làn tăng tốc.'
    ],
    recovery: 'Nếu khe đóng lại, giữ trong làn tăng tốc và giảm tốc sớm, quan sát xe sau; chỉ thử lại khi còn đủ đường để điều chỉnh tốc độ và đủ khoảng hở. Nếu buộc dừng trước cuối làn để tránh va chạm, không coi đó là chỗ chờ thông thường; không lùi, quay đầu hay chạy ra lề. Nếu bị kẹt, không đủ quãng tăng tốc để nhập lại an toàn hoặc xe gặp sự cố, bật đèn khẩn cấp khi dừng gây nguy hiểm và gọi đơn vị quản lý cao tốc hoặc Cảnh sát giao thông; không tự đi bộ trên cao tốc tìm trợ giúp.',
    safety: 'Phải nhường xe đang chạy trên cao tốc; xi-nhan không phải quyền nhập làn. Không có khe an toàn thì giảm tốc sớm trong làn tăng tốc, buộc phải dừng thì dừng trước cuối làn để tránh va chạm, không ép nhập; không dùng làn dừng khẩn cấp hoặc lề để tăng tốc, không lùi hay quay đầu. Nếu bị kẹt không thể nhập lại an toàn, báo hiệu nguy hiểm và gọi hỗ trợ. Khoảng hở phải đủ trước và sau theo tốc độ tương đối, không lấy khe ba giây giữa hai xe làm bảo đảm; giữ cự ly theo biển và quy định tương ứng tốc độ, tăng thêm khi điều kiện xấu.',
    mnemonic: { text: 'Nhường, nhìn, chỉnh tốc; đủ hở mới nhập.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Khi dòng xe cao tốc thay đổi tốc độ, bạn chuẩn bị nhập làn thế nào?', options: ['Luôn tăng tới tốc độ tối đa dù dòng xe đang ùn', 'Nhường xe trên cao tốc, chỉnh tốc độ gần dòng xe khi an toàn, trong giới hạn và điều kiện đường', 'Bật xi-nhan để xe trên làn chính bắt buộc nhường mình'], correctIndex: 1 },
      { prompt: 'Hai xe trên làn chính cách nhau ba giây; có đủ điều kiện để chen vào giữa không?', options: ['Có, ba giây luôn đủ cho một xe nữa', 'Chỉ cần đủ khoảng cách với xe phía trước', 'Chưa thể kết luận; cần đủ khoảng hở trước và sau khi nhập, xét tốc độ xe sau, không ép xe khác phanh gấp hoặc tránh'], correctIndex: 2 },
      { prompt: 'Chưa có khe an toàn và làn tăng tốc sắp kết thúc, bạn làm gì?', options: ['Giảm tốc sớm trong làn tăng tốc; nếu buộc dừng tránh va chạm thì dừng trước cuối làn, không ép nhập hay dùng lề; gọi hỗ trợ nếu bị kẹt', 'Tăng tốc tiếp trên làn dừng khẩn cấp để tìm khe', 'Ép vào làn chính vì xi-nhan đã bật'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ nhập làn cao tốc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thêm mốc khoảng trống ba giây và phương án khi hết làn tăng tốc.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Sửa nhường đường, khoảng hở trước sau và xử lý cuối làn; bỏ hướng dẫn chạy lề, thay hai sơ đồ nhập làn phải và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
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
