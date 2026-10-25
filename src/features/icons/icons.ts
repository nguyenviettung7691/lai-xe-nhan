/**
 * Original 24×24 interface icons drawn for this project (no third-party icon set).
 * Each part is a path; `fill` parts are solid, the rest are stroked with currentColor.
 */
export interface IconPart {
  d: string
  fill?: boolean
}

const round = (value: number) => Math.round(value * 100) / 100

const circle = (cx: number, cy: number, r: number) =>
  `M${cx + r} ${cy}a${r} ${r} 0 1 1-${r * 2} 0 ${r} ${r} 0 0 1 ${r * 2} 0Z`

/** Counter-clockwise arc from 9 o'clock round to 10:30, used for "back in time" icons. */
const ccwArc = (r: number) => {
  const offset = round(r * Math.SQRT1_2)
  return `M${round(12 - r)} 12a${r} ${r} 0 1 0 ${round(r - offset)}-${offset}`
}
const ccwHead = (r: number) => {
  const corner = round(12 - r * Math.SQRT1_2)
  return `M${corner} ${round(corner - 4)}v4h4`
}

const cloud = 'M7.5 18.5a4 4 0 0 1-.7-7.94 5.5 5.5 0 0 1 10.6-1.2A4.6 4.6 0 0 1 17 18.5Z'
const exclamation = (top: number, bottom: number) => `M12 ${top}v${bottom - top}M12 ${bottom + 3.2}v.01`

export const appIcons = {
  // Điều hướng chính
  home: [{ d: 'M3 11 12 4l9 7' }, { d: 'M5.5 9.5V20h13V9.5' }, { d: 'M10 20v-5h4v5' }],
  library: [
    { d: 'M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5Z' },
    { d: 'M12 6.5v13' }
  ],
  checklist: [
    { d: 'M8.5 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5' },
    { d: 'M9 3h6v4H9Z' },
    { d: 'M8.5 13.5l2.5 2.5 4.5-5' }
  ],
  review: [{ d: ccwArc(9) }, { d: ccwHead(9) }, { d: 'M12 7.5V12l3 2' }],
  dashboard: [
    { d: 'M4.2 19.5A9 9 0 1 1 19.8 19.5' },
    { d: 'M5.6 8.6 7 10M18.4 8.6 17 10' },
    { d: exclamation(9, 14) }
  ],

  // Thanh trên cùng
  'theme-system': [
    { d: 'M7.5 3h9A1.5 1.5 0 0 1 18 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3Z' },
    { d: 'M10.5 18h3' }
  ],
  'theme-dark': [{ d: 'M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z' }],
  'theme-light': [
    { d: circle(12, 12, 4) },
    { d: 'M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4' }
  ],
  contrast: [{ d: circle(12, 12, 8.5) }, { d: 'M12 3.5a8.5 8.5 0 0 1 0 17Z', fill: true }],

  // Mũi tên và thao tác
  'arrow-right': [{ d: 'M4 12h15' }, { d: 'M13 6l6 6-6 6' }],
  'arrow-left': [{ d: 'M20 12H5' }, { d: 'M11 6l-6 6 6 6' }],
  'chevron-right': [{ d: 'M9 5l7 7-7 7' }],
  check: [{ d: 'M4.5 12.5l5 5 10-11' }],
  close: [{ d: 'M6 6l12 12M18 6 6 18' }],
  reset: [{ d: ccwArc(7.5) }, { d: ccwHead(7.5) }],
  undo: [{ d: 'M9 14 4 9l5-5' }, { d: 'M4 9h10.5a5.5 5.5 0 0 1 0 11H11' }],
  search: [{ d: circle(10.5, 10.5, 6.5) }, { d: 'M15.2 15.2 20 20' }],

  // Trạng thái
  warning: [{ d: 'M12 3.5 21.5 20h-19Z' }, { d: exclamation(9.5, 14) }],
  verified: [
    { d: 'M12 3 19.5 6v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6Z' },
    { d: 'M8.8 12l2.2 2.2 4.3-4.4' }
  ],
  award: [{ d: circle(12, 9, 5) }, { d: 'M9 13.3 7.5 21l4.5-2.5 4.5 2.5L15 13.3' }],
  stop: [{ d: 'M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3Z' }, { d: exclamation(7.5, 13) }],
  route: [
    { d: circle(6, 18, 2) },
    { d: circle(18, 6, 2) },
    { d: 'M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16' }
  ],

  // Bộ đọc
  speaker: [{ d: 'M4 9.5h3.5L12 5.5v13l-4.5-4H4Z' }, { d: 'M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11' }],
  play: [{ d: 'M8 5.5v13l10.5-6.5Z', fill: true }],
  pause: [{ d: 'M7 5h3.5v14H7ZM13.5 5H17v14h-3.5Z', fill: true }],
  'stop-media': [{ d: 'M6.5 6.5h11v11h-11Z', fill: true }],
  steps: [
    { d: `${circle(5, 6, 1.6)}${circle(5, 12, 1.6)}${circle(5, 18, 1.6)}`, fill: true },
    { d: 'M10 6h10M10 12h10M10 18h10' }
  ],
  'step-previous': [{ d: 'M6 5.5v13' }, { d: 'M18 6v12l-9-6Z', fill: true }],
  'step-next': [{ d: 'M18 5.5v13' }, { d: 'M6 6v12l9-6Z', fill: true }],

  // Đồng bộ
  sync: [
    { d: 'M4.8 10.1A7.5 7.5 0 0 1 17.7 7.2' },
    { d: 'M17.7 3.2v4h-4' },
    { d: 'M19.2 13.9A7.5 7.5 0 0 1 6.3 16.8' },
    { d: 'M6.3 20.8v-4h4' }
  ],
  'cloud-check': [{ d: cloud }, { d: 'M9.5 14l2 2 3.5-3.5' }],
  'cloud-off': [{ d: cloud }, { d: 'M3.5 3.5l17 17' }],
  'cloud-upload': [{ d: cloud }, { d: 'M12 16.5v-5' }, { d: 'M9.8 13.5 12 11.3l2.2 2.2' }],
  alert: [{ d: circle(12, 12, 8.5) }, { d: exclamation(7.5, 13) }],

  // Chuyên đề
  'topic-parking': [
    { d: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' },
    { d: 'M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5' }
  ],
  'topic-narrow': [
    { d: 'M4.5 21v-6l4-4V3M19.5 21v-6l-4-4V3' },
    { d: 'M12 20.5v-7' },
    { d: 'M9.5 16 12 13.5l2.5 2.5' }
  ],
  'topic-highway': [
    { d: 'M9 21V3.5' },
    { d: 'M5.5 7 9 3.5 12.5 7' },
    { d: 'M18.5 21c0-5.5-9.5-5.5-9.5-11' }
  ],
  'topic-weather': [
    { d: 'M2.5 20.5 9 10l3.5 5.5 2.5-3.5 6.5 8.5Z' },
    { d: 'M18 2.5s-2.6 3.3-2.6 5a2.6 2.6 0 0 0 5.2 0c0-1.7-2.6-5-2.6-5Z' }
  ]
} satisfies Record<string, IconPart[]>

export type AppIconName = keyof typeof appIcons

export const isAppIconName = (value: unknown): value is AppIconName =>
  typeof value === 'string' && Object.hasOwn(appIcons, value)
