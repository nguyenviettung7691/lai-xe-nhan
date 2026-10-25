import type { DashboardLight, LightColor, Severity } from '../types'

/**
 * Tra cứu nhanh đèn cảnh báo táp-lô (mục 6 kế hoạch tính năng).
 * Mỗi đèn nêu ngay ba bước xử lý, điều không nên làm và mốc gọi cứu hộ.
 */
export const dashboardLights: DashboardLight[] = [
  {
    id: 'hazard',
    icon: 'hazard',
    name: 'Đèn cảnh báo nguy hiểm',
    english: 'Hazard warning lights',
    color: 'red',
    severity: 'info',
    description: 'Tam giác kép đỏ minh họa ký hiệu nút hazard, không phải đèn báo lỗi chung tam giác có chấm than. Trên táp-lô thường là hai mũi tên xanh cùng nháy, có xe thêm đèn ở nút.',
    keywords: ['hazard', 'đèn khẩn cấp', 'đèn ưu tiên', 'đèn cảnh báo nguy hiểm', 'tam giác', 'hai xi nhan'],
    actions: [
      'Khi xe hỏng/dừng gây nguy hiểm, bật hazard theo tình huống và quy định để cảnh báo xe khác.',
      'Ưu tiên đưa xe tới vị trí an toàn nếu còn kiểm soát được; hazard không làm nơi dừng trở nên an toàn.',
      'Gọi hỗ trợ nếu cần, rời vùng nguy hiểm theo điều kiện thực tế; tắt hazard khi nguy hiểm đã hết.'
    ],
    avoid: 'Không dùng hazard để xin đi thẳng, giành ưu tiên, đỗ tùy tiện hoặc thay đèn chiếu sáng khi mưa/sương.',
    callHelp: 'Chỉ đang bật hazard không có nghĩa xe bị lỗi; gọi cứu hộ khi nguyên nhân là hỏng xe hoặc không thể tiếp tục an toàn.'
  },
  {
    id: 'turn-signal',
    icon: 'turn-signal',
    name: 'Xi-nhan / báo rẽ',
    english: 'Turn indicators',
    color: 'green',
    severity: 'info',
    description: 'Mũi tên trái hoặc phải xanh lá nháy theo hướng báo rẽ; hình minh họa thể hiện cả hai hướng có thể có. Cả hai cùng nháy thường là đèn cảnh báo nguy hiểm, không phải xin đi thẳng.',
    keywords: ['xi nhan', 'xi-nhan', 'xinhan', 'báo rẽ', 'turn signal', 'indicator', 'mũi tên'],
    actions: [
      'Quan sát gương/điểm mù, báo hướng kịp thời trước khi chuyển hướng hoặc chuyển làn.',
      'Chỉ thực hiện khi có khoảng trống an toàn và đúng quy định; xi-nhan không tạo quyền ưu tiên.',
      'Sau thao tác, kiểm tra đã tắt; nháy nhanh, không nháy hoặc không sáng cần kiểm tra đèn ngoài xe khi đã dừng.'
    ],
    avoid: 'Không chỉ dựa vào tiếng tách để tin đèn ngoài hoạt động, không dùng hai xi-nhan làm tín hiệu đi thẳng qua giao lộ.',
    callHelp: 'Nháy đúng theo thao tác không cần cứu hộ; lỗi nháy/đèn ngoài cần sửa sớm, không chuyển hướng khi không thể báo hiệu an toàn.'
  },
  {
    id: 'rear-fog',
    icon: 'rear-fog',
    name: 'Đèn sương mù sau',
    english: 'Rear fog light',
    color: 'amber',
    severity: 'info',
    description: 'Đèn vàng có tia ngang bên phải cắt qua vạch lượn đứng báo sương mù sau, khác đèn trước xanh lá hướng trái. Đèn sau rất sáng để xe khác nhận ra xe mình, không giúp soi đường phía trước.',
    keywords: ['sương mù sau', 'đèn hậu sương mù', 'rear fog', 'fog'],
    actions: [
      'Chỉ bật khi tầm nhìn giảm nghiêm trọng và quy định/điều kiện cho phép.',
      'Vẫn dùng chiếu gần và giảm tốc phù hợp; đèn sau không làm tăng quãng nhìn phía trước.',
      'Tắt khi tầm nhìn cải thiện để không gây chói xe sau; kiểm tra riêng đèn báo trước và sau.'
    ],
    avoid: 'Không bật trong thời tiết quang chỉ để xe nổi bật, không nhầm là đèn cảnh báo lỗi vì có màu vàng.',
    callHelp: 'Bật bình thường không cần hỗ trợ; không tắt được hoặc đèn không hoạt động cần sửa, dừng an toàn nếu tầm nhìn quá kém.'
  },
  {
    id: 'position-light',
    icon: 'position-light',
    name: 'Đèn vị trí / báo bật đèn',
    english: 'Position / sidelights / lights on',
    color: 'green',
    severity: 'info',
    description: 'Hai đèn đối xứng chiếu ra hai bên thường báo đèn vị trí hoặc bật đèn chung. Không xác nhận riêng chiếu gần hay đủ ánh sáng để lái ban đêm.',
    keywords: ['đèn vị trí', 'đèn định vị', 'đèn kích thước', 'đèn đờ mi', 'position', 'sidelights', 'lights on'],
    actions: [
      'Xem vị trí công tắc và kiểm tra đèn thực tế, không chỉ nhìn biểu tượng xanh.',
      'Khi cần nhìn đường trong tối, bật chiếu gần đúng quy định; đèn vị trí/DRL không đủ thay thế.',
      'Sau khi đỗ, chọn chế độ đèn đúng sổ tay để tránh hết ắc quy; lưu ý nơi cần để đèn vị trí khi đỗ.'
    ],
    avoid: 'Không đi trong tối chỉ bằng đèn vị trí, không mặc định đèn chạy ban ngày luôn bật cả đèn sau.',
    callHelp: 'Không cần hỗ trợ nếu bình thường; đèn ngoài xe không hoạt động cần sửa, không đi tiếp trong điều kiện thiếu sáng.'
  },
  {
    id: 'low-beam',
    icon: 'low-beam',
    name: 'Đèn chiếu gần',
    english: 'Low beam / dipped headlights',
    color: 'green',
    severity: 'info',
    description: 'Đèn xanh lá với tia chúc xuống bên trái báo chiếu gần; không có vạch lượn sương mù. Một số xe chỉ có đèn báo bật đèn chung, không có biểu tượng riêng.',
    keywords: ['chiếu gần', 'đèn cốt', 'cos', 'low beam', 'dipped'],
    actions: [
      'Dùng chiếu gần khi trời tối, vào hầm hoặc điều kiện/quy định yêu cầu bật đèn.',
      'Kiểm tra ánh sáng thực tế và đèn sau; đèn chạy ban ngày DRL không thay thế đèn chiếu gần.',
      'Nếu không thấy rõ, giảm tốc và dừng an toàn để kiểm tra; chỉnh tầm chiếu theo tải và sổ tay.'
    ],
    avoid: 'Không dựa chỉ vào màn hình táp-lô sáng hoặc AUTO để cho rằng đủ đèn, không chỉnh đèn gây chói.',
    callHelp: 'Báo bật đèn bình thường không cần hỗ trợ; sửa đèn hỏng trước khi đi trong tối, gọi hỗ trợ nếu không thể bảo đảm tầm nhìn.'
  },
  {
    id: 'epb',
    icon: 'epb',
    name: 'Lỗi phanh đỗ điện tử',
    english: 'Electronic parking brake fault',
    color: 'amber',
    severity: 'warn',
    description: 'EPB vàng hoặc P có cờ lê tùy xe báo lỗi phanh đỗ điện tử; khác đèn P đỏ chỉ đang giữ. Đèn P nháy cũng có thể báo phanh chưa giữ/nhả hoàn toàn.',
    keywords: ['epb', 'phanh tay điện tử', 'phanh đỗ điện tử', 'parking brake fault'],
    actions: [
      'Dừng tại nơi bằng phẳng an toàn, giữ phanh chân và đọc thông báo.',
      'Chọn P khi đã dừng (xe số tự động); bảo đảm xe không trôi, không dựa vào EPB đang lỗi.',
      'Liên hệ hỗ trợ, chỉ nhả khẩn cấp theo sổ tay/người có chuyên môn; không đi tiếp nếu phanh bó hoặc xe không giữ được.'
    ],
    avoid: 'Không tăng ga để thắng phanh đang bó, không tự chui dưới xe hoặc tháo cơ cấu EPB.',
    callHelp: 'Cần xưởng kiểm tra sớm; cứu hộ nếu không nhả/giữ được xe, có phanh đỏ hoặc phanh hoạt động bất thường.'
  },
  {
    id: 'parking-brake',
    icon: 'parking-brake',
    name: 'Phanh đỗ đang giữ',
    english: 'Parking brake applied',
    color: 'red',
    severity: 'info',
    description: 'Chữ P trong vòng tròn có ngoặc báo phanh đỗ đang giữ; một số xe dùng chung đèn phanh (!). Đỏ lúc đỗ có thể là bình thường, nhưng còn sáng khi đã nhả cần xử lý.',
    keywords: ['phanh đỗ', 'phanh tay', 'parking brake', 'chữ p'],
    actions: [
      'Trước khi khởi hành, giữ phanh chân và nhả phanh đỗ theo sổ tay.',
      'Xác nhận đèn tắt và xe không bị ghì; không tăng ga cưỡng ép khi phanh chưa nhả.',
      'Nếu còn sáng/nháy hoặc không nhả được, dừng an toàn, giữ xe chắc và đọc thông báo, gọi hỗ trợ.'
    ],
    avoid: 'Không coi đèn P là đèn vị trí số P hoặc dùng thao tác phanh đỗ khẩn cấp không đúng sổ tay.',
    callHelp: 'Đèn sáng khi đang đỗ thường không cần cứu hộ; không nhả/không giữ được phanh hoặc cảnh báo khi chạy cần hỗ trợ.'
  },
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
    description: 'Đèn người có đai chéo nhắc có vị trí ghế chưa cài dây, có thể kèm còi và sơ đồ từng ghế. Đồ vật trên ghế hoặc cảm biến/khóa lỗi cũng có thể gây báo.',
    keywords: ['dây an toàn', 'dây đai', 'seat belt', 'belt'],
    actions: [
      'Trước khi chạy, kiểm tra mọi người đã cài dây; đang chạy thì dừng an toàn trước khi chỉnh.',
      'Đai ngang ôm thấp qua hông, đai chéo qua vai/ngực, không xoắn; trẻ nhỏ dùng ghế phù hợp và hướng dẫn xe.',
      'Nếu vẫn báo, kiểm tra đúng khóa ghế và đồ trên ghế; khóa không giữ chắc thì không dùng vị trí đó.'
    ],
    avoid: 'Không luồn dây sau lưng/dưới nách, dùng chốt giả hoặc cho hai người dùng chung một dây.',
    callHelp: 'Sửa ngay khi khóa/đai không giữ hoặc không thu hồi; đèn còn báo dù cài đúng cần kiểm tra cảm biến, không vô hiệu hóa cảnh báo.'
  },
  {
    id: 'door',
    icon: 'door',
    name: 'Cửa chưa đóng kín',
    english: 'Door ajar',
    color: 'red',
    severity: 'warn',
    description: 'Hình xe với cửa mở báo cửa chưa chốt; cốp hoặc capo có thể có hình riêng trên từng xe. Đọc vị trí trên màn hình, không mặc định mọi nắp đã được cảm biến theo dõi.',
    keywords: ['cửa', 'cốp', 'capo', 'door', 'chưa đóng'],
    actions: [
      'Giảm tốc và dừng ở nơi an toàn trước khi kiểm tra; quan sát xe/người bên ngoài trước khi mở cửa.',
      'Kiểm tra cửa được báo và các chốt cốp/capo theo sổ tay, bỏ đồ hoặc dây bị kẹt rồi đóng đúng cách.',
      'Xác nhận chốt đã giữ chắc và đèn tắt; không đi tiếp nếu cửa, cốp hay capo không khóa chắc.'
    ],
    avoid: 'Không vừa chạy vừa với tay kéo cửa, không chỉ tắt cảnh báo hoặc dùng dây buộc thay cho chốt an toàn.',
    callHelp: 'Gọi hỗ trợ nếu không chốt chắc được; nếu chốt đều chắc nhưng đèn còn sáng, cần kiểm tra cảm biến và chốt tại xưởng.'
  },
  {
    id: 'engine',
    icon: 'engine',
    name: 'Động cơ',
    english: 'Check engine',
    color: 'amber',
    severity: 'warn',
    description: 'Hình khối động cơ vàng (MIL) báo lỗi quản lý động cơ/khí thải. Sáng liên tục và nhấp nháy có cách xử lý khác nhau; nhấp nháy thường có nguy cơ hỏng bộ xúc tác do bỏ máy.',
    keywords: ['động cơ', 'check engine', 'máy', 'khí thải', 'cá vàng'],
    actions: [
      'Đèn sáng liên tục, xe vẫn bình thường và sổ tay cho phép: giảm tải, liên hệ xưởng để kiểm tra sớm.',
      'Đèn nhấp nháy, rung mạnh, mất công suất, quá nhiệt hoặc mùi xăng: dừng an toàn, tắt máy và gọi hỗ trợ.',
      'Ghi lại thông báo và hiện tượng; nếu có nắp bình nhiên liệu, chỉ kiểm tra đóng đúng lúc xe đã dừng.'
    ],
    avoid: 'Không đạp ga mạnh để thử, xóa lỗi/ngắt ắc quy để che đèn, hoặc tiếp tục chạy khi đèn nháy.',
    callHelp: 'Gọi cứu hộ khi đèn nháy hoặc xe vận hành bất thường; sáng liên tục không triệu chứng vẫn cần chẩn đoán, không chỉ đoán do nắp xăng.'
  },
  {
    id: 'abs',
    icon: 'abs',
    name: 'ABS',
    english: 'Anti-lock braking',
    color: 'amber',
    severity: 'warn',
    description: 'ABS vàng sáng sau tự kiểm tra báo lỗi chống bó cứng. Nếu chỉ đèn ABS, phanh cơ bản thường vẫn còn nhưng không có bảo đảm ABS/ESC hoạt động; kèm phanh đỏ có thể lỗi phân phối lực phanh.',
    keywords: ['abs', 'phanh abs', 'bó cứng phanh', 'trượt bánh'],
    actions: [
      'Giảm tốc và tăng khoảng cách theo độ bám, tầm nhìn; không thử phanh gấp để kiểm tra.',
      'Chỉ ABS sáng, pedal bình thường và sổ tay cho phép: phanh sớm, lái thận trọng đến nơi kiểm tra gần.',
      'Kèm phanh đỏ, pedal bất thường hoặc phanh yếu: dừng an toàn và gọi cứu hộ, không đi tiếp.'
    ],
    avoid: 'Không mặc định chỉ hỏng cảm biến; tránh tốc độ cao và thao tác gấp, nhưng vẫn phanh khẩn cấp khi cần tránh va chạm.',
    callHelp: 'Kiểm tra ABS sớm; cần cứu hộ nếu kèm phanh đỏ hoặc hiệu lực phanh giảm. Mất phanh là khẩn cấp dù không có đèn.'
  },
  {
    id: 'tpms',
    icon: 'tpms',
    name: 'Áp suất lốp',
    english: 'Tire pressure (TPMS)',
    color: 'amber',
    severity: 'warn',
    description: 'Hình tiết diện lốp có dấu chấm than: sáng liên tục thường báo áp suất thấp; nháy rồi sáng liên tục thường là lỗi TPMS. Hệ thống không thay việc kiểm tra lốp và không luôn báo kịp thủng đột ngột.',
    keywords: ['lốp', 'vỏ xe', 'áp suất lốp', 'tpms', 'non hơi', 'xịt lốp'],
    actions: [
      'Giảm tốc từ từ, giữ lái và dừng an toàn; không phanh/đánh lái đột ngột khi nghi xẹp lốp.',
      'Kiểm tra hư hỏng và đo áp suất các lốp; lốp xẹp, rách hay phồng thì không tiếp tục chạy.',
      'Bơm theo nhãn xe cho lốp nguội và tải thực tế; nếu lốp nóng, không xả về trị số nguội. Reset/học lại chỉ theo sổ tay sau khi xử lý.'
    ],
    avoid: 'Không dùng áp suất tối đa trên hông lốp thay nhãn xe, không reset để che cảnh báo hoặc tin lốp đủ hơi chỉ vì đèn tắt.',
    callHelp: 'Gọi cứu hộ nếu lốp xẹp/hỏng hoặc xe mất ổn định; TPMS nháy rồi sáng dù áp suất đúng cần kiểm tra hệ thống sớm.'
  },
  {
    id: 'eps',
    icon: 'eps',
    name: 'Trợ lực lái',
    english: 'EPS / Power steering',
    color: 'amber',
    severity: 'warn',
    description: 'Vô-lăng kèm dấu chấm than hoặc chữ EPS/MDPS báo lỗi trợ lực; có xe dùng màu đỏ. Lực lái có thể thay đổi đột ngột, không phải cảnh báo nhắc giữ vô-lăng của hỗ trợ làn.',
    keywords: ['trợ lực', 'vô lăng', 'lái nặng', 'eps', 'power steering'],
    actions: [
      'Giữ vô-lăng bằng hai tay, giảm tốc êm và tìm nơi dừng an toàn.',
      'Nếu vô-lăng nặng, giật, khó giữ hướng hoặc đèn đỏ: không đi tiếp, gọi cứu hộ.',
      'Khi đã dừng, đọc sổ tay và liên hệ xưởng; chỉ khởi động lại nếu được hướng dẫn, đèn tắt không chứng minh đã sửa lỗi.'
    ],
    avoid: 'Không tắt nguồn khi xe còn chạy, không giữ lái sát hết hành trình hoặc cố lái đến gara khi không kiểm soát chắc.',
    callHelp: 'Gọi cứu hộ khi lực lái bất thường, có đèn đỏ hoặc không giữ được hướng; đèn vàng còn sáng dù lái bình thường vẫn cần kiểm tra sớm.'
  },
  {
    id: 'esp-active',
    icon: 'esp-active',
    name: 'Cân bằng điện tử / chống trượt',
    english: 'ESP / VSC active',
    color: 'amber',
    severity: 'info',
    description: 'Hình xe với vệt trượt (ESC/ESP/VSC/TCS): nhấp nháy thường là đang can thiệp giữ độ bám; sáng liên tục sau tự kiểm tra thường là lỗi hoặc hệ thống không khả dụng, cần đọc thông báo.',
    keywords: ['cân bằng điện tử', 'esp', 'vsc', 'chống trượt', 'trơn trượt'],
    actions: [
      'Khi đèn nháy, giảm ga êm, giữ hướng và tránh thao tác đột ngột.',
      'Giảm tốc phù hợp mặt đường, tăng khoảng cách; vẫn phanh khẩn cấp khi cần tránh va chạm.',
      'Đèn sáng liên tục: coi hỗ trợ có thể không hoạt động và kiểm tra sớm; kèm phanh đỏ hoặc mất kiểm soát thì dừng và gọi hỗ trợ.'
    ],
    avoid: 'Không tăng tốc để thử độ bám, không coi ESC có thể vượt giới hạn bám đường hoặc thay việc giảm tốc.',
    callHelp: 'Nháy ngắn rồi tắt thường không cần cứu hộ; sáng dai dẳng cần xưởng kiểm tra, mất ổn định/phanh yếu cần dừng và cứu hộ.'
  },
  {
    id: 'esp-off',
    icon: 'esp-off',
    name: 'Cân bằng điện tử đã tắt',
    english: 'ESP / VSC off',
    color: 'amber',
    severity: 'warn',
    description: 'Hình xe trượt kèm OFF báo một phần hoặc toàn bộ ESC/chống trượt đã tắt tùy xe/chế độ. Riêng chữ OFF không chứng minh hệ thống bị lỗi.',
    keywords: ['esp off', 'tắt cân bằng', 'vsc off', 'chống trượt tắt'],
    actions: [
      'Giảm tốc và giữ khoảng cách vì hỗ trợ chống trượt có thể bị hạn chế.',
      'Khi dừng an toàn, kiểm tra chế độ lái/nút ESC OFF; bật lại theo sổ tay nếu không còn lý do đặc biệt phải tắt.',
      'Nếu không bật lại được hoặc có cảnh báo khác, đọc thông báo và kiểm tra tại xưởng; kèm phanh đỏ thì không đi tiếp.'
    ],
    avoid: 'Không tắt ESC khi chạy đường thông thường để thử trượt; thao tác thoát lầy chỉ theo sổ tay và bật lại ngay khi thoát.',
    callHelp: 'Không cần cứu hộ chỉ vì đã chủ động tắt; cần xưởng khi không bật lại được, cứu hộ khi kèm phanh đỏ hoặc xe không kiểm soát được.'
  },
  {
    id: 'immobilizer',
    icon: 'immobilizer',
    name: 'Chìa khóa và chống trộm',
    english: 'Immobilizer / Key',
    color: 'amber',
    severity: 'warn',
    description: 'Hình chìa khóa/xe có chìa báo nhận dạng chìa hoặc chống trộm; đèn đỏ nháy khi xe đã khóa có thể hoàn toàn bình thường. Đèn vàng, thông báo không thấy chìa hoặc không đề được cần đối chiếu sổ tay.',
    keywords: ['chìa khóa', 'smart key', 'chống trộm', 'immobilizer', 'remote'],
    actions: [
      'Dừng/đỗ an toàn, kiểm tra chìa đúng đang ở trong xe và đọc thông báo; không tắt máy giữa dòng xe để thử.',
      'Thử chìa dự phòng hoặc thay pin chìa đúng loại; tránh để chìa sát thiết bị có thể gây nhiễu.',
      'Nếu pin chìa yếu, chỉ dùng quy trình khởi động dự phòng đúng sổ tay; vị trí nhận chìa khác nhau, không phải xe nào cũng chạm nút Start.'
    ],
    avoid: 'Không rời xe khi xe còn hoạt động, không cố đề liên tục hay tìm cách vô hiệu hóa chống trộm.',
    callHelp: 'Gọi hỗ trợ hãng khi xe không nhận cả chìa dự phòng hoặc không khởi động được; nháy chống trộm bình thường lúc đỗ không cần cứu hộ.'
  },
  {
    id: 'dpf',
    icon: 'dpf',
    name: 'Lọc muội than (máy dầu)',
    english: 'Diesel particulate filter',
    color: 'amber',
    severity: 'warn',
    description: 'Hình bộ lọc có chấm muội báo DPF cần xử lý/tái sinh hoặc có lỗi. Đèn nháy, thông báo kiểm tra khí thải hay kèm MIL có thể cần xưởng, không phải cứ chạy nhanh là sạch.',
    keywords: ['dpf', 'máy dầu', 'diesel', 'muội than', 'lọc khí thải'],
    actions: [
      'Đọc sổ tay và thông báo: chỉ thực hiện chuyến tái sinh khi xe cho phép, không có lỗi kèm và có tuyến đường phù hợp.',
      'Tuân thủ đúng điều kiện tốc độ, số, vòng tua và thời gian của mẫu xe, trong giới hạn pháp luật; không có cách chạy chung cho mọi xe.',
      'Nếu đèn nháy, có MIL, giảm công suất hoặc tái sinh không hết: liên hệ xưởng; xe chạy bất thường thì dừng an toàn và gọi hỗ trợ.'
    ],
    avoid: 'Không ép tái sinh bằng ga tại chỗ, trong nhà hay gần cỏ khô/vật dễ cháy; khí xả rất nóng, không tự dùng hóa chất/xóa lỗi.',
    callHelp: 'Cần xưởng nếu nháy, kèm MIL hoặc không hoàn tất quy trình đúng sổ tay; cứu hộ nếu xe mất lực, quá nhiệt hay không thể đi an toàn.'
  },
  {
    id: 'glow-plug',
    icon: 'glow-plug',
    name: 'Sấy nóng buồng đốt (máy dầu)',
    english: 'Glow plug',
    color: 'amber',
    severity: 'info',
    description: 'Cuộn dây vàng trên xe diesel thường báo sấy trước khởi động. Sáng dai dẳng hoặc nhấp nháy khi máy đã chạy có thể là lỗi sấy/quản lý động cơ tùy hãng, không chỉ do bugi sấy.',
    keywords: ['sấy', 'glow plug', 'máy dầu', 'khởi động lạnh'],
    actions: [
      'Với xe yêu cầu chờ sấy, bật nguồn và chờ đèn tắt rồi khởi động theo sổ tay; nút Start có thể tự điều khiển sấy.',
      'Sau khởi động, chạy nhẹ theo hướng dẫn xe; không đặt thời gian nổ không tải chung cho mọi động cơ.',
      'Nếu đèn vẫn sáng/nháy khi chạy, đọc thông báo và liên hệ xưởng; rung, mất lực hoặc có đèn đỏ thì dừng an toàn.'
    ],
    avoid: 'Không đề liên tục, dùng chất hỗ trợ nổ tùy tiện hoặc bỏ qua đèn nháy vì xe vẫn nổ được.',
    callHelp: 'Kiểm tra sớm khi khó nổ hoặc đèn không tắt/nháy sau khởi động; cứu hộ nếu không đề được hay xe chạy không an toàn.'
  },
  {
    id: 'service',
    icon: 'service',
    name: 'Đến hạn bảo dưỡng',
    english: 'Service reminder',
    color: 'amber',
    severity: 'info',
    description: 'Cờ lê kèm mốc km/ngày thường nhắc bảo dưỡng định kỳ. Trên một số hãng, cờ lê còn báo lỗi hệ truyền động; phải đọc thông báo, không kết luận chỉ cần thay dầu.',
    keywords: ['bảo dưỡng', 'service', 'thay dầu', 'định kỳ', 'cờ lê'],
    actions: [
      'Dừng an toàn để đọc thông báo và đối chiếu sổ tay: nhắc lịch hay lỗi đang xảy ra.',
      'Nếu là lịch bảo dưỡng, ghi km/ngày và đặt lịch đúng hạn; kiểm tra dầu, nước làm mát khi nguội và lốp trước chuyến xa.',
      'Nếu có thông báo lỗi, mất công suất, rung hoặc đèn đỏ, xử lý theo cảnh báo đó; dừng và gọi hỗ trợ khi xe bất thường.'
    ],
    avoid: 'Không reset cờ lê trước khi thực hiện bảo dưỡng hoặc mặc định mọi đèn cờ lê đều không khẩn cấp.',
    callHelp: 'Nhắc lịch đơn thuần: hẹn bảo dưỡng; báo lỗi hệ truyền động: liên hệ xưởng sớm, cứu hộ khi xe không chạy an toàn.'
  },
  {
    id: 'fuel-low',
    icon: 'fuel-low',
    name: 'Sắp hết nhiên liệu',
    english: 'Low fuel',
    color: 'amber',
    severity: 'info',
    description: 'Hình trụ bơm vàng báo nhiên liệu thấp. Mức dự trữ và quãng đường còn lại thay đổi theo xe, độ dốc, tải và cách chạy; không có số km được bảo đảm.',
    keywords: ['xăng', 'nhiên liệu', 'hết xăng', 'fuel', 'dầu diesel'],
    actions: [
      'Nhờ người đi cùng tìm trạm phù hợp hoặc dừng an toàn để tra cứu, ưu tiên đổ nhiên liệu sớm.',
      'Đi đều ga trong giới hạn an toàn, không cố kéo dài quãng đường dựa vào số km dự kiến.',
      'Trên cao tốc, chỉ vào trạm/lối ra hợp lệ; nếu xe hụt nhiên liệu, tìm nơi dừng an toàn và gọi hỗ trợ.'
    ],
    avoid: 'Không dừng đổ xăng trên làn chạy, lùi trên cao tốc hoặc cố đề nhiều lần khi cạn; xe diesel có thể cần quy trình mồi đúng sổ tay.',
    callHelp: 'Gọi hỗ trợ nếu không tới được trạm an toàn, xe chết máy hoặc nghi rò nhiên liệu; tắt máy và tránh nguồn lửa khi có mùi xăng/rò rỉ.'
  },
  {
    id: 'washer-fluid',
    icon: 'washer-fluid',
    name: 'Nước rửa kính',
    english: 'Washer fluid low',
    color: 'amber',
    severity: 'info',
    description: 'Hình kính có tia phun báo mức nước rửa kính thấp; không phải nước làm mát động cơ. Bụi/bùn và thiếu nước rửa có thể làm mất tầm nhìn.',
    keywords: ['nước rửa kính', 'gạt mưa', 'washer', 'kính lái'],
    actions: [
      'Nếu kính bẩn không nhìn rõ, giảm tốc và dừng an toàn để làm sạch trước khi đi tiếp.',
      'Châm dung dịch rửa kính phù hợp vào đúng bình theo sổ tay khi xe đã dừng; đóng nắp chắc.',
      'Kiểm tra vòi phun/lưỡi gạt; đủ nước mà còn báo hoặc không phun thì cần kiểm tra hệ thống.'
    ],
    avoid: 'Không gạt khô trên kính bám cát, không đổ nước làm mát/dung dịch gia dụng vào bình rửa kính hoặc coi đủ tầm nhìn chỉ vì đèn tắt.',
    callHelp: 'Không cần cứu hộ chỉ vì mức thấp nếu vẫn nhìn rõ; không đi tiếp và gọi hỗ trợ nếu không thể khôi phục tầm nhìn an toàn.'
  },
  {
    id: 'high-beam',
    icon: 'high-beam',
    name: 'Đèn pha (chiếu xa)',
    english: 'High beam',
    color: 'blue',
    severity: 'info',
    description: 'Đèn xanh dương với tia ngang thẳng báo chiếu xa đang bật hoặc đang nháy pha. Không nhầm với đèn xanh lá chiếu gần có tia chúc xuống hay đèn tự động có chữ A.',
    keywords: ['đèn pha', 'chiếu xa', 'high beam', 'đèn xanh'],
    actions: [
      'Chuyển về chiếu gần khi có thể gây chói cho xe ngược chiều hoặc xe phía trước.',
      'Chỉ dùng chiếu xa khi điều kiện và quy định cho phép; trong sương/mưa dày ưu tiên chiếu gần, giảm tốc.',
      'Nếu dùng pha tự động, vẫn tự quan sát và chuyển về chiếu gần khi hệ thống chưa hạ đèn kịp.'
    ],
    avoid: 'Không coi nháy pha là quyền ưu tiên, không giữ pha khi gây chói hoặc tin pha tự động luôn nhận đúng mọi xe.',
    callHelp: 'Không cần cứu hộ với trạng thái bình thường; nếu không hạ được pha hoặc chiếu sáng hỏng, dừng an toàn và sửa trước khi đi trong tối.'
  },
  {
    id: 'fog-light',
    icon: 'fog-light',
    name: 'Đèn sương mù trước',
    english: 'Front fog light',
    color: 'green',
    severity: 'info',
    description: 'Đèn xanh lá có tia chúc xuống bên trái cắt qua vạch lượn đứng báo đèn sương mù trước đang bật. Đèn sương mù sau là biểu tượng vàng hướng ngược lại.',
    keywords: ['đèn sương mù', 'sương mù trước', 'front fog', 'fog light', 'mưa'],
    actions: [
      'Chỉ bật khi tầm nhìn/điều kiện và quy định cho phép; giảm tốc theo khoảng nhìn thấy thực tế.',
      'Dùng cùng đèn chiếu gần khi cần; đèn sương mù không thay thế chiếu sáng chính hoặc tự bảo đảm nhìn rõ.',
      'Tắt khi không còn cần thiết và kiểm tra riêng công tắc/đèn báo sương mù sau để tránh gây chói.'
    ],
    avoid: 'Không nhầm trước với sau, không coi một ngưỡng mét cố định áp dụng cho mọi nơi hoặc tăng tốc vì đã bật sương mù.',
    callHelp: 'Trạng thái bình thường không cần hỗ trợ; nếu tầm nhìn không đủ để đi an toàn, tìm chỗ dừng phù hợp, không dừng giữa làn chạy.'
  },
  {
    id: 'cruise',
    icon: 'cruise',
    name: 'Ga tự động (Cruise control)',
    english: 'Cruise control',
    color: 'green',
    severity: 'info',
    description: 'Đồng hồ có mũi tên thường báo cruise; xanh lá thường là đang giữ tốc độ, trắng/xám có thể chỉ sẵn sàng. Cruise thường không giữ khoảng cách; ACC có giới hạn riêng, không phải tự lái.',
    keywords: ['cruise', 'ga tự động', 'giữ ga', 'cao tốc'],
    actions: [
      'Xác nhận chế độ và tốc độ thực sự đã cài trên màn hình, chỉ dùng khi điều kiện/sổ tay cho phép.',
      'Luôn quan sát và sẵn sàng đạp phanh; nút hủy hoặc bàn đạp phanh thường hủy giữ tốc độ theo sổ tay.',
      'Hủy cruise khi trơn trượt, tầm nhìn kém hoặc cần chủ động kiểm soát tốc độ xuống dốc; không dùng RES khi chưa kiểm tra tốc độ lưu.'
    ],
    avoid: 'Không coi cruise thường là ACC, không dựa vào cruise để tránh va chạm hoặc bảo đảm không vượt tốc độ khi xuống dốc.',
    callHelp: 'Trạng thái bình thường không cần hỗ trợ; nếu không hủy được, đạp phanh và làm theo quy trình khẩn cấp của xe, dừng an toàn rồi gọi cứu hộ.'
  },
  {
    id: 'lane-assist',
    icon: 'lane-assist',
    name: 'Cảnh báo / hỗ trợ giữ làn',
    english: 'Lane departure / keeping assist',
    color: 'green',
    severity: 'info',
    description: 'Hình xe giữa vạch làn: xanh lá thường là đã nhận làn/đủ điều kiện hỗ trợ, trắng/xám là chờ; vàng hoặc nháy có thể cảnh báo/lỗi tùy xe. LDW chỉ cảnh báo, không nhất thiết tự đánh lái như LKA/LFA.',
    keywords: ['lệch làn', 'giữ làn', 'lane', 'ldw', 'lka', 'lfa', 'vạch kẻ đường'],
    actions: [
      'Tự giữ hướng, tay trên vô-lăng và mắt quan sát; nếu xe lệch làn thì chỉnh êm sau khi kiểm tra an toàn.',
      'Trước chuyển làn, kiểm tra gương/điểm mù và bật xi-nhan; tín hiệu không tự bảo đảm khoảng trống.',
      'Nếu đèn vàng/thông báo không khả dụng, đọc sổ tay khi dừng; vạch mờ, mưa hay camera bẩn có thể làm mất hỗ trợ.'
    ],
    avoid: 'Không coi LDW/LKA là tự lái, không buông tay để thử hoặc trông chờ hệ thống xử lý mọi cua/vạch/công trường.',
    callHelp: 'Trạng thái nhận làn bình thường không cần cứu hộ; kiểm tra nếu lỗi dai dẳng sau vệ sinh đúng cách, dừng an toàn nếu can thiệp lái bất thường.'
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
