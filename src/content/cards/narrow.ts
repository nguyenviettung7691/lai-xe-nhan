import { defineCard } from '../define'
import type { Card } from '../../types'

/** Chuyên đề 2 — Đi trong ngõ hẹp, tránh xe và nhường đường. */
export const narrowCards: Card[] = [
  defineCard({
    id: 'narrow-creep',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Bò chậm qua ngõ hẹp',
    context: 'Ngõ có tường, xe máy dựng sát mép và cửa nhà khuất tầm nhìn; khoảng trống có thể thay đổi bất ngờ. Bài này minh họa xe số tự động trên nền bằng, chỉ đi vào khi toàn bộ xe kể cả gương còn đủ khoảng hở và có thể quan sát để dừng an toàn.',
    objective: 'Kiểm soát xe ở tốc độ bò, quan sát liên tục và dừng trong khoảng đường nhìn rõ còn trống.',
    risk: 'medium',
    difficulty: 2,
    minutes: 5,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Dừng trước đoạn thắt hẹp để kiểm tra lối đi được phép, khoảng hở cho cả thân, gương, góc xe và vật cản thấp; chưa chắc đủ chỗ thì không vào, chọn đường khác.', cueType: 'marker', cueText: 'Bề rộng ngõ không tự chứng minh xe lọt; chú ý tay lái xe máy, cửa có thể mở và người hai bên' },
      { instruction: 'Giữ gương mở để quan sát; chỉ cân nhắc gập khi xe đã dừng, theo hướng dẫn của xe và vẫn bảo đảm quan sát, khoảng hở toàn xe, nếu không thì đổi lối đi.', cueType: 'mirror', cueText: 'Không có mốc bề rộng chung để gập gương; mở lại ngay khi đủ chỗ an toàn' },
      { instruction: 'Giữ phanh chân khi chọn D lúc xe đã đứng hẳn; với xe có chế độ tự bò, giảm lực phanh có kiểm soát bằng chân phải để đi ở tốc độ đi bộ hoặc chậm hơn, luôn dừng được trong phần đường nhìn rõ còn trống.', cueType: 'feel', cueText: 'Không đạp ga và phanh cùng lúc; xe không tự bò thì dừng, làm theo hướng dẫn của xe, không đệm ga để cố vượt chỗ hẹp', speedHint: 'tốc độ đi bộ hoặc chậm hơn; giảm nữa hoặc dừng khi tầm nhìn ngắn' },
      { instruction: 'Quét mắt luân phiên xa và gần, hai bên cửa nhà, gương và điểm mù; theo dõi trẻ nhỏ, người đi bộ, xe máy và khoảng trống phía trước, không nhìn cố định một điểm.', cueType: 'marker', cueText: 'Không có điểm nhìn cố định 10 m; camera và cảm biến chỉ hỗ trợ' },
      { instruction: 'Giữ vô-lăng bằng hai tay ở vị trí phù hợp với xe, sửa lái từng nhịp nhỏ và kiểm tra cả góc đầu xe, thân, gương và đường bánh sau đi qua.', cueType: 'feel', cueText: 'Không bám mắt vào một bên tường; chưa rõ khoảng hở thì dừng trước khi sửa tiếp', steeringHint: 'sửa nhỏ, tránh đánh lái gấp để lách người hoặc xe máy' },
      { instruction: 'Đạp phanh dừng hẳn và giữ xe khi có người hoặc xe cắt ngang, mất tầm nhìn, cảnh báo va chạm hoặc chưa chắc khoảng hở; không cố lách, không tự lùi vào vùng khuất.', cueType: 'marker', cueText: 'Dừng trước vùng xung đột; không chọn P khi xe còn chuyển động' },
      { instruction: 'Quan sát lại phía trước, hai bên, gương và điểm mù; chỉ đi tiếp khi người và xe đã qua, lối đi rõ và đủ khoảng hở, nếu không thì tiếp tục giữ xe và tìm hỗ trợ.', cueType: 'marker', cueText: 'Không tự bò theo xe máy vừa qua; không coi còi hay cảm biến im lặng là đường đã an toàn' }
    ],
    mistakes: [
      'Lấy tốc độ giới hạn làm mục tiêu hoặc đệm ga để cố vượt chỗ hẹp.',
      'Chỉ nhìn xa hoặc bám một bên tường, bỏ sót người và vật cản sát xe.',
      'Gập gương để cố lọt hoặc tự lùi khi chưa kiểm tra an toàn phía sau.'
    ],
    recovery: 'Đạp phanh dừng hẳn và giữ xe, không chọn P khi đang lăn; hạ kính chỉ hỗ trợ nghe và nhìn, không chứng minh đủ khoảng hở. Nếu cần xuống kiểm tra, giữ phanh chân, dùng phanh đỗ và P theo hướng dẫn của xe, bảo đảm xe đứng chắc và mở cửa an toàn. Nhờ người hướng dẫn đứng ngoài đường xe chạy và vùng quét của xe, không giữa xe với tường, luôn thấy nhau; mất liên lạc thì dừng. Chỉ lùi khi được phép, quan sát rõ hai bên và phía sau, có tín hiệu lùi và đường lùi an toàn; không lùi trên đường một chiều hoặc nơi tầm nhìn bị che khuất. Nếu không bảo đảm, giữ xe an toàn và gọi hỗ trợ thay vì tự lùi về chỗ rộng.',
    safety: 'Trẻ nhỏ, người đi bộ, xe máy hoặc cửa nhà có thể xuất hiện sát xe; đi chậm đến mức dừng được trong khoảng đường nhìn rõ còn trống. Khi nguy hiểm, đạp phanh dừng hẳn và giữ xe, không đánh lái lách hay tự lùi vào vùng khuất; chỉ đi tiếp sau khi quan sát lại và đủ khoảng hở. Chế độ tự bò, Auto Hold và xe điện khác nhau theo mẫu xe, phải đọc hướng dẫn và tập ở nơi an toàn; không mặc định nhả phanh là xe bò. Bài này không thay hướng dẫn côn cho xe số sàn hoặc kiểm soát xe trên dốc.',
    mnemonic: { text: 'Bò chậm, quét mắt, chưa rõ thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Với xe số tự động có chế độ tự bò trên nền bằng, nên kiểm soát tốc độ thế nào?', options: ['Chân phải điều chỉnh phanh, đi bộ hoặc chậm hơn, dừng được trong phần đường nhìn rõ còn trống', 'Đạp ga và phanh cùng lúc cho xe đi đều', 'Nhả hết phanh vì xe tự bò luôn đủ chậm'], correctIndex: 0 },
      { prompt: 'Cách quan sát và quyết định gập gương nào phù hợp trong ngõ hẹp?', options: ['Chỉ nhìn xa 10 m và gập gương khi ngõ dưới 2,5 m', 'Quét xa, gần, hai bên và gương; dừng để đánh giá toàn xe, không dùng mốc bề rộng chung để gập gương', 'Gập cả hai gương rồi dựa vào cảm biến để đi tiếp'], correctIndex: 1 },
      { prompt: 'Khi xe máy cắt ngang hoặc không còn nhìn rõ khoảng trống, bạn nên?', options: ['Lách qua hoặc tự lùi ngay về chỗ rộng', 'Đạp phanh dừng hẳn và giữ xe; chỉ đi tiếp sau khi quan sát lại và lối đi rõ, đủ khoảng hở', 'Đi tiếp nếu cảm biến chưa báo'], correctIndex: 1, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.2.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-08-20', summary: 'Bản đầu tiên của thẻ bò chậm trong ngõ.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-09-10', summary: 'Bổ sung mốc gập gương và điểm nhìn xa cụ thể.', author: 'Biên tập nội dung' },
      { version: '1.2.0', date: '2026-10-25', summary: 'Bỏ mốc gập gương, tốc độ và điểm nhìn cố định; làm rõ xe tự động, điều kiện dừng, lùi an toàn và hai sơ đồ; bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'narrow-mirror',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Canh khoảng cách bằng gương',
    context: 'Trong ngõ có tường, xe máy đỗ và cửa nhà sát lối đi, khoảng hở có thể thay đổi ngay cạnh xe. Gương chỉ hỗ trợ quan sát hai bên và phía sau, không phải thước đo hay cách nhìn hết góc xe và điểm mù.',
    objective: 'Kết hợp gương với quan sát trực tiếp để giữ đủ khoảng hở cho toàn xe và dừng trước khi có nguy cơ va chạm.',
    risk: 'medium',
    difficulty: 2,
    minutes: 5,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Dừng trước đoạn hẹp, giữ xe và kiểm tra lối đi được phép, khoảng hở cho thân, hai gương, góc đầu xe và đường bánh sau đi qua; chưa chắc đủ chỗ thì không vào.', cueType: 'marker', cueText: 'Kiểm tra cả tay lái xe máy, cửa có thể mở, vật cản thấp hoặc nhô cao và người hai bên' },
      { instruction: 'Chỉnh ghế và gương khi xe đứng hẳn theo hướng dẫn của xe, giữ tầm nhìn phía sau và hai bên; chỉ dùng một phần thân xe ở mép gương làm tham chiếu nếu phù hợp với xe và tư thế ngồi.', cueType: 'mirror', cueText: 'Không chỉnh khi xe đang chạy, không chúc gương xuống đến mức mất quan sát phía sau' },
      { instruction: 'Giữ gương mở; chỉ cân nhắc gập khi đã dừng, theo hướng dẫn của xe và vẫn bảo đảm quan sát cùng khoảng hở toàn xe, nếu không thì chọn lối khác hoặc gọi hỗ trợ.', cueType: 'mirror', cueText: 'Không có mốc bề rộng ngõ chung để gập gương; mở lại ngay khi đủ chỗ an toàn' },
      { instruction: 'Quét mắt luân phiên phía trước xa và gần, hai gương, hai bên và điểm mù bằng quan sát trực tiếp khi cần; chỉ bò khi lối đi rõ, dừng được trong phần đường nhìn rõ còn trống.', cueType: 'mirror', cueText: 'Không nhìn cố định vào gương hay mốc tường, không dùng nhịp liếc tính bằng giây; gương cầu có thể làm vật trông xa hơn thực tế', speedHint: 'tốc độ đi bộ hoặc chậm hơn; giảm nữa hoặc dừng khi tầm nhìn ngắn' },
      { instruction: 'Kiểm tra cả hai bên, góc đầu xe, thân và đường bánh sau trước khi sửa lái từng nhịp nhỏ; nếu chưa rõ khoảng hở thì dừng trước khi sửa tiếp, không lái theo hai khoảng trống trông bằng nhau trong gương.', cueType: 'mirror', cueText: 'Khoảng hở nhìn thấy không phải số đo; gương không cho thấy hết vật cản thấp và vùng đầu xe quét', steeringHint: 'sửa nhỏ chỉ khi đường xe đi và vùng quét đều trống' },
      { instruction: 'Đạp phanh dừng hẳn và giữ xe trước vật cản khi chưa chắc khoảng hở, mất tầm nhìn, có người hoặc cửa mở vào lối đi hay cảnh báo va chạm; không chờ gương chạm mới dừng, không lách hoặc tự lùi vào vùng khuất.', cueType: 'marker', cueText: 'Cảm biến im lặng không chứng minh xe lọt; nếu đã va chạm thì dừng, giữ xe và kiểm tra, không cố đi tiếp' },
      { instruction: 'Quan sát lại phía trước, hai bên, gương và điểm mù; chỉ đi tiếp khi lối đi rõ, đủ khoảng hở toàn xe và không còn người trong đường xe chạy, nếu không thì tiếp tục giữ xe và tìm hỗ trợ.', cueType: 'marker', cueText: 'Người hướng dẫn phải ngoài đường xe chạy và vùng quét, không giữa xe với tường; luôn thấy nhau, mất liên lạc thì dừng' }
    ],
    mistakes: [
      'Coi gương là thước đo, cố giữ hai khoảng trống trông bằng nhau hoặc chỉ nhìn một bên.',
      'Chỉnh gương khi xe đang lăn, chúc gương quá thấp hoặc nhìn gương quá lâu mà bỏ sót phía trước.',
      'Chờ gương chạm mới dừng, gập gương để cố lọt hoặc tin cảm biến im lặng là đủ an toàn.'
    ],
    recovery: 'Đạp phanh dừng hẳn và giữ xe; nếu đã va chạm, không cố tiến hoặc lùi kéo qua vật cản, kiểm tra người và thiệt hại, gọi hỗ trợ khi cần. Nếu phải xuống kiểm tra, giữ phanh chân, dùng phanh đỗ và chế độ đỗ theo hướng dẫn của xe (P với xe có số P), bảo đảm xe đứng chắc rồi mới mở cửa an toàn. Người hướng dẫn phải đứng ngoài đường xe chạy và vùng quét, không giữa xe với tường, thống nhất tín hiệu và luôn thấy nhau; mất liên lạc thì dừng. Không mặc định gập gương hay lùi là thoát được; chỉ lùi khi được phép, quan sát rõ hai bên và phía sau, có tín hiệu lùi và đường lùi an toàn, không lùi ở đường một chiều hoặc nơi tầm nhìn bị che khuất. Nếu không bảo đảm thì giữ xe an toàn và gọi hỗ trợ.',
    safety: 'Gương không phải thước đo: gương cầu có thể làm vật trông xa hơn thực tế, vẫn còn điểm mù và góc xe không nhìn thấy. Giữ gương mở; chỉ cân nhắc gập khi đã dừng, theo hướng dẫn của xe và vẫn đủ quan sát, khoảng hở toàn xe, nếu không thì đổi lối đi; mở lại ngay khi đủ chỗ an toàn. Khi chưa chắc khoảng hở, có người vào đường xe chạy hoặc mất tầm nhìn, đạp phanh dừng hẳn và giữ xe trước va chạm, không lách hay tự lùi vào vùng khuất; chỉ đi tiếp sau khi quan sát lại và lối đi rõ, đủ khoảng hở. Camera, cảm biến và người hướng dẫn chỉ hỗ trợ, không thay trách nhiệm quan sát của người lái.',
    mnemonic: { text: 'Gương hỗ trợ, chưa rõ thì dừng.', rhythm: 'doi-ve' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Cách chỉnh và dùng gương nào phù hợp khi qua ngõ hẹp?', options: ['Chỉnh lúc xe đang bò và coi khoảng trống trong gương là số đo', 'Chỉnh khi xe đứng hẳn theo hướng dẫn của xe; kết hợp gương với nhìn phía trước, hai bên và điểm mù', 'Chúc cả hai gương xuống để chỉ nhìn bánh sau'], correctIndex: 1 },
      { prompt: 'Hai khoảng trống trong gương trông khác nhau hoặc ngõ rất hẹp, bạn nên hiểu thế nào?', options: ['Phải sửa lái đến khi hình ảnh hai bên bằng nhau', 'Ngõ dưới 2,2 m thì gập gương và đi tiếp', 'Không suy ra số đo từ gương; kiểm tra khoảng hở toàn xe, dừng nếu chưa chắc và không gập gương để cố lọt'], correctIndex: 2 },
      { prompt: 'Chưa chắc gương hoặc góc xe có qua được vật cản, bạn nên?', options: ['Đạp phanh dừng hẳn và giữ xe trước vật cản; chỉ đi tiếp sau khi quan sát lại và rõ lối đi, đủ khoảng hở toàn xe', 'Tiếp tục bò đến khi gương chạm rồi mới dừng', 'Đi tiếp nếu cảm biến không báo'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về cách canh khoảng cách bằng gương.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Làm rõ giới hạn của gương, khoảng hở toàn xe, dừng trước va chạm và hỗ trợ an toàn; thay hai sơ đồ, bỏ mốc gập gương và thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'narrow-corner',
    lessonId: 'narrow-control',
    topicId: 'narrow',
    title: 'Ôm cua vuông góc trong ngõ',
    context: 'Ngõ rẽ vuông góc có tường sát mép, người và xe máy có thể xuất hiện sau góc khuất; bánh sau phía trong đi theo đường cong hẹp hơn bánh trước. Bài minh họa xe con tiến rẽ phải ở tốc độ thấp, không kéo rơ-moóc; rẽ trái cũng phải kiểm tra vùng quét và nhường đường, không sao chép vị trí xe hay mốc đánh lái từ hình.',
    objective: 'Đánh giá lối rẽ được phép, giữ khoảng hở cho toàn xe qua góc trong và phía ngoài, dừng trước nguy cơ thay vì cố ôm cua.',
    risk: 'medium',
    difficulty: 3,
    minutes: 6,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'moderate' },
    steps: [
      { instruction: 'Giảm tốc từ trước góc cua, kiểm tra biển báo và lối rẽ được phép; dừng trước vùng khuất khi chưa nhìn rõ đường còn trống hoặc chưa chắc toàn xe qua được.', cueType: 'marker', cueText: 'Kiểm tra bề rộng cả hai nhánh, góc tường, vật cản thấp, người và xe có thể xuất hiện; không đủ chỗ thì không vào' },
      { instruction: 'Quan sát phía trước, phía sau, hai bên và điểm mù, bật xi-nhan theo hướng rẽ và duy trì trong suốt quá trình chuyển hướng; nhường người đi bộ, xe đạp, xe máy và xe đi ngược chiều, chỉ rẽ khi không gây nguy hiểm hoặc cản trở.', cueType: 'mirror', cueText: 'Xi-nhan không tạo quyền ưu tiên; kiểm tra cả xe máy đang đi sát bên, không mặc định đã thấy nhau' },
      { instruction: 'Chọn vị trí trong phần đường được phép, chừa khoảng hở cho thân, gương, góc đầu và đuôi xe ở cả hai bên; không mặc định bám sát mép ngoài hay mở cua sang phần đường ngược chiều, nếu không đủ chỗ thì dừng và chọn lối khác hoặc gọi hỗ trợ.', cueType: 'marker', cueText: 'Gương mở để quan sát; không gập gương để cố lọt, không dùng mốc vai xe qua tường cho mọi xe' },
      { instruction: 'Đánh lái từng nhịp có kiểm soát khi đã quan sát rõ khoảng trống, chỉ tiến ở tốc độ đi bộ hoặc chậm hơn để dừng được trong phần đường nhìn rõ còn trống; kiểm tra góc đầu xe phía ngoài và bánh sau phía trong có thể đi sát chân tường hơn bánh trước.', cueType: 'feel', cueText: 'Điểm bắt đầu và lượng lái phụ thuộc chiều dài cơ sở, bán kính quay, phần nhô đầu đuôi và hình dạng góc cua; không có mốc đánh lái chung', speedHint: 'đi bộ hoặc chậm hơn; giảm nữa hoặc dừng khi tầm nhìn ngắn', steeringHint: 'không mặc định đánh hết lái hoặc giữ tốc độ không đổi' },
      { instruction: 'Quét mắt luân phiên đường phía trước, hai bên, gương và điểm mù bằng quan sát trực tiếp khi an toàn; theo dõi khoảng hở toàn xe, không nhìn cố định vào gương trong cua hay mặc định gương thấy được lốp sau và chân tường.', cueType: 'mirror', cueText: 'Gương, camera và cảm biến chỉ hỗ trợ, không cho thấy hết vùng đầu đuôi xe quét; cảm biến im lặng không chứng minh đủ chỗ' },
      { instruction: 'Đạp phanh dừng hẳn và giữ xe trước nguy cơ khi chưa rõ khoảng hở, mất tầm nhìn, có người hoặc xe vào vùng quét hay có cảnh báo; không cố tiến, đánh lái lách hoặc tự lùi tại góc khuất, chỉ đi tiếp sau khi quan sát lại và toàn bộ lối rẽ rõ, đủ khoảng hở, đã nhường đường.', cueType: 'marker', cueText: 'Không chờ bánh hoặc thân chạm tường; chưa thể bảo đảm an toàn thì giữ xe và gọi hỗ trợ' },
      { instruction: 'Trả lái dần theo lối ra khi đã kiểm tra bánh sau, thân và đuôi xe qua góc trong còn đủ khoảng hở, đồng thời phía trước và hai bên thông thoáng; giữ chậm đến khi toàn xe thẳng và qua hết vùng hẹp rồi mới tăng tốc phù hợp.', cueType: 'marker', cueText: 'Đầu xe đã hướng vào ngõ mới chưa chứng minh đuôi và bánh sau đã qua góc; không tăng tốc để kéo đuôi qua', steeringHint: 'trả lái theo khoảng trống thực tế, không theo riêng hướng đầu xe' }
    ],
    mistakes: [
      'Bám mép ngoài hoặc dùng mốc vai xe qua tường như quy tắc chung, bỏ sót xe ngược chiều và khoảng quét đầu đuôi.',
      'Giữ một tốc độ cố định, nhìn chằm chằm vào gương trong cua hoặc tin cảm biến thay cho quan sát.',
      'Thấy đầu xe đã qua thì trả lái hoặc tăng tốc ngay, rồi tự lùi ở góc khuất khi bánh sau còn sát tường.'
    ],
    recovery: 'Đạp phanh dừng hẳn và giữ xe; nếu đã va chạm, không cố tiến hoặc lùi, kiểm tra người và thiệt hại, gọi hỗ trợ khi cần. Muốn xuống kiểm tra, giữ phanh chân, dùng phanh đỗ và vị trí số theo hướng dẫn của xe, chỉ chọn P với xe có số P sau khi đứng hẳn; bảo đảm xe đứng chắc và mở cửa an toàn. Người hướng dẫn phải ở ngoài đường xe chạy và vùng quét, không giữa xe với tường; thống nhất tín hiệu, luôn thấy nhau, mất liên lạc thì dừng. Không tự lùi thẳng để sửa một quỹ đạo cong; chỉ lùi khi được phép, đã quan sát rõ hai bên và phía sau, có tín hiệu lùi và đường lùi an toàn, dừng hẳn trước đổi chiều. Không lùi tại nơi đường giao nhau, đường một chiều, nơi tầm nhìn bị che khuất hoặc nơi cấm lùi khác; nếu không thể sửa an toàn thì giữ xe và gọi hỗ trợ thay vì thử nhiều lần.',
    safety: 'Chưa rõ đường hoặc khoảng hở thì đạp phanh dừng hẳn và giữ xe trước nguy cơ, không cố tiến hay tự lùi tại góc khuất hoặc nơi đường giao nhau; chỉ đi tiếp sau khi quan sát lại, đủ khoảng hở toàn xe và đã nhường người, xe. Đi bộ hoặc chậm hơn để dừng được trong phần đường nhìn rõ còn trống; xi-nhan suốt quá trình rẽ, không mở cua sang phần đường ngược chiều hay gập gương để cố lọt. Còi chỉ dùng để cảnh báo tình huống có thể mất an toàn theo quy định, không thay quan sát, xi-nhan hay nhường đường; không bấm liên tục, không dùng từ 22 giờ đến 05 giờ trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh, trừ xe ưu tiên. Sơ đồ không phải mốc đánh lái hay bảo đảm xe bạn quay lọt; thực hành với giáo viên đủ chuyên môn ở nơi an toàn.',
    mnemonic: { text: 'Nhìn lối, chừa toàn xe, chưa rõ thì dừng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Nên chọn vị trí và thời điểm đánh lái thế nào trước góc cua hẹp?', options: ['Luôn bám mép ngoài, vai qua góc tường là đánh hết lái', 'Trong phần đường được phép, đủ khoảng hở toàn xe và quan sát rõ; không có mốc vai xe chung, không đủ chỗ thì dừng', 'Cứ đi giữa ngõ và rẽ khi đầu xe vừa ngang tường, mọi xe đều như nhau'], correctIndex: 1 },
      { prompt: 'Vì sao đầu xe đã vào ngõ mới vẫn chưa thể tăng tốc hoặc trả thẳng lái ngay?', options: ['Bánh sau phía trong đi theo đường cong hẹp hơn bánh trước; phải kiểm tra cả bánh sau, thân, đuôi và khoảng trống lối ra rồi trả lái dần', 'Bánh sau luôn đi đúng vệt bánh trước nên chỉ cần nhìn đầu xe', 'Nếu gương không thấy chân tường thì chắc chắn đuôi đã qua'], correctIndex: 0 },
      { prompt: 'Đang rẽ ở góc khuất, chưa rõ bánh sau có đủ khoảng hở hoặc có xe máy đi vào vùng quét, bạn làm gì?', options: ['Bấm còi rồi bò tiếp vì đã có xi-nhan', 'Lùi thẳng một đoạn ngay để lấy lại góc', 'Đạp phanh dừng hẳn và giữ xe trước nguy cơ; không tự lùi ở góc khuất, chỉ đi tiếp sau quan sát lại, đủ khoảng hở và đã nhường đường'], correctIndex: 2, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho kỹ năng ôm cua vuông góc.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ mốc vai xe và mở cua mặc định; làm rõ vùng quét toàn xe, nhường đường, dừng và giới hạn lùi/còi; sửa hai sơ đồ quỹ đạo bánh, bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'narrow-yield',
    lessonId: 'narrow-negotiation',
    topicId: 'narrow',
    title: 'Nhường đường khi gặp xe ngược chiều',
    context: 'Hai ô tô ngược chiều gặp đoạn ngõ chỉ đủ một xe, có thể có xe máy hoặc người đi bộ sát bên và phía sau. Hình minh họa nền bằng, chỗ tránh ở bên phải và phía trước xe bạn; không phải hướng dẫn đánh lái hay lùi cho mọi ngõ.',
    objective: 'Dừng sớm, xác định bên phải nhường và chọn chỗ tránh được phép, đủ khoảng hở; không tiến hay lùi khi chưa bảo đảm an toàn.',
    risk: 'medium',
    difficulty: 3,
    minutes: 6,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giảm tốc trước đoạn hẹp, đi về bên phải theo chiều xe chạy trong phần đường được phép; nếu không đủ chỗ tránh nhau thì dừng sớm và giữ xe, chừa khoảng trống xử lý trong phần đường nhìn rõ còn trống.', cueType: 'marker', cueText: 'Không có mốc dừng 10 m chung; chưa rõ lối thoát thì không tiến vào đoạn thắt' },
      { instruction: 'Xác định bên phải nhường theo tình huống: đoạn chỉ đủ một xe có chỗ tránh thì xe gần chỗ tránh hơn phải vào nhường; xe xuống dốc nhường xe lên dốc; xe có chướng ngại vật phía trước nhường xe không có chướng ngại vật.', cueType: 'marker', cueText: 'Gần chỗ tránh không có nghĩa luôn phải lùi; quyền đi trước không cho phép cố chen' },
      { instruction: 'Quan sát phía trước, phía sau, hai bên và điểm mù; chọn chỗ tránh được phép, nhìn rõ, nền chắc, đủ cho toàn bộ thân, gương, đầu và đuôi xe cùng khoảng hở để xe kia qua. Không tự vào sân nhà, lên vỉa hè, chắn cửa, lối người đi bộ hoặc nút giao.', cueType: 'mirror', cueText: 'Khoảng lõm hay lối rẽ không mặc nhiên là chỗ tránh; không gập gương để cố lọt' },
      { instruction: 'Giữ xe đứng yên, trao đổi ngắn khi cả hai xe đã dừng để thống nhất bên di chuyển và bên chờ; dùng xi-nhan phù hợp trước khi đổi hướng vào chỗ tránh. Ưu tiên phương án tiến vào khi được phép và đủ chỗ, chỉ di chuyển sau khi kiểm tra lại và xe kia vẫn chờ.', cueType: 'marker', cueText: 'Cái vẫy tay hay nháy đèn không tạo quyền ưu tiên, không chứng minh phía sau an toàn' },
      { instruction: 'Kiểm tra điều kiện lùi: chỉ lùi nếu được phép, có tín hiệu lùi, quan sát rõ hai bên và phía sau, đường lùi đã trống; không lùi trên đường một chiều, nơi giao nhau, nơi cấm dừng hoặc tầm nhìn bị che khuất. Tiến hay lùi đều thật chậm, kiểm tra vùng quét đầu, đuôi và gương; dừng hẳn và giữ xe khi có người, xe máy, chưa rõ khoảng hở hoặc mất liên lạc với người hướng dẫn.', cueType: 'mirror', cueText: 'Không đủ điều kiện lùi thì giữ xe và tìm hỗ trợ; camera, cảm biến chỉ hỗ trợ, không thay quan sát', speedHint: 'đi bộ hoặc chậm hơn, luôn dừng được trong phần đường nhìn rõ còn trống' },
      { instruction: 'Dừng hẳn và giữ xe khi toàn xe đã gọn trong chỗ tránh và đủ khoảng hở cho xe kia; chờ toàn bộ xe đối diện cùng xe máy, người đi bộ đi kèm qua hết. Không nhích ra khi đuôi xe kia còn sát hoặc có xe khác đang tới.', cueType: 'marker', cueText: 'Giữ xe đứng yên, không coi đầu xe kia qua là đã hết nguy hiểm' },
      { instruction: 'Quan sát lại phía trước, phía sau, hai bên, gương và điểm mù; báo hướng ra, nhường người và xe đang đi qua, chỉ ra khỏi chỗ tránh khi lối đi rõ và đủ khoảng hở. Trở lại phía bên phải theo chiều đi, không mặc định chạy giữa ngõ.', cueType: 'marker', cueText: 'Chưa thấy rõ hoặc chưa đủ chỗ thì tiếp tục chờ, không đi theo cái vẫy tay' }
    ],
    mistakes: [
      'Cố chen vì nghĩ mình có quyền đi trước, hoặc lấy 10 m làm khoảng cách luôn an toàn.',
      'Tự lùi theo tín hiệu tay mà chưa kiểm tra xe máy, người đi bộ và điều kiện được phép lùi.',
      'Chọn khoảng lõm không đủ cho cả gương, hoặc nhích ra ngay khi đầu xe đối diện vừa qua.'
    ],
    recovery: 'Dừng hẳn và giữ xe nếu không có chỗ tránh an toàn; trao đổi khi xe đứng yên, không xuống xe chỉ để tranh luận, không mặc định bật đèn cảnh báo là được lùi. Nhờ hỗ trợ tại chỗ hoặc lực lượng chức năng nếu không thể giải tỏa an toàn. Nếu cần và được phép rời vị trí lái, dùng phanh đỗ, chọn P với xe tự động theo hướng dẫn của xe, bảo đảm xe đứng chắc và kiểm tra trước khi mở cửa; không đứng giữa hai xe hay giữa xe và tường. Người hướng dẫn phải đứng ngoài đường xe chạy, vùng quét và vùng kẹp, luôn thấy nhau; mất liên lạc thì dừng. Không lùi vào vùng khuất hoặc nơi cấm lùi để giải tỏa ùn xe.',
    safety: 'Không vì áp lực phía sau hay có quyền đi trước mà cố chen hoặc tự lùi; dừng hẳn và giữ xe khi có người, xe máy, mất tầm nhìn hoặc chưa rõ khoảng hở. Chỉ lùi nơi được phép, có tín hiệu lùi, quan sát rõ hai bên và phía sau, đường lùi an toàn; không lùi ở đường một chiều, nút giao hoặc nơi tầm nhìn bị che khuất. Khi có tín hiệu của xe ưu tiên đang làm nhiệm vụ theo quy định, giảm tốc, đi sát lề phải hoặc dừng an toàn để nhường, không gây cản trở; không tự lùi vào nguy hiểm. Không phải mọi xe cứu thương hay xe công vụ đều luôn có quyền ưu tiên; xe cứu thương phải đang làm nhiệm vụ cấp cứu và có tín hiệu ưu tiên theo quy định.',
    mnemonic: { text: 'Dừng sớm, chọn chỗ an toàn, chưa rõ thì chờ.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Trên nền bằng, đoạn chỉ đủ một xe có chỗ tránh an toàn ở gần bạn hơn và phía trước bên phải, bạn nên?', options: ['Dừng sớm, kiểm tra và báo hướng; tiến vào chỗ tránh khi đủ điều kiện, giữ xe nhường xe kia', 'Luôn lùi dù chỗ tránh ở phía trước', 'Cứ tiến vì xe nào đến trước được đi trước'], correctIndex: 0 },
      { prompt: 'Đã thống nhất bạn lùi nhưng phía sau có xe máy hoặc bị khuất tầm nhìn, bạn nên?', options: ['Lùi dưới 5 km/h là đủ an toàn', 'Dừng hẳn và giữ xe, không lùi; chỉ xem xét lại khi được phép và đường lùi rõ, an toàn, nếu không thì tìm hỗ trợ', 'Bật đèn cảnh báo rồi lùi theo tay người kia'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Xe cứu thương đang làm nhiệm vụ cấp cứu có tín hiệu ưu tiên tới đoạn hẹp, bạn nên?', options: ['Tự lùi vào góc khuất ngay để mở đường', 'Giữ đường vì bạn gần chỗ tránh hơn', 'Giảm tốc, đi sát lề phải hoặc dừng an toàn để nhường, không gây cản trở; không lùi nguy hiểm'], correctIndex: 2 }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về nhường đường trong ngõ một làn.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ mốc dừng và lùi mặc định; làm rõ quy tắc nhường, chỗ tránh, điều kiện lùi và xe ưu tiên; sửa hai sơ đồ và bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  }),
  defineCard({
    id: 'narrow-cutoff',
    lessonId: 'narrow-negotiation',
    topicId: 'narrow',
    title: 'Xử lý khi xe máy tạt đầu',
    context: 'Ô tô con từ ngõ nhánh ra đường chính tại ngã ba, xe máy có thể cắt ngang đầu xe từ cả hai phía, kể cả khi một xe vừa đi qua. Hai hình chỉ minh họa xe đang dừng trước vùng xung đột, không theo tỷ lệ và không phải quỹ đạo rẽ hay khoảng cách dừng bảo đảm; không mặc định mọi ngõ đều là đường không ưu tiên.',
    objective: 'Dừng trước vùng xung đột, nhường đúng quy định và phanh kịp thời khi có nguy hiểm; chỉ ra đường khi quan sát rõ và đủ khoảng trống cho toàn bộ thao tác.',
    risk: 'high',
    difficulty: 3,
    minutes: 6,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Quan sát phía trước và gương từ sớm, nhả ga, giảm tốc và chuẩn bị phanh trước miệng ngõ; tuân thủ người điều khiển giao thông, đèn, biển và vạch. Đi bộ hoặc chậm hơn, luôn dừng được trong phần đường nhìn rõ còn trống; dừng trước vùng người và xe cắt ngang, không để đầu xe chắn lối đi bộ.', cueType: 'marker', cueText: 'Vị trí dừng theo báo hiệu, tầm nhìn và khoảng hở thực tế, không có mốc 10 km/h luôn an toàn', speedHint: 'đi bộ hoặc chậm hơn; chưa rõ lối đi thì dừng' },
      { instruction: 'Xác định quy tắc nhường: từ đường nhánh ra đường chính hoặc đường không ưu tiên ra đường ưu tiên phải nhường xe trên đường chính hoặc đường ưu tiên từ bất kỳ hướng nào tới. Khi rẽ, báo hướng bằng xi-nhan liên tục trong quá trình chuyển hướng, nhường người đi bộ, xe thô sơ và xe đi ngược chiều; không dùng đầu xe ép dòng xe phải nhường.', cueType: 'marker', cueText: 'Tuân thủ báo hiệu thực tế; xi-nhan không tạo quyền ưu tiên' },
      { instruction: 'Quan sát luân phiên cả hai hướng khi đã dừng, sát trước đầu xe, hai bên, gương và điểm mù; chú ý xe máy đi sát mép, xe đạp, trẻ em và người qua đường kể cả ngoài vạch sang đường. Kiểm tra lại ngay trước khi di chuyển; không chỉ nhìn hướng đông xe hay tin rằng xe có xi-nhan chắc chắn sẽ rẽ.', cueType: 'mirror', cueText: 'Cột A, tường và xe đỗ có thể che xe máy; camera, cảm biến chỉ hỗ trợ' },
      { instruction: 'Giữ xe đứng yên nếu bị khuất; chỉ xem xét tiến rất chậm trong phần đường đã nhìn rõ còn trống và không cản người, xe cắt ngang. Không nhô từng đoạn 30 cm để buộc người khác thấy mình. Nếu không thể lấy tầm nhìn mà không lấn vùng xung đột thì tiếp tục dừng, tìm hỗ trợ an toàn hoặc lối khác được phép; không tự lùi tại nơi đường giao nhau hay nơi tầm nhìn bị che khuất.', cueType: 'marker', cueText: 'Không lấy đầu xe dò vùng khuất; người hướng dẫn không thể bảo đảm một khoảng trống sẽ còn an toàn' },
      { instruction: 'Nhả ga và đạp phanh ngay với lực cần thiết khi xe máy bất ngờ cắt ngang có nguy cơ va chạm, không trì hoãn chỉ để phanh êm. Với xe có ABS, đạp mạnh và giữ áp lực liên tục, không nhấp nhả phanh; làm theo hướng dẫn của xe. Giữ hướng ổn định, không đánh lái né theo phản xạ vào phần đường chưa kiểm tra hoặc làn ngược chiều; dừng hẳn và giữ xe khi lối đi chưa an toàn.', cueType: 'feel', cueText: 'Giảm tốc sớm khác với phanh khẩn cấp; ABS không bảo đảm quãng dừng ngắn hơn', steeringHint: 'không giật lái; không ép vô-lăng thẳng nếu xe đang rẽ' },
      { instruction: 'Giữ phanh sau khi xe máy đi qua và quan sát lại cả hai hướng, sát đầu xe, hai bên, gương và điểm mù để tìm xe đi tiếp phía sau và người đang qua đường. Chỉ đi khi có đủ thời gian và khoảng trống cho toàn bộ xe hoàn tất thao tác, không buộc người khác phanh hoặc đổi hướng; chưa rõ thì tiếp tục chờ, không đi theo còi hay cái vẫy tay.', cueType: 'timing', cueText: 'Một xe vừa qua hay khoảng trống một thân xe máy không phải điều kiện đủ để đi' },
      { instruction: 'Kiểm tra lần cuối khi đủ điều kiện, tiến và rẽ chậm theo hướng đã báo vào phần đường được phép; tiếp tục quan sát phía trước và hai bên. Nếu người hoặc xe khác xuất hiện, phanh dừng và giữ xe để nhường, không cố tăng ga vượt qua trước; không tự lùi để giải tỏa áp lực phía sau.', cueType: 'marker', cueText: 'Bị bấm còi thúc không làm lối đi an toàn hơn' }
    ],
    mistakes: [
      'Chỉ rà phanh cho êm khi cần phanh khẩn cấp, hoặc giật lái né vào xe, người bên cạnh.',
      'Nhô đầu xe theo mốc cố định để ép được nhường, bấm còi thay cho phanh và quan sát.',
      'Đi ngay sau một xe máy mà bỏ sót xe đi tiếp, hướng còn lại hoặc người qua đường ngoài vạch.'
    ],
    recovery: 'Nếu đầu xe đã lấn ra, phanh dừng hẳn và giữ xe, không cố tiến hoặc tự lùi vào nguy hiểm; không lùi tại nơi đường giao nhau hoặc nơi tầm nhìn bị che khuất. Nếu đã va chạm, dừng, kiểm tra người, gọi cấp cứu khi cần và thực hiện nghĩa vụ khi xảy ra tai nạn; không tự chạy đi. Khi chưa thể ra an toàn, nhờ hỗ trợ tại chỗ hoặc lực lượng chức năng. Người hướng dẫn phải đứng ngoài đường xe chạy, vùng quét và vùng kẹp, không giữa xe với tường; luôn thấy nhau, mất liên lạc thì dừng. Nếu cần và được phép rời vị trí lái, giữ phanh chân, dùng phanh đỗ và chọn P với xe tự động sau khi xe đứng hẳn theo hướng dẫn của xe; bảo đảm xe đứng chắc, kiểm tra trước khi mở cửa. Không xuống xe chỉ để tranh luận với người thúc phía sau.',
    safety: 'Chưa nhìn rõ hoặc có người, xe cắt ngang thì dừng hẳn và giữ xe trước vùng xung đột; nhường người đi bộ đang qua đường kể cả ngoài vạch. Khi nguy cơ va chạm xuất hiện, nhả ga và phanh ngay với lực cần thiết, không chỉ rà phanh; với ABS đạp mạnh và giữ áp lực, không nhấp nhả, theo hướng dẫn của xe. Không giật lái vào vùng chưa kiểm tra, không lấy đầu xe dò vùng khuất và không tự lùi tại nơi đường giao nhau hoặc nơi tầm nhìn bị che khuất. Chỉ đi tiếp sau khi quan sát lại cả hai hướng, điểm mù và xe đi tiếp phía sau xe vừa qua, đủ thời gian và khoảng trống cho toàn xe mà không ép người khác phanh hay đổi hướng. Còi chỉ dùng cảnh báo mất an toàn theo quy định, không thay phanh, quan sát hay nhường đường; không bấm liên tục, không dùng từ 22 giờ đến 05 giờ trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh, trừ xe ưu tiên.',
    mnemonic: { text: 'Chưa rõ thì dừng, nguy hiểm phanh ngay, nhìn lại mới đi.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Từ ngõ nhánh ra đường chính nhưng tường che khuất, chưa thể nhìn rõ mà không lấn lối xe máy, bạn nên?', options: ['Nhô từng đoạn 30 cm để buộc xe máy thấy và nhường', 'Dừng trước vùng xung đột, không lấn dò; tìm hỗ trợ an toàn hoặc lối khác được phép', 'Bấm còi rồi đi dưới 10 km/h'], correctIndex: 1, isStopCondition: true },
      { prompt: 'Xe máy cắt ngang sát đầu xe, nguy cơ va chạm tức thời; ô tô có ABS, bạn nên?', options: ['Chỉ rà phanh để tránh dừng đột ngột', 'Nhả ga, đạp phanh mạnh và giữ áp lực theo hướng dẫn xe; giữ hướng ổn định, không giật lái vào vùng chưa kiểm tra', 'Nhấp nhả phanh liên tục và né sang làn ngược chiều'], correctIndex: 1 },
      { prompt: 'Một xe máy vừa qua miệng ngõ, còn xe đi tiếp phía sau và người đang qua đường ngoài vạch, bạn nên?', options: ['Giữ xe đứng yên, nhường; quan sát lại cả hai hướng và điểm mù, chỉ đi khi đủ thời gian và khoảng trống cho toàn xe', 'Đi ngay vì đã nhường một xe và không có vạch sang đường', 'Chỉ cần chừa một thân xe máy rồi đi theo cái vẫy tay'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'published_unverified',
    version: '1.1.0',
    updatedAt: '2026-10-25',
    changelog: [
      { version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống xe máy tạt đầu.', author: 'Biên tập nội dung' },
      { version: '1.1.0', date: '2026-10-25', summary: 'Bỏ nhô đầu xe theo mốc và phanh êm mặc định; bổ sung phanh khẩn cấp, nhường và quan sát lại; thay hai sơ đồ ngã ba, bỏ thẩm định mẫu.', author: 'Biên tập nội dung' }
    ]
  })
]
