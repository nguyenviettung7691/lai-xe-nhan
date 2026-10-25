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
    context: 'Bạn lái xe số tự động dùng động cơ đốt trong xuống dốc dài; chọn chế độ hãm phù hợp có thể giảm tải phanh chân, không thay thế phanh hoặc bảo đảm xe tự giữ tốc độ. Cách chọn số, giới hạn tốc độ và vòng tua khác nhau theo xe, đặc biệt khi mặt đường trơn.',
    objective: 'Chọn chế độ hãm theo sách xe và điều kiện đường, kiểm tra phản hồi thực tế, phối hợp phanh chân và dừng khi không còn kiểm soát an toàn.',
    risk: 'high',
    difficulty: 3,
    minutes: 6,
    tags: { speedRange: 'suburban', spaceConstraint: 'open', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Đọc sách hướng dẫn trước hành trình để biết chế độ hãm, giới hạn tốc độ, vòng tua và chức năng lẫy trên xe; M, L, B hoặc dải số không có cùng ý nghĩa trên mọi xe. Kiểm tra phanh trước dốc; không vào dốc nếu phanh bất thường hoặc chưa biết kiểm soát xe.', cueType: 'marker', cueText: 'Xe điện, hybrid có thể dùng lẫy để chỉnh tái sinh thay vì đổi số' },
      { instruction: 'Giảm tốc trước dốc và trước cua theo biển, tải xe, độ bám và tầm nhìn; giữ cự ly theo quy định và tăng thêm khi mưa, trơn. Tuân thủ hạn chế phanh động cơ của xe trên đường trơn, không chủ động về số để hãm nếu sách xe cấm trong điều kiện đó.', cueType: 'sign', cueText: 'Nhả ga đơn thuần không bảo đảm đã đủ chậm để về số', speedHint: 'theo biển và điều kiện, luôn dừng được trong phần đường nhìn rõ' },
      { instruction: 'Nhả ga và chọn chế độ hãm được phép theo sách xe khi tốc độ đã phù hợp, giữ hướng ổn định, không đổi số đột ngột giữa cua. Giữ số truyền động, không về N, không giữ côn cho xe trôi và không tắt máy khi xe đang chạy.', cueType: 'marker', cueText: 'Không mặc định phải chuyển sang M hoặc kéo về L' },
      { instruction: 'Chọn lệnh giảm một cấp rồi kiểm tra số hiển thị và phản hồi nếu xe cho phép chọn từng cấp; chỉ yêu cầu tiếp khi tốc độ, vòng tua và độ bám cho phép. Nếu xe từ chối lệnh hoặc tự đổi số, không bấm trừ liên tục hay ép số; màn hình có thể chỉ dải số chứ không phải số đang gài.', cueType: 'marker', cueText: 'Không có chuỗi D về 3 rồi 2 hoặc số thấp nhất chung cho mọi dốc' },
      { instruction: 'Quan sát tốc độ thực tế, chỉ liếc ngắn đồng hồ vòng tua rồi nhìn lại đường; tiếng máy lớn không chứng minh đã hãm đúng. Nếu vòng tua gần giới hạn, dừng yêu cầu số thấp hơn, dùng phanh chân giảm tốc và chỉ yêu cầu số cao hơn khi sách xe cho phép; không chờ vào vùng đỏ, không mặc định hộp số luôn tự bảo vệ.', cueType: 'marker', cueText: 'Giới hạn theo sách xe, không có mức vòng tua an toàn chung' },
      { instruction: 'Phanh chân sớm, tăng lực êm khi cần giảm thêm; nhả khi đã giảm đủ và còn kiểm soát được tốc độ, không rà suốt dốc hoặc nhấp theo nhịp cố định. Khi có nguy hiểm tức thời, vẫn phanh ngay; khẩn cấp với ABS thì đạp mạnh và giữ lực, không nhấp nhả, lái tránh trong khoảng trống an toàn.', cueType: 'feel', cueText: 'Phanh động cơ chỉ hỗ trợ; ABS không bảo đảm dừng ngắn hơn' },
      { instruction: 'Dừng an toàn ngoài dòng xe và gọi hỗ trợ kiểm tra nếu đã vượt giới hạn vòng tua, phanh giảm hiệu lực, có mùi khét, tiếng bất thường, giật mạnh hoặc cảnh báo động cơ, hộp số; không cố về số thêm để chữa lỗi. Nếu không khống chế được tốc độ, cảnh báo, giữ hướng lái, dùng phanh còn hiệu lực và đường cứu nạn có biển nếu tiếp cận an toàn; không chọn P, R hoặc tắt máy khi đang chạy, giữ chắc xe sau khi dừng.', cueType: 'feel', cueText: 'Không chờ có mùi khét mới xử lý; phanh nguội không chứng minh hết lỗi' },
      { instruction: 'Trở lại D hoặc chế độ đi bình thường theo sách xe khi không còn cần lực hãm và điều kiện cho phép, không chỉ vì vừa qua chân dốc. Với xe điện, hybrid, kiểm tra giới hạn tái sinh khi pin đầy, quá nóng hoặc lạnh và dùng phanh chân khi cần; không coi lẫy trừ luôn là lệnh về số hoặc bảo đảm xe tự giảm tốc.', cueType: 'marker', cueText: 'Chế độ và chức năng lẫy có thể đổi theo xe, chế độ lái' }
    ],
    mistakes: [
      'Ép về số thấp khi đang nhanh hoặc đường trơn, bấm trừ liên tục dù xe từ chối và coi D về 3 rồi 2 là công thức chung.',
      'Chỉ nghe tiếng máy, nhìn chằm chằm đồng hồ hoặc tin hộp số luôn ngăn quá tua; tiếp tục đi dù phanh hoặc hệ truyền động bất thường.',
      'Cho xe trôi số N, giữ côn, tắt máy hoặc coi phanh động cơ thay phanh chân và nhấp nhả ABS khi khẩn cấp.'
    ],
    recovery: 'Nếu lệnh bị từ chối, xe tự đổi số hoặc lực hãm chưa đủ, dừng bấm trừ, quan sát đường và giảm tốc bằng phanh chân còn hiệu lực; chỉ chọn lại khi đáp ứng sách xe, không ép số. Vòng tua gần giới hạn: không yêu cầu số thấp hơn, giảm tốc và chỉ yêu cầu số cao hơn theo hướng dẫn; nếu đã vượt giới hạn hoặc có tiếng bất thường, giật mạnh, cảnh báo thì dừng an toàn và gọi hỗ trợ kiểm tra, không tự thử lại. Phanh giảm hiệu lực hoặc có mùi khét: dừng ngoài dòng xe nếu còn kiểm soát; không khống chế được tốc độ thì cảnh báo, giữ hướng lái, dùng phanh còn hiệu lực và đường cứu nạn có biển nếu tiếp cận an toàn. Không chọn P, R hay tắt máy khi đang chạy; giữ chắc xe sau khi dừng, không rời vị trí lái khi xe chưa được giữ chắc.',
    safety: 'Phanh động cơ giảm tải, không thay phanh chân; tốc độ thực tế và khả năng dừng mới là cơ sở kiểm soát, không phải tiếng máy hay vòng tua ổn định. Theo sách xe về chế độ, giới hạn và hạn chế trên đường trơn; không ép số hoặc tin xe luôn chặn quá tua. Không về N, giữ côn cho xe trôi, chọn P, R hoặc tắt máy khi đang chạy. Khẩn cấp với ABS: đạp mạnh, giữ lực, không nhấp nhả; không chờ về số mới phanh. Phanh giảm hiệu lực, mùi khét hoặc cảnh báo: dừng an toàn và gọi hỗ trợ nếu còn kiểm soát; không khống chế được tốc độ thì cảnh báo và dùng đường cứu nạn có biển nếu tiếp cận an toàn, giữ chắc xe sau khi dừng. Xe điện, hybrid có thể hạn chế tái sinh khi pin đầy, quá nóng hoặc lạnh; chức năng lẫy theo xe và chế độ lái, vẫn dùng phanh chân khi cần.',
    mnemonic: { text: 'Chậm trước, chọn đúng, kiểm tra; phanh vẫn cần.', rhythm: 'ba-nhip' },
    checklistId: 'bad_weather',
    quickCheck: [
      { prompt: 'Trước khi chọn chế độ hãm xuống dốc trên xe tự động, cần làm gì?', options: ['Chỉ nhả ga rồi kéo ngay về L vì mọi xe giống nhau', 'Giảm tốc phù hợp trước dốc, chọn chế độ theo sách xe và độ bám; không về số để hãm nếu sách xe cấm trên đường trơn', 'Luôn chọn số thấp nhất để khỏi cần phanh chân'], correctIndex: 1 },
      { prompt: 'Nếu lệnh giảm số bị từ chối hoặc vòng tua gần giới hạn, bạn nên?', options: ['Bấm trừ liên tục cho đến khi xe nhận vì hộp số luôn bảo vệ động cơ', 'Dừng yêu cầu số thấp hơn, giảm tốc bằng phanh chân, chỉ chọn lại hoặc yêu cầu số cao hơn khi sách xe cho phép; kiểm tra số hiển thị và phản hồi', 'Về N để tiếng máy dịu lại trong khi xe vẫn xuống dốc'], correctIndex: 1 },
      { prompt: 'Phanh giảm hiệu lực hoặc hệ truyền động có cảnh báo khi xuống dốc, nên làm gì?', options: ['Về thêm hai cấp số rồi tiếp tục vì động cơ thay được phanh', 'Còn kiểm soát thì dừng an toàn, giữ chắc xe và gọi hỗ trợ kiểm tra; không khống chế được tốc độ thì cảnh báo, dùng đường cứu nạn có biển nếu tiếp cận an toàn', 'Tắt máy hoặc chọn P ngay khi xe đang chạy'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới giải thích cách dùng phanh động cơ.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Sửa chọn chế độ theo xe, tốc độ và độ bám, giới hạn vòng tua, phanh chân và xử lý bất thường; thay hai sơ đồ, nâng mức rủi ro và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'weather-flood-cross',
    lessonId: 'weather-flood',
    topicId: 'weather',
    title: 'Quyết định khi gặp đường ngập',
    context: 'Đường ngập sau mưa có thể che hố sâu, nắp cống mất hoặc nền đường bị cuốn trôi dù xe trước vừa đi qua. Nước và dòng chảy đe dọa tính mạng, phanh, động cơ và hệ thống điện của cả xe xăng, hybrid lẫn xe điện.',
    objective: 'Tránh đi vào đường ngập, chọn lối khô hợp pháp và xử lý có điều kiện nếu xe lỡ bị kẹt trong nước.',
    risk: 'high',
    difficulty: 4,
    minutes: 7,
    tags: { speedRange: 'creep', spaceConstraint: 'medium', visibility: 'poor', stress: 'high' },
    steps: [
      { instruction: 'Giảm tốc sớm, kiểm tra gương và dừng trước vùng ngập ở nơi khô, không gây nguy hiểm cho dòng xe; không phanh gấp chỉ để xem nước hoặc chờ ở chỗ trũng dễ bị nước dâng.', cueType: 'marker', cueText: 'Xe còn trên phần đường khô, chưa chạm nước' },
      { instruction: 'Quan sát từ nơi khô và tránh đi vào vùng nước che khuất mặt đường; không xuống lội đo, không suy độ sâu từ bánh xe trước, camera hay xe tải vừa qua. Không có ngưỡng nửa bánh xe hoặc số xăng-ti-mét bảo đảm an toàn.', cueType: 'marker', cueText: 'Không thấy rõ nền đường và độ sâu là không thử đi qua' },
      { instruction: 'Chọn không đi qua đường ngập, nhất là nơi có dòng chảy, nước dâng, hầm chui hoặc rào chắn; tuân theo lực lượng chức năng, không vòng rào hay đi giữa tim đường để tìm chỗ cao. Khả năng lội nước trong sách xe không bảo đảm đường ngập an toàn; xe gầm cao và xe điện cũng không được miễn rủi ro.', cueType: 'marker', cueText: 'Rào chắn, dòng chảy hoặc đường bị che khuất: không vào' },
      { instruction: 'Quay đầu chỉ tại nơi được phép, trên nền khô, khi quan sát đủ phía trước, sau, hai bên và có khoảng trống; nhường người và xe, dừng hẳn trước đổi chiều. Không lùi mù hoặc quay vào dòng xe; nếu chưa có lối tránh khô an toàn, chờ nơi khô cao được phép hoặc nhờ hỗ trợ, không cố vượt nước.', cueType: 'marker', cueText: 'Đường tránh phải khô, hợp pháp và còn an toàn; nước dâng thì đổi nơi chờ' },
      { instruction: 'Dừng cố tăng ga nếu xe lỡ chết máy hoặc mất khả năng chạy trong nước; không khởi động lại, không bật lại READY trên xe hybrid, xe điện, không đẩy hoặc kéo để nổ máy. Ưu tiên người, gọi cứu nạn khi có nguy hiểm, báo vị trí, số người và nước có dâng hay chảy; tắt hệ thống xe theo sách hướng dẫn nếu làm được an toàn, không chạm thiết bị điện ngập nước.', cueType: 'marker', cueText: 'Không đề lại; cứu người trước, cứu hộ xe sau' },
      { instruction: 'Thoát tới nơi cao khô chỉ khi có lối ra rõ ràng an toàn, không phải lội hoặc bơi qua dòng nước; hỗ trợ người đi cùng theo khả năng và hướng dẫn cứu nạn, không quay lại lấy đồ. Không mặc định mở cửa bước xuống: nước có thể chảy xiết, nhiễm điện, che hố hoặc nắp cống mất.', cueType: 'marker', cueText: 'Có đường thoát khô an toàn mới rời xe theo lối đó' },
      { instruction: 'Gọi cứu nạn và ở trong xe nếu bị kẹt giữa nước chảy xiết, không có lối thoát an toàn; làm theo lực lượng cứu nạn. Nếu nước dâng vào trong xe, tìm cách lên nóc và ra hiệu cầu cứu, không nhảy xuống dòng chảy; báo ngay người bị kẹt hoặc không tự di chuyển được.', cueType: 'marker', cueText: 'Kẹt giữa dòng xiết khác với xe còn có lối ra khô an toàn' },
      { instruction: 'Kiểm tra xe sau khi lỡ tiếp xúc nước: chỉ thử phanh nhẹ ở tốc độ rất thấp trên nền khô, trống, không có xe sát sau và theo sách xe. Phanh bất thường, đèn cảnh báo hoặc đã ngập đáng kể thì dừng an toàn, gọi cứu hộ kiểm tra trước khi chạy tiếp; vài lần rà phanh không chứng minh hết hư hỏng, không tự khởi động xe đã chết máy trong nước.', cueType: 'feel', cueText: 'Chỉ kiểm tra khi người và xe đã ở nơi an toàn; phanh lỗi thì không chạy tiếp' }
    ],
    mistakes: [
      'Coi nước dưới nửa bánh, xe trước đã qua hoặc xe gầm cao là bằng chứng an toàn.',
      'Chạy giữa tim đường, vòng rào chắn hoặc lội xuống để đo nước.',
      'Đề lại xe chết máy, bật lại READY hoặc mở cửa bước xuống dòng nước mà chưa có lối thoát an toàn.'
    ],
    recovery: 'Không khởi động lại xe chết máy trong nước, kể cả bật READY hoặc đẩy, kéo nổ; gọi cứu nạn nếu người gặp nguy hiểm, báo vị trí và người đi cùng rồi gọi cứu hộ xe. Chỉ ra nơi cao khô khi có lối an toàn, không lội vào nước; nếu kẹt giữa nước chảy xiết thì ở trong xe gọi trợ giúp, nước dâng vào xe thì tìm cách lên nóc ra hiệu, không nhảy xuống dòng chảy. Tuân theo cứu nạn, không quay lại lấy đồ hoặc chạm thiết bị điện ngập; xe cần được kiểm tra trước khi dùng lại.',
    safety: 'Không có độ sâu ngập an toàn chung: không đi vào đường ngập, không lội đo nước, không vòng rào; quay đầu chỉ khi hợp pháp và an toàn. Không khởi động lại xe chết máy trong nước hay bật lại READY. Ưu tiên tính mạng: có lối khô an toàn mới thoát tới nơi cao; kẹt giữa nước chảy xiết thì ở trong xe gọi cứu nạn, nước dâng vào trong thì tìm cách lên nóc ra hiệu, không nhảy xuống dòng chảy. Đây không phải hướng dẫn lội nước hoặc quy trình thoát mọi loại xe chìm; làm theo cứu nạn, không dùng điện thoại khi đang điều khiển xe.',
    mnemonic: { text: 'Gặp ngập: tránh vào; kẹt xe: gọi cứu nạn.', rhythm: 'doi-ve' },
    checklistId: 'bad_weather',
    quickCheck: [
      { prompt: 'Xe trước vừa qua nhưng nước che khuất mặt đường, bạn nên làm gì?', options: ['Đi theo nếu nước dưới nửa bánh xe trước', 'Không vào; tìm lối khô, chỉ quay đầu khi hợp pháp và an toàn', 'Đi giữa tim đường ở số thấp'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Xe chết máy trong nước, việc nào phù hợp?', options: ['Đề lại hoặc bật READY để thử một lần', 'Không khởi động lại; ưu tiên người, gọi cứu nạn nếu nguy hiểm và cứu hộ xe', 'Nhờ đẩy hoặc kéo cho nổ máy'], correctIndex: 1 },
      { prompt: 'Xe kẹt giữa nước chảy xiết, không có lối ra an toàn, bạn nên làm gì?', options: ['Mở cửa bước xuống nước ngay', 'Ở trong xe gọi cứu nạn; nếu nước dâng vào thì tìm cách lên nóc ra hiệu, không nhảy xuống dòng chảy', 'Ngồi chờ trong xe dù nước đang dâng vào trong, không gọi trợ giúp'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho quyết định đi qua đường ngập.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ ngưỡng nửa bánh và công thức vượt ngập; ưu tiên đường khô, không đề lại, cứu nạn có điều kiện và kiểm tra sau tiếp xúc nước; thay hai sơ đồ, bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'weather-heavy-rain',
    lessonId: 'weather-flood',
    topicId: 'weather',
    title: 'Lái xe trong mưa lớn',
    context: 'Mưa lớn, nước đọng và bụi nước từ xe khác làm giảm tầm nhìn, độ bám và tăng quãng đường dừng. Lốp có thể mất tiếp xúc mặt đường do lớp nước, kể cả khi xe có ABS, cân bằng điện tử hoặc lốp còn mới.',
    objective: 'Điều chỉnh theo tầm nhìn và độ bám, nhận biết nguy cơ mất lái và chọn nơi dừng phù hợp trước khi không thể tiếp tục an toàn.',
    risk: 'high',
    difficulty: 3,
    minutes: 7,
    tags: { speedRange: 'suburban', spaceConstraint: 'open', visibility: 'poor', stress: 'high' },
    steps: [
      { instruction: 'Kiểm tra dự báo, lộ trình và điểm dừng trước khi đi; kiểm tra lốp đúng áp suất theo sách xe, độ mòn, gạt mưa, nước rửa kính, đèn và sấy kính. Hoãn đi nếu mưa hoặc thiết bị không cho phép nhìn và điều khiển an toàn; không chỉnh thiết bị hay xem điện thoại làm mất tập trung khi đang lái.', cueType: 'marker', cueText: 'Kính, lốp và thiết bị tốt không bảo đảm đi được trong mọi cơn mưa' },
      { instruction: 'Bật đèn chiếu gần và kiểm tra đèn hậu sáng khi mưa hạn chế tầm nhìn; không dùng đèn chiếu xa gây chói. Không mặc định AUTO hoặc đèn ban ngày đã bật đèn hậu; dùng gạt mưa và sấy kính theo sách xe, dừng an toàn nếu kính vẫn không rõ.', cueType: 'marker', cueText: 'Đèn ban ngày không thay bộ đèn chiếu sáng; nhìn rõ cả kính và gương' },
      { instruction: 'Giảm tốc sớm, êm, theo biển, tầm nhìn, nước đọng, độ bám và tải xe để có thể dừng trong phần đường nhìn rõ và trống; không có tỷ lệ giảm tốc bảo đảm an toàn. Tắt cruise control hoặc ACC theo sách xe trước đoạn mưa trơn, không dựa vào hệ thống tự giữ tốc độ hay làn; giảm thêm hoặc tìm nơi dừng khi không còn đủ điều kiện.', cueType: 'feel', cueText: 'Giới hạn tốc độ không phải tốc độ an toàn trong mọi điều kiện' },
      { instruction: 'Tăng cự ly với xe trước theo quy định và tăng thêm khi mưa, trơn hoặc bị che tầm nhìn; nhìn xa và hai bên, không chỉ nhìn đèn hậu xe trước. Bốn đến năm giây không phải khoảng cách bảo đảm cho mọi tốc độ, mặt đường hoặc tải xe; tránh tăng tốc để thoát xe bám sau.', cueType: 'timing', cueText: 'Khoảng trống phải cho phép quan sát và dừng, không có số giây chung' },
      { instruction: 'Giữ làn và quan sát xa để giảm tốc trước vũng nước, cua hoặc bụi nước từ xe lớn; không mặc định vệt bánh xe trước khô hay an toàn, không đánh lái gấp né nước hoặc đổi làn khi chưa thấy rõ. Tránh đường ngập che mặt đường, không đi theo xe khác để thử vượt ngập; chú ý người đi bộ, xe máy và không tạt nước vào họ.', cueType: 'marker', cueText: 'Vệt bánh có thể là rãnh đọng nước; không bám theo để tìm đường' },
      { instruction: 'Nhả ga êm nếu vô-lăng nhẹ, phản hồi kém hoặc xe chao trên nước vì đó có thể là mất bám; giữ hướng ổn định phù hợp đường, không giật lái, đạp phanh gấp hoặc về số đột ngột chỉ để thử lấy lại bám. Khi bám lại, giảm tốc và điều chỉnh êm; nếu có nguy hiểm va chạm tức thời vẫn phanh khẩn cấp, với ABS đạp mạnh và giữ lực theo sách xe, không nhấp nhả. ABS và cân bằng điện tử không tạo lại độ bám theo ý muốn.', cueType: 'feel', cueText: 'Dấu hiệu có thể là trượt nước, không phải chẩn đoán chắc chắn; bất thường kéo dài thì dừng kiểm tra' },
      { instruction: 'Chọn nơi dừng sớm khi không thể nhìn đủ xa để dừng trong khoảng trống, không chờ mất vạch kẻ mới xử lý; kiểm tra gương, giảm tốc êm, báo rẽ và quan sát trước khi vào điểm dừng được phép, khô, ngoài dòng xe. Ưu tiên trạm nghỉ hoặc lối ra còn tiếp cận an toàn; không dừng trú mưa trên làn đang chạy, làn khẩn cấp cao tốc, dưới gầm cầu hoặc nơi trũng dễ ngập, không phanh gấp hay cắt làn để tấp vào.', cueType: 'marker', cueText: 'Chỉ chuyển vào khi thấy rõ lối và khoảng trống; làn khẩn cấp không phải bãi nghỉ' },
      { instruction: 'Báo nguy hiểm nếu buộc phải dừng vì không thể đi tiếp an toàn; dùng đèn cảnh báo sự cố theo quy định và gọi hỗ trợ khi đã dừng, không cố chạy mù đến lối ra. Trên cao tốc, nếu bất khả kháng buộc dừng thì vào làn dừng khẩn cấp cùng chiều nếu còn tiếp cận an toàn, bật đèn khẩn cấp; nếu không vào được thì bật đèn và báo ngay CSGT hoặc đơn vị quản lý đường. Quy định yêu cầu biển hoặc đèn cảnh báo phía sau tối thiểu 150 mét khi không vào được làn khẩn cấp; nhờ hỗ trợ triển khai an toàn, không bước vào dòng xe để đặt hay tự sửa. Gọi cứu nạn nếu người gặp nguy hiểm. Khi đã ở điểm dừng an toàn, giữ chắc xe; chỉ nhập lại khi tầm nhìn, độ bám và xe đáp ứng, kiểm tra gương, điểm mù, báo rẽ và nhường xe đang chạy.', cueType: 'marker', cueText: 'Đèn cảnh báo không thay xi-nhan, đèn chiếu sáng hoặc cho phép đỗ sai; không bật chỉ vì đang lái trong mưa' }
    ],
    mistakes: [
      'Coi giảm hai mươi phần trăm, giãn bốn đến năm giây hoặc lốp mới là đủ an toàn.',
      'Bám vệt bánh xe trước, để cruise hoặc ACC tự xử lý, giật lái hay đạp phanh gấp để thử độ bám.',
      'Chờ mất vạch mới dừng, cắt làn trú dưới cầu hoặc coi đèn cảnh báo là quyền đỗ ở bất kỳ đâu.'
    ],
    recovery: 'Nghi mất bám trên nước: nhả ga êm, giữ hướng ổn định phù hợp đường, tránh giật lái, phanh gấp hoặc về số đột ngột chỉ để thử lấy lại bám; khi bám lại thì điều chỉnh êm và giảm tốc. Nếu nguy hiểm va chạm tức thời, phanh khẩn cấp ngay; với ABS đạp mạnh, giữ lực theo sách xe, không nhấp nhả. Bất thường lái, phanh hoặc đèn cảnh báo kéo dài thì dừng an toàn, gọi hỗ trợ, không cố thử tiếp. Không còn đủ tầm nhìn thì tìm điểm dừng được phép nếu tiếp cận được an toàn; nếu không thể tiếp tục, cảnh báo, gọi cứu nạn hoặc quản lý đường khi đã dừng, không chạy mù hay bước vào dòng xe.',
    safety: 'Không có tốc độ, tỷ lệ giảm hoặc số giây chung bảo đảm chống trượt nước; giữ cự ly theo quy định và tăng theo điều kiện, tránh đường ngập, không dựa vào ABS, ACC hay lốp mới. Nghi mất bám thì nhả ga êm, không giật lái; nguy hiểm va chạm tức thời vẫn phanh ngay, với ABS đạp mạnh giữ lực, không nhấp nhả. Không chờ mất vạch mới tìm điểm dừng được phép; không trú mưa trên làn chạy hay làn khẩn cấp cao tốc, không cố chạy mù. Bất khả kháng buộc dừng trên cao tốc thì vào làn khẩn cấp cùng chiều nếu còn an toàn, bật đèn khẩn cấp; nếu không vào được thì cảnh báo, báo ngay CSGT hoặc quản lý đường và nhờ hỗ trợ cảnh báo phía sau theo quy định, không bước vào dòng xe. Gọi cứu nạn nếu người gặp nguy hiểm; đèn cảnh báo không thay xi-nhan hay quyền đỗ sai.',
    mnemonic: { text: 'Đèn gần, chậm, xa; thiếu tầm nhìn, tìm điểm dừng.', rhythm: 'ba-nhip' },
    checklistId: 'bad_weather',
    quickCheck: [
      { prompt: 'Chọn tốc độ và cự ly khi mưa lớn như thế nào?', options: ['Giảm đúng hai mươi phần trăm, giữ bốn giây là đủ', 'Theo biển, quy định, tầm nhìn và độ bám; giảm để dừng trong khoảng thấy rõ, tăng cự ly theo điều kiện', 'Giữ tốc độ nếu có lốp mới và ACC'], correctIndex: 1 },
      { prompt: 'Vô-lăng nhẹ, xe phản hồi kém trên nước nhưng chưa có nguy hiểm va chạm tức thời, nên làm gì?', options: ['Phanh gấp và giật lái để thử lấy lại bám', 'Nhả ga êm, giữ hướng ổn định phù hợp đường, tránh thao tác gấp; điều chỉnh êm khi bám lại', 'Tăng ga và bám vệt bánh xe trước'], correctIndex: 1 },
      { prompt: 'Không còn đủ tầm nhìn để đi tiếp an toàn, nên xử lý thế nào?', options: ['Dừng trú mưa ngay trên làn khẩn cấp hoặc dưới cầu', 'Giảm tốc êm, quan sát và báo rẽ vào điểm dừng được phép nếu tiếp cận an toàn; nếu không thể đi tiếp thì cảnh báo, gọi hỗ trợ khi dừng, không chạy mù', 'Bật cảnh báo rồi tiếp tục bám sát đèn hậu xe trước'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng lái xe trong mưa lớn.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ tỷ lệ tốc độ và cự ly cố định, sửa mất bám và phanh khẩn cấp, chuẩn bị đèn kính lốp, điểm dừng theo tầm nhìn; thay hai sơ đồ và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  })
]
