import type { ContentRelease } from '../types'

/** Phiên bản content pack theo định dạng YYYY.MM.patch (mục 6.6 kế hoạch dữ liệu). */
export const CONTENT_VERSION = '2026.10.23'
export const CONTENT_GENERATED_AT = '2026-10-25'
export const CONTENT_LOCALE = 'vi-VN' as const

/** Lịch sử phát hành nội dung, dùng cho delta update và audit trail. */
export const contentReleases: ContentRelease[] = [
  {
    version: '2026.08.1',
    date: '2026-08-20',
    summary: 'Bộ khởi tạo 5 thẻ học nền tảng cho 4 chuyên đề.',
    cardIds: ['parking-start', 'parking-slope', 'narrow-creep', 'highway-merge', 'weather-downhill']
  },
  {
    version: '2026.09.1',
    date: '2026-09-13',
    summary: 'Mở rộng lên 23 thẻ học, bổ sung 46 sơ đồ SVG, checklist theo ngữ cảnh và lớp duyệt chuyên gia.',
    cardIds: [
      'parking-align',
      'parking-correct',
      'parking-parallel',
      'parking-lowlight',
      'parking-column',
      'narrow-mirror',
      'narrow-corner',
      'narrow-yield',
      'narrow-cutoff',
      'highway-exit',
      'highway-signs',
      'highway-gap',
      'highway-overtake-truck',
      'highway-tailgater',
      'weather-uphill-start',
      'weather-engine-brake',
      'weather-flood-cross',
      'weather-heavy-rain'
    ]
  },
  {
    version: '2026.10.1',
    date: '2026-10-25',
    summary: 'Làm rõ hướng dẫn lùi chuồng, trạng thái thẩm định và sơ đồ minh họa cho bài parking-start.',
    cardIds: ['parking-start']
  },
  {
    version: '2026.10.2',
    date: '2026-10-25',
    summary: 'Sửa hướng dẫn căn xe và hai sơ đồ parking-align, bỏ mốc đo cố định và công bố trạng thái chưa thẩm định độc lập.',
    cardIds: ['parking-align']
  },
  {
    version: '2026.10.3',
    date: '2026-10-25',
    summary: 'Sửa nội dung, hai sơ đồ parking-correct và gợi ý checklist trước khi lùi; bỏ quy tắc cố định và hồ sơ thẩm định mẫu.',
    cardIds: ['parking-correct']
  },
  {
    version: '2026.10.4',
    date: '2026-10-25',
    summary: 'Sửa hướng dẫn ghép ngang parking-parallel, quy định đỗ sát lề, hai sơ đồ lề phải và trạng thái chưa thẩm định độc lập.',
    cardIds: ['parking-parallel']
  },
  {
    version: '2026.10.5',
    date: '2026-10-25',
    summary: 'Sửa hướng dẫn parking-slope, kiểm soát phanh và giữ xe trên dốc, hai sơ đồ hướng dốc và trạng thái chưa thẩm định độc lập.',
    cardIds: ['parking-slope']
  },
  {
    version: '2026.10.6',
    date: '2026-10-25',
    summary: 'Sửa parking-lowlight: quan sát khi thiếu sáng, điều kiện dừng, người hướng dẫn, rời xe an toàn và hai sơ đồ; bỏ thẩm định mẫu.',
    cardIds: ['parking-lowlight']
  },
  {
    version: '2026.10.7',
    date: '2026-10-25',
    summary: 'Sửa bản nháp parking-column: bỏ mốc khoảng cách cố định, bổ sung quan sát hai bên, dừng, mở cửa an toàn và hai sơ đồ sát cột; giữ trạng thái chờ thẩm định.',
    cardIds: ['parking-column']
  },
  {
    version: '2026.10.8',
    date: '2026-10-25',
    summary: 'Sửa narrow-creep: quan sát và khoảng hở thực tế, kiểm soát xe tự động, dừng và lùi an toàn; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['narrow-creep']
  },
  {
    version: '2026.10.9',
    date: '2026-10-25',
    summary: 'Sửa narrow-mirror: giới hạn quan sát bằng gương, khoảng hở toàn xe, dừng trước va chạm và hỗ trợ an toàn; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['narrow-mirror']
  },
  {
    version: '2026.10.10',
    date: '2026-10-25',
    summary: 'Sửa narrow-corner: khoảng hở toàn xe, bỏ mốc đánh lái chung, nhường đường và dừng ở góc khuất; thay hai sơ đồ quỹ đạo bánh và bỏ thẩm định mẫu.',
    cardIds: ['narrow-corner']
  },
  {
    version: '2026.10.11',
    date: '2026-10-25',
    summary: 'Sửa narrow-yield: quy tắc nhường, chỗ tránh thực tế, điều kiện lùi và xe ưu tiên; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['narrow-yield']
  },
  {
    version: '2026.10.12',
    date: '2026-10-25',
    summary: 'Sửa narrow-cutoff: dừng trước vùng xung đột, phanh khẩn cấp, nhường và quan sát lại; thay hai sơ đồ ngã ba và bỏ thẩm định mẫu.',
    cardIds: ['narrow-cutoff']
  },
  {
    version: '2026.10.13',
    date: '2026-10-25',
    summary: 'Sửa highway-merge: nhường xe cao tốc, khoảng hở trước sau, xử lý cuối làn không chạy lề và hai sơ đồ nhập làn phải; bỏ thẩm định mẫu.',
    cardIds: ['highway-merge']
  },
  {
    version: '2026.10.14',
    date: '2026-10-25',
    summary: 'Sửa highway-exit: quan sát từng làn, phanh theo điều kiện, bỏ lối ra quá muộn và hai sơ đồ làn giảm tốc; bỏ mốc cố định và thẩm định mẫu.',
    cardIds: ['highway-exit']
  },
  {
    version: '2026.10.15',
    date: '2026-10-25',
    summary: 'Sửa highway-signs: nhận diện và hiệu lực biển tốc độ, tối thiểu có điều kiện, chuyển làn an toàn và hai sơ đồ; bỏ thẩm định mẫu.',
    cardIds: ['highway-signs']
  },
  {
    version: '2026.10.16',
    date: '2026-10-25',
    summary: 'Sửa highway-gap: cự ly theo biển và tốc độ, đếm giây, mưa và phanh khẩn cấp; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['highway-gap']
  },
  {
    version: '2026.10.17',
    date: '2026-10-25',
    summary: 'Sửa highway-overtake-truck: giới hạn tốc độ, điểm mù, khoảng hở về làn và bỏ vượt; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['highway-overtake-truck']
  },
  {
    version: '2026.10.18',
    date: '2026-10-25',
    summary: 'Sửa highway-tailgater: giãn trước êm, nhường có điều kiện, phanh khẩn cấp, đe dọa và camera; thay hai sơ đồ, công bố chưa thẩm định độc lập.',
    cardIds: ['highway-tailgater']
  },
  {
    version: '2026.10.19',
    date: '2026-10-25',
    summary: 'Sửa weather-downhill: hãm theo xe và độ bám, phanh thường và ABS, dừng khi phanh lỗi, hai sơ đồ và checklist thời tiết; bỏ thẩm định mẫu.',
    cardIds: ['weather-downhill']
  },
  {
    version: '2026.10.20',
    date: '2026-10-25',
    summary: 'Sửa weather-uphill-start: chuyển chân theo trang bị, giới hạn hỗ trợ giữ dốc, quan sát và dừng khi trôi; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['weather-uphill-start']
  },
  {
    version: '2026.10.21',
    date: '2026-10-25',
    summary: 'Sửa weather-engine-brake: chọn chế độ theo xe và độ bám, giới hạn vòng tua, phối hợp phanh và xử lý lỗi; thay hai sơ đồ và bỏ thẩm định mẫu.',
    cardIds: ['weather-engine-brake']
  },
  {
    version: '2026.10.22',
    date: '2026-10-25',
    summary: 'Sửa weather-flood-cross: tránh đường ngập, bỏ ngưỡng nửa bánh, không đề lại, cứu nạn có điều kiện và kiểm tra xe; thay hai sơ đồ, bổ sung checklist và bỏ thẩm định mẫu.',
    cardIds: ['weather-flood-cross']
  },
  {
    version: '2026.10.23',
    date: '2026-10-25',
    summary: 'Sửa weather-heavy-rain: tốc độ và cự ly theo điều kiện, đèn kính lốp, mất bám và ABS, điểm dừng theo tầm nhìn; thay hai sơ đồ, bổ sung gợi ý checklist và bỏ thẩm định mẫu.',
    cardIds: ['weather-heavy-rain']
  }
]
