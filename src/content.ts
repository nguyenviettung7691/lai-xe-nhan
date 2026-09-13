import type { DashboardLight, Topic } from './types'

export const topics: Topic[] = [
  {
    id: 'parking',
    title: 'Lùi chuồng & ghép ngang',
    description: 'Làm chủ không gian hẹp trong hầm xe, kể cả dốc và thiếu sáng.',
    icon: '↙',
    color: '#b7f36b',
    lessons: [
      {
        id: 'parking-start',
        topicId: 'parking',
        title: 'Chọn điểm bắt đầu lùi',
        summary: 'Tạo góc đủ rộng trước khi đưa đuôi xe vào ô đỗ.',
        mnemonic: 'Chậm – thẳng – mới đánh.',
        difficulty: 2,
        minutes: 3,
        risk: 'medium',
        steps: [
          { id: 'p1', text: 'Bật xi-nhan, dừng hẳn và quan sát đủ ba gương.' },
          { id: 'p2', text: 'Đưa vai xe ngang mép đầu ô đỗ, giữ khoảng cách một cánh tay.' },
          { id: 'p3', text: 'Cài số R, nhả phanh để xe bò chậm dưới 5 km/h.' },
          { id: 'p4', text: 'Đánh lái về phía ô đỗ khi vai xe vượt mốc.' },
          { id: 'p5', text: 'Nhìn gương đối diện để giữ đuôi xe cách cột và xe bên cạnh.' }
        ],
        mistakes: ['Đánh lái quá sớm làm đầu xe quét rộng.', 'Chỉ nhìn camera mà bỏ quên gương.', 'Lùi nhanh rồi phanh gấp.'],
        recovery: 'Dừng xe, về D tiến thẳng ra lại một nhịp rồi tạo góc mới. Không cố sửa khi xe đang sát vật cản.',
        safety: 'Nếu có người hoặc xe máy cắt ngang phía sau, dừng ngay và chờ khoảng trống.'
      },
      {
        id: 'parking-slope',
        topicId: 'parking',
        title: 'Lùi xe trên dốc hầm',
        summary: 'Giữ xe bò đều và không để trôi khi lùi ở dốc cao.',
        mnemonic: 'Giữ phanh – nhìn gương – lùi đều.',
        difficulty: 3,
        minutes: 4,
        risk: 'high',
        steps: [
          { id: 's1', text: 'Đạp phanh giữ xe đứng yên một nhịp trước khi cài R.' },
          { id: 's2', text: 'Bật đèn và quan sát điểm mù hai bên.' },
          { id: 's3', text: 'Nhả phanh từ từ, không đệm ga khi mặt dốc trơn.' },
          { id: 's4', text: 'Giữ vô-lăng ổn định, sửa rất nhỏ theo gương.' },
          { id: 's5', text: 'Nếu mất tầm nhìn, dừng xe và nhờ người quan sát bên ngoài.' }
        ],
        mistakes: ['Đạp ga để thắng độ dốc.', 'Quay đầu liên tục làm mất kiểm soát hướng xe.', 'Tiếp tục lùi khi không còn nhìn rõ.'],
        recovery: 'Đạp phanh, về P khi đã đứng yên. Bật đèn cảnh báo và chạy vòng lại nếu góc lùi không an toàn.',
        safety: 'Không thực hiện nếu dốc quá trơn, tầm nhìn bị che hoặc có người đứng sau xe.'
      }
    ]
  },
  {
    id: 'narrow',
    title: 'Đường hẹp & ngõ nhỏ',
    description: 'Đi chậm, căn góc và giao tiếp bình tĩnh giữa dòng xe máy.',
    icon: '↪',
    color: '#ffc66d',
    lessons: [
      {
        id: 'narrow-creep',
        topicId: 'narrow',
        title: 'Rà phanh trong ngõ hẹp',
        summary: 'Kiểm soát tốc độ creep để luôn có thời gian dừng.',
        mnemonic: 'Tiến bám lưng, lùi bám bụng.',
        difficulty: 1,
        minutes: 2,
        risk: 'medium',
        steps: [
          { id: 'c1', text: 'Giữ chân phải trên phanh, để xe bò dưới 10 km/h.' },
          { id: 'c2', text: 'Quét gương trái, phải và phía trước theo nhịp 2–3 giây.' },
          { id: 'c3', text: 'Ôm cua rộng, chừa khoảng cho bánh sau cắt vào.' },
          { id: 'c4', text: 'Dừng hẳn khi xe máy xuất hiện trong vùng chữ A.' },
          { id: 'c5', text: 'Chỉ đi tiếp sau khi người và xe đã ra khỏi quỹ đạo.' }
        ],
        mistakes: ['Nhìn sát đầu xe thay vì nhìn xa.', 'Bấm còi thay cho giảm tốc.', 'Cố lách qua khoảng trống không đủ rộng.'],
        recovery: 'Dừng thẳng bánh, bật xi-nhan và chờ. Nếu bị kẹt góc, lùi một đoạn ngắn theo người hướng dẫn.',
        safety: 'Luôn ưu tiên người đi bộ và xe máy trong ngõ; không vượt khi tầm nhìn bị che.'
      }
    ]
  },
  {
    id: 'highway',
    title: 'Lái xe cao tốc',
    description: 'Nhập làn dứt khoát, giữ khoảng cách và chuyển làn có tín hiệu.',
    icon: '→',
    color: '#77d7ff',
    lessons: [
      {
        id: 'highway-merge',
        topicId: 'highway',
        title: 'Nhập làn an toàn',
        summary: 'Tăng tốc cùng dòng xe và chọn khoảng trống ít nhất ba giây.',
        mnemonic: 'Nhìn xa – giữ làn – đếm ba.',
        difficulty: 3,
        minutes: 4,
        risk: 'high',
        steps: [
          { id: 'm1', text: 'Kiểm tra gương, điểm mù và tốc độ dòng xe chính.' },
          { id: 'm2', text: 'Tăng tốc dứt khoát trong làn nhập, không dừng giữa làn.' },
          { id: 'm3', text: 'Bật xi-nhan trái và chọn khoảng trống tối thiểu ba giây.' },
          { id: 'm4', text: 'Nhìn nhanh điểm mù rồi chuyển làn một nhịp mượt.' },
          { id: 'm5', text: 'Tắt xi-nhan, giữ làn phải và duy trì khoảng cách.' }
        ],
        mistakes: ['Nhập làn quá chậm.', 'Cắt đầu xe tải.', 'Chuyển hai làn liên tiếp để bắt lối ra.'],
        recovery: 'Nếu lỡ lối ra, đi tiếp đến lối kế tiếp. Không dừng hoặc lùi trên cao tốc.',
        safety: 'Mưa lớn hoặc tầm nhìn dưới mức an toàn: giảm tốc, bật đèn và cân nhắc dừng ở nơi được phép.'
      }
    ]
  },
  {
    id: 'weather',
    title: 'Đèo dốc & mưa ngập',
    description: 'Dùng phanh động cơ và đi qua vùng ngập với tốc độ ổn định.',
    icon: '⌁',
    color: '#d49cff',
    lessons: [
      {
        id: 'weather-downhill',
        topicId: 'weather',
        title: 'Đổ dốc dài không quá nhiệt phanh',
        summary: 'Chọn số thấp và phanh theo nhịp thay vì rà liên tục.',
        mnemonic: 'Số thấp – phanh nhịp – nghỉ đúng chỗ.',
        difficulty: 4,
        minutes: 4,
        risk: 'high',
        steps: [
          { id: 'd1', text: 'Giảm tốc trước khi vào dốc, chọn số thấp phù hợp.' },
          { id: 'd2', text: 'Giữ khoảng cách lớn hơn bình thường với xe trước.' },
          { id: 'd3', text: 'Phanh ngắt quãng khi cần, không rà phanh liên tục.' },
          { id: 'd4', text: 'Nếu có mùi khét hoặc pedal mềm, tìm chỗ dừng an toàn.' },
          { id: 'd5', text: 'Chỉ đi tiếp sau khi phanh nguội và hoạt động bình thường.' }
        ],
        mistakes: ['Về N khi đổ dốc.', 'Tắt máy để “tiết kiệm xăng”.', 'Cố đi tiếp khi phanh có dấu hiệu bất thường.'],
        recovery: 'Dừng ở khu vực an toàn, kéo phanh tay và gọi cứu hộ nếu phanh không hồi phục.',
        safety: 'Không xuống dốc bằng số N. Không dùng hướng dẫn này thay cho kiểm tra xe chuyên nghiệp.'
      }
    ]
  }
]

export const dashboardLights: DashboardLight[] = [
  { id: 'engine', icon: '⌁', name: 'Động cơ', english: 'Check engine', severity: 'warn', description: 'Hệ thống động cơ hoặc khí thải phát hiện bất thường.', actions: ['Nếu đèn sáng liên tục, đi chậm đến gara gần nhất.', 'Nếu đèn nhấp nháy, giảm tốc và dừng ở nơi an toàn.', 'Ghi lại hiện tượng rung, hụt ga hoặc mùi lạ.'], avoid: 'Không tiếp tục chạy xa khi đèn nhấp nháy hoặc xe rung mạnh.' },
  { id: 'brake', icon: '!', name: 'Hệ thống phanh', english: 'Brake system', severity: 'critical', description: 'Có thể liên quan đến dầu phanh, má phanh hoặc phanh tay.', actions: ['Dừng xe an toàn và kiểm tra phanh tay.', 'Nếu pedal mềm hoặc xe lệch, gọi cứu hộ.', 'Không lái tiếp khi đèn vẫn đỏ sau khi nhả phanh tay.'], avoid: 'Không thử chạy nhanh để kiểm tra phanh.' },
  { id: 'battery', icon: '▣', name: 'Ắc quy', english: 'Battery', severity: 'warn', description: 'Hệ thống sạc hoặc ắc quy có thể đang gặp vấn đề.', actions: ['Tắt thiết bị điện không cần thiết.', 'Đi đến gara gần nhất nếu xe vẫn vận hành bình thường.', 'Dừng an toàn nếu nhiệt độ tăng hoặc xe mất điện.'], avoid: 'Không tắt máy ở nơi không thể khởi động lại.' },
  { id: 'temperature', icon: '♨', name: 'Nhiệt độ động cơ', english: 'Coolant temperature', severity: 'critical', description: 'Động cơ có nguy cơ quá nhiệt.', actions: ['Tấp vào nơi an toàn và tắt máy.', 'Chờ nguội hoàn toàn trước khi mở nắp capo.', 'Gọi cứu hộ nếu nước làm mát bị rò hoặc đèn không tắt.'], avoid: 'Không mở nắp két nước khi động cơ còn nóng.' },
  { id: 'abs', icon: '◉', name: 'ABS', english: 'Anti-lock brake', severity: 'warn', description: 'Chống bó cứng phanh có thể không hoạt động.', actions: ['Giảm tốc và tăng khoảng cách.', 'Tránh phanh gấp trên mặt đường trơn.', 'Đặt lịch kiểm tra ABS sớm.'], avoid: 'Không chủ quan vì phanh cơ bản vẫn có thể còn hoạt động.' },
  { id: 'airbag', icon: '✦', name: 'Túi khí', english: 'Airbag', severity: 'warn', description: 'Hệ thống túi khí hoặc cảm biến có lỗi.', actions: ['Thắt dây an toàn cho mọi người trên xe.', 'Đưa xe đi kiểm tra sớm.', 'Không tự tháo giắc hoặc sửa cảm biến.'], avoid: 'Không chở trẻ nhỏ ở ghế trước khi chưa có biện pháp phù hợp.' }
]
