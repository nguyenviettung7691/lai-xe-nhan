import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 4 — Đổ đèo, khởi hành ngang dốc và lái xe khi thời tiết xấu. */
export const weatherCards: Card[] = [
  defineCard({
    id: 'weather-downhill',
    lessonId: 'weather-slope',
    topicId: 'weather',
    title: 'Đổ đèo dài an toàn',
    context: 'Bạn lái xe động cơ đốt trong xuống đèo dài, trời mưa và độ bám giảm; phanh liên tục có thể quá nhiệt, giảm hiệu lực. Phanh động cơ hỗ trợ giảm tải phanh chân nhưng phải phù hợp xe và mặt đường, không bảo đảm tự giữ tốc độ.',
    objective: 'Chọn tốc độ và chế độ xuống dốc phù hợp, phối hợp phanh an toàn và nhận biết lúc phải dừng, gọi hỗ trợ.',
    risk: 'high',
    difficulty: 4,
    minutes: 7,
    tags: { speedRange: 'suburban', spaceConstraint: 'medium', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Kiểm tra lốp, phanh, đèn và gạt mưa trước hành trình; đọc hướng dẫn xuống dốc của xe và xác định điểm dừng, đường cứu nạn theo biển báo. Không vào dốc nếu phanh bất thường hoặc không chắc kiểm soát được xe.', cueType: 'marker', cueText: 'Không chờ hết dốc mới kiểm tra phanh' },
      { instruction: 'Giảm tốc trước đỉnh dốc và trước cua theo biển, độ bám, tải xe và tầm nhìn; bật đèn chiếu gần khi mưa, thiếu sáng. Giữ cự ly theo quy định, tăng thêm khi mưa hoặc trơn để dừng được trong phần đường nhìn rõ.', cueType: 'sign', cueText: 'Giới hạn tốc độ không phải tốc độ mục tiêu', speedHint: 'chậm hơn khi đường trơn, cua khuất hoặc tầm nhìn giảm' },
      { instruction: 'Chọn cấp số hoặc chế độ hãm phù hợp trước dốc theo sách hướng dẫn; giảm tốc trước khi về số, không ép số gây giật hoặc quá vòng tua. Trên đường trơn, tuân thủ hạn chế phanh động cơ của xe; không chủ động về số để hãm nếu nhà sản xuất cấm trong điều kiện này.', cueType: 'marker', cueText: 'Không có số L, 2 hay mức vòng tua chung cho mọi xe' },
      { instruction: 'Quan sát tốc độ thực tế, nhả ga và dùng lực hãm phù hợp để giảm tải phanh chân; vòng tua không thay đồng hồ tốc độ. Giữ số truyền động, không về N, không đạp giữ côn cho xe trôi và không tắt máy khi xe đang chạy.', cueType: 'marker', cueText: 'Tốc độ vẫn có thể tăng dù vòng tua có vẻ ổn định' },
      { instruction: 'Phanh chân sớm, tăng lực êm khi cần giảm thêm; nhả khi đã giảm đủ và vẫn kiểm soát được tốc độ, không rà suốt dốc hay nhấp theo nhịp cố định. Nếu phải phanh liên tục để giữ tốc độ, giảm tốc và chọn nơi dừng an toàn, không cố đi tiếp cho hết đèo.', cueType: 'feel', cueText: 'Phanh thường không phải bài tập đạp, nhả theo giây' },
      { instruction: 'Nhìn xa theo phần đường thấy rõ, giữ trong làn và giảm tốc trước cua; không cắt cua hoặc về số đột ngột giữa cua. Vẫn phanh ngay khi có nguy hiểm tức thời; với ABS, đạp phanh mạnh và giữ lực, không nhấp nhả, đồng thời lái tránh trong khoảng trống an toàn.', cueType: 'marker', cueText: 'ABS có thể rung bàn đạp; không bảo đảm quãng dừng ngắn hơn' },
      { instruction: 'Giảm tốc và dừng sớm ngoài dòng xe ở nơi an toàn nếu có mùi khét, bàn đạp mềm, hành trình tăng hoặc xe giảm tốc kém; không chờ đủ mọi dấu hiệu. Nếu phanh còn hiệu lực, báo hiệu, quan sát rồi vào chỗ dừng, giữ chắc xe theo hướng dẫn và gọi hỗ trợ kiểm tra trước khi đi tiếp.', cueType: 'feel', cueText: 'Phanh giảm hiệu lực có thể không có mùi; không chỉ là quá nhiệt' },
      { instruction: 'Giữ hướng lái và dùng phanh còn hiệu lực nếu không khống chế được tốc độ; cảnh báo người khác, không tắt máy, không chọn P hoặc R khi đang chạy. Dùng đường cứu nạn có biển nếu tiếp cận được an toàn, không cố chạy tới bãi nghỉ; sau khi dừng, giữ chắc xe và gọi cứu hộ, cứu nạn.', cueType: 'sign', cueText: 'Đường cứu nạn dành cho tình huống mất kiểm soát, không phải chỗ nghỉ làm nguội phanh' }
    ],
    mistakes: [
      'Rà phanh liên tục suốt đoạn dốc làm phanh quá nhiệt.',
      'Về N, giữ côn hoặc tắt máy cho xe trôi; ép số thấp khi đang nhanh hoặc khi sách hướng dẫn cấm hãm bằng số trên đường trơn.',
      'Vào cua quá nhanh, nhấp nhả phanh ABS khi khẩn cấp hoặc tiếp tục đổ đèo dù phanh bất thường.'
    ],
    recovery: 'Nếu còn kiểm soát được tốc độ, dùng phanh còn hiệu lực để giảm tốc và dừng ngoài dòng xe tại nơi an toàn; không dừng ngay giữa cua khuất. Nếu tốc độ không khống chế được, cảnh báo, giữ hướng lái, dùng đường cứu nạn có biển nếu tiếp cận được an toàn; không tắt máy, không chọn P hoặc R khi đang chạy. Không ép về số thấp gây mất bám hoặc quá tua; thao tác phanh đỗ khẩn cấp chỉ theo hướng dẫn riêng của xe, không giật phanh tay tùy tiện. Sau khi dừng, giữ chắc xe theo sách hướng dẫn, gọi cứu hộ; chỉ rời xe về phía tránh dòng xe nếu an toàn, không đứng phía xe có thể trôi. Không đổ nước lên phanh nóng; hết mùi hoặc phanh nguội không chứng minh đã sửa được lỗi, cần kiểm tra trước khi đi tiếp.',
    safety: 'Phanh động cơ chỉ hỗ trợ; đường trơn phải theo giới hạn của nhà sản xuất, không ép số hoặc lấy tiếng máy làm mốc tốc độ. Với xe điện, hybrid, lực tái sinh có thể giảm khi pin đầy, quá nóng hoặc lạnh; dùng phanh chân theo hướng dẫn, không mặc định xe tự hãm. Phanh sớm, êm khi đi thường; khẩn cấp với ABS thì đạp mạnh, giữ lực, không nhấp nhả. Mùi khét, phanh mềm hoặc giảm tốc kém: dừng an toàn và gọi hỗ trợ nếu còn kiểm soát; không khống chế được tốc độ thì cảnh báo và dùng đường cứu nạn có biển nếu tiếp cận an toàn. Không tắt máy hoặc chọn P, R khi xe đang chạy; giữ chắc xe sau khi dừng và kiểm tra phanh trước khi tiếp tục.',
    mnemonic: { text: 'Chậm trước dốc, hãm đúng xe, phanh lỗi dừng.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    quickCheck: [
      { prompt: 'Chuẩn bị xuống đèo ướt với xe động cơ đốt trong, chọn cách nào?', options: ['Luôn ép về L hoặc 2 dù xe đang nhanh và đường trơn', 'Giảm tốc trước dốc, chọn chế độ theo sách hướng dẫn và độ bám; không về số để hãm nếu xe cấm trên đường trơn', 'Về N để tránh tiếng máy lớn'], correctIndex: 1 },
      { prompt: 'Phanh thường trên dốc khác phanh khẩn cấp với ABS như thế nào?', options: ['Cả hai đều đạp, nhả liên tục theo nhịp cố định', 'Phanh thường tăng lực êm khi cần, nhả khi đã giảm đủ và còn kiểm soát; khẩn cấp với ABS đạp mạnh, giữ lực, không nhấp nhả', 'Có phanh động cơ thì không cần phanh khi gặp nguy hiểm'], correctIndex: 1 },
      { prompt: 'Phanh có mùi khét, mềm hoặc giảm hiệu lực khi xuống đèo, nên làm gì?', options: ['Đi tiếp khi hết mùi vì phanh chắc chắn đã phục hồi', 'Còn kiểm soát: giảm tốc, dừng an toàn và gọi hỗ trợ kiểm tra; không khống chế được tốc độ: cảnh báo, dùng đường cứu nạn có biển nếu tiếp cận an toàn', 'Luôn chạy tới đường cứu nạn dù có chỗ dừng an toàn và phanh còn hiệu lực'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ đổ đèo dài.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Nhấn mạnh phanh động cơ và dấu hiệu phanh quá nhiệt.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Sửa hãm theo xe và độ bám, phanh thường và ABS khẩn cấp, xử lý phanh bất thường, hai sơ đồ và trạng thái chưa thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'weather-uphill-start',
    lessonId: 'weather-slope',
    topicId: 'weather',
    title: 'Khởi hành ngang dốc',
    context: 'Bạn dừng chờ trên dốc lên, có xe phía sau; ví dụ này dùng xe số tự động có chức năng hỗ trợ giữ xe mà bạn đã được hướng dẫn sử dụng theo sách xe. Xe vẫn có thể trôi khi chuyển chân từ phanh sang ga nếu hỗ trợ không hoạt động hoặc hết thời gian giữ.',
    objective: 'Giữ xe chắc, quan sát đủ và khởi hành lên dốc có kiểm soát theo trang bị của xe, dừng ngay nếu xe trôi hoặc mất bám.',
    risk: 'high',
    difficulty: 3,
    minutes: 6,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'high' },
    steps: [
      { instruction: 'Đạp phanh chân để dừng hẳn và giữ xe; dùng phanh đỗ khi chờ theo sách xe, không giữ xe bằng ga. Chừa khoảng trống phía trước theo dốc, độ bám và khả năng dừng, không theo mốc một mét hay một thân xe.', cueType: 'feel', cueText: 'Xe đứng yên, dây an toàn đã cài và cửa đã đóng' },
      { instruction: 'Cài D khi xe đứng hẳn, chân phải còn giữ phanh và hệ truyền động ở trạng thái sẵn sàng; kiểm tra đúng số trước khi đi. Không coi D là khóa chống trôi, không nhả phanh chỉ vì xe sau thúc giục.', cueType: 'marker', cueText: 'D không bảo đảm xe tự bò lên hoặc không trôi' },
      { instruction: 'Quan sát phía trước, hai bên, gương và điểm mù; nhường người đi bộ, xe máy và xe đang đi tới. Nếu từ lề nhập dòng xe, báo hiệu khi cần và kiểm tra lại ngay trước khi đi; chưa đủ khoảng trống thì giữ phanh chờ.', cueType: 'mirror', cueText: 'Gương và camera chỉ hỗ trợ, không thay quan sát trực tiếp' },
      { instruction: 'Xác định cách hoạt động của HSA, Auto Hold hoặc phanh đỗ trên chính xe theo sách hướng dẫn; HSA chỉ giữ tạm thời và có thể không kích hoạt, không thay phanh đỗ khi đỗ xe. Nếu không có hỗ trợ phù hợp hoặc chưa biết chắc cách dùng, giữ phanh, nhờ giáo viên hướng dẫn ở nơi tập an toàn, không tự thử giữa dòng xe.', cueType: 'marker', cueText: 'Bật Auto Hold hoặc có đèn chờ không đồng nghĩa đã giữ xe; EPB không nhả dần như cần phanh tay cơ' },
      { instruction: 'Chuyển chân phải từ phanh sang ga chỉ khi đã sẵn sàng đi, đường trống và đáp ứng điều kiện giữ, nhả phanh theo sách xe; tăng ga êm vừa đủ để tiến, sẵn sàng trở lại phanh. Nhả phanh đỗ đúng quy trình của xe, không mặc định mọi xe cho phép đạp ga khi phanh đỗ còn giữ; không đạp đồng thời ga và phanh chân.', cueType: 'feel', cueText: 'Không có số giây chờ, mức ga hay vòng tua chung cho mọi xe' },
      { instruction: 'Giữ hướng trong làn, nhìn phía trước là chính và xác nhận xe tiến đúng hướng bằng chuyển động thực tế; chỉ liếc gương ngắn khi an toàn, không nhìn chằm chằm gương sau để đo trôi. Kiểm tra phanh đỗ đã nhả theo chỉ báo của xe; nếu còn cảnh báo hoặc xe không tiến bình thường, nhả ga và đạp phanh dừng lại, không tăng ga để thắng phanh.', cueType: 'feel', cueText: 'Tiến êm, không chồm, không kéo lê phanh đỗ', speedHint: 'khởi hành chậm, luôn dừng được trong khoảng trống phía trước' },
      { instruction: 'Nhả ga và đạp phanh chân ngay để dừng hẳn, giữ xe nếu xe trôi ngược, trượt bánh hoặc có người, xe đi vào đường chạy; không tăng ga để cứu trôi. Không chọn P hoặc R khi xe đang chuyển động; chỉ sau khi dừng hẳn mới giữ chắc bằng phanh đỗ theo sách xe và đánh giá lại trước khi thử tiếp.', cueType: 'feel', cueText: 'Chưa rõ nguyên nhân hoặc không đủ hở thì không khởi hành lại' },
      { instruction: 'Dừng thử nếu trôi lặp lại, thiếu bám, có mùi khét hoặc cảnh báo phanh, hộp số; giữ xe bằng phanh và gọi hỗ trợ, không bò bằng ga để chờ trên dốc. Nếu không giữ được xe, cảnh báo người xung quanh, tiếp tục thao tác dừng theo hướng dẫn khẩn cấp của xe, không rời vị trí lái khi xe chưa được giữ chắc.', cueType: 'marker', cueText: 'Không để ai đứng phía thấp hoặc giữa xe với vật cản để chèn, đẩy xe' }
    ],
    mistakes: [
      'Mặc định D hoặc HSA luôn chống trôi, nhả phanh khi chưa sẵn sàng hoặc chưa đủ khoảng trống.',
      'Đạp ga lớn để cứu trôi, giữ xe bằng ga hoặc cố chạy khi phanh đỗ chưa nhả gây trượt bánh, quá nhiệt.',
      'Chỉ nhìn gương sau, bỏ sót người phía trước hoặc nhả EPB như phanh tay cơ mà không theo sách xe.'
    ],
    recovery: 'Xe trôi hoặc trượt bánh: nhả ga, đạp phanh chân ngay để dừng hẳn và giữ xe; không thêm ga hoặc chọn P, R khi còn chuyển động. Sau khi đứng hẳn, dùng phanh đỗ theo sách xe, kiểm tra khoảng trống, độ bám, số đang chọn và trạng thái hỗ trợ trước khi cân nhắc lại; không mặc định cứ làm lại là an toàn. Trôi lặp lại, cảnh báo phanh, hộp số hoặc mùi khét thì dừng thử, gọi hỗ trợ và kiểm tra xe. Nếu chưa giữ được xe, cảnh báo và thao tác dừng theo hướng dẫn khẩn cấp của xe, không rời vị trí lái; không nhờ ai đứng phía thấp, chèn hoặc đẩy xe chưa giữ chắc. Chỉ rời xe sau khi đã dừng và bảo đảm không trôi, thực hiện quy trình đỗ riêng của xe nếu phải bỏ hành trình.',
    safety: 'Đây là ví dụ xe số tự động có hỗ trợ giữ xe, không thay bài tập côn và phanh tay của xe số sàn. HSA chỉ giữ tạm thời, có thể không kích hoạt; Auto Hold, EPB và phanh tay cơ có điều kiện giữ, nhả khác nhau, phải theo sách xe và thực hành với giáo viên trước khi dùng trên dốc đông xe. Không lấy D, đèn chờ hoặc số giây làm bảo đảm chống trôi; không giữ xe bằng ga hay đạp đồng thời ga, phanh chân. Xe trôi, trượt hoặc có vật cản: nhả ga và đạp phanh chân ngay để dừng, không chọn P hoặc R khi đang chuyển động. Sau khi dừng hẳn, giữ chắc xe, đánh giá lại; nếu lỗi lặp lại, có cảnh báo hoặc mùi khét thì dừng thử và gọi hỗ trợ. Không rời vị trí lái hoặc để người đứng phía thấp khi xe chưa được giữ chắc.',
    mnemonic: { text: 'Giữ chắc, nhìn đủ, đi êm; trôi thì phanh.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    quickCheck: [
      { prompt: 'Trước khi chuyển chân sang ga để đi lên dốc, cần làm gì?', options: ['Cài D rồi nhả phanh, xe tự động không thể trôi', 'Giữ phanh, kiểm tra đường trống và điểm mù, đúng số và điều kiện hỗ trợ theo sách xe; chưa chắc thì tiếp tục giữ xe', 'Nhìn gương sau liên tục rồi tăng ga lớn'], correctIndex: 1 },
      { prompt: 'HSA, Auto Hold và EPB có thể dùng như nhau trên mọi xe không?', options: ['Có, tất cả giữ xe vô thời hạn rồi nhả dần như phanh tay cơ', 'Không; HSA chỉ giữ tạm thời, có thể không kích hoạt; Auto Hold và EPB theo điều kiện riêng của xe, đèn chờ không bảo đảm đang giữ', 'Có, chỉ cần đợi đúng ba giây rồi đạp ga'], correctIndex: 1 },
      { prompt: 'Xe bắt đầu trôi hoặc trượt khi khởi hành, phải làm gì?', options: ['Tăng ga để thắng lực trôi rồi thử lại liên tục', 'Nhả ga, đạp phanh chân dừng hẳn và giữ xe; không chọn P, R khi đang chạy, chỉ đánh giá lại sau khi giữ chắc; lỗi lặp lại thì dừng thử, gọi hỗ trợ', 'Chọn P ngay khi xe còn trôi rồi rời xe nhờ người chèn bánh'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng khởi hành ngang dốc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Làm rõ xe tự động, giới hạn HSA/Auto Hold/EPB, quan sát, chuyển chân và dừng khi trôi; sửa hai sơ đồ, bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
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
    quickCheck: [
      { prompt: 'Trước khi chuyển sang số tay hoặc chế độ L, nên làm gì?', options: ['Đạp ga thêm', 'Nhả ga hoàn toàn', 'Đánh lái gấp'], correctIndex: 1 },
      { prompt: 'Nên về số như thế nào khi xe đang chạy nhanh?', options: ['Về liền hai đến ba cấp cùng lúc', 'Về từng cấp một', 'Không cần về số'], correctIndex: 1 },
      { prompt: 'Khi nào nên trở lại chế độ D?', options: ['Ngay giữa đoạn dốc', 'Khi hết đoạn dốc', 'Không bao giờ cần chuyển lại'], correctIndex: 1 }
    ],
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
    quickCheck: [
      { prompt: 'Cách xác định mức nước ngập trước khi quyết định đi qua là gì?', options: ['Nhìn màu nước', 'Quan sát mức nước ngập tới đâu trên bánh xe đi trước', 'Hỏi người đi đường'], correctIndex: 1 },
      { prompt: 'Khi đi qua vùng ngập, nên giữ ga như thế nào?', options: ['Ga đều, không dừng giữa vùng ngập', 'Tăng giảm ga liên tục', 'Dừng lại giữa chừng để quan sát'], correctIndex: 0 },
      { prompt: 'Khi nào bạn nên quay đầu thay vì đi qua vùng ngập?', options: ['Khi nước cao quá nửa bánh xe hoặc chảy xiết', 'Khi có vài chiếc xe máy đã đi qua', 'Khi nước chỉ ngập mặt đường mỏng'], correctIndex: 0, isStopCondition: true }
    ],
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
    quickCheck: [
      { prompt: 'Khi lái xe trong mưa lớn, nên điều chỉnh tốc độ như thế nào?', options: ['Giữ nguyên tốc độ bình thường', 'Giảm tốc ít nhất hai mươi phần trăm so với ngày khô', 'Tăng tốc để nhanh thoát khỏi mưa'], correctIndex: 1 },
      { prompt: 'Dấu hiệu nào cho thấy xe đang trượt nước?', options: ['Vô-lăng bỗng nhẹ hẫng', 'Đèn pha sáng hơn', 'Tiếng động cơ êm hơn'], correctIndex: 0 },
      { prompt: 'Khi không còn nhìn rõ vạch kẻ đường vì mưa quá lớn, bạn nên?', options: ['Tiếp tục chạy chậm hơn một chút', 'Tấp vào nơi an toàn và bật đèn cảnh báo', 'Bật đèn pha để nhìn xa hơn'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng lái xe trong mưa lớn.', author: 'Biên tập nội dung' }]
  })
]
