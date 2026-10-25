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
    context: 'Bạn cần ghép vào khoảng trống giữa hai xe sát lề phải trên đoạn đường bằng phẳng được phép đỗ và lùi. Xe máy có thể đi qua; hình chỉ minh họa, mốc canh phụ thuộc xe và khoảng trống thực tế.',
    objective: 'Ghép xe song song lề phải, chừa khoảng trống hai đầu và chỉ thao tác khi quan sát rõ toàn bộ vùng xe sẽ đi qua.',
    risk: 'medium',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'good', stress: 'moderate' },
    steps: [
      { instruction: 'Chọn nơi được phép đỗ và lùi, đủ chỗ cho thân xe, gương, khoảng quét đầu xe và khoảng trống hai đầu; chọn chỗ khác nếu chưa chắc, không coi dài hơn xe một khoảng cố định là đủ.', cueType: 'marker', cueText: 'Đủ chỗ cho toàn bộ thao tác, không chỉ chiều dài xe' },
      { instruction: 'Bật xi-nhan phải khi tiếp cận; vị trí song song xe trước, hai đuôi gần ngang nhau chỉ là ví dụ để luyện cùng giáo viên, không phải mốc bắt buộc cho mọi xe; chừa khoảng hở bên hông theo xe thực tế và không dừng chờ song song xe đang đỗ trên đường.', cueType: 'marker', cueText: 'Xi-nhan không tạo quyền ưu tiên hoặc cho phép đỗ hàng đôi' },
      { instruction: 'Dừng hẳn, giữ phanh; quét gương, điểm mù và quan sát trực tiếp hai bên, phía sau cùng vùng đầu xe quét ra; nhường người đi bộ, xe đạp và xe máy, chỉ cài số R khi xe đứng hẳn và đường lùi đã rõ.', cueType: 'mirror', cueText: 'Camera và cảm biến chỉ hỗ trợ; có tín hiệu lùi trước khi di chuyển', speedHint: '0 km/h trước khi cài số' },
      { instruction: 'Lùi bò chậm, chỉnh lái phải dần để đuôi xe dịch về lề phải; đầu xe sẽ quét sang trái nên liên tục quan sát cả phía giao thông và phía lề, chân sẵn trên phanh; dừng ngay khi có người, xe vào vùng thao tác hoặc không chắc khoảng cách.', cueType: 'feel', cueText: 'Đuôi về phải, đầu quét trái; quan sát liên tục', speedHint: 'tốc độ đi bộ hoặc chậm hơn', steeringHint: 'chỉnh dần theo phản ứng xe, không bắt buộc hết lái' },
      { instruction: 'Giảm góc lái rồi chỉnh lái trái khi có đủ khoảng hở để đầu xe lọt qua đuôi xe trước và đuôi xe không chạm lề hay xe sau; tiếp tục quan sát đầu, đuôi và hai bên, dừng nếu chưa chắc thay vì dùng mốc vai xe hoặc khoảng cách bánh cố định.', cueType: 'mirror', cueText: 'Thời điểm trả và đổi lái tùy xe, góc xe và khoảng hở', steeringHint: 'lái trái để đưa đầu vào, không để đuôi ép lề' },
      { instruction: 'Trả bánh thẳng khi thân xe song song lề; nếu cần tiến hoặc lùi để căn lại, dừng hẳn trước mỗi lần đổi chiều, kiểm tra lại đường đi và chỉ di chuyển trong khoảng trống đã rõ; không cố hoàn thành trong một số nhịp nhất định.', cueType: 'feel', cueText: 'Đứng hẳn rồi đổi chiều, kiểm tra lại trước khi đi' },
      { instruction: 'Kiểm tra toàn bộ xe đỗ gọn, không chạm lề, còn khoảng trống an toàn với cả xe trước và xe sau, không cần chia đều tuyệt đối; trên đường phố, bánh xe gần nhất không cách lề phải quá 0,25 m và không gây cản trở, nguy hiểm.', cueType: 'marker', cueText: 'Giới hạn đỗ sát lề không phải mốc để bắt đầu đổi lái' },
      { instruction: 'Dừng hẳn, giữ phanh chân và đỗ theo hướng dẫn của nhà sản xuất: cài phanh đỗ, chọn P với số tự động hoặc số đỗ phù hợp với số sàn, rồi tắt máy; trước khi mở cửa, nhìn phía trước, phía sau và bên mở cửa, chỉ mở khi an toàn.', cueType: 'mirror', cueText: 'Giữ xe chắc, kiểm tra cả người đi bộ và xe hai bánh' }
    ],
    mistakes: [
      'Áp dụng khoảng hở, mốc vai xe hoặc thời điểm hết lái giống nhau cho mọi xe.',
      'Chỉ nhìn camera hoặc phía lề, bỏ quên đầu xe quét ra và người, xe đi qua.',
      'Cố ghép đủ hai nhịp, đổi chiều khi xe còn trôi hoặc tiếp tục khi khoảng cách không rõ.'
    ],
    recovery: 'Dừng hẳn, giữ phanh nếu bánh chạm lề hoặc xe mắc góc; không leo lề hay cố ép lái. Nếu nghi hỏng lốp hoặc bánh, giữ xe an toàn và nhờ hỗ trợ; chỉ ra kiểm tra sau khi đã cài phanh đỗ, chọn số đỗ phù hợp, tắt máy và quan sát để mở cửa an toàn. Chỉ tiến ra căn lại khi đã rõ khoảng trống phía trước, hai bên và vùng đuôi xe quét; nếu không đủ chỗ thì chờ hoặc bỏ chỗ đỗ khi có lối ra an toàn, không bắt buộc tiến nửa thân xe. Nếu có người hướng dẫn, họ phải đứng ngoài đường xe chạy và trong tầm nhìn; mất liên lạc thì dừng.',
    safety: 'Dừng ngay khi người hoặc xe vào vùng thao tác, mất tầm nhìn, không chắc khoảng cách hay cảm biến cảnh báo; không đợi còi liên tục. Không lùi trên đường một chiều, khu vực cấm dừng, phần đường người đi bộ qua đường, nơi giao nhau, giao cắt đường sắt, nơi khuất tầm nhìn, hầm đường bộ hoặc cao tốc. Tuân thủ biển, vạch và quy định đỗ xe; không chặn lối ra vào, không chiếm lối đi hay đỗ hàng đôi; nếu không thể thao tác hợp pháp và an toàn thì chọn nơi khác.',
    mnemonic: { text: 'Rõ chỗ, nhường xe, lùi chậm, chưa chắc thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    quickCheck: [
      { prompt: 'Xe máy đi vào vùng đầu xe đang quét ra khi bạn lùi ghép; bạn làm gì?', options: ['Tiếp tục vì đã bật xi-nhan', 'Dừng hẳn, nhường xe qua và chỉ tiếp tục khi quan sát rõ toàn bộ vùng thao tác', 'Đánh lái nhanh hơn để vào chỗ'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Mốc canh và khoảng trống nào bảo đảm ghép được với mọi xe?', options: ['Dài hơn xe một khoảng cố định là đủ', 'Hai đuôi ngang nhau thì luôn được đánh hết lái', 'Không có mốc chung bảo đảm; phải đánh giá theo xe, khoảng hở và vùng đầu xe quét'], correctIndex: 2 },
      { prompt: 'Đỗ xong trên đường phố, lựa chọn nào đúng trước khi rời xe?', options: ['Bánh gần nhất cách lề phải không quá 0,25 m, không gây cản trở; giữ xe bằng phanh đỗ và số phù hợp, tắt máy, quan sát trước, sau và bên mở cửa', 'Chỉ cần cách đều hai xe, không cần phanh đỗ', 'Chỉ nhìn gương trái rồi mở cửa ngay'], correctIndex: 0 }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng ghép ngang trên phố.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Sửa điều kiện ghép, quan sát, quy định sát lề và sơ đồ lề phải; bỏ mốc lái cố định và thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-slope',
    lessonId: 'parking-underground',
    topicId: 'parking',
    title: 'Lùi xe trên dốc hầm',
    context: 'Bạn dùng xe số tự động tại khu đỗ xe có độ dốc, chỉ thao tác ở ô đỗ được phép lùi và còn đủ khoảng trống, không trên đường dốc ra vào hầm. Lùi có thể lên hoặc xuống dốc; sơ đồ chỉ minh họa lùi thẳng lên dốc, không phải mốc áp dụng cho mọi xe.',
    objective: 'Nhận biết hướng dốc, kiểm soát xe lùi thật chậm và dừng, giữ xe an toàn thay vì để trôi hoặc cố vào ô không phù hợp.',
    risk: 'high',
    difficulty: 3,
    minutes: 4,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Chọn ô được phép đỗ và lùi; xác định phía cao, phía thấp, độ bám và khoảng trống cả đầu, đuôi xe; chọn chỗ bằng phẳng khác nếu dốc trơn, thiếu tầm nhìn hoặc chưa tự tin giữ xe.', cueType: 'marker', cueText: 'Không coi đường dốc ra vào hầm là ô đỗ' },
      { instruction: 'Quét gương, điểm mù và nhìn trực tiếp hai bên, phía sau cùng vùng đầu xe có thể quét ra; nhường người đi bộ, xe máy và xe khác, chỉ bắt đầu khi đường đi rõ.', cueType: 'mirror', cueText: 'Camera và cảm biến chỉ hỗ trợ quan sát' },
      { instruction: 'Dừng hẳn, giữ phanh chân rồi cài R, có tín hiệu lùi và bật đèn chiếu gần khi thiếu sáng; đọc hướng dẫn của xe về phanh đỗ điện tử, Auto Hold và hỗ trợ khởi hành ngang dốc trước khi thao tác.', cueType: 'feel', cueText: 'R không ngăn xe trôi xuống dốc; hỗ trợ không thay phanh đỗ', speedHint: '0 km/h' },
      { instruction: 'Giữ xe bằng phanh cho tới khi sẵn sàng: nếu lùi xuống dốc, giảm lực phanh có kiểm soát theo tốc độ thực tế, không nhả hết cho xe trôi; nếu lùi lên dốc, dùng cách khởi hành theo hướng dẫn của xe và đã được tập cùng giáo viên, không mặc định nhả phanh là xe sẽ lùi.', cueType: 'feel', cueText: 'Không có hành trình nhả phanh chung; không dùng ga để giữ xe đứng yên', speedHint: 'tốc độ đi bộ hoặc chậm hơn' },
      { instruction: 'Lùi thật chậm, liên tục kết hợp gương với quan sát trực tiếp quanh xe; chỉnh lái theo khoảng trống thực tế, kiểm tra cả vùng đầu xe quét ra, không bám riêng camera hay một mốc lái cố định.', cueType: 'mirror', cueText: 'Sẵn sàng đạp phanh, chưa chắc thì dừng', steeringHint: 'sơ đồ lùi thẳng, không mô phỏng quỹ đạo vào ô khi đánh lái' },
      { instruction: 'Đạp phanh để dừng hẳn và giữ xe ngay khi xe tăng tốc, trôi sai hướng, có người hoặc xe vào đường đi, cảm biến cảnh báo hay không chắc khoảng cách; không chọn P khi đang chuyển động, chỉ đổi R/D sau khi đứng hẳn và quan sát lại.', cueType: 'feel', cueText: 'Hỗ trợ khởi hành chỉ giữ tạm thời và có thể không kích hoạt' },
      { instruction: 'Dừng hẳn trong ô, giữ phanh chân và thực hiện trình tự đỗ theo hướng dẫn của xe: cài phanh đỗ và chọn P trước khi nhả phanh chân; không dựa riêng vào P hoặc Auto Hold để đỗ trên dốc.', cueType: 'feel', cueText: 'Phanh chân giữ xe trong suốt quá trình cài phanh đỗ và P' },
      { instruction: 'Kiểm tra xe đã được giữ chắc bằng cách giảm lực phanh chân thận trọng khi vẫn ngồi ở vị trí lái, đạp giữ lại ngay nếu xe dịch chuyển; chỉ tắt máy, rời xe và mở cửa sau khi xe đã an toàn, quan sát trước, sau và bên mở cửa.', cueType: 'feel', cueText: 'Đỗ dốc trên đường bộ phải đánh lái về phía lề và chèn bánh; không ra khỏi xe chưa được giữ chắc' }
    ],
    mistakes: [
      'Nhả phanh theo một tỷ lệ hành trình cố định hoặc nghĩ cài R thì xe không thể trôi về phía trước khi lùi lên dốc.',
      'Dùng ga để giữ xe đứng yên trên dốc hoặc tin hỗ trợ khởi hành và Auto Hold luôn giữ xe vô thời hạn.',
      'Chỉ nhìn gương hoặc camera, bỏ sót quan sát trực tiếp và vùng đầu xe quét ra khi đánh lái.'
    ],
    recovery: 'Đạp phanh dừng hẳn và giữ xe, không dùng P làm phanh dừng. Nếu cần bỏ ô, chỉ chọn D và tiến ra sau khi đứng hẳn, nhường người và xe, quan sát rõ phía trước, hai bên và vùng đuôi xe quét; nếu không thể đi an toàn, tiếp tục giữ xe và nhờ nhân viên bãi hỗ trợ. Khi cần đỗ chờ, giữ phanh chân trong lúc cài phanh đỗ và P theo hướng dẫn của xe; nếu xe vẫn dịch chuyển, đạp giữ phanh, không rời vị trí lái và gọi hỗ trợ. Không tự bước ra sau hoặc xuống phía thấp của xe chưa được giữ chắc để chèn bánh; nếu cần người hướng dẫn, họ phải đứng ngoài đường xe chạy, luôn trong tầm nhìn, mất liên lạc thì dừng.',
    safety: 'Không lùi trên đường dốc ra vào hầm, nơi không được phép, đường một chiều, khu vực cấm dừng, chỗ người đi bộ qua đường, nơi giao nhau, giao cắt đường sắt, nơi khuất tầm nhìn, hầm đường bộ hoặc cao tốc. Dừng ngay nếu mặt dốc trơn, đọng nước, có người hoặc xe vào đường đi, không rõ khoảng cách hay xe trôi ngoài ý muốn; giữ phanh chân, không chọn P khi xe còn chuyển động. Không rời xe chưa được giữ chắc bằng phanh đỗ và P theo hướng dẫn của xe; đỗ dốc trên đường bộ phải đánh lái về phía lề và chèn bánh, không đứng phía thấp của xe chưa được giữ chắc. Ví dụ dành cho xe số tự động, không thay bài tập côn và số đỗ cho xe số sàn.',
    mnemonic: { text: 'Rõ dốc, giữ phanh, chưa chắc thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    quickCheck: [
      { prompt: 'Với xe số tự động lùi xuống dốc tại ô được phép, nên kiểm soát phanh thế nào?', options: ['Nhả hết phanh để xe tự trôi vào ô', 'Điều chỉnh lực phanh theo tốc độ thực tế, bò thật chậm và luôn dừng được ngay', 'Về N để xe dễ lăn xuống'], correctIndex: 1 },
      { prompt: 'Khi lùi lên dốc, cài R và hỗ trợ khởi hành có bảo đảm xe không trôi xuống không?', options: ['Không; hỗ trợ chỉ tạm thời, có thể không kích hoạt; giữ xe bằng phanh và dùng cách khởi hành theo hướng dẫn của xe', 'Có, R luôn khóa xe không cho trôi về phía trước', 'Có, chỉ cần dùng ga để giữ xe đứng yên'], correctIndex: 0 },
      { prompt: 'Xe bất ngờ trôi hoặc có người vào đường đi khi đang lùi trên dốc, bạn làm gì?', options: ['Đạp phanh dừng hẳn, giữ xe và chỉ đi tiếp khi an toàn; nếu đỗ chờ, cài phanh đỗ và P theo hướng dẫn trước khi nhả phanh chân', 'Chọn P ngay khi xe đang trôi để khóa bánh', 'Lùi nhanh cho xong rồi mới kiểm tra'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ lùi xe trên dốc hầm.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Thêm mốc đo hành trình phanh và bước về P sau khi dừng.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Bỏ tỷ lệ nhả phanh cố định; phân biệt lùi lên, xuống dốc, giữ xe an toàn và sửa hai sơ đồ; công bố chưa thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'parking-lowlight',
    lessonId: 'parking-underground',
    topicId: 'parking',
    title: 'Lùi chuồng khi hầm thiếu sáng',
    context: 'Bạn lái xe số tự động trong bãi đỗ tầng hầm thiếu sáng; gương khó thấy vật cản thấp, camera có thể nhiễu hoặc lóa. Chỉ lùi tại ô được phép khi quan sát rõ đường xe sẽ đi; âm thanh và mốc đã nhớ không chứng minh phía sau đang trống.',
    objective: 'Đánh giá đủ tầm nhìn trước khi lùi, kết hợp quan sát trực tiếp với gương và dừng khi không còn thấy rõ khoảng trống.',
    risk: 'medium',
    difficulty: 3,
    minutes: 5,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'poor', stress: 'moderate' },
    steps: [
      { instruction: 'Chọn ô được phép, đủ rộng và đủ sáng để thấy vạch, cột, vật cản thấp và lối vào ô; tránh lối qua đường và lối ra vào của người đi bộ. Nếu chưa thấy rõ đường đi, dừng ở vị trí an toàn và nhờ nhân viên bãi hỗ trợ, không cố đi qua để ghi nhớ mốc.', cueType: 'marker', cueText: 'Không lùi vào vùng chưa quan sát rõ' },
      { instruction: 'Bật đèn chiếu gần, không dùng đèn chiếu xa gây lóa; kiểm tra đèn lùi hoạt động khi chọn R và xe vẫn được giữ bằng phanh. Không bật đèn sương mù chỉ vì hầm tối. Nếu kính, gương hoặc camera bẩn, đọng hơi, chỉ làm sạch khi xe đã đỗ và giữ chắc an toàn.', cueType: 'marker', cueText: 'Đèn chiếu gần hướng trước; đèn lùi không bảo đảm thấy hết phía sau' },
      { instruction: 'Dừng hẳn, giữ phanh chân; quan sát trực tiếp hai bên và phía sau, kiểm tra gương, điểm mù, người đi bộ, xe máy, cột và vùng đầu xe sẽ quét khi đánh lái. Chỉ chọn R và có tín hiệu lùi khi đường đi đã rõ, nhường người và xe trước khi di chuyển.', cueType: 'mirror', cueText: 'Camera và cảm biến chỉ hỗ trợ, không thay quan sát trực tiếp' },
      { instruction: 'Giảm âm lượng trong xe; có thể hạ kính nếu an toàn để nghe cảnh báo. Không nghe thấy tiếng động không có nghĩa là đường trống; không dùng âm thanh hay mốc đã nhớ thay cho kiểm tra hiện tại.', cueType: 'sound', cueText: 'Nghe để bổ sung, không nghe để đo khoảng cách' },
      { instruction: 'Nhờ người hướng dẫn nếu cần và thống nhất tín hiệu khi xe đang dừng. Người đó phải ở bên ngoài đường xe chạy và vùng đầu xe quét, không đứng giữa xe với tường, cột hay xe khác, luôn trong tầm nhìn của người lái. Mất liên lạc hoặc không còn thấy người hướng dẫn thì dừng ngay.', cueType: 'marker', cueText: 'Người hướng dẫn không đứng sau đuôi trong đường lùi' },
      { instruction: 'Lùi ở tốc độ đi bộ hoặc chậm hơn, luôn có thể dừng ngay trong khoảng trống nhìn rõ; liên tục kết hợp gương với quan sát trực tiếp quanh xe và vùng đầu xe quét. Dừng kiểm tra lại khi cần, không chờ đủ một quãng cố định mới dừng.', cueType: 'mirror', cueText: 'Không có nhịp lùi hay khoảng cách dừng chung cho mọi tình huống', speedHint: 'tốc độ đi bộ hoặc chậm hơn' },
      { instruction: 'Đạp phanh dừng hẳn và giữ xe ngay khi không rõ khoảng cách, bị lóa, có cảnh báo, người hoặc xe vào đường đi. Chỉ tiếp tục sau khi kiểm tra lại và thấy rõ an toàn; nếu vẫn thiếu sáng, nhờ nhân viên bãi hỗ trợ hoặc chọn ô sáng hơn chỉ khi có đường đi an toàn. Dừng hẳn trước đổi R/D.', cueType: 'marker', cueText: 'Không thấy rõ thì giữ phanh, không lùi thử' },
      { instruction: 'Dừng hẳn khi đỗ xong hoặc cần rời xe để kiểm tra, giữ phanh chân và cài phanh đỗ, P theo hướng dẫn của xe trước khi nhả phanh chân; xác nhận xe đứng chắc. Chỉ mở cửa và xuống xe sau khi quan sát trước, sau và bên mở cửa; nếu không thể giữ xe hoặc ra ngoài an toàn, ở lại vị trí lái, giữ phanh và gọi hỗ trợ.', cueType: 'marker', cueText: 'Không chọn P khi xe đang chuyển động; không rời xe chưa giữ chắc' }
    ],
    mistakes: [
      'Tin camera, cảm biến, mốc đã nhớ hoặc sự im lặng chứng minh phía sau không có người hay vật cản.',
      'Cố lùi đủ một đoạn rồi mới kiểm tra, bỏ sót vật cản thấp và vùng đầu xe quét.',
      'Dùng đèn chiếu xa hoặc đèn sương mù chỉ vì tối, hoặc xuống xe khi chưa giữ xe chắc và kiểm tra lối mở cửa.'
    ],
    recovery: 'Giữ phanh để dừng hẳn; không lùi thử vào vùng tối và không chọn P khi còn chuyển động. Nếu cần ra ngoài kiểm tra, giữ phanh chân trong khi cài phanh đỗ và P theo hướng dẫn, xác nhận xe đứng chắc rồi quan sát trước, sau, bên mở cửa và lối đi bộ trước khi ra; không đứng giữa xe và vật cản. Nếu không thể giữ xe hay ra ngoài an toàn, ở lại vị trí lái, giữ phanh và gọi nhân viên bãi. Chỉ chuyển sang ô sáng hơn khi quan sát rõ đường đi và dừng hẳn trước đổi chiều. Đèn cảnh báo khi cần báo nguy không cho phép tiếp tục lùi hoặc tạo quyền ưu tiên.',
    safety: 'Chỉ lùi tại khu vực đỗ được phép và khi quan sát rõ hai bên, phía sau cùng vùng đầu xe quét; không lùi ở nơi tầm nhìn bị che khuất, đường một chiều, khu vực cấm dừng, phần đường người đi bộ qua đường, nơi giao nhau, giao cắt đường sắt, hầm đường bộ hoặc cao tốc. Bãi đỗ tầng hầm không phải hầm đường bộ. Dừng và giữ phanh khi không thấy rõ, có người hoặc xe vào đường đi, hay mất liên lạc với người hướng dẫn; họ phải ở ngoài đường xe chạy, vùng kẹp và luôn trong tầm nhìn. Không dựa vào sự im lặng, đèn lùi, camera hoặc cảm biến để kết luận an toàn. Trước khi rời xe, dừng hẳn, cài phanh đỗ và P theo hướng dẫn, xác nhận xe đứng chắc và kiểm tra lối mở cửa; không ra ngoài nếu chưa an toàn. Không chọn ô chắn lối người đi bộ.',
    mnemonic: { text: 'Thấy rõ mới lùi, chưa rõ thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_reverse',
    quickCheck: [
      { prompt: 'Camera tối, không nghe tiếng động và đã nhớ vị trí cột; có thể lùi chưa?', options: ['Có, sự im lặng chứng minh không có ai', 'Chưa; phải quan sát trực tiếp kết hợp gương, thấy rõ đường đi; âm thanh, camera và cảm biến chỉ hỗ trợ', 'Có, chỉ cần bật đèn sương mù'], correctIndex: 1 },
      { prompt: 'Đang lùi thì mất dấu người hướng dẫn hoặc không rõ khoảng cách; bạn làm gì?', options: ['Lùi hết đoạn đã định rồi mới kiểm tra', 'Đạp phanh dừng hẳn và giữ xe, chỉ tiếp tục khi quan sát rõ và liên lạc lại an toàn', 'Bật đèn cảnh báo rồi tiếp tục lùi chậm'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Cần xuống xe kiểm tra trong bãi tối, cách nào an toàn?', options: ['Giữ R rồi mở cửa nhìn ra sau', 'Dừng hẳn, giữ phanh chân khi cài phanh đỗ và P theo hướng dẫn, xác nhận xe đứng chắc và kiểm tra lối mở cửa; không an toàn thì ở lại giữ phanh, gọi hỗ trợ', 'Chọn ô sát lối người đi bộ rồi xuống ngay'], correctIndex: 1 }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống hầm thiếu sáng.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Sửa quan sát, chiếu sáng, điều kiện dừng, người hướng dẫn và rời xe an toàn; bỏ mốc lùi cố định, sửa hai sơ đồ và công bố chưa thẩm định độc lập.', author: 'Biên tập nội dung' }
    ]
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
