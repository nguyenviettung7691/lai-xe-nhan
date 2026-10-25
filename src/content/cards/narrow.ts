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
    context: 'Hai ô tô gặp nhau giữa ngõ chỉ đủ một làn, phía sau bạn còn vài xe máy. Quyết định nhường nhanh giúp cả hai bên thoát kẹt.',
    objective: 'Chọn điểm tránh phù hợp và ra hiệu rõ ràng cho xe đối diện.',
    risk: 'medium',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'creep', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Dừng xe khi còn cách xe đối diện ít nhất mười mét.', cueType: 'marker', cueText: 'Cách xe đối diện 10 m' },
      { instruction: 'Quan sát hai bên tìm khoảng lõm hoặc lối rẽ gần nhất.', cueType: 'marker', cueText: 'Khoảng lõm hoặc lối rẽ' },
      { instruction: 'Ra hiệu bằng đèn hoặc tay để báo bên nào sẽ lùi.', cueType: 'marker', cueText: 'Tín hiệu thống nhất hai bên' },
      { instruction: 'Lùi chậm về điểm tránh và giữ khoảng cách với tường.', cueType: 'mirror', cueText: 'Khoảng cách tường trong gương', speedHint: 'dưới 5 km/h' },
      { instruction: 'Chờ xe kia đi qua hẳn rồi mới trở lại giữa ngõ.', cueType: 'marker', cueText: 'Xe kia đã qua hẳn' }
    ],
    mistakes: [
      'Cố tiến thêm vài mét khiến cả hai xe mắc kẹt sát nhau.',
      'Lùi nhanh mà không nhìn xe máy phía sau.',
      'Chờ đối phương nhường trong khi phía sau ùn dài.'
    ],
    recovery: 'Nếu không còn chỗ tránh, bật đèn cảnh báo, xuống xe trao đổi và cùng thống nhất một bên lùi ra.',
    safety: 'Ưu tiên nhường cho xe cứu thương, xe cứu hỏa và xe công vụ ưu tiên theo quy định.',
    mnemonic: { text: 'Dừng sớm, tìm chỗ tránh, ra hiệu rõ ràng.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi gặp xe ngược chiều trong ngõ một làn, nên dừng lại từ khoảng cách nào?', options: ['Sát ngay trước mũi xe đối diện', 'Ít nhất mười mét', 'Không cần dừng, cứ đi tiếp'], correctIndex: 1 },
      { prompt: 'Sau khi thống nhất tín hiệu nhường đường, bên lùi nên làm gì?', options: ['Lùi nhanh cho xong', 'Lùi chậm, giữ khoảng cách với tường', 'Lùi mà không cần nhìn gương'], correctIndex: 1 },
      { prompt: 'Trong tình huống nhường đường, ai luôn được ưu tiên đi trước?', options: ['Xe cứu thương, cứu hỏa, xe công vụ ưu tiên', 'Xe đến trước theo thứ tự', 'Xe to hơn'], correctIndex: 0 }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới về nhường đường trong ngõ một làn.', author: 'Biên tập nội dung' }]
  }),
  defineCard({
    id: 'narrow-cutoff',
    lessonId: 'narrow-negotiation',
    topicId: 'narrow',
    title: 'Xử lý khi xe máy tạt đầu',
    context: 'Ra khỏi ngõ ở ngã ba đông đúc, xe máy thường cắt ngang mũi xe mà không giảm tốc. Phản xạ đúng lúc này quan trọng hơn quyền ưu tiên.',
    objective: 'Giữ khoảng trống an toàn và tránh phanh gấp bất ngờ.',
    risk: 'high',
    difficulty: 3,
    minutes: 3,
    tags: { speedRange: 'urban', spaceConstraint: 'tight', visibility: 'reduced', stress: 'high' },
    steps: [
      { instruction: 'Giảm tốc trước khi đầu xe nhô ra khỏi ngõ.', cueType: 'marker', cueText: 'Giảm tốc trước khi nhô ra', speedHint: 'dưới 10 km/h' },
      { instruction: 'Nhô đầu xe từng đoạn ngắn để người đi đường nhìn thấy.', cueType: 'marker', cueText: 'Nhô từng đoạn 30 cm' },
      { instruction: 'Quan sát hướng có xe máy đông trước, sau đó mới đến hướng còn lại.', cueType: 'marker', cueText: 'Hướng đông xe quan sát trước' },
      { instruction: 'Phanh đều và giữ hướng thẳng khi có xe tạt đầu.', cueType: 'feel', cueText: 'Phanh đều, không đánh lái gấp' },
      { instruction: 'Chờ khoảng trống đủ dài rồi mới hòa vào dòng xe.', cueType: 'timing', cueText: 'Khoảng trống đủ dài' }
    ],
    mistakes: [
      'Đánh lái gấp để tránh khiến xe lấn sang làn ngược chiều.',
      'Bấm còi dài thay vì giảm tốc và nhường đường.',
      'Nhô cả đầu xe ra ngã ba khi chưa quan sát đủ hai hướng.'
    ],
    recovery: 'Dừng hẳn và nhường cho dòng xe máy đi qua. Chờ khoảng trống rõ ràng rồi mới ra, tránh chen ngang.',
    safety: 'Luôn nhường người đi bộ tại nơi có vạch sang đường, kể cả khi bạn đã dừng đúng vị trí.',
    mnemonic: { text: 'Nhô từng chút, phanh đều, không lái gấp.', rhythm: 'ba-nhip' },
    checklistId: 'pre_drive',
    quickCheck: [
      { prompt: 'Khi ra khỏi ngõ tại ngã ba đông xe máy, nên nhô đầu xe như thế nào?', options: ['Nhô hết cả xe ra một lần', 'Nhô từng đoạn ngắn để người khác nhìn thấy', 'Không cần giảm tốc trước khi nhô'], correctIndex: 1 },
      { prompt: 'Khi có xe máy tạt đầu bất ngờ, phản ứng đúng là gì?', options: ['Đánh lái gấp sang làn ngược chiều', 'Phanh đều và giữ hướng thẳng', 'Bấm còi thật to và tăng tốc'], correctIndex: 1 },
      { prompt: 'Khi nào bạn phải nhường và không nên ra khỏi ngõ dù đã quan sát?', options: ['Khi có người đi bộ đang qua vạch sang đường', 'Khi ngõ có bóng đèn màu vàng', 'Khi xe máy đi rất chậm phía xa'], correctIndex: 0, isStopCondition: true }
    ],
    reviewStatus: 'approved',
    version: '1.0.0',
    updatedAt: '2026-09-11',
    changelog: [{ version: '1.0.0', date: '2026-09-11', summary: 'Thẻ mới cho tình huống xe máy tạt đầu.', author: 'Biên tập nội dung' }]
  })
]
