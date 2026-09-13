import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 1 — Lùi chuồng, ghép ngang trong không gian hẹp. */
export const parkingCards: Card[] = [
  defineCard({
    id: 'parking-start',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Chọn điểm bắt đầu lùi',
    context: 'Hầm trung tâm thương mại đông xe, ô đỗ chỉ rộng hơn thân xe khoảng một mét. Điểm dừng trước khi cài số lùi quyết định cả pha lùi.',
    objective: 'Tạo góc lùi đủ rộng để đuôi xe vào ô đỗ trong một nhịp.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Bật xi-nhan về phía ô đỗ và dừng hẳn xe.', cueType: 'marker', cueText: 'Xi-nhan bật trước khi dừng', speedHint: '0 km/h' },
      { instruction: 'Canh vai xe ngang mép đầu ô đỗ, cách xe bên cạnh một cánh tay.', cueType: 'marker', cueText: 'Vai xe ngang mép ô đỗ' },
      { instruction: 'Quét đủ ba gương rồi ngoái nhìn qua vai phải một nhịp.', cueType: 'mirror', cueText: 'Ba gương và một nhịp ngoái đầu' },
      { instruction: 'Cài số R và nhả phanh cho xe bò chậm.', cueType: 'feel', cueText: 'Xe tự bò khi nhả phanh', speedHint: 'dưới 5 km/h' },
      { instruction: 'Đánh lái hết về phía ô đỗ khi vai xe vượt qua mốc.', cueType: 'marker', cueText: 'Vai xe vượt mép ô đỗ', steeringHint: 'đánh hết lái một bên' },
      { instruction: 'Nhìn gương đối diện để giữ đuôi xe cách cột ít nhất 60 cm.', cueType: 'mirror', cueText: 'Gương đối diện thấy mép ô' }
    ],
    mistakes: [
      'Đánh lái quá sớm làm đầu xe quét sang ô bên cạnh.',
      'Chỉ nhìn camera lùi mà bỏ quên hai gương.',
      'Lùi nhanh rồi phanh gấp khi thấy vật cản.'
    ],
    recovery: 'Dừng xe, về D và tiến thẳng ra lối đi một nhịp, sau đó tạo lại góc lùi mới. Không sửa lái khi xe đang sát vật cản.',
    safety: 'Có người hoặc xe máy cắt ngang phía sau thì dừng ngay, chờ đường trống rồi mới lùi tiếp.',
    mnemonic: { text: 'Chậm, thẳng, đủ góc rồi mới đánh lái.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    reviewStatus: 'approved',
    version: '1.1.0',
    updatedAt: '2026-09-10',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ chọn điểm lùi.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thay mô tả mơ hồ bằng mốc canh đo được và bổ sung sơ đồ biến thể.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-align',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Căn thân xe song song vạch ô đỗ',
    context: 'Xe đã vào ô nhưng thân xe còn lệch nên dễ chạm gương xe bên cạnh khi mở cửa. Đây là lúc căn lại bằng gương thay vì cảm giác.',
    objective: 'Đưa thân xe song song vạch và chia đều khoảng cách hai bên.',
    risk: 'low',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Dừng xe khi đuôi đã vào ô khoảng một nửa thân xe.', cueType: 'marker', cueText: 'Nửa thân xe đã vào ô' },
      { instruction: 'Nhìn gương trái rồi gương phải để so khoảng cách hai vạch.', cueType: 'mirror', cueText: 'Hai vạch trong gương' },
      { instruction: 'Trả lái về thẳng khi hai khoảng cách chênh dưới 10 cm.', cueType: 'marker', cueText: 'Chênh lệch dưới 10 cm', steeringHint: 'trả lái về thẳng' },
      { instruction: 'Lùi tiếp đến khi bánh sau cách vạch cuối khoảng 30 cm.', cueType: 'marker', cueText: 'Bánh sau cách vạch 30 cm', speedHint: 'dưới 5 km/h' },
      { instruction: 'Về P, kéo phanh tay rồi kiểm tra lại hai gương trước khi tắt máy.', cueType: 'feel', cueText: 'Xe đứng hẳn mới về P' }
    ],
    mistakes: [
      'Căn bằng cảm giác thay vì so hai vạch trong gương.',
      'Trả lái quá muộn khiến đuôi xe ép sát một bên.',
      'Đỗ lấn vạch làm xe bên cạnh không mở được cửa.'
    ],
    recovery: 'Vào số D, tiến lên nửa thân xe rồi lùi lại với góc đã sửa. Lặp lại tối đa hai lần, sau đó chọn ô đỗ khác.',
    safety: 'Không mở cửa khi chưa quan sát xe máy đang chạy dọc lối đi trong hầm.',
    mnemonic: { text: 'Gương trái, gương phải, đều vạch mới tắt máy.', rhythm: 'ba-nhip' },
    checklistId: 'post_park',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho bước căn thân xe sau khi lùi.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'parking-correct',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Chỉnh lại khi đuôi xe bị lệch',
    context: 'Đuôi xe lệch khỏi trục ô đỗ khi mới lùi được nửa đường, hai bên không còn cân. Cố sửa lái tiếp thường làm xe lệch nặng hơn.',
    objective: 'Đưa xe về trục ô đỗ bằng một nhịp tiến rồi lùi có kiểm soát.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Dừng xe ngay khi khoảng cách hai bên chênh hơn 20 cm.', cueType: 'marker', cueText: 'Chênh lệch hơn 20 cm' },
      { instruction: 'Về D và tiến thẳng ra lối đi đủ một thân xe.', cueType: 'marker', cueText: 'Một thân xe ra lối đi', speedHint: 'dưới 5 km/h' },
      { instruction: 'Trả lái thẳng bánh trước khi dừng lại lần nữa.', cueType: 'feel', cueText: 'Vô-lăng về vị trí giữa', steeringHint: 'trả lái về thẳng' },
      { instruction: 'Cài số R và đánh lái về phía cần bù, mỗi nhịp một phần tư vòng.', cueType: 'marker', cueText: 'Một phần tư vòng mỗi nhịp', steeringHint: 'một phần tư vòng mỗi nhịp' },
      { instruction: 'Kiểm tra gương sau mỗi nhịp lùi 50 cm cho đến khi xe vào đúng trục.', cueType: 'mirror', cueText: 'Mỗi 50 cm kiểm tra một lần' }
    ],
    mistakes: [
      'Vừa lùi vừa đánh lái liên tục làm đuôi xe văng rộng.',
      'Sửa lái khi xe đứng yên nên hướng xe không đổi mà lốp bị mòn.',
      'Lùi tiếp dù đã chạm mép ô đỗ bên cạnh.'
    ],
    recovery: 'Về P rồi xuống xe quan sát thực tế nếu không chắc khoảng cách. Khi ô đỗ quá hẹp, chọn ô khác thay vì cố ghép.',
    safety: 'Dừng hẳn nếu cảm biến báo liên tục hoặc có người đi bộ phía sau xe.',
    mnemonic: { text: 'Lệch thì tiến ra, trả thẳng rồi lùi lại.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống sửa lệch khi lùi.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'parking-parallel',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Ghép ngang giữa hai xe',
    context: 'Đường phố trung tâm chỉ còn một khoảng trống dài hơn xe khoảng 1,5 mét. Xe máy vẫn chạy sát bên trái trong lúc bạn ghép.',
    objective: 'Đưa xe vào sát lề trong hai nhịp lùi mà không chạm hai xe bên cạnh.',
    risk: 'medium',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Bật xi-nhan phải và dừng song song xe phía trước, cách khoảng 80 cm.', cueType: 'marker', cueText: 'Song song xe trước, cách 80 cm' },
      { instruction: 'Quan sát gương phải để xác định đuôi xe trước ngang vai xe mình.', cueType: 'mirror', cueText: 'Đuôi xe trước ngang vai xe mình' },
      { instruction: 'Cài số R, đánh lái phải hết cỡ rồi lùi chậm.', cueType: 'feel', cueText: 'Xe bò khi nhả phanh', speedHint: 'dưới 5 km/h', steeringHint: 'đánh hết lái phải' },
      { instruction: 'Trả lái thẳng khi đầu xe mình ngang đuôi xe trước.', cueType: 'marker', cueText: 'Đầu xe ngang đuôi xe trước', steeringHint: 'trả lái về thẳng' },
      { instruction: 'Đánh lái trái khi bánh sau cách lề khoảng 30 cm.', cueType: 'marker', cueText: 'Bánh sau cách lề 30 cm', steeringHint: 'đánh lái trái' },
      { instruction: 'Tiến lùi một nhịp ngắn để chia đều khoảng cách với hai xe.', cueType: 'feel', cueText: 'Khoảng cách hai đầu bằng nhau' }
    ],
    mistakes: [
      'Dừng cách xe trước quá xa nên lùi vào bị hụt chỗ.',
      'Trả lái muộn làm đầu xe văng ra giữa đường.',
      'Không quan sát xe máy bên trái trước khi mở cửa.'
    ],
    recovery: 'Nếu đuôi xe chạm lề, tiến lên nửa thân xe và lùi lại với góc nhỏ hơn. Chỉ ghép khi khoảng trống dài hơn xe ít nhất 1,5 mét.',
    safety: 'Không ghép ngang ở nơi có biển cấm dừng, cấm đỗ hoặc ngay trước lối ra vào của nhà dân.',
    mnemonic: { text: 'Ngang xe trước, lùi chậm, trả lái đúng lúc.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng ghép ngang trên phố.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'parking-slope',
    lessonId: 'parking-underground',
    topicId: 'parking',
    title: 'Lùi xe trên dốc hầm',
    context: 'Dốc hầm thương mại dài và hay ẩm nên xe dễ trôi khi chuyển chân từ phanh sang ga. Bạn phải lùi vào ô ngay trên đoạn dốc này.',
    objective: 'Giữ xe bò đều khi lùi trên dốc và không để xe trôi tự do.',
    risk: 'high',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Đạp phanh giữ xe đứng yên một nhịp trước khi cài số R.', cueType: 'feel', cueText: 'Xe đứng hẳn mới chuyển số' },
      { instruction: 'Bật đèn chiếu gần và quan sát điểm mù hai bên.', cueType: 'mirror', cueText: 'Điểm mù hai bên đã trống' },
      { instruction: 'Nhả phanh khoảng một phần ba hành trình để xe bò xuống.', cueType: 'feel', cueText: 'Một phần ba hành trình phanh', speedHint: 'dưới 5 km/h' },
      { instruction: 'Giữ vô-lăng ổn định và chỉ sửa lái từng nhịp nhỏ theo gương.', cueType: 'mirror', cueText: 'Sửa lái theo mép ô trong gương', steeringHint: 'sửa nhỏ từng nhịp' },
      { instruction: 'Đạp phanh dứt khoát nếu xe tăng tốc ngoài ý muốn.', cueType: 'feel', cueText: 'Xe tăng tốc là dấu hiệu trôi' },
      { instruction: 'Về P và kéo phanh tay ngay khi xe đã đứng hẳn trong ô.', cueType: 'feel', cueText: 'Xe đứng hẳn trong ô đỗ' }
    ],
    mistakes: [
      'Đệm ga để thắng độ dốc làm xe lao về phía sau.',
      'Quay đầu nhìn liên tục nên mất kiểm soát hướng lái.',
      'Tiếp tục lùi khi gương bị xe khác che khuất.'
    ],
    recovery: 'Đạp phanh, chờ xe đứng hẳn rồi về P. Bật đèn cảnh báo và chạy một vòng khác nếu góc lùi không an toàn.',
    safety: 'Không lùi khi mặt dốc đọng nước, tầm nhìn bị che hoặc có người đứng phía sau xe.',
    mnemonic: { text: 'Giữ phanh, nhìn gương, lùi đều từng nhịp.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    reviewStatus: 'approved',
    version: '1.1.0',
    updatedAt: '2026-09-10',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ lùi xe trên dốc hầm.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thêm mốc đo hành trình phanh và bước về P sau khi dừng.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-lowlight',
    lessonId: 'parking-underground',
    topicId: 'parking',
    title: 'Lùi chuồng khi hầm thiếu sáng',
    context: 'Hầm cũ chỉ có vài bóng đèn vàng nên gương và camera đều nhiễu sáng. Bạn phải dựa nhiều hơn vào mốc canh và âm thanh.',
    objective: 'Lùi vào ô đỗ an toàn khi tầm nhìn qua gương bị giảm.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'poor', stress: 'moderate' },
    steps: [
      { instruction: 'Bật đèn chiếu gần và đèn sương mù nếu xe có trang bị.', cueType: 'marker', cueText: 'Đèn chiếu gần đã bật' },
      { instruction: 'Hạ kính hai bên để nghe tiếng còi và tiếng bánh xe.', cueType: 'sound', cueText: 'Nghe rõ âm thanh xung quanh' },
      { instruction: 'Đi chậm qua ô đỗ một lượt để ghi nhớ vị trí cột và xe bên cạnh.', cueType: 'marker', cueText: 'Một lượt khảo sát trước khi lùi', speedHint: 'dưới 10 km/h' },
      { instruction: 'Chọn ô có ít nhất một bên trống để dễ căn vạch.', cueType: 'marker', cueText: 'Một bên ô đỗ còn trống' },
      { instruction: 'Lùi từng đoạn 50 cm rồi dừng kiểm tra gương và cảm biến.', cueType: 'mirror', cueText: 'Mỗi 50 cm dừng kiểm tra', speedHint: 'dưới 5 km/h' },
      { instruction: 'Nhờ người đi cùng đứng ở vị trí nhìn thấy đuôi xe khi cần.', cueType: 'marker', cueText: 'Người hỗ trợ đứng ngoài vùng lùi' }
    ],
    mistakes: [
      'Tin hoàn toàn vào camera lùi trong điều kiện thiếu sáng.',
      'Lùi một mạch vì nghĩ phía sau vẫn trống.',
      'Để đèn pha chiếu thẳng vào gương xe đối diện.'
    ],
    recovery: 'Dừng lại, bật đèn cảnh báo và xuống xe quan sát trực tiếp khi không chắc khoảng cách.',
    safety: 'Hầm quá tối thì chọn ô đỗ gần lối bộ hành để giảm thời gian lùi và tăng khả năng được nhìn thấy.',
    mnemonic: { text: 'Tối thì chậm, dừng nhiều nhịp, nghe kỹ.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống hầm thiếu sáng.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'parking-column',
    lessonId: 'parking-underground',
    topicId: 'parking',
    title: 'Lùi vào ô đỗ sát cột bê tông',
    context: 'Ô đỗ cuối dãy thường có cột bê tông chắn một bên và camera khó thấy chân cột. Đây là vị trí hay xảy ra va quệt nhẹ.',
    objective: 'Lùi vào ô sát cột mà vẫn còn khoảng trống mở cửa.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Đi chậm qua ô một lượt để xác định chân cột và mép vạch.', cueType: 'marker', cueText: 'Chân cột và mép vạch', speedHint: 'dưới 10 km/h' },
      { instruction: 'Chọn quỹ đạo lùi lệch về phía xa cột khoảng 20 cm.', cueType: 'marker', cueText: 'Lệch 20 cm khỏi phía cột' },
      { instruction: 'Lùi từng đoạn ngắn rồi dừng kiểm tra khoảng cách tới cột.', cueType: 'mirror', cueText: 'Mỗi đoạn ngắn kiểm tra một lần', speedHint: 'dưới 5 km/h' },
      { instruction: 'Dừng hẳn khi cảm biến báo liên tục hoặc còn cách cột 30 cm.', cueType: 'sound', cueText: 'Cảm biến báo liên tục' },
      { instruction: 'Kiểm tra khoảng trống mở cửa trước khi tắt máy.', cueType: 'marker', cueText: 'Đủ chỗ mở cửa phía tài' }
    ],
    mistakes: [
      'Canh cột bằng camera trong khi chân cột nằm ngoài khung hình.',
      'Lùi sát cột để chừa chỗ cho xe bên cạnh.',
      'Mở cửa mạnh khi xe đã đỗ sát cột.'
    ],
    recovery: 'Tiến ra và chọn lại quỹ đạo lệch xa cột hơn. Nếu vẫn sát, đổi sang ô đỗ khác.',
    safety: 'Kích thước ô đỗ mỗi hầm mỗi khác; luôn quan sát thực tế thay vì áp dụng máy móc các con số trong thẻ.',
    mnemonic: { text: 'Xa cột một chút, còn chỗ mở cửa.', rhythm: 'doi-ve' },
    checklistId: 'pre_reverse',
    reviewStatus: 'draft',
    version: '0.1.0',
    updatedAt: '2026-09-12',
    changelog: [{ version: '0.1.0', date: '2026-09-12', summary: 'Bản nháp chờ giáo viên đo lại khoảng cách thực tế tại hầm.', author: 'Biên tập nội dung' }]
  })
]
