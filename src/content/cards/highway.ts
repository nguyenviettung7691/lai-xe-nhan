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
    context: 'Bạn cần rời cao tốc qua lối ra bên phải nhưng còn ở làn bên trái và dòng xe khá dày. Cần chuẩn bị sớm theo biển, vạch thực tế; nếu không còn đủ khoảng trống để ra an toàn thì chấp nhận đi tiếp.',
    objective: 'Chuyển từng làn an toàn về bên phải, dùng làn giảm tốc nếu có và chọn tốc độ phù hợp trước đường nhánh; bỏ lối ra khi đã quá muộn.',
    risk: 'high',
    difficulty: 3,
    minutes: 5,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Đọc trước thông tin lối ra của hành trình; đọc sớm biển chỉ dẫn và vạch phân làn thực tế, chuyển dần về làn sát bên phải khi còn đủ đường và khoảng trống.', cueType: 'sign', cueText: 'Theo biển, vạch tại chỗ; không chờ một mốc ki-lô-mét cố định hay làm theo dẫn đường trái biển' },
      { instruction: 'Bật xi-nhan phải báo trước mỗi lần chuyển làn; kiểm tra gương trong, gương phải và khoảng hở phía trước, phía sau, hai bên; nhường xe đang ở làn định vào.', cueType: 'mirror', cueText: 'Xi-nhan không tạo quyền ưu tiên; chú ý xe sau đến nhanh' },
      { instruction: 'Kiểm tra lại điểm mù bên phải ngay trước khi dịch ngang, chỉ liếc ngắn rồi nhìn lại phía trước; qua vạch đứt ở nơi cho phép vào một làn liền kề, ổn định xe rồi quan sát lại trước lần chuyển tiếp.', cueType: 'mirror', cueText: 'Không đếm vài giây để mặc nhiên chuyển tiếp; không cắt vạch liền hoặc vùng gạch chéo', steeringHint: 'dịch ngang êm, không cắt chéo nhiều làn' },
      { instruction: 'Báo hiệu phải kịp thời khi tới làn sát bên phải và quan sát làn giảm tốc, xe phía trước cùng hàng xe chờ ở đường nhánh; chỉ vào làn giảm tốc qua đoạn vạch cho phép khi đủ khoảng hở.', cueType: 'marker', cueText: 'Không dùng làn dừng khẩn cấp hoặc lề đường làm làn ra' },
      { instruction: 'Đưa toàn bộ xe ổn định trong làn giảm tốc nếu có, rồi giảm tốc đều cho lối ra khi điều kiện cho phép. Nếu làn giảm tốc ngắn hoặc có ùn tắc, chướng ngại hay điều kiện xấu, phải giảm tốc hoặc phanh sớm để an toàn, kể cả trên làn chính; không cố giữ tốc độ.', cueType: 'feel', cueText: 'Không phanh gấp chỉ để bắt kịp lối ra; vẫn phanh khi cần tránh va chạm', speedHint: 'theo biển báo, dòng xe, tầm nhìn và độ bám' },
      { instruction: 'Giảm tốc từ từ trên làn dẫn ra phù hợp điều kiện nếu không có làn giảm tốc riêng; theo biển và vạch dẫn vào lối ra, báo hiệu sớm và quan sát xe sau, không phanh đột ngột chỉ vì sắp lỡ lối ra.', cueType: 'sign', cueText: 'Không giả định lối ra nào cũng có làn giảm tốc' },
      { instruction: 'Liếc ngắn đồng hồ tốc độ rồi nhìn lại đường; sau khi chạy cao tốc lâu, cảm giác có thể đánh giá tốc độ thấp hơn thực tế. Giảm tốc trước đoạn cong và hàng xe chờ, tuân thủ biển tốc độ đường nhánh, giảm thêm khi mưa trơn hoặc khuất tầm nhìn; giữ tín hiệu qua thao tác rời làn và tắt khi hoàn tất.', cueType: 'marker', cueText: 'Không đợi tới giữa cua mới giảm tốc; không mặc định đường nhánh đang trống' },
      { instruction: 'Giữ làn đi tiếp tới lối ra phù hợp tiếp theo nếu không đủ khoảng hở hoặc đã qua đoạn được phép vào lối ra; không cắt vạch liền hay vùng gạch chéo, không lùi, quay đầu, dừng để quay lại hoặc chạy trên làn dừng khẩn cấp hay lề đường.', cueType: 'timing', cueText: 'Bỏ lối ra, không bỏ an toàn; chỉ chỉnh dẫn đường khi an toàn' }
    ],
    mistakes: [
      'Cắt chéo nhiều làn hoặc cắt vạch liền, vùng gạch chéo để cố bắt lối ra.',
      'Phanh gấp chỉ vì sợ lỡ lối ra, hoặc cố giữ tốc độ dù phía trước đang ùn tắc vì nghĩ không được phanh trên làn chính.',
      'Chỉ dựa vào cảm giác tốc độ sau khi chạy cao tốc lâu, vào cua đường nhánh quá nhanh hoặc không thấy hàng xe chờ.'
    ],
    recovery: 'Nếu khe chuyển làn đóng lại, hoãn chuyển và giữ làn, điều chỉnh tốc độ theo xe trước, không ép xe khác nhường. Nếu quá muộn thì đi tiếp tới lối ra phù hợp tiếp theo; không lùi, quay đầu, dừng để quay lại, cắt vùng gạch chéo hay dùng làn dừng khẩn cấp hoặc lề đường. Nếu đã ở đường nhánh, tiếp tục theo biển, không cắt ngược về làn chính. Để dẫn đường tính lại, chỉ thao tác thiết bị khi đã dừng ở nơi được phép và an toàn hoặc nhờ hành khách; lỡ lối ra không phải tình huống cho phép dừng khẩn cấp.',
    safety: 'Chuẩn bị sớm, báo hiệu và quan sát gương, điểm mù trước mỗi lần chuyển một làn; chỉ chuyển ở nơi cho phép khi đủ khoảng hở. Giảm tốc thông thường khi toàn bộ xe đã ổn định trong làn giảm tốc nếu có, nhưng phải giảm tốc hoặc phanh sớm nếu làn giảm tốc ngắn hoặc có ùn tắc, chướng ngại hay điều kiện xấu, kể cả trên làn chính. Nếu không đủ điều kiện vào lối ra, giữ làn đi tiếp; không cắt vạch liền hoặc vùng gạch chéo, không lùi, quay đầu, dừng để quay lại hay chạy trên làn dừng khẩn cấp hoặc lề đường. Chọn tốc độ theo biển và điều kiện, giảm trước cua và hàng xe chờ.',
    mnemonic: { text: 'Nhìn sớm, chuyển từng làn; quá muộn, đi tiếp.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Còn ở làn bên trái, bạn chuẩn bị ra khỏi cao tốc thế nào?', options: ['Đợi đúng mốc 300 m rồi cắt chéo sang phải', 'Đọc biển sớm; báo hiệu, kiểm tra gương và điểm mù, đủ hở mới chuyển từng làn nơi cho phép, ổn định rồi quan sát lại', 'Bật xi-nhan để các xe ở làn phải bắt buộc nhường'], correctIndex: 1 },
      { prompt: 'Phía trước đang ùn lại khi bạn chưa vào hết làn giảm tốc, phải làm gì?', options: ['Giữ nguyên tốc độ vì không được phanh trên làn chính', 'Chỉ phanh sau khi một bánh xe qua vạch', 'Giảm tốc hoặc phanh sớm để an toàn, kể cả trên làn chính; khi bình thường, giảm tốc cho lối ra sau khi toàn bộ xe ổn định trong làn giảm tốc'], correctIndex: 2 },
      { prompt: 'Đã qua đoạn vạch cho phép vào lối ra hoặc không còn khe an toàn, bạn làm gì?', options: ['Cắt vùng gạch chéo hoặc chạy trên lề để kịp rẽ', 'Giữ làn đi tiếp tới lối ra phù hợp tiếp theo; không lùi, quay đầu, dừng để quay lại hay dùng làn dừng khẩn cấp', 'Dừng trên làn chính chờ tìm khe quay lại'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng rời cao tốc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ mốc cố định, làm rõ quan sát từng làn, phanh theo nguy hiểm và bỏ lối ra quá muộn; thay hai sơ đồ làn giảm tốc và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'highway-signs',
    lessonId: 'highway-entry',
    topicId: 'highway',
    title: 'Đọc biển báo tốc độ và làn đường',
    context: 'Bạn đang đi trên cao tốc có biển tốc độ và phân làn; phía trước có thể đổi giới hạn, thi công hoặc ùn tắc. Cần hiểu biển áp dụng cho làn và loại xe nào, không chỉ nhớ một con số ở đầu tuyến.',
    objective: 'Phân biệt tốc độ tối đa, tối thiểu; chọn làn được phép và điều chỉnh tốc độ theo hiệu lực biển cùng điều kiện thực tế.',
    risk: 'medium',
    difficulty: 2,
    minutes: 5,
    tags: { speedRange: 'highway', spaceConstraint: 'open', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Đọc biển tròn viền đỏ, nền trắng, số đen là tốc độ tối đa; biển tròn nền xanh lam, số trắng là tốc độ tối thiểu. Số trên biển tính bằng ki-lô-mét mỗi giờ, không phải tốc độ bắt buộc phải đạt trong mọi tình huống.', cueType: 'sign', cueText: 'Viền đỏ: không vượt số; nền xanh: tối thiểu khi thuận lợi, an toàn' },
      { instruction: 'Đọc cả bảng phân làn, ký hiệu loại xe, mũi tên làn và biển phụ để biết giới hạn áp dụng cho xe mình ở đâu; chọn làn được phép cho loại xe và hướng đi trước, không coi làn trái là làn được vượt giới hạn tốc độ.', cueType: 'sign', cueText: 'Giới hạn theo làn không tự cho phép mọi loại xe đi vào làn đó' },
      { instruction: 'Quan sát biển liên tục, không chỉ tại nút giao: chú ý biển thay đổi tốc độ, biển điện tử, biển tạm ở công trường, biển hết hạn chế và chỉ dẫn của người điều khiển giao thông. Xác định phạm vi và vị trí hiệu lực qua biển chính, biển phụ; không tự coi qua nút giao là được tăng tốc.', cueType: 'sign', cueText: 'Biển thực tế và chỉ dẫn hợp lệ, không phải trí nhớ hay ứng dụng dẫn đường' },
      { instruction: 'Giảm tốc khi thấy giới hạn tối đa thấp hơn sắp có hiệu lực: quan sát phía trước và gương, giảm tốc êm từ sớm để không vượt mức mới ngay từ vị trí có hiệu lực; không chờ qua biển mới phanh hoặc đổi làn để né giới hạn.', cueType: 'timing', cueText: 'Biển có thể kèm vị trí hoặc phạm vi áp dụng; không có quãng phanh chung', speedHint: 'theo biển áp dụng, dòng xe, tầm nhìn và độ bám' },
      { instruction: 'Giữ tốc độ không vượt tốc độ tối đa áp dụng; chỉ duy trì ít nhất tốc độ tối thiểu khi điều kiện giao thông thuận lợi và an toàn. Khi ùn tắc, mưa trơn, tầm nhìn kém hoặc có chướng ngại, giảm tốc hoặc phanh theo nguy hiểm, kể cả xuống dưới mức tối thiểu; không tăng ga chỉ để đủ số trên biển.', cueType: 'feel', cueText: 'Tối đa là trần, không phải mục tiêu; không ép tốc độ khi không an toàn' },
      { instruction: 'Chọn đi về bên phải trong các làn được phép khi an toàn nếu đi chậm hơn dòng xe. Sau khi vượt, chỉ trở lại làn bên phải khi đủ khoảng hở, không tạt đầu xe vừa vượt; không dùng làn dừng khẩn cấp hoặc lề đường làm làn chạy.', cueType: 'marker', cueText: 'Không có quyền vượt giới hạn dù xe sau thúc ép' },
      { instruction: 'Bật xi-nhan báo trước mỗi lần chuyển làn, kiểm tra gương, khoảng hở trước sau và hai bên; kiểm tra lại điểm mù bên chuyển ngay trước khi dịch ngang, chỉ liếc ngắn rồi nhìn lại đường. Chỉ chuyển một làn liền kề qua vạch cho phép khi an toàn, không cắt vạch liền; ổn định xe rồi quan sát lại, tắt xi-nhan khi hoàn tất.', cueType: 'mirror', cueText: 'Xi-nhan không tạo quyền ưu tiên; chưa đủ hở thì chưa chuyển' },
      { instruction: 'Giữ kiểm soát nếu chưa đọc rõ biển hoặc lỡ ở sai làn; không phanh gấp chỉ để đọc lại, dừng xem biển, lùi hay quay đầu trên cao tốc. Điều chỉnh tốc độ an toàn theo giới hạn đang áp dụng và quan sát tiếp; chỉ sửa làn qua vạch cho phép khi đủ hở, nếu lỡ hướng ra thì đi tiếp tới lối ra phù hợp.', cueType: 'sign', cueText: 'Không đoán giới hạn cao hơn hoặc chạy theo xe trước' }
    ],
    mistakes: [
      'Chỉ nhìn con số, bỏ qua màu biển, làn, loại xe hoặc biển phụ; tưởng làn trái cho phép chạy nhanh tùy ý.',
      'Cố giữ tốc độ tối thiểu trong ùn tắc, mưa trơn hoặc tầm nhìn kém; coi tốc độ tối đa là mục tiêu phải đạt.',
      'Qua biển giới hạn thấp hơn mới giảm tốc, hoặc tạt sang làn khác và dùng lề để né hạn chế.'
    ],
    recovery: 'Nếu nhận ra đang vượt giới hạn, nhả ga và giảm tốc có kiểm soát, quan sát phía trước và xe sau; vẫn phanh ngay khi cần tránh va chạm. Nếu sai làn, báo hiệu, kiểm tra gương và điểm mù, nhường xe ở làn nhận, chỉ chuyển từng làn qua vạch cho phép khi đủ hở. Không cắt vạch liền, tạt nhiều làn, dùng làn dừng khẩn cấp hoặc lề đường; không dừng đọc biển, lùi hay quay đầu. Lỡ hướng ra thì đi tiếp tới lối ra phù hợp; chỉ kiểm tra lại hành trình bằng thiết bị khi đã dừng tại nơi được phép và an toàn. Nếu xe gặp sự cố không duy trì được hành trình an toàn, thực hiện quy trình sự cố cao tốc và gọi hỗ trợ, không cố tăng ga để đạt tối thiểu.',
    safety: 'Chấp hành chỉ dẫn của người điều khiển giao thông và hệ thống báo hiệu theo thứ tự hiệu lực; đọc đúng phạm vi làn, loại xe, biển phụ và vị trí có hiệu lực. Không vượt tốc độ tối đa áp dụng; tối thiểu chỉ duy trì khi giao thông thuận lợi và an toàn. Ùn tắc, mưa trơn, thiếu tầm nhìn hoặc chướng ngại thì giảm tốc hoặc phanh theo nguy hiểm, kể cả dưới mức tối thiểu. Không đổi làn đột ngột để né biển; báo hiệu, kiểm tra gương và điểm mù, đủ hở mới chuyển từng làn qua vạch cho phép. Không chạy trên làn dừng khẩn cấp hoặc lề đường, không dừng đọc biển, lùi hay quay đầu; lỡ lối ra thì đi tiếp.',
    mnemonic: { text: 'Đúng biển, đúng làn; gặp nguy giảm tốc, đủ hở chuyển.', rhythm: 'doi-ve' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Biển tròn viền đỏ số 80 và biển tròn nền xanh số 60 áp dụng cho xe, làn của bạn có nghĩa gì?', options: ['Phải chạy đúng 80 dù đường mưa trơn', 'Tối đa 80 km/h; tối thiểu 60 km/h chỉ khi giao thông thuận lợi và an toàn, không phải tốc độ bắt buộc trong nguy hiểm', 'Làn trái được vượt 80 nếu cần vượt xe'], correctIndex: 1 },
      { prompt: 'Phía trước ùn tắc nhưng đoạn đường có biển tốc độ tối thiểu, bạn làm gì?', options: ['Giảm tốc hoặc phanh theo dòng xe và nguy hiểm, kể cả dưới mức tối thiểu; giữ khoảng cách, không lách ra lề', 'Giữ đủ tốc độ tối thiểu dù phải áp sát xe trước', 'Chuyển ngay ra làn dừng khẩn cấp để giữ tốc độ'], correctIndex: 0, isStopCondition: true },
      { prompt: 'Thấy giới hạn tối đa thấp hơn phía trước và đang muốn về làn phải sau khi vượt, bạn xử lý thế nào?', options: ['Chờ qua biển mới phanh và tạt về phải', 'Sang bất kỳ làn phải nào để không phải giảm tốc', 'Giảm tốc êm từ sớm để đúng mức mới từ vị trí hiệu lực; chỉ về làn phải được phép sau khi báo hiệu, kiểm tra gương và điểm mù, đủ hở, qua vạch cho phép'], correctIndex: 2 }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về đọc biển báo trên cao tốc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Phân biệt tối đa và tối thiểu có điều kiện, phạm vi biển, chọn và chuyển làn an toàn; thay hai sơ đồ, câu hỏi và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'highway-gap',
    lessonId: 'highway-flow',
    topicId: 'highway',
    title: 'Giữ khoảng cách theo tốc độ và điều kiện đường',
    context: 'Bạn theo xe trên cao tốc, có thể gặp xe chen vào, mưa hoặc dòng xe chậm lại. Đếm thời gian qua mốc cố định giúp kiểm tra cự ly, nhưng không thay thế biển báo, khoảng cách theo tốc độ hay quan sát nguy hiểm.',
    objective: 'Dùng mốc thời gian để kiểm tra khoảng cách với xe liền trước cùng làn, đồng thời đáp ứng cự ly theo biển, tốc độ, độ bám và tầm nhìn.',
    risk: 'medium',
    difficulty: 2,
    minutes: 5,
    tags: { speedRange: 'highway', spaceConstraint: 'open', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Đọc và tuân thủ biển cự ly tối thiểu giữa hai xe. Khi đường khô, không trơn, thẳng, bằng phẳng và tầm nhìn tốt: đúng 60 km/h giữ ít nhất 35 m; trên 60 đến 80 km/h: 55 m; trên 80 đến 100 km/h: 70 m; trên 100 đến 120 km/h: 100 m. Dưới 60 km/h, chọn cự ly an toàn theo mật độ và tình hình thực tế, không mặc định 35 m.', cueType: 'sign', cueText: 'Thông tư 38/2024/TT-BGTVT, Điều 11; số mét không phải quãng dừng chung cho mọi xe' },
      { instruction: 'Giữ khoảng cách trong điều kiện khô ráo, thuận lợi bằng cách dùng ít nhất ba giây làm mốc tham khảo bổ sung; luôn giữ đủ cự ly theo biển và tốc độ, chọn khoảng cách lớn hơn nếu cần. Ba giây không phải mức tối thiểu pháp luật chung hay bảo đảm dừng kịp.', cueType: 'timing', cueText: 'Ở 120 km/h, ba giây chỉ tương đương 100 m, chưa có dự phòng sai số' },
      { instruction: 'Chọn một mốc cố định dễ thấy bên đường, như cột biển; bắt đầu đếm khi đuôi xe trước ngang mốc, kết thúc khi đầu xe mình ngang cùng mốc. Đếm đủ từng giây, không đếm ba nhịp nhanh; chỉ liếc ngắn, luôn quan sát đường phía trước, không nhìn đồng hồ hay điện thoại.', cueType: 'marker', cueText: 'Cùng một mốc: đuôi xe trước bắt đầu, đầu xe mình kết thúc' },
      { instruction: 'Quan sát phía trước và gương khi khoảng cách thiếu, nhả ga hoặc phanh êm khi có thể để mở khoảng trống, không phanh gấp chỉ để chỉnh cự ly. Nếu xe trước phanh gấp hoặc nguy cơ va chạm xuất hiện, phanh ngay theo tình huống, không chỉ chờ nhả ga.', cueType: 'feel', cueText: 'Phanh khẩn cấp khi cần tránh va chạm; không bị quy tắc đếm giây làm chậm phản ứng' },
      { instruction: 'Tăng khoảng cách khi mưa hoặc đường ướt: ít nhất tăng gấp đôi mốc khô đang dùng, từ ba giây thành ít nhất sáu giây, có thể cần nhiều hơn. Khi trơn, sương mù, đường quanh co, đèo dốc hoặc tầm nhìn hạn chế, giữ cự ly lớn hơn trị số trên biển hoặc bảng quy định; giảm tốc phù hợp độ bám và tầm nhìn, không coi sáu giây là đủ cho mọi tình huống.', cueType: 'timing', cueText: 'Gấp đôi là tham khảo thực hành, không phải công thức pháp luật hay giới hạn tối đa' },
      { instruction: 'Chọn tốc độ để có thể dừng trong phần đường nhìn rõ là trống; nhìn xa qua xe trước khi có thể. Sau xe lớn che tầm nhìn, tăng khoảng cách và giảm tốc nếu cần; không dựa hoàn toàn vào đèn phanh, cảm biến hoặc ga tự động thích ứng.', cueType: 'marker', cueText: 'Đủ giây nhưng không thấy rõ đường vẫn phải giảm tốc' },
      { instruction: 'Kiểm tra lại sau khi đổi tốc độ, vượt, chuyển làn hoặc xe khác chen vào. Giữ làn và tạo lại khoảng cách êm khi có thể, phanh ngay nếu cần tránh va chạm; không tăng tốc chặn xe chen, đánh lái đột ngột hay chạy ra làn dừng khẩn cấp hoặc lề đường.', cueType: 'mirror', cueText: 'Xe chen vào thì tạo lại khoảng trống, không tranh chỗ' }
    ],
    mistakes: [
      'Coi ba giây thay thế biển cự ly và số mét theo tốc độ, hoặc đếm ba nhịp nhanh thành ba giây.',
      'Bám sát xe trước để tránh bị xe khác chen vào.',
      'Coi bốn đến năm giây hoặc sáu giây là luôn đủ khi mưa, tầm nhìn kém hoặc đường trơn.'
    ],
    recovery: 'Nếu xe chen làm mất cự ly, nhìn đường và gương, giữ làn, nhả ga hoặc phanh êm để tạo lại khoảng cách khi có thể; không tăng tốc chặn hay đánh lái đột ngột. Nếu xe trước phanh gấp hoặc sắp va chạm, phanh ngay theo tình huống, không chờ đếm xong hay chỉ nhả ga. Không chạy ra làn dừng khẩn cấp hoặc lề đường để tránh việc giữ khoảng cách; chỉ chuyển làn khi đã quan sát gương, điểm mù, đủ khoảng hở trước sau, báo hiệu và vạch cho phép.',
    safety: 'Tuân thủ biển cự ly tối thiểu và khoảng cách theo tốc độ tại Điều 11 Thông tư 38/2024/TT-BGTVT. Ba giây chỉ là mốc tham khảo khi khô ráo, không thay thế số mét hay bảo đảm dừng kịp. Mưa, trơn, quanh co, đèo dốc hoặc tầm nhìn hạn chế phải tăng cự ly lớn hơn trị số trên biển hoặc bảng; mưa ít nhất gấp đôi mốc khô, từ ba thành ít nhất sáu giây, có thể cần hơn và phải giảm tốc để dừng trong phần đường nhìn rõ là trống. Tạo lại cự ly êm khi có thể nhưng phanh ngay nếu cần tránh va chạm; không đánh lái đột ngột hay chạy ra làn dừng khẩn cấp hoặc lề đường.',
    mnemonic: { text: 'Đúng biển, đủ xa; mưa tăng, khuất giảm tốc.', rhythm: 'doi-ve' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Đếm thời gian qua mốc cố định thế nào, và có thay thế biển cự ly không?', options: ['Đếm ba nhịp nhanh từ đầu xe trước đến đầu xe mình là luôn đủ', 'Đếm đủ giây từ đuôi xe trước đến đầu xe mình qua cùng mốc; vẫn tuân thủ biển và cự ly theo tốc độ, điều kiện đường', 'Đủ ba giây thì bỏ qua biển cự ly tối thiểu'], correctIndex: 1 },
      { prompt: 'Bạn đang dùng mốc ba giây trên đường khô, sau đó gặp mưa; cần làm gì?', options: ['Giữ bốn đến năm giây là luôn đủ dù mưa nặng hạt', 'Tăng lên ít nhất sáu giây, có thể hơn; giữ cự ly lớn hơn biển hoặc bảng khi điều kiện xấu và giảm tốc theo độ bám, tầm nhìn', 'Chỉ tăng khoảng cách, không cần giảm tốc dù không nhìn rõ đường'], correctIndex: 1 },
      { prompt: 'Xe chen vào trước bạn rồi phanh gấp, nguy cơ va chạm xuất hiện; xử lý thế nào?', options: ['Chỉ nhả ga để xe sau không phải phanh', 'Đánh lái ngay ra làn dừng khẩn cấp', 'Phanh ngay theo tình huống để tránh va chạm, không chờ đếm xong; giữ kiểm soát xe, không đánh lái đột ngột'], correctIndex: 2, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về quy tắc khoảng cách ba giây.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Làm rõ cự ly theo biển, tốc độ và điều kiện; sửa đếm giây, mưa và phanh khẩn cấp, thay hai sơ đồ và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'highway-overtake-truck',
    lessonId: 'highway-flow',
    topicId: 'highway',
    title: 'Vượt xe tải dài',
    context: 'Bạn đi sau xe tải dài trên cao tốc có các làn cùng chiều, dự định chuyển sang làn bên trái để đi lên trước. Xe tải che khuất đường, có điểm mù trước, sau và hai bên; gió ngang và bụi nước có thể làm việc đi cạnh xe tải khó kiểm soát, không cần vượt nếu chưa đủ điều kiện.',
    objective: 'Chỉ đi lên trước xe tải bằng làn bên trái khi được phép và đủ an toàn trong giới hạn tốc độ; không lưu lại cạnh xe, không tạt đầu khi trở về làn phải.',
    risk: 'high',
    difficulty: 4,
    minutes: 6,
    tags: { speedRange: 'highway', spaceConstraint: 'medium', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giữ cự ly sau xe tải theo biển báo, tốc độ và điều kiện đường; tăng thêm khi mưa hoặc bị che tầm nhìn. Thấy gương xe tải không bảo đảm tài xế thấy bạn và không thay thế khoảng cách an toàn.', cueType: 'mirror', cueText: 'Giãn cự ly bằng giảm tốc phù hợp, không chạy lùi; tránh bám đuôi để nhìn đường' },
      { instruction: 'Đọc biển, vạch và phân làn; chỉ chuẩn bị đi lên trước bằng làn bên trái liền kề được phép sử dụng. Cần nhìn rõ đủ đường, chỗ trống phía trước xe tải và khả năng đi qua mà không vượt giới hạn tốc độ; nếu xe tải gần bằng tốc độ cho phép, có hàng xe chờ, mưa che tầm nhìn hoặc gió mạnh khó giữ làn thì hoãn vượt.', cueType: 'sign', cueText: 'Không đua tốc độ, không cố vượt vì xe sau thúc ép', speedHint: 'theo biển báo, loại xe, độ bám, tầm nhìn và dòng xe' },
      { instruction: 'Bật xi-nhan trái báo trước; kiểm tra gương trong, gương trái, khoảng hở phía trước, phía sau và hai bên, nhất là xe làn trái đến nhanh. Kiểm tra lại điểm mù trái ngay trước khi dịch ngang, chỉ liếc ngắn rồi nhìn lại đường; chưa chắc an toàn thì giữ làn và chờ sau xe tải.', cueType: 'mirror', cueText: 'Xi-nhan không tạo quyền ưu tiên; cảnh báo điểm mù chỉ hỗ trợ' },
      { instruction: 'Chuyển êm một làn liền kề qua vạch đứt được phép khi đủ khoảng hở, ổn định giữa làn trái rồi tắt xi-nhan. Điều chỉnh tốc độ để đi lên trước khi an toàn nhưng không vượt giới hạn; không áp sát đuôi xe tải lấy đà và không luồn sang phải hay dùng làn dừng khẩn cấp hoặc lề đường để vượt.', cueType: 'marker', cueText: 'Bài này minh họa đi lên trước bên trái trên đường nhiều làn cùng chiều', steeringHint: 'dịch ngang êm, không cắt nhiều làn' },
      { instruction: 'Giữ giữa làn và khoảng hở ngang khi ngang xe tải, nhìn đường phía trước, giữ chắc vô-lăng để ứng phó gió và bụi nước; không giật lái hoặc cố giữ ga khi cần giảm tốc vì nguy hiểm. Không lưu lại cạnh xe tải; nếu không thể đi qua an toàn trong giới hạn tốc độ thì bỏ ý định vượt, không tăng tốc đua xe tải.', cueType: 'feel', cueText: 'Điểm mù thay đổi theo xe và gương; không có vùng cạnh xe nào được bảo đảm nhìn thấy' },
      { instruction: 'Chờ đến khi đã đi hẳn lên trước, đủ cự ly với xe trước và đủ khoảng hở sau cho xe tải theo tốc độ tương đối mới chuẩn bị về làn phải. Thấy toàn bộ xe tải trong gương trong chỉ là mốc hỗ trợ, không bảo đảm đủ cự ly; không chỉ dựa vào đầu xe tải trong gương phải. Nếu gương trong bị che hoặc chưa chắc khoảng hở, không đoán để tạt vào.', cueType: 'mirror', cueText: 'Cần chừa không gian phanh cho xe tải, không lấy độ dài sơ đồ làm mét hay giây' },
      { instruction: 'Bật xi-nhan phải báo trước, kiểm tra gương và điểm mù phải ngay trước khi về làn, nhìn lại đường; nhường xe đang ở làn nhận và chỉ chuyển êm một làn liền kề qua vạch cho phép khi đủ hở trước, sau và hai bên. Tắt xi-nhan khi ổn định; giữ cự ly với xe trước theo biển, tốc độ và điều kiện, không giảm tốc không cần thiết ngay trước đầu xe tải.', cueType: 'mirror', cueText: 'Đủ điều kiện mới về làn phải; không tạt đầu để kịp lối ra' },
      { instruction: 'Giữ làn hiện tại nếu phải bỏ vượt khi đã ở làn trái, quan sát phía trước và xe sau, điều chỉnh tốc độ êm khi an toàn để tạo khoảng cách dọc phía sau xe tải; chỉ chuyển về phải sau khi đủ khoảng hở và kiểm tra lại gương, điểm mù. Không chạy lùi, phanh gấp chỉ để tụt lại hoặc cắt chéo sát đuôi xe tải; nếu có nguy hiểm tức thời thì phanh cần thiết để tránh va chạm.', cueType: 'timing', cueText: 'Chưa sang trái thì chờ sau; đã sang trái thì không ép về khe hẹp' }
    ],
    mistakes: [
      'Bám sát vì thấy gương xe tải, hoặc tăng quá tốc độ để cố thoát điểm mù.',
      'Chỉ nhìn gương, bỏ điểm mù và xe sau đến nhanh; tạt đầu vì vừa thấy ca-bin trong gương phải.',
      'Cố vượt khi mưa bụi nước, gió hoặc dòng xe không cho phép; phanh đột ngột hay cắt sát đuôi để bỏ vượt.'
    ],
    recovery: 'Chưa chuyển làn thì giữ cự ly phía sau và hoãn vượt. Đã ở cạnh xe tải mà khoảng trống đóng lại hoặc xe tải tăng tốc: không đua theo, giữ làn hiện tại, quan sát xe sau và giảm tốc êm khi an toàn để tạo khoảng cách dọc phía sau xe tải. Chỉ báo hiệu và chuyển về phải khi đủ hở trước, sau, hai bên và đã kiểm tra lại điểm mù; không cắt sát đuôi hoặc ép xe khác nhường. Không chạy lùi, dừng chờ trên làn chạy, dùng lề hay làn dừng khẩn cấp để vượt; không phanh gấp chỉ để bỏ vượt nhưng vẫn phanh cần thiết khi nguy hiểm tức thời. Xe tải bắt đầu lấn làn thì ưu tiên tránh va chạm, giảm tốc hoặc phanh theo tình huống, không giật lái sang làn chưa quan sát.',
    safety: 'Không vượt giới hạn tốc độ để thoát điểm mù; không đủ tầm nhìn, khoảng hở hoặc không thể đi qua an toàn trong giới hạn thì hoãn hay bỏ vượt. Tuân thủ biển, vạch và làn dành cho loại xe; không cắt vạch liền hoặc dùng làn dừng khẩn cấp, lề đường để vượt. Thấy gương xe tải không bảo đảm được nhìn thấy; thấy toàn bộ xe tải trong gương trong cũng không thay thế cự ly an toàn trước, sau và hai bên. Báo hiệu, kiểm tra gương và điểm mù trước mỗi lần đổi một làn liền kề. Nếu bỏ vượt khi đã ở cạnh, giữ làn, quan sát xe sau và điều chỉnh tốc độ êm khi an toàn để tạo khoảng cách phía sau xe tải trước khi đổi làn; không chạy lùi, tạt đầu, cắt sát đuôi hay phanh gấp chỉ để tụt lại, vẫn phanh cần thiết khi nguy hiểm tức thời.',
    mnemonic: { text: 'Đủ hở mới qua, đúng tốc độ, đủ xa mới về.', rhythm: 'ba-nhip' },
    checklistId: 'pre_highway',
    quickCheck: [
      { prompt: 'Trước khi chuyển sang làn trái đi lên trước xe tải, cần làm gì?', options: ['Chỉ cần thấy làn trái trống qua gương', 'Kiểm tra biển, vạch, chỗ trống để đi qua đúng giới hạn; báo hiệu, kiểm tra gương, xe sau đến nhanh và điểm mù trái, đủ hở mới chuyển một làn', 'Bật xi-nhan rồi áp sát đuôi xe tải lấy đà'], correctIndex: 1 },
      { prompt: 'Vừa thấy đầu xe tải trong gương phải, đã được chuyển về phải chưa?', options: ['Được, chỉ cần thấy ca-bin là đủ', 'Được, rồi giảm tốc ngay để giữ ba giây', 'Chưa; phải đủ cự ly trước và sau theo tốc độ tương đối, báo hiệu và kiểm tra lại gương, điểm mù phải; thấy toàn bộ xe tải trong gương trong chỉ hỗ trợ'], correctIndex: 2 },
      { prompt: 'Đang ở cạnh xe tải mà muốn qua phải vượt giới hạn tốc độ, bạn làm gì?', options: ['Bỏ vượt, giữ làn và quan sát xe sau, điều chỉnh tốc độ êm khi an toàn để tạo khoảng cách phía sau xe tải; đủ hở và kiểm tra lại mới chuyển về phải', 'Tăng quá giới hạn vài giây cho thoát điểm mù', 'Phanh gấp rồi cắt sát đuôi xe tải về làn phải'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng vượt xe tải dài.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Sửa điều kiện đi lên trước xe tải, giới hạn tốc độ, quan sát điểm mù, cự ly về làn và bỏ vượt; thay hai sơ đồ và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
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
