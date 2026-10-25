import type { DashboardLight, LightColor, Severity } from '../types'

/**
 * Tra cứu nhanh đèn cảnh báo táp-lô (mục 6 kế hoạch tính năng).
 * Mỗi đèn nêu ngay ba bước xử lý, điều không nên làm và mốc gọi cứu hộ.
 */
export const dashboardLights: DashboardLight[] = [
  {
    id: 'brake',
    icon: 'brake',
    name: 'Hệ thống phanh',
    english: 'Brake system',
    color: 'red',
    severity: 'critical',
    description: 'Đèn phanh đỏ có thể báo phanh đỗ đang giữ, thiếu dầu phanh hoặc lỗi hệ thống. Nếu vẫn sáng sau khi nhả phanh đỗ, không coi phanh còn an toàn.',
    keywords: ['phanh', 'phanh tay', 'dầu phanh', 'brake', 'thắng'],
    actions: [
      'Nếu đang chạy, giảm ga, giữ lái và dùng phanh còn hiệu lực để dừng ở nơi an toàn.',
      'Khi xe đã dừng, kiểm tra phanh đỗ đã nhả hoàn toàn; đọc thông báo trên xe.',
      'Đèn vẫn sáng hoặc kèm ABS: không đi tiếp; gọi hỗ trợ kiểm tra dầu, rò rỉ và hệ thống phanh.'
    ],
    avoid: 'Không chạy thử để kiểm tra phanh, không chỉ châm dầu rồi coi đã sửa xong lỗi.',
    callHelp: 'Gọi cứu hộ nếu đèn còn sáng khi phanh đỗ đã nhả, kèm ABS, pedal mềm/hẫng, rò dầu hoặc phanh yếu.'
  },
  {
    id: 'oil',
    icon: 'oil',
    name: 'Áp suất dầu',
    english: 'Oil pressure',
    color: 'red',
    severity: 'critical',
    description: 'Đèn bình dầu đỏ khi động cơ đang chạy báo nguy cơ mất áp suất bôi trơn. Không phải đèn nhắc thay dầu hay chỉ báo mức dầu; động cơ có thể hỏng rất nhanh.',
    keywords: ['dầu', 'dầu nhớt', 'nhớt', 'áp suất dầu', 'oil', 'động cơ'],
    actions: [
      'Dừng ở nơi an toàn và tắt động cơ ngay khi có thể.',
      'Trên nền phẳng, chờ theo sổ tay rồi kiểm tra mức dầu bằng que thăm hoặc hệ thống điện tử.',
      'Nếu thiếu, bổ sung đúng loại và không quá mức; chỉ khởi động lại khi sổ tay cho phép. Không rõ nguyên nhân thì gọi hỗ trợ.'
    ],
    avoid: 'Không chạy tiếp hoặc đề máy nhiều lần để thử; mức dầu đủ không chứng minh áp suất dầu bình thường.',
    callHelp: 'Gọi cứu hộ nếu mức dầu đủ mà đã báo áp suất, có tiếng gõ/rò dầu, không có dầu đúng loại hoặc cảnh báo không hết.'
  },
  {
    id: 'temperature',
    icon: 'temperature',
    name: 'Nhiệt độ động cơ',
    english: 'Coolant temperature',
    color: 'red',
    severity: 'critical',
    description: 'Nhiệt kế đỏ trên sóng nước báo nước làm mát/động cơ quá nóng. Một số xe có cùng hình màu xanh dương lúc máy lạnh; đó không phải cảnh báo quá nhiệt.',
    keywords: ['nhiệt độ', 'nước làm mát', 'quá nhiệt', 'coolant', 'nóng máy'],
    actions: [
      'Tắt điều hòa, giảm tải và dừng an toàn; không cố chạy để làm mát.',
      'Làm theo thông báo/sổ tay về tắt máy; có hơi nước, rò rỉ hoặc tiếng bất thường thì tắt động cơ và tránh xa hơi nóng.',
      'Chỉ kiểm tra bình nước khi máy đã nguội hoàn toàn theo sổ tay; không có thời gian chờ cố định bảo đảm an toàn.'
    ],
    avoid: 'Không mở nắp két nước/bình chịu áp khi nóng, không mở capo lúc hơi nước đang phun; tránh quạt có thể tự quay.',
    callHelp: 'Gọi cứu hộ khi có hơi nước, rò nước, bình cạn hoặc cảnh báo tái diễn; không châm nước rồi tiếp tục chạy khi chưa rõ nguyên nhân.'
  },
  {
    id: 'transmission',
    icon: 'transmission',
    name: 'Hộp số tự động',
    english: 'Transmission warning',
    color: 'red',
    severity: 'critical',
    description: 'Bánh răng có dấu chấm than là một mẫu cảnh báo lỗi hộp số; xe khác dùng AT, nhiệt kế hoặc thông báo. Có thể là quá nhiệt hoặc lỗi truyền động, không thể chẩn đoán chỉ từ hình.',
    keywords: ['hộp số', 'số tự động', 'at', 'transmission', 'dầu hộp số'],
    actions: [
      'Giảm tải, tránh tăng ga và tìm nơi dừng an toàn; chỉ về P khi xe đã dừng hẳn.',
      'Đọc đúng thông báo: có xe yêu cầu giữ máy chạy ở P để làm mát, xe khác yêu cầu tắt máy. Tuân thủ sổ tay, không tự đặt thời gian chờ.',
      'Chỉ đi tiếp khi xe xác nhận đã nguội/cho phép và vận hành bình thường; không rõ hoặc cảnh báo còn thì gọi hỗ trợ.'
    ],
    avoid: 'Không rà ga giữ xe trên dốc, ép vào số hay áp dụng cách làm mát của xe khác; khói/mùi cháy thì tắt máy khi đã dừng an toàn.',
    callHelp: 'Gọi cứu hộ nếu giật mạnh, mất lực kéo, không vào số, có khói/mùi cháy hoặc cảnh báo không hết.'
  },
  {
    id: 'battery',
    icon: 'battery',
    name: 'Ắc quy và hệ thống sạc',
    english: 'Battery / charging',
    color: 'red',
    severity: 'critical',
    description: 'Bình điện có dấu +/− báo lỗi hệ thống sạc 12 V khi máy đang chạy hoặc xe ở READY, không nhất thiết hỏng ắc quy. Xe xăng có thể lỗi máy phát/dây đai; xe điện có thể lỗi bộ DC-DC.',
    keywords: ['ắc quy', 'bình điện', 'sạc', 'máy phát', 'battery', 'điện'],
    actions: [
      'Giảm tải điện không thiết yếu nhưng giữ đèn, gạt mưa và thiết bị cần cho an toàn.',
      'Tìm nơi dừng an toàn sớm; điện có thể hết bất ngờ, không có quãng đường đến gara được bảo đảm.',
      'Khi đã dừng, đọc sổ tay và gọi hỗ trợ; có quá nhiệt, mất trợ lực hoặc mùi cháy thì tắt xe và không khởi động lại.'
    ],
    avoid: 'Không tháo cọc ắc quy khi máy đang chạy để thử máy phát, không kiểm tra dây đai gần bộ phận đang quay.',
    callHelp: 'Gọi hỗ trợ sau khi dừng; cần cứu hộ nếu đèn vẫn sáng, xe yếu điện/chết máy, quá nhiệt hoặc mất trợ lực.'
  },
  {
    id: 'airbag',
    icon: 'airbag',
    name: 'Túi khí',
    english: 'Airbag / SRS',
    color: 'red',
    severity: 'warn',
    description: 'Đèn người ngồi trước túi khí sáng dai dẳng hoặc không sáng tự kiểm tra có thể báo lỗi SRS, gồm túi khí và bộ căng đai. Không nhầm với đèn PASSENGER AIRBAG OFF riêng.',
    keywords: ['túi khí', 'srs', 'airbag', 'an toàn'],
    actions: [
      'Mọi người cài dây an toàn đúng cách và ngồi đúng tư thế; không đặt trẻ nhỏ trước túi khí đang hoạt động.',
      'Nếu đèn không tắt sau tự kiểm tra hoặc sáng khi chạy, liên hệ xưởng để kiểm tra sớm nhất có thể.',
      'Sau va chạm, đai/túi khí đã kích hoạt hoặc có hư hỏng: dừng an toàn và gọi hỗ trợ trước khi đi tiếp.'
    ],
    avoid: 'Không tự tháo giắc SRS, đo điện vào mạch túi khí hay coi dây an toàn là thay thế đầy đủ cho SRS.',
    callHelp: 'Kiểm tra SRS ngay khi có thể; gọi cứu hộ sau va chạm hoặc khi không thể bảo đảm an toàn cho người ngồi.'
  },
  {
    id: 'seatbelt',
    icon: 'seatbelt',
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
    icon: 'door',
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
    icon: 'engine',
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
    icon: 'abs',
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
    icon: 'tpms',
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
    icon: 'eps',
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
    icon: 'esp-active',
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
    icon: 'esp-off',
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
    icon: 'immobilizer',
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
    icon: 'dpf',
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
    icon: 'glow-plug',
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
    icon: 'service',
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
    icon: 'fuel-low',
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
    icon: 'washer-fluid',
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
    icon: 'high-beam',
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
    icon: 'fog-light',
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
    icon: 'cruise',
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
    icon: 'lane-assist',
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
  green: 'Đèn xanh lá',
  blue: 'Đèn xanh dương'
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
