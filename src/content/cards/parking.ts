import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 1 — Lùi chuồng, ghép ngang trong không gian hẹp. */
export const parkingCards: Card[] = [
  defineCard({
    id: 'parking-start',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Chọn điểm bắt đầu lùi',
    context: 'Trong hầm gửi xe, bạn chuẩn bị lùi vào một ô đỗ. Kích thước xe, góc tiếp cận và vật cản làm mốc canh thay đổi; sơ đồ chỉ mang tính minh họa.',
    objective: 'Chọn vị trí bắt đầu phù hợp và chỉ lùi khi tầm nhìn cùng khoảng trống cho phép thao tác chậm, có thể dừng ngay.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Bật xi-nhan về phía ô đỗ và dừng hẳn ở nơi an toàn, không cản lối đi.', cueType: 'marker', cueText: 'Xe đứng hẳn, lối đi thông thoáng', speedHint: '0 km/h' },
      { instruction: 'Đánh giá khi còn đứng yên xem ô đỗ, lối đi và khoảng trống quanh xe có đủ rõ ràng hay không; chọn ô khác nếu chưa chắc.', cueType: 'marker', cueText: 'Nhìn rõ toàn bộ khoảng trống cần thiết' },
      { instruction: 'Chọn mốc trên xe của bạn như gợi ý tham khảo, không áp dụng một mốc vai xe hay khoảng cách cố định cho mọi xe.', cueType: 'marker', cueText: 'Mốc canh phù hợp xe và vị trí thực tế' },
      { instruction: 'Quét gương và quan sát trực tiếp xung quanh xe; chỉ dùng camera như công cụ hỗ trợ.', cueType: 'mirror', cueText: 'Quan sát quanh xe, không chỉ nhìn camera' },
      { instruction: 'Giữ chân sẵn trên phanh, cài số R khi xe đứng hẳn rồi nhả phanh từ từ để xe chỉ bò.', cueType: 'feel', cueText: 'Xe bò chậm, luôn dừng được ngay', speedHint: 'tốc độ đi bộ' },
      { instruction: 'Lùi chậm và điều chỉnh lái từ từ theo khoảng trống thực tế; dừng ngay nếu có người, xe hoặc vật cản vào đường đi.', cueType: 'mirror', cueText: 'Liên tục quan sát quanh xe và đường lùi', steeringHint: 'điều chỉnh nhẹ, không áp dụng một góc lái cố định' },
      { instruction: 'Dừng hẳn nếu không còn chắc về khoảng cách; chỉ tiến ra để căn lại khi lối đi phía trước và hai bên đã rõ.', cueType: 'feel', cueText: 'Dừng khi tầm nhìn hoặc khoảng cách không chắc' }
    ],
    mistakes: [
      'Áp dụng một mốc vai xe hoặc khoảng cách giống nhau cho mọi mẫu xe.',
      'Chỉ nhìn camera lùi mà bỏ quên gương và quan sát trực tiếp.',
      'Tiếp tục lùi khi không nhìn rõ khoảng trống hoặc có người đi vào đường lùi.'
    ],
    recovery: 'Dừng hẳn và giữ phanh. Chỉ về D để tiến ra khi lối đi phía trước và hai bên đã quan sát rõ; nếu không, giữ nguyên vị trí và chọn ô khác khi có thể.',
    safety: 'Không bắt đầu nếu không nhìn rõ lối đi hoặc khoảng trống quanh xe. Dừng ngay khi có người, xe hay vật cản xuất hiện; không dựa riêng vào camera hoặc mốc minh họa.',
    mnemonic: { text: 'Rõ chỗ, chậm xe, chưa chắc thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    quickCheck: [
      { prompt: 'Mốc vai xe và khoảng cách trong sơ đồ có áp dụng y hệt cho mọi ô tô không?', options: ['Có, luôn dùng một mốc và khoảng cách cố định', 'Không, chỉ là minh họa; cần đánh giá theo xe và vị trí thực tế', 'Có, nếu xe dùng camera lùi'], correctIndex: 1 },
      { prompt: 'Khi lùi, camera có thay thế việc quan sát gương và trực tiếp xung quanh xe không?', options: ['Có, chỉ cần nhìn camera', 'Không, camera chỉ hỗ trợ; cần tiếp tục quan sát xung quanh', 'Có, nếu lùi thật chậm'], correctIndex: 1 },
      { prompt: 'Nếu không nhìn rõ khoảng trống hoặc có người đi vào đường lùi, bạn nên làm gì?', options: ['Dừng hẳn và chỉ tiếp tục khi đã an toàn, nếu không thì chọn ô khác', 'Đánh lái nhanh để tránh', 'Lùi tiếp thật chậm'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ chọn điểm lùi.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thay mô tả mơ hồ bằng mốc canh đo được và bổ sung sơ đồ biến thể.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Làm rõ điều kiện dừng, quan sát liên tục, mốc canh tùy xe và trạng thái chưa được thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-align',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Căn thân xe song song vạch ô đỗ',
    context: 'Xe đã lùi vào ô nhưng còn nghiêng hoặc lệch về một bên. Cần phân biệt thân xe song song vạch với vị trí nằm giữa ô; hình minh họa không phải mốc đo cho mọi xe.',
    objective: 'Căn thân xe song song vạch, nằm gọn trong ô và chừa khoảng trống phù hợp cho gương, cửa cùng vật cản thực tế.',
    risk: 'medium',
    difficulty: 2,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'calm' },
    steps: [
      { instruction: 'Dừng hẳn và giữ phanh khi cần kiểm tra hoặc chỉnh lại vị trí trong ô.', cueType: 'feel', cueText: 'Xe đứng yên để đánh giá khoảng trống', speedHint: '0 km/h' },
      { instruction: 'Nhìn từng gương để so phần thân xe nhìn thấy với vạch cùng bên; kết hợp quan sát trực tiếp để đánh giá dọc cả đầu và đuôi, rồi kiểm tra khoảng trống hai bên; không suy ra song song chỉ từ hai khoảng cách bằng nhau.', cueType: 'mirror', cueText: 'Gương không cho thấy toàn bộ xe; song song khác nằm giữa ô' },
      { instruction: 'Quét gương kết hợp nhìn trực tiếp quanh xe, điểm mù, phía sau và vùng đầu xe có thể quét ra; camera và cảm biến chỉ hỗ trợ.', cueType: 'mirror', cueText: 'Rõ đường lùi, hai bên và khoảng quét đầu xe' },
      { instruction: 'Chỉnh lái nhẹ khi xe bò chậm nếu còn đủ khoảng trống; liên tục quan sát và dừng ngay khi có người, xe vào đường đi hoặc không còn chắc về khoảng cách.', cueType: 'feel', cueText: 'Chân sẵn trên phanh, chưa chắc thì dừng', speedHint: 'tốc độ đi bộ hoặc chậm hơn', steeringHint: 'điều chỉnh theo xe và khoảng trống thực tế' },
      { instruction: 'Trả lái thẳng khi thân xe đã song song vạch; nếu vẫn lệch về một bên, dừng để căn lại thay vì cố lùi sâu.', cueType: 'marker', cueText: 'Thân song song chưa có nghĩa là đã nằm giữa ô', steeringHint: 'bánh thẳng để lùi thẳng' },
      { instruction: 'Lùi thẳng chỉ khi đường đi còn rõ và dừng trước khi cản sau tới tường, chặn bánh hoặc vật cản thấp; kiểm tra cả đầu xe nằm trong ô, không dùng vị trí bánh sau làm mốc dừng cố định.', cueType: 'marker', cueText: 'Toàn bộ xe gọn trong ô, cản sau còn khoảng trống' },
      { instruction: 'Dừng hẳn, giữ phanh chân và thực hiện trình tự đỗ theo hướng dẫn của xe: cài phanh đỗ, chọn P với xe số tự động hoặc số đỗ phù hợp với xe số sàn, rồi tắt máy khi xe đã được giữ chắc.', cueType: 'feel', cueText: 'Không đổi chiều hoặc chọn P khi xe còn lăn' },
      { instruction: 'Quan sát gương và ngoái nhìn trước khi mở cửa, nhường người đi bộ, xe đạp, xe máy và xe khác; chỉ mở khi khoảng trống bên cửa an toàn.', cueType: 'mirror', cueText: 'Kiểm tra quanh cửa trước khi rời xe' }
    ],
    mistakes: [
      'Coi hai khoảng cách nhìn qua gương bằng nhau là đủ chứng minh thân xe song song vạch.',
      'Chỉ nhìn vạch hoặc camera, bỏ sót người, vật cản thấp và khoảng quét đầu xe.',
      'Lùi theo mốc bánh sau cố định hoặc cố đỗ giữa ô dù không đủ chỗ cho gương và cửa.'
    ],
    recovery: 'Dừng hẳn và giữ phanh trước khi đổi chiều. Chỉ tiến để tạo lại góc khi đã nhìn rõ lối phía trước, hai bên và khoảng quét đầu xe; tiến vừa đủ trong khoảng trống đã kiểm tra, rồi dừng và quan sát lại trước khi lùi. Nếu không thể xác nhận khoảng cách hoặc ô quá chật, giữ xe an toàn và chọn ô khác khi đường đi cho phép.',
    safety: 'Dừng ngay khi mất tầm nhìn hoặc có người, xe vào đường đi. Không cố chia đều hai bên nếu thiếu chỗ mở cửa hay vướng cột; không dựa riêng vào gương, camera hoặc cảm biến. Chỉ rời xe khi đã giữ xe chắc và quan sát an toàn quanh cửa.',
    mnemonic: { text: 'Song song, đủ chỗ, chưa rõ thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'post_park',
    quickCheck: [
      { prompt: 'Hai khoảng cách nhìn qua gương bằng nhau đã chứng minh xe song song vạch chưa?', options: ['Rồi, không cần kiểm tra thêm', 'Chưa, cần kết hợp gương và quan sát trực tiếp để so thân với vạch dọc cả đầu và đuôi, rồi đánh giá chỗ trống hai bên', 'Rồi, nếu camera không báo động'], correctIndex: 1 },
      { prompt: 'Nên xác định vị trí dừng lùi trong ô bằng cách nào?', options: ['Luôn để bánh sau cách vạch cuối 30 cm', 'Lùi đến khi bánh chạm chặn bánh', 'Kiểm tra khoảng trống cản sau với vật cản và toàn bộ xe nằm gọn trong ô, theo xe thực tế'], correctIndex: 2 },
      { prompt: 'Khi không nhìn rõ khoảng cách hoặc có người vào đường lùi, cần làm gì?', options: ['Dừng hẳn, giữ phanh và chỉ tiếp tục sau khi đã quan sát rõ, an toàn', 'Lùi tiếp vì cảm biến chưa kêu', 'Đánh lái nhanh để căn xong'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho bước căn thân xe sau khi lùi.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Phân biệt song song và nằm giữa ô, bỏ mốc đo cố định, bổ sung điều kiện dừng và sửa hai sơ đồ; chờ thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-correct',
    lessonId: 'parking-basics',
    topicId: 'parking',
    title: 'Chỉnh lại khi đuôi xe bị lệch',
    context: 'Xe đang lùi vào ô nhưng thân còn nghiêng hoặc lệch về một bên. Cách chỉnh phụ thuộc vị trí xe, khoảng trống và tầm nhìn; sơ đồ không phải quỹ đạo áp dụng cho mọi xe.',
    objective: 'Đánh giá chỗ trống và chỉnh lại để xe song song vạch, nằm gọn trong ô, chỉ tiến hoặc lùi khi quan sát rõ đường đi.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Dừng hẳn và giữ phanh nếu xe đi lệch hướng dự định hoặc chưa chắc khoảng trống; không chờ tới một độ lệch cố định.', cueType: 'feel', cueText: 'Chưa chắc thì dừng, không đổi chiều khi xe còn lăn', speedHint: '0 km/h' },
      { instruction: 'Kiểm tra dọc cả đầu và đuôi so với vạch bằng gương và quan sát trực tiếp; phân biệt thân nghiêng với thân song song nhưng lệch về một bên.', cueType: 'mirror', cueText: 'Hai khoảng trống bằng nhau chưa chứng minh thân song song' },
      { instruction: 'Quét gương, điểm mù và nhìn trực tiếp phía trước, sau, hai bên; kiểm tra gương xe, các góc xe, cột và vật cản thấp, nhường người và xe trong lối đi trước khi tiến ra.', cueType: 'mirror', cueText: 'Camera và cảm biến chỉ hỗ trợ, không thay quan sát' },
      { instruction: 'Chọn số tiến phù hợp khi xe đã đứng hẳn, chỉ tiến ra nếu đường đi đã rõ; bò chậm với chân sẵn trên phanh và chỉnh lái theo khoảng trống thực tế, không bắt buộc đi hết một thân xe.', cueType: 'feel', cueText: 'Quan sát liên tục cả đầu, đuôi và hai bên khi tiến', speedHint: 'tốc độ đi bộ hoặc chậm hơn', steeringHint: 'không có một góc lái chung cho mọi xe' },
      { instruction: 'Dừng hẳn khi đã có vị trí để thử lại và giữ phanh; đánh giá lại góc vào cùng khoảng trống trước khi cài số lùi, không đổi chiều khi xe còn lăn.', cueType: 'marker', cueText: 'Nếu không đủ chỗ thì chờ hoặc chọn ô khác khi an toàn' },
      { instruction: 'Lùi chậm, chỉnh lái từng chút theo phản ứng thực tế của xe để đưa thân về hướng vạch; liên tục quét quanh xe, nhất là vùng đầu xe quét ra khi đánh lái, không đợi hết một đoạn mới nhìn.', cueType: 'mirror', cueText: 'Dừng ngay khi có người, xe vào đường đi hoặc mất tầm nhìn', speedHint: 'luôn dừng được ngay', steeringHint: 'không dùng số vòng vô-lăng cố định' },
      { instruction: 'Trả bánh về thẳng khi thân đã song song để lùi thẳng nếu còn đủ chỗ; dừng nếu vẫn lệch ngang, không cố lùi sâu để sửa vị trí.', cueType: 'marker', cueText: 'Song song khác nằm giữa ô; chưa phù hợp thì đánh giá lại' },
      { instruction: 'Dừng hẳn khi toàn bộ xe nằm gọn trong ô, còn khoảng trống cho cản, gương và cửa; giữ phanh chân rồi thực hiện trình tự giữ xe theo hướng dẫn của nhà sản xuất.', cueType: 'feel', cueText: 'Phanh đỗ và P với xe tự động hoặc số đỗ phù hợp với xe số sàn' }
    ],
    mistakes: [
      'Chỉ nhìn đuôi xe hoặc camera, bỏ quên đầu xe quét ra và người trong lối đi.',
      'Đổi chiều khi xe còn lăn hoặc áp dụng cứng một độ lệch, quãng tiến hay số vòng lái.',
      'Cố lùi sâu để chữa lệch ngang dù khoảng trống hoặc tầm nhìn không còn bảo đảm.'
    ],
    recovery: 'Dừng hẳn, giữ phanh và không tiến ra nếu chưa rõ lối đi. Nếu cần xuống kiểm tra, chỉ ra ngoài khi vị trí và giao thông cho phép: giữ xe bằng phanh đỗ, P với xe tự động hoặc số đỗ phù hợp với xe số sàn và tắt máy theo hướng dẫn của xe; nhìn gương và ngoái nhìn trước khi mở cửa. Nếu nhờ người hướng dẫn, họ phải đứng ngoài đường xe chạy và luôn trong tầm nhìn; mất liên lạc thì dừng. Chỉ thử lại khi đủ chỗ và quan sát rõ; nếu không, chờ hỗ trợ hoặc chọn ô khác khi an toàn, không dựa vào số lần thử.',
    safety: 'Dừng ngay khi có người, xe hoặc vật cản vào đường đi, mất tầm nhìn, không chắc khoảng cách hoặc cảm biến cảnh báo; không đợi còi liên tục hay tin rằng không có còi là đủ an toàn. Quan sát liên tục cả khi tiến và lùi; dừng hẳn trước mỗi lần đổi chiều.',
    mnemonic: { text: 'Dừng, nhìn đủ, rõ chỗ mới chỉnh.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    quickCheck: [
      { prompt: 'Xe đi lệch hướng dự định hoặc bạn không chắc khoảng trống, việc đầu tiên là gì?', options: ['Đánh lái mạnh hơn khi đang lùi', 'Dừng hẳn, giữ phanh và đánh giá lại trước khi đổi chiều', 'Tiếp tục tới khi cảm biến kêu liên tục'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Khi nào có thể tiến ra để tạo lại góc vào ô?', options: ['Luôn tiến đủ một thân xe vì đã bật xi-nhan', 'Khi xe đã đứng hẳn, đã nhường người và xe trong lối đi, chỉ tiến trong khoảng trống đã quan sát rõ', 'Chỉ cần camera phía sau không báo vật cản'], correctIndex: 1 },
      { prompt: 'Thân đã song song vạch nhưng vẫn quá sát một bên, nên làm gì?', options: ['Cứ lùi sâu hơn để xe tự về giữa ô', 'Dùng đúng một phần tư vòng lái cho mọi xe', 'Dừng và đánh giá lại; chỉ chỉnh tiếp khi đủ chỗ, nếu không thì chờ hỗ trợ hoặc chọn ô khác khi an toàn'], correctIndex: 2 }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống sửa lệch khi lùi.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ mốc sửa lệch cố định, bổ sung quan sát và dừng trước đổi chiều, sửa hai sơ đồ và công bố chưa thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
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
    quickCheck: [
      { prompt: 'Khoảng trống tối thiểu để ghép ngang an toàn là bao nhiêu so với chiều dài xe?', options: ['Bằng đúng chiều dài xe', 'Dài hơn khoảng 1,5 mét', 'Ngắn hơn xe cũng ghép được'], correctIndex: 1 },
      { prompt: 'Khi nào nên trả lái thẳng trong lúc ghép ngang?', options: ['Khi đầu xe mình ngang đuôi xe trước', 'Ngay khi bắt đầu lùi', 'Sau khi đã đỗ xong'], correctIndex: 0 },
      { prompt: 'Trước khi mở cửa sau khi ghép ngang xong, cần chú ý gì?', options: ['Không cần vì đã đỗ sát lề', 'Quan sát xe máy phía bên trái', 'Chỉ cần tắt máy ngay'], correctIndex: 1 }
    ],
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
    quickCheck: [
      { prompt: 'Khi lùi trên dốc hầm, nên nhả phanh bao nhiêu để xe bò xuống?', options: ['Nhả hết phanh cho xe tự trôi', 'Nhả khoảng một phần ba hành trình phanh', 'Không nhả phanh, chỉ dùng ga'], correctIndex: 1 },
      { prompt: 'Dấu hiệu nào cho thấy xe đang bị trôi ngoài ý muốn trên dốc?', options: ['Xe tăng tốc dù không đạp ga', 'Vô-lăng nhẹ hơn bình thường', 'Đèn pha sáng hơn'], correctIndex: 0 },
      { prompt: 'Bạn không nên tiếp tục lùi trên dốc hầm khi nào?', options: ['Khi mặt dốc đọng nước hoặc tầm nhìn bị che khuất', 'Khi hầm hơi tối một chút', 'Khi có một xe khác đỗ cách xa phía trước'], correctIndex: 0, isStopCondition: true }
    ],
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
    quickCheck: [
      { prompt: 'Khi hầm thiếu sáng, bạn nên dựa vào đâu nhiều hơn để lùi an toàn?', options: ['Chỉ dựa vào camera lùi', 'Mốc canh và âm thanh xung quanh', 'Tốc độ bò nhanh hơn bình thường'], correctIndex: 1 },
      { prompt: 'Nên lùi theo cách nào trong điều kiện thiếu sáng?', options: ['Lùi một mạch cho nhanh', 'Từng đoạn 50 cm rồi dừng kiểm tra', 'Nhắm mắt ước lượng khoảng cách'], correctIndex: 1 },
      { prompt: 'Khi không chắc khoảng cách trong hầm tối, bạn nên?', options: ['Cứ lùi tiếp và hy vọng', 'Dừng lại, bật đèn cảnh báo và xuống xe quan sát', 'Bấm còi liên tục rồi lùi nhanh'], correctIndex: 1 }
    ],
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
    quickCheck: [
      { prompt: 'Vì sao không nên canh khoảng cách tới cột chỉ bằng camera?', options: ['Vì camera luôn chính xác', 'Vì chân cột có thể nằm ngoài khung hình camera', 'Vì camera không hoạt động khi lùi'], correctIndex: 1 },
      { prompt: 'Quỹ đạo lùi nên lệch bao nhiêu so với phía có cột?', options: ['Lệch khoảng 20 cm về phía xa cột', 'Áp sát cột để chừa chỗ xe bên cạnh', 'Không cần chỉnh quỹ đạo'], correctIndex: 0 },
      { prompt: 'Khi cảm biến báo liên tục lúc gần cột, bạn nên?', options: ['Tiếp tục lùi thêm một chút', 'Dừng hẳn và kiểm tra khoảng cách thực tế', 'Tắt cảm biến vì hay báo nhầm'], correctIndex: 1 }
    ],
    reviewStatus: 'draft',
    version: '0.1.0',
    updatedAt: '2026-09-12',
    changelog: [{ version: '0.1.0', date: '2026-09-12', summary: 'Bản nháp chờ giáo viên đo lại khoảng cách thực tế tại hầm.', author: 'Biên tập nội dung' }]
  })
]
