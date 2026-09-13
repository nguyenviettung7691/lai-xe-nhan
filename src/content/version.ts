import type { ContentRelease } from '../types'

/** Phiên bản content pack theo định dạng YYYY.MM.patch (mục 6.6 kế hoạch dữ liệu). */
export const CONTENT_VERSION = '2026.09.1'
export const CONTENT_GENERATED_AT = '2026-09-13'
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
  }
]
