import type { DashboardLight, LightColor, Severity } from '../types'

/**
 * Tra cứu nhanh đèn cảnh báo táp-lô (mục 6 kế hoạch tính năng).
 * Mỗi đèn nêu ngay ba bước xử lý, điều không nên làm và mốc gọi cứu hộ.
 */
export const dashboardLights: DashboardLight[] = [
  {
    id: 'brake',
    icon: '(!)',
    name: 'Hệ thống phanh',
    english: 'Brake system',
    color: 'red',
    severity: 'critical',
    description: 'Phanh tay chưa nhả, dầu phanh thiếu hoặc hệ thống phanh có lỗi.',
    keywords: ['phanh', 'phanh tay', 'dầu phanh', 'brake', 'thắng'],
    actions: [
      'Nhả phanh tay và xem đèn có tắt không.',
      'Nếu đèn vẫn sáng, giảm tốc và tấp vào nơi an toàn.',
      'Đạp thử phanh nhẹ: pedal mềm hoặc hẫng thì dừng hẳn.'
    ],
    avoid: 'Không chạy tiếp trên đường đèo hoặc cao tốc khi đèn phanh đỏ còn sáng.',
    callHelp: 'Gọi cứu hộ ngay khi pedal hẫng, xe lệch khi phanh hoặc có mùi khét.'
  },
  {
    id: 'oil',
    icon: '◔',
    name: 'Áp suất dầu',
    english: 'Oil pressure',
    color: 'red',
    severity: 'critical',
    description: 'Áp suất dầu bôi trơn xuống thấp, động cơ có thể hỏng chỉ sau vài phút.',
    keywords: ['dầu', 'dầu nhớt', 'nhớt', 'áp suất dầu', 'oil', 'động cơ'],
    actions: [
      'Tấp vào lề an toàn và tắt máy ngay.',
      'Chờ máy nguội rồi kiểm tra que thăm dầu.',
      'Châm dầu đúng loại nếu thiếu, khởi động lại và xem đèn có tắt.'
    ],
    avoid: 'Không chạy tiếp dù chỉ vài ki-lô-mét khi đèn dầu còn sáng.',
    callHelp: 'Gọi cứu hộ nếu mức dầu bình thường mà đèn vẫn sáng, hoặc thấy dầu rò dưới gầm.'
  },
  {
    id: 'temperature',
    icon: '♨',
    name: 'Nhiệt độ động cơ',
    english: 'Coolant temperature',
    color: 'red',
    severity: 'critical',
    description: 'Nước làm mát quá nóng, động cơ có nguy cơ bó máy.',
    keywords: ['nhiệt độ', 'nước làm mát', 'quá nhiệt', 'coolant', 'nóng máy'],
    actions: [
      'Tắt điều hòa, bật quạt gió nóng để giải nhiệt và tấp vào lề.',
      'Tắt máy, mở nắp capo cho thoáng nhưng không mở nắp két nước.',
      'Chờ ít nhất 30 phút cho nguội rồi kiểm tra mức nước làm mát.'
    ],
    avoid: 'Không mở nắp két nước khi động cơ còn nóng, hơi nước sẽ phun ra gây bỏng.',
    callHelp: 'Gọi cứu hộ nếu nước làm mát cạn, có hơi trắng bốc lên hoặc đèn sáng lại sau khi châm nước.'
  },
  {
    id: 'transmission',
    icon: '⚙',
    name: 'Hộp số tự động',
    english: 'Transmission warning',
    color: 'red',
    severity: 'critical',
    description: 'Dầu hộp số quá nóng hoặc hộp số đang chuyển sang chế độ bảo vệ.',
    keywords: ['hộp số', 'số tự động', 'at', 'transmission', 'dầu hộp số'],
    actions: [
      'Giảm tốc, chuyển về lái nhẹ nhàng và tìm chỗ dừng an toàn.',
      'Dừng xe, để số P và cho máy chạy không tải khoảng 10 phút cho nguội.',
      'Đi tiếp chậm đến gara nếu đèn tắt; đèn sáng lại thì dừng hẳn.'
    ],
    avoid: 'Không kéo tải, leo dốc dài hoặc chạy tốc độ cao khi đèn hộp số đang sáng.',
    callHelp: 'Gọi cứu hộ nếu xe giật, mất lực kéo hoặc không vào được số.'
  },
  {
    id: 'battery',
    icon: '▭',
    name: 'Ắc quy và hệ thống sạc',
    english: 'Battery / charging',
    color: 'red',
    severity: 'warn',
    description: 'Máy phát không sạc cho ắc quy, xe chỉ còn chạy bằng điện dự trữ.',
    keywords: ['ắc quy', 'bình điện', 'sạc', 'máy phát', 'battery', 'điện'],
    actions: [
      'Tắt điều hòa, âm thanh và các thiết bị điện không cần thiết.',
      'Giữ máy nổ, đi thẳng đến gara gần nhất.',
      'Nếu đèn pha mờ dần hoặc vô-lăng nặng, tấp vào lề khi còn điện.'
    ],
    avoid: 'Không tắt máy ở nơi không thể khởi động lại hoặc giữa dòng xe đông.',
    callHelp: 'Gọi cứu hộ khi xe chết máy, có mùi khét từ khoang máy hoặc dây curoa đứt.'
  },
  {
    id: 'airbag',
    icon: '✹',
    name: 'Túi khí',
    english: 'Airbag / SRS',
    color: 'red',
    severity: 'warn',
    description: 'Hệ thống túi khí hoặc cảm biến lỗi, túi khí có thể không bung khi va chạm.',
    keywords: ['túi khí', 'srs', 'airbag', 'an toàn'],
    actions: [
      'Nhắc mọi người thắt dây an toàn và ngồi đúng tư thế.',
      'Lái chậm, giữ khoảng cách lớn hơn bình thường.',
      'Đặt lịch kiểm tra hệ thống SRS trong vài ngày tới.'
    ],
    avoid: 'Không tự tháo giắc, không để trẻ nhỏ ngồi ghế trước khi đèn túi khí đang lỗi.',
    callHelp: 'Vào gara sớm; gọi hỗ trợ ngay nếu đèn sáng sau một va chạm.'
  },
  {
    id: 'seatbelt',
    icon: '⛓',
    name: 'Dây an toàn',
    english: 'Seat belt reminder',
    color: 'red',
    severity: 'warn',
    description: 'Có người trên xe chưa cài dây an toàn hoặc khóa dây chưa ăn khớp.',
    keywords: ['dây an toàn', 'dây đai', 'seat belt', 'belt'],
    actions: [
      'Dừng hẳn xe ở nơi an toàn trước khi chỉnh dây.',
      'Cài lại dây cho từng người, nghe rõ tiếng khóa "tách".',
      'Kiểm tra đồ nặng đặt trên ghế vì cảm biến có thể nhận nhầm.'
    ],
    avoid: 'Không luồn dây sau lưng hay dùng chốt giả để tắt tiếng cảnh báo.',
    callHelp: 'Vào gara khi dây đã cài đúng mà đèn vẫn sáng — khóa dây có thể hỏng.'
  },
  {
    id: 'door',
    icon: '⊐',
    name: 'Cửa chưa đóng kín',
    english: 'Door ajar',
    color: 'red',
    severity: 'warn',
    description: 'Một cửa, cốp sau hoặc nắp capo chưa đóng chặt.',
    keywords: ['cửa', 'cốp', 'capo', 'door', 'chưa đóng'],
    actions: [
      'Giảm tốc và dừng ở nơi an toàn, không mở cửa giữa dòng xe.',
      'Đóng lại từng cửa, cốp và capo cho đến khi đèn tắt.',
      'Kiểm tra dây an toàn hoặc đồ vật kẹt ở mép cửa.'
    ],
    avoid: 'Không vừa chạy vừa với tay kéo cửa đang hé.',
    callHelp: 'Vào gara nếu đèn vẫn sáng khi mọi cửa đã đóng — công tắc cửa có thể hỏng.'
  },
  {
    id: 'engine',
    icon: '⌁',
    name: 'Động cơ',
    english: 'Check engine',
    color: 'amber',
    severity: 'warn',
    description: 'Động cơ hoặc hệ thống khí thải phát hiện bất thường.',
    keywords: ['động cơ', 'check engine', 'máy', 'khí thải', 'cá vàng'],
    actions: [
      'Đèn sáng liên tục: giảm tốc, đi chậm đến gara gần nhất.',
      'Đèn nhấp nháy: tấp vào lề an toàn và tắt máy.',
      'Ghi lại hiện tượng rung, hụt ga hoặc mùi lạ để báo thợ.'
    ],
    avoid: 'Không đạp ga mạnh hay chạy cao tốc khi đèn đang nhấp nháy.',
    callHelp: 'Gọi cứu hộ khi xe rung mạnh, mất lực kéo hoặc có mùi xăng sống.'
  },
  {
    id: 'abs',
    icon: '◉',
    name: 'ABS',
    english: 'Anti-lock braking',
    color: 'amber',
    severity: 'warn',
    description: 'Chống bó cứng phanh ngừng hoạt động; phanh thường vẫn còn nhưng dễ trượt bánh.',
    keywords: ['abs', 'phanh abs', 'bó cứng phanh', 'trượt bánh'],
    actions: [
      'Giảm tốc và tăng khoảng cách lên ít nhất 4 giây.',
      'Phanh sớm, đều chân, tránh phanh gấp trên đường trơn.',
      'Đặt lịch kiểm tra cảm biến ABS trong vài ngày tới.'
    ],
    avoid: 'Không thử phanh gấp để kiểm tra xem ABS còn hoạt động hay không.',
    callHelp: 'Vào gara sớm; gọi hỗ trợ nếu đèn ABS sáng cùng đèn phanh đỏ.'
  },
  {
    id: 'tpms',
    icon: '◎',
    name: 'Áp suất lốp',
    english: 'Tire pressure (TPMS)',
    color: 'amber',
    severity: 'warn',
    description: 'Một hoặc nhiều lốp non hơi so với mức khuyến nghị.',
    keywords: ['lốp', 'vỏ xe', 'áp suất lốp', 'tpms', 'non hơi', 'xịt lốp'],
    actions: [
      'Giảm tốc từ từ, tránh phanh gấp và tìm chỗ dừng bằng phẳng.',
      'Xem nhanh bốn lốp, tìm vết đinh, phồng hoặc rách.',
      'Bơm lại đúng áp suất ghi trên khung cửa phía lái.'
    ],
    avoid: 'Không chạy tốc độ cao trên cao tốc khi lốp đang non hơi.',
    callHelp: 'Gọi cứu hộ nếu lốp xẹp hẳn, phồng thành lốp hoặc xe bị kéo lệch lái.'
  },
  {
    id: 'eps',
    icon: '⊛',
    name: 'Trợ lực lái',
    english: 'EPS / Power steering',
    color: 'amber',
    severity: 'warn',
    description: 'Trợ lực lái điện bị lỗi, vô-lăng có thể nặng đột ngột.',
    keywords: ['trợ lực', 'vô lăng', 'lái nặng', 'eps', 'power steering'],
    actions: [
      'Giữ chắc vô-lăng bằng hai tay và giảm tốc.',
      'Thử tấp vào lề, tắt máy 30 giây rồi khởi động lại.',
      'Nếu vô-lăng vẫn nặng, chỉ đi chậm đoạn ngắn đến gara.'
    ],
    avoid: 'Không lái một tay hoặc chạy tốc độ cao khi trợ lực đang lỗi.',
    callHelp: 'Gọi cứu hộ nếu vô-lăng nặng bất thường hoặc trả lái không tự về.'
  },
  {
    id: 'esp-active',
    icon: '⚡',
    name: 'Cân bằng điện tử đang can thiệp',
    english: 'ESP / VSC active',
    color: 'amber',
    severity: 'info',
    description: 'Đèn nhấp nháy nghĩa là xe đang chống trượt, mặt đường trơn hoặc vào cua quá nhanh.',
    keywords: ['cân bằng điện tử', 'esp', 'vsc', 'chống trượt', 'trơn trượt'],
    actions: [
      'Nhả bớt ga, không đánh lái gấp.',
      'Giảm tốc về mức mà xe bám đường trở lại.',
      'Tăng khoảng cách và đi đều ga cho đến khi mặt đường tốt hơn.'
    ],
    avoid: 'Không đạp ga hoặc phanh gấp khi đèn đang nhấp nháy.',
    callHelp: 'Không cần cứu hộ nếu đèn chỉ nháy rồi tắt; đèn sáng liên tục thì đi kiểm tra.'
  },
  {
    id: 'esp-off',
    icon: '⊘',
    name: 'Cân bằng điện tử đã tắt',
    english: 'ESP / VSC off',
    color: 'amber',
    severity: 'warn',
    description: 'Hệ thống chống trượt đang tắt hoặc bị lỗi, xe dễ văng đuôi hơn.',
    keywords: ['esp off', 'tắt cân bằng', 'vsc off', 'chống trượt tắt'],
    actions: [
      'Kiểm tra nút ESP OFF trên táp-lô, bật lại nếu đã lỡ tắt.',
      'Giảm tốc, lái mượt, tránh cua gấp khi đường trơn.',
      'Nếu bật lại không được, đặt lịch kiểm tra sớm.'
    ],
    avoid: 'Không tắt cân bằng điện tử khi trời mưa hoặc đường trơn.',
    callHelp: 'Vào gara sớm khi đèn sáng cùng đèn ABS hoặc phanh.'
  },
  {
    id: 'immobilizer',
    icon: '⚿',
    name: 'Chìa khóa và chống trộm',
    english: 'Immobilizer / Key',
    color: 'amber',
    severity: 'warn',
    description: 'Xe không nhận chìa khóa thông minh hoặc hệ thống chống trộm đang khóa máy.',
    keywords: ['chìa khóa', 'smart key', 'chống trộm', 'immobilizer', 'remote'],
    actions: [
      'Đưa chìa khóa lại gần nút start hoặc chạm vào nút đề.',
      'Thay pin chìa khóa dự phòng nếu có.',
      'Tắt máy hoàn toàn, chờ 10 giây rồi khởi động lại.'
    ],
    avoid: 'Không rời xe khi máy đang nổ mà chìa khóa không được nhận.',
    callHelp: 'Gọi hỗ trợ hãng nếu xe không khởi động lại được sau vài lần thử.'
  },
  {
    id: 'dpf',
    icon: '☁',
    name: 'Lọc muội than (máy dầu)',
    english: 'Diesel particulate filter',
    color: 'amber',
    severity: 'warn',
    description: 'Bộ lọc muội than trên xe máy dầu đang đầy và cần được đốt sạch.',
    keywords: ['dpf', 'máy dầu', 'diesel', 'muội than', 'lọc khí thải'],
    actions: [
      'Chạy đều ga 15–20 phút ở tốc độ ngoài đô thị nếu an toàn.',
      'Tránh dừng máy liên tục trong quá trình xe tự làm sạch.',
      'Nếu đèn không tắt sau chuyến đi dài, hẹn gara xử lý.'
    ],
    avoid: 'Không tiếp tục chạy quãng ngắn liên tục trong phố khi đèn đang sáng.',
    callHelp: 'Vào gara khi đèn DPF sáng cùng đèn động cơ hoặc xe mất lực kéo.'
  },
  {
    id: 'glow-plug',
    icon: '϶',
    name: 'Sấy nóng buồng đốt (máy dầu)',
    english: 'Glow plug',
    color: 'amber',
    severity: 'info',
    description: 'Xe máy dầu đang sấy nóng buồng đốt trước khi khởi động.',
    keywords: ['sấy', 'glow plug', 'máy dầu', 'khởi động lạnh'],
    actions: [
      'Chờ đèn tắt rồi mới đề máy.',
      'Trời lạnh thì để máy chạy không tải thêm 30 giây.',
      'Nếu đèn nháy liên tục sau khi nổ máy, hẹn kiểm tra bugi sấy.'
    ],
    avoid: 'Không đề máy liên tục nhiều lần khi đèn sấy chưa tắt.',
    callHelp: 'Vào gara nếu xe khó nổ vào buổi sáng hoặc đèn nháy kéo dài.'
  },
  {
    id: 'service',
    icon: '⚒',
    name: 'Đến hạn bảo dưỡng',
    english: 'Service reminder',
    color: 'amber',
    severity: 'info',
    description: 'Xe đã tới mốc ki-lô-mét hoặc thời gian cần bảo dưỡng định kỳ.',
    keywords: ['bảo dưỡng', 'service', 'thay dầu', 'định kỳ', 'cờ lê'],
    actions: [
      'Ghi lại số ki-lô-mét hiện tại.',
      'Đặt lịch bảo dưỡng trong vài ngày tới.',
      'Kiểm tra nhanh dầu, nước làm mát và lốp trước chuyến đi dài.'
    ],
    avoid: 'Không bỏ qua nhiều kỳ bảo dưỡng liên tiếp rồi chạy đường dài.',
    callHelp: 'Không khẩn cấp; chỉ cần đặt lịch với gara quen.'
  },
  {
    id: 'fuel-low',
    icon: '⛽',
    name: 'Sắp hết nhiên liệu',
    english: 'Low fuel',
    color: 'amber',
    severity: 'info',
    description: 'Nhiên liệu còn ở mức dự trữ, thường đủ 40–70 km tùy xe.',
    keywords: ['xăng', 'nhiên liệu', 'hết xăng', 'fuel', 'dầu diesel'],
    actions: [
      'Tìm trạm xăng gần nhất trên bản đồ.',
      'Đi đều ga, tắt điều hòa nếu quãng đường còn xa.',
      'Trên cao tốc, ưu tiên ra trạm dừng gần nhất.'
    ],
    avoid: 'Không cố chạy tới cạn sạch — bơm xăng dễ hỏng khi chạy khô.',
    callHelp: 'Gọi cứu hộ nếu xe chết máy giữa đường vì hết nhiên liệu.'
  },
  {
    id: 'washer-fluid',
    icon: '⛆',
    name: 'Nước rửa kính',
    english: 'Washer fluid low',
    color: 'amber',
    severity: 'info',
    description: 'Bình nước rửa kính sắp cạn, tầm nhìn có thể giảm khi đường bụi.',
    keywords: ['nước rửa kính', 'gạt mưa', 'washer', 'kính lái'],
    actions: [
      'Châm thêm nước rửa kính khi dừng nghỉ.',
      'Kiểm tra lưỡi gạt mưa còn sạch và không bị rách.',
      'Giữ khoảng cách lớn hơn nếu kính đang bám bụi.'
    ],
    avoid: 'Không gạt khô lên kính bám bụi vì dễ tạo vệt xước và chói nắng.',
    callHelp: 'Không khẩn cấp; xử lý ở lần dừng gần nhất.'
  },
  {
    id: 'high-beam',
    icon: '≣',
    name: 'Đèn pha (chiếu xa)',
    english: 'High beam',
    color: 'green',
    severity: 'info',
    description: 'Đèn pha đang bật — rất dễ gây chói cho xe đối diện trong phố.',
    keywords: ['đèn pha', 'chiếu xa', 'high beam', 'đèn xanh'],
    actions: [
      'Chuyển về chiếu gần khi có xe ngược chiều hoặc trong khu dân cư.',
      'Chỉ dùng pha ở đường trường vắng, không đèn.',
      'Nháy pha ngắn thay vì bật liên tục để xin đường.'
    ],
    avoid: 'Không giữ đèn pha trong phố, hầm để xe hoặc khi bám đuôi xe khác.',
    callHelp: 'Không cần hỗ trợ; đây là đèn báo trạng thái.'
  },
  {
    id: 'fog-light',
    icon: '≋',
    name: 'Đèn sương mù',
    english: 'Fog light',
    color: 'green',
    severity: 'info',
    description: 'Đèn sương mù đang bật, hữu ích khi mưa lớn hoặc sương dày.',
    keywords: ['đèn sương mù', 'sương mù', 'fog', 'mưa'],
    actions: [
      'Bật khi tầm nhìn giảm dưới 100 mét.',
      'Tắt ngay khi trời quang để không làm chói xe sau.',
      'Kết hợp chiếu gần, không dùng chung với đèn pha.'
    ],
    avoid: 'Không để đèn sương mù sau bật suốt hành trình khi trời đã quang.',
    callHelp: 'Không cần hỗ trợ; đây là đèn báo trạng thái.'
  },
  {
    id: 'cruise',
    icon: '⊙',
    name: 'Ga tự động (Cruise control)',
    english: 'Cruise control',
    color: 'green',
    severity: 'info',
    description: 'Ga tự động đang bật hoặc đang giữ tốc độ đã cài.',
    keywords: ['cruise', 'ga tự động', 'giữ ga', 'cao tốc'],
    actions: [
      'Chỉ dùng trên cao tốc thoáng, mặt đường khô.',
      'Luôn đặt chân gần bàn đạp phanh để can thiệp ngay.',
      'Tắt ga tự động khi trời mưa, đường đông hoặc xuống đèo.'
    ],
    avoid: 'Không dùng ga tự động khi đường trơn, ngập nước hoặc kẹt xe.',
    callHelp: 'Không cần hỗ trợ; tắt hệ thống nếu xe không nhả ga như mong muốn.'
  },
  {
    id: 'lane-assist',
    icon: '⇅',
    name: 'Cảnh báo lệch làn',
    english: 'Lane departure warning',
    color: 'green',
    severity: 'info',
    description: 'Hệ thống giữ làn đang hoạt động và theo dõi vạch kẻ đường.',
    keywords: ['lệch làn', 'giữ làn', 'lane', 'vạch kẻ đường'],
    actions: [
      'Giữ xe giữa làn, đánh lái mượt.',
      'Bật xi-nhan trước mỗi lần chuyển làn để hệ thống không báo nhầm.',
      'Vẫn tự quan sát gương và điểm mù, không phụ thuộc cảm biến.'
    ],
    avoid: 'Không coi cảnh báo lệch làn là tính năng tự lái.',
    callHelp: 'Không cần hỗ trợ; đi kiểm tra nếu hệ thống báo sai liên tục.'
  }
]

const SEVERITY_RANK: Record<Severity, number> = { critical: 0, warn: 1, info: 2 }

/** Nhãn hiển thị theo mức độ: ưu tiên hành động, không dùng thuật ngữ kỹ thuật. */
export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: 'Khẩn cấp — dừng sớm',
  warn: 'Cảnh báo — hạn chế chạy xa',
  info: 'Theo dõi — đi tiếp thận trọng'
}

export const SEVERITY_SHORT_LABEL: Record<Severity, string> = {
  critical: 'Dừng xe',
  warn: 'Kiểm tra sớm',
  info: 'Theo dõi'
}

export const LIGHT_COLOR_LABEL: Record<LightColor, string> = {
  red: 'Đèn đỏ',
  amber: 'Đèn vàng',
  green: 'Đèn xanh'
}

/** Bỏ dấu tiếng Việt để tra cứu được cả khi gõ không dấu. */
export const normalizeKeyword = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()

const searchIndex = new Map(
  dashboardLights.map((light) => [
    light.id,
    normalizeKeyword([light.name, light.english, light.description, ...light.keywords].join(' '))
  ])
)

export interface LightFilter {
  query?: string
  severity?: Severity | 'all'
  color?: LightColor | 'all'
}

/**
 * Lọc đèn theo từ khóa, mức độ và màu; kết quả xếp theo mức nguy hiểm giảm dần
 * để tình huống khẩn cấp luôn nằm ở đầu lưới (mục 6.3).
 */
export const findLights = ({ query = '', severity = 'all', color = 'all' }: LightFilter = {}): DashboardLight[] => {
  const terms = normalizeKeyword(query).split(/\s+/).filter(Boolean)
  return dashboardLights
    .filter((light) => {
      if (severity !== 'all' && light.severity !== severity) return false
      if (color !== 'all' && light.color !== color) return false
      if (terms.length === 0) return true
      const haystack = searchIndex.get(light.id) ?? ''
      return terms.every((term) => haystack.includes(term))
    })
    .sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity])
}

export const getLightById = (id: string): DashboardLight | undefined =>
  dashboardLights.find((light) => light.id === id)
