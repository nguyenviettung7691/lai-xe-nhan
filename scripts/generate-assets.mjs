// Sinh bộ sơ đồ SVG top-down cho content pack "Lái Xe Nhàn".
// Chạy: npm run content:assets
// Toàn bộ hình là tài sản tự tạo (vector-first), không dùng nguồn bên thứ ba.
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const outDir = join(root, 'public', 'content', 'svg')
const manifestFile = join(root, 'src', 'content', 'asset-manifest.json')
const CONTENT_VERSION = '2026.10.19'

const W = 320
const H = 200
const C = {
  bg: '#22332e',
  asphalt: '#2c403a',
  kerb: '#1a2622',
  line: '#8ba79c',
  bay: '#c8dbd1',
  ego: '#b7f36b',
  other: '#7e978c',
  truck: '#5f7a70',
  bike: '#ffc66d',
  hazard: '#ff8a6b',
  water: '#3f8fbf',
  text: '#a9bcb3',
  accent: '#b7f36b'
}

const num = value => Math.round(value * 10) / 10
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const rect = (x, y, w, h, fill, rx = 0, opacity = 1) =>
  `<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}" rx="${rx}" fill="${fill}"${opacity === 1 ? '' : ` opacity="${opacity}"`}/>`

const line = (x1, y1, x2, y2, stroke = C.line, width = 2, dash = '') =>
  `<path d="M${num(x1)} ${num(y1)}L${num(x2)} ${num(y2)}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>`

const label = (x, y, value, { size = 9, fill = C.text, anchor = 'start', weight = 500 } = {}) =>
  `<text x="${num(x)}" y="${num(y)}" font-family="DM Mono, ui-monospace, monospace" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`

const car = (x, y, rot, fill = C.other, w = 26, h = 46) =>
  `<g transform="translate(${num(x)} ${num(y)}) rotate(${rot})">` +
  `<rect x="${num(-w / 2)}" y="${num(-h / 2)}" width="${num(w)}" height="${num(h)}" rx="6" fill="${fill}"/>` +
  `<rect x="${num(-w / 2 + 4)}" y="${num(-h / 2 + 6)}" width="${num(w - 8)}" height="${num(h * 0.2)}" rx="2" fill="#0e1715" opacity=".45"/>` +
  `<rect x="${num(-w / 2 + 4)}" y="${num(h / 2 - 13)}" width="${num(w - 8)}" height="${num(h * 0.16)}" rx="2" fill="#0e1715" opacity=".25"/>` +
  '</g>'

const sideCar = (x, y, rot, fill = C.ego, w = 54, h = 22) =>
  `<g transform="translate(${num(x)} ${num(y)}) rotate(${rot})">` +
  `<rect x="${num(-w / 2)}" y="${num(-h / 2)}" width="${num(w)}" height="${num(h)}" rx="7" fill="${fill}"/>` +
  `<rect x="${num(-w / 2 + 12)}" y="${num(-h / 2 - 7)}" width="${num(w * 0.5)}" height="9" rx="4" fill="${fill}" opacity=".8"/>` +
  `<circle cx="${num(-w / 2 + 12)}" cy="${num(h / 2)}" r="5" fill="#0e1715" opacity=".55"/>` +
  `<circle cx="${num(w / 2 - 12)}" cy="${num(h / 2)}" r="5" fill="#0e1715" opacity=".55"/>` +
  '</g>'

const bike = (x, y, rot = 0, fill = C.bike) =>
  `<g transform="translate(${num(x)} ${num(y)}) rotate(${rot})">` +
  `<rect x="-5" y="-11" width="10" height="22" rx="4" fill="${fill}"/>` +
  `<circle cx="0" cy="-13" r="3" fill="${fill}" opacity=".7"/>` +
  '</g>'

const trail = (d, stroke = C.accent, dash = '7 5') =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2.4" stroke-dasharray="${dash}" stroke-linecap="round" marker-end="url(#tip)"/>`

const arrow = (x1, y1, x2, y2) =>
  `<path d="M${num(x1)} ${num(y1)}L${num(x2)} ${num(y2)}" fill="none" stroke="${C.ego}" stroke-width="1.8" marker-end="url(#tip)"/>`

const cone = (x, y, rot, spread = 26, len = 62, fill = C.hazard) =>
  `<g transform="translate(${num(x)} ${num(y)}) rotate(${rot})" opacity=".28">` +
  `<path d="M0 0L${num(-spread)} ${num(-len)}L${num(spread)} ${num(-len)}Z" fill="${fill}"/>` +
  '</g>'

const pin = (x, y, value) =>
  `<g transform="translate(${num(x)} ${num(y)})"><circle r="9" fill="${C.accent}"/>` +
  `<text x="0" y="3.4" font-family="DM Mono, ui-monospace, monospace" font-size="10" font-weight="700" fill="#0e1715" text-anchor="middle">${esc(value)}</text></g>`

// Ghi chú chân sơ đồ: tự ngắt tối đa 2 dòng để không đè lên nội dung khác.
const wrapNote = (value, max = 48) => {
  const lines = ['']
  for (const word of value.split(' ')) {
    const current = lines[lines.length - 1]
    const candidate = current ? `${current} ${word}` : word
    if (!current || candidate.length <= max) lines[lines.length - 1] = candidate
    else lines.push(word)
  }
  return lines
}

const note = (value, lineHeight = 10) => {
  const lines = wrapNote(value)
  const height = lines.length * lineHeight + 6
  const top = H - height
  return (
    rect(0, top, W, height, C.kerb, 0, 0.92) +
    lines.map((text, index) => label(16, top + 11 + index * lineHeight, text, { size: 8.8 })).join('')
  )
}

const tag = (x, y, value, fill = C.accent) =>
  `<g><rect x="${num(x)}" y="${num(y - 10)}" width="${num(value.length * 5.6 + 12)}" height="16" rx="8" fill="${fill}" opacity=".16"/>` +
  label(x + 6, y + 1.5, value, { size: 8.5, fill }) + '</g>'

const gap = (x1, x2, y, value) =>
  line(x1, y, x2, y, C.accent, 1.6, '3 3') +
  line(x1, y - 4, x1, y + 4, C.accent, 1.6) +
  line(x2, y - 4, x2, y + 4, C.accent, 1.6) +
  label((x1 + x2) / 2, y - 7, value, { size: 8.5, fill: C.accent, anchor: 'middle' })

const bayLot = (target, filled = [0, 3]) => {
  const parts = [rect(0, 0, W, 88, C.kerb)]
  for (let i = 0; i < 4; i += 1) {
    const x = 16 + i * 72
    parts.push(rect(x, 16, 64, 70, i === target ? '#31463f' : '#25352f', 4))
    parts.push(line(x, 16, x, 86, C.bay, 1.6, '5 4'))
    parts.push(line(x + 64, 16, x + 64, 86, C.bay, 1.6, '5 4'))
    if (filled.includes(i)) parts.push(car(x + 32, 52, 180, C.other))
  }
  parts.push(rect(0, 88, W, 92, C.asphalt))
  parts.push(line(0, 88, W, 88, C.bay, 1.6))
  return parts.join('')
}

const alignmentLot = () => [
  rect(0, 0, W, 174, C.asphalt),
  rect(120, 24, 80, 110, '#31463f'),
  '<g id="alignment-bay">',
  line(120, 24, 120, 134, C.bay, 1.6),
  line(200, 24, 200, 134, C.bay, 1.6),
  line(120, 24, 200, 24, C.bay, 1.6),
  '</g>',
  car(64, 81, 180, C.other, 40, 72),
  car(256, 81, 180, C.other, 40, 72),
  `<g id="alignment-car">${car(160, 81, 180, C.ego, 40, 72)}</g>`,
  rect(135, 102, 5, 4, C.ego, 1),
  rect(180, 102, 5, 4, C.ego, 1),
  label(160, 38, 'ĐUÔI', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(160, 130, 'ĐẦU', { size: 8, fill: C.ego, anchor: 'middle' })
].join('')

const correctionLot = () => [
  rect(0, 0, W, 174, C.asphalt),
  rect(120, 24, 80, 88, '#31463f'),
  '<g id="correction-bay">',
  line(120, 24, 120, 112, C.bay, 1.6),
  line(200, 24, 200, 112, C.bay, 1.6),
  line(120, 24, 200, 24, C.bay, 1.6),
  '</g>',
  '<g id="correction-axis">',
  line(160, 32, 160, 104, C.line, 1, '3 3'),
  '</g>',
  label(108, 39, 'TRỤC Ô', { size: 8, anchor: 'end' }),
  line(110, 36, 160, 36, C.line, 1),
  car(64, 70, 180, C.other, 30, 52),
  car(256, 70, 180, C.other, 30, 52),
  `<g id="correction-car">${car(156, 86, 160, C.ego, 30, 52)}`,
  '<g transform="translate(156 86) rotate(160)">',
  rect(-19, -14, 4, 3, C.ego, 1),
  rect(15, -14, 4, 3, C.ego, 1),
  '</g></g>',
  label(143, 49, 'ĐUÔI', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(190, 128, 'ĐẦU', { size: 8, fill: C.ego }),
  label(20, 153, 'LỐI ĐI', { size: 8 })
].join('')

const lowlightLot = () => [
  rect(0, 0, W, 174, '#14221d'),
  rect(120, 30, 80, 56, '#253b31'),
  '<g id="lowlight-bay">',
  line(120, 86, 120, 30, C.bay, 1.6),
  line(120, 30, 200, 30, C.bay, 1.6),
  line(200, 30, 200, 86, C.bay, 1.6),
  '</g>',
  car(64, 59, 180, C.other, 30, 48),
  `<g id="lowlight-car">${car(160, 112, 180, C.ego, 30, 48)}</g>`,
  label(192, 94, 'ĐUÔI', { size: 8, fill: C.ego }),
  label(192, 139, 'ĐẦU', { size: 8, fill: C.ego }),
  label(16, 162, 'LỐI ĐI', { size: 8 })
].join('')

const columnLot = () => [
  rect(0, 0, W, 174, C.asphalt),
  rect(116, 28, 84, 90, '#31463f'),
  '<g id="column-bay">',
  line(116, 118, 116, 28, C.bay, 1.6),
  line(116, 28, 200, 28, C.bay, 1.6),
  line(200, 28, 200, 118, C.bay, 1.6),
  '</g>',
  `<g id="column-pillar">${rect(202, 58, 22, 56, '#7d8f88', 2)}</g>`,
  label(232, 79, 'CỘT', { size: 9 }),
  car(66, 74, 180, C.other, 28, 48),
  label(16, 157, 'LỐI ĐI', { size: 8 })
].join('')

const columnCar = y => [
  `<g id="column-car">${car(154, y, 180, C.ego, 28, 48)}`,
  '<g id="column-mirrors">',
  rect(137, y + 12, 4, 3, C.ego, 1),
  rect(167, y + 12, 4, 3, C.ego, 1),
  '</g></g>',
  label(180, y - 18, 'ĐUÔI', { size: 8, fill: C.ego }),
  label(180, y + 22, 'ĐẦU', { size: 8, fill: C.ego })
].join('')

const alleyLot = (wallGap = 108) => {
  const left = (W - wallGap) / 2
  return [
    rect(0, 0, W, 180, C.kerb),
    rect(left, 0, wallGap, 180, C.asphalt),
    line(left, 0, left, 180, C.bay, 2),
    line(left + wallGap, 0, left + wallGap, 180, C.bay, 2),
    label(12, 24, 'NHÀ DÂN', { size: 8 }),
    label(W - 12, 24, 'NHÀ DÂN', { size: 8, anchor: 'end' })
  ].join('')
}

const cutoffScene = following => {
  const motorcycle = (id, x, y, rotation) =>
    `<g id="${id}" transform="translate(${x} ${y}) rotate(${rotation})">${bike(0, 0, 0, C.hazard)}</g>`
  const motion = (id, x1, y, x2) =>
    `<path id="${id}" d="M${x1} ${y}L${x2} ${y}" fill="none" stroke="${C.hazard}" stroke-width="2.2" stroke-dasharray="4 4" marker-end="url(#cutoff-bike-tip)"/>`
  return [
    rect(0, 0, W, 174, C.kerb),
    `<g id="cutoff-main-road">${rect(0, 30, W, 58, C.asphalt)}</g>`,
    `<g id="cutoff-branch">${rect(124, 88, 80, 86, C.asphalt)}</g>`,
    '<g id="cutoff-walls">',
    line(0, 30, W, 30, C.bay, 2),
    line(0, 88, 124, 88, C.bay, 2),
    line(204, 88, W, 88, C.bay, 2),
    line(124, 88, 124, 174, C.bay, 2),
    line(204, 88, 204, 174, C.bay, 2),
    '</g>',
    `<g id="cutoff-conflict">${rect(124, 59, 80, 29, C.hazard, 0, 0.18)}</g>`,
    '<g id="cutoff-ego" transform="translate(176 137) rotate(0)">',
    car(0, 0, 0, C.ego),
    `<g id="cutoff-mirrors">${rect(-17, -14, 4, 4, C.ego, 1)}${rect(13, -14, 4, 4, C.ego, 1)}</g></g>`,
    '<defs><marker id="cutoff-bike-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">',
    `<path d="M0 1L9 5L0 9Z" fill="${C.hazard}"/></marker></defs>`,
    motorcycle('cutoff-crossing-bike', following ? 260 : 66, 72, 90),
    motion('cutoff-crossing-motion', following ? 280 : 86, 72, following ? 304 : 224),
    ...(following ? [
      motorcycle('cutoff-following-bike', 64, 72, 90),
      motion('cutoff-following-motion', 84, 72, 224),
      motorcycle('cutoff-opposing-bike', 260, 44, 270),
      motion('cutoff-opposing-motion', 240, 44, 206),
      label(14, 111, 'XE ĐI TIẾP', { size: 8, fill: C.hazard }),
      line(68, 103, 64, 82, C.hazard, 1)
    ] : [
      label(14, 111, 'VÙNG CẮT NGANG', { size: 8, fill: C.hazard }),
      line(96, 108, 136, 83, C.hazard, 1)
    ]),
    label(160, 19, 'ĐƯỜNG CHÍNH: HAI CHIỀU', { size: 8, anchor: 'middle' }),
    label(14, 145, 'NGÕ NHÁNH', { size: 8 }),
    label(216, 117, 'ĐẦU XE', { size: 8, fill: C.ego }),
    line(208, 114, 189, 114, C.ego, 1),
    label(216, 145, 'XE DỪNG', { size: 8, fill: C.ego }),
    line(210, 141, 194, 141, C.ego, 1),
    motion('cutoff-legend', 16, 164, 34),
    label(42, 167, 'HƯỚNG XE MÁY', { size: 8, fill: C.hazard }),
    note(following
      ? 'Không theo tỷ lệ. Xe vừa qua chưa đủ an toàn; giữ xe, kiểm tra lại cả hai hướng.'
      : 'Không theo tỷ lệ. Dừng trước vùng cắt ngang; không nhô đầu xe dò vùng khuất.')
  ]
}

const yieldVehicle = (id, x, y, rotation, fill) =>
  `<g id="${id}" transform="translate(${x} ${y}) rotate(${rotation})">` +
  car(0, 0, 0, fill, 30, 48) +
  `<g id="${id}-mirrors">` +
  rect(-19, -13, 4, 4, fill, 1) +
  rect(15, -13, 4, 4, fill, 1) +
  '</g></g>'

const yieldScene = waiting => [
  rect(0, 0, W, 174, C.kerb),
  `<g id="yield-road">${rect(126, 0, 64, 174, C.asphalt)}</g>`,
  `<g id="yield-pocket">${rect(190, 70, 80, 88, C.asphalt)}</g>`,
  '<g id="yield-walls">',
  line(126, 0, 126, 174, C.bay, 2),
  line(190, 0, 190, 70, C.bay, 2),
  line(190, 158, 190, 174, C.bay, 2),
  line(190, 70, 270, 70, C.bay, 2),
  line(270, 70, 270, 158, C.bay, 2),
  line(270, 158, 190, 158, C.bay, 2),
  '</g>',
  yieldVehicle('yield-ego', waiting ? 230 : 164, waiting ? 98 : 148, 0, C.ego),
  yieldVehicle('yield-other', 152, waiting ? 100 : 36, 180, C.other),
  label(204, 62, 'CHỖ TRÁNH', { size: 8 }),
  label(12, 24, 'XE ĐỐI DIỆN', { size: 8 }),
  label(waiting ? 258 : 184, waiting ? 78 : 128, 'ĐẦU', { size: 7, fill: C.ego }),
  ...(waiting ? [
    '<defs><marker id="yield-pass-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">',
    `<path d="M0 1L9 5L0 9Z" fill="${C.other}"/></marker></defs>`,
    `<path id="yield-pass" d="M152 130L152 158" fill="none" stroke="${C.other}" stroke-width="2.4" marker-end="url(#yield-pass-tip)"/>`,
    label(12, 80, 'XE KIA QUA', { size: 8 }),
    label(230, 138, 'XE BẠN CHỜ', { size: 8, fill: C.ego, anchor: 'middle' }),
    label(230, 150, 'GIỮ XE', { size: 8, fill: C.ego, anchor: 'middle' })
  ] : [
    label(202, 94, 'PHÍA TRƯỚC', { size: 7 }),
    label(202, 108, 'BÊN PHẢI', { size: 7 }),
    label(12, 82, 'CẢ HAI DỪNG', { size: 8 }),
    label(12, 96, 'ĐỂ KIỂM TRA', { size: 8 }),
    label(12, 148, 'XE BẠN DỪNG', { size: 8, fill: C.ego }),
    line(90, 145, 141, 148, C.ego, 1)
  ]),
  note(waiting
    ? 'Không theo tỷ lệ. Giữ xe; chờ cả xe và người qua hết, kiểm tra lại trước khi ra.'
    : 'Không theo tỷ lệ. Chỗ tránh phía trước; chỉ tiến vào khi được phép và đủ khoảng hở.')
]

const creepLot = (crossing = false) => [
  rect(0, 0, W, 174, C.kerb),
  rect(120, 0, 80, 174, C.asphalt),
  '<g id="creep-walls">',
  line(120, 0, 120, 174, C.bay, 2),
  ...(crossing
    ? [
        rect(200, 42, 120, 42, C.asphalt),
        line(200, 0, 200, 42, C.bay, 2),
        line(200, 84, 200, 174, C.bay, 2),
        line(200, 42, 320, 42, C.bay, 2),
        line(200, 84, 320, 84, C.bay, 2)
      ]
    : [line(200, 0, 200, 174, C.bay, 2)]),
  '</g>',
  `<g id="creep-car">${car(160, 128, 0, C.ego, 40, 48)}`,
  '<g id="creep-mirrors">',
  rect(135, 110, 5, 4, C.ego, 1),
  rect(180, 110, 5, 4, C.ego, 1),
  '</g></g>',
  label(220, 108, 'ĐẦU', { size: 8, fill: C.ego }),
  line(182, 104, 214, 104, C.ego, 1),
  label(220, 152, 'ĐUÔI', { size: 8, fill: C.ego }),
  line(182, 148, 214, 148, C.ego, 1)
]

const mirrorLot = () => [
  rect(0, 0, W, 174, C.kerb),
  rect(90, 0, 146, 174, C.asphalt),
  '<g id="mirror-walls">',
  line(90, 0, 90, 174, C.bay, 2),
  line(236, 0, 236, 174, C.bay, 2),
  '</g>',
  `<g id="mirror-car">${car(148, 118, 0, C.ego, 40, 64)}</g>`,
  '<g id="mirror-open">',
  rect(122, 96, 6, 4, C.ego, 1),
  rect(168, 96, 6, 4, C.ego, 1),
  '</g>',
  label(148, 80, 'ĐẦU', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(148, 162, 'ĐUÔI', { size: 8, fill: C.ego, anchor: 'middle' })
]

const followingSnapshot = (id, y, egoX, leadX) => [
  `<g id="${id}-lane">${rect(0, y - 19, W, 38, C.asphalt)}</g>`,
  line(0, y - 19, W, y - 19, C.bay, 1.6),
  line(0, y + 19, W, y + 19, C.bay, 1.6),
  `<g id="${id}-marker">${line(160, y - 19, 160, y + 27, C.bike, 1.4, '2 3')}</g>`,
  `<g id="${id}-ego">${car(egoX, y, 90, C.ego, 18, 32)}</g>`,
  `<g id="${id}-lead">${car(leadX, y, 90, C.other, 18, 32)}</g>`,
  `<g id="${id}-direction">`,
  arrow(egoX + 20, y, egoX + 44, y),
  arrow(leadX + 20, y, leadX + 40, y),
  '</g>',
  `<g id="${id}-clearance">${gap(egoX + 16, leadX - 16, y + 23, 'CỰ LY')}</g>`
]

const followingScene = rain => rain ? [
  rect(0, 0, W, 180, C.kerb),
  label(160, 15, 'MƯA / ĐƯỜNG ƯỚT', { size: 10, anchor: 'middle' }),
  '<g id="gap-rain-cues" stroke="#8fc4e8" stroke-width="1.4" opacity=".7">',
  '<path d="M40 24L32 40M112 24L104 40M208 24L200 40M280 24L272 40"/>',
  '</g>',
  `<g id="gap-rain-lane">${rect(0, 60, W, 44, '#273e46')}</g>`,
  line(0, 60, W, 60, C.bay, 1.6),
  line(0, 104, W, 104, C.bay, 1.6),
  `<g id="gap-rain-ego">${car(48, 82, 90, C.ego, 18, 32)}</g>`,
  `<g id="gap-rain-lead">${car(272, 82, 90, C.other, 18, 32)}</g>`,
  '<g id="gap-rain-direction">',
  arrow(68, 82, 92, 82),
  arrow(292, 82, 312, 82),
  '</g>',
  `<g id="gap-rain-clearance">${gap(64, 256, 122, 'CỰ LY TĂNG')}</g>`,
  label(48, 54, 'MÌNH', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(272, 54, 'XE TRƯỚC', { size: 8, anchor: 'middle' }),
  label(160, 133, 'TỪ 3 s KHÔ → ÍT NHẤT 6 s', { size: 10, fill: C.ego, anchor: 'middle' }),
  label(160, 150, 'CÓ THỂ CẦN HƠN; GIẢM TỐC KHI CẦN', { size: 8, anchor: 'middle' }),
  note('Không theo tỷ lệ. Vẫn theo biển và cự ly quy định; sáu giây không bảo đảm an toàn.', 12)
] : [
  rect(0, 0, W, 180, C.kerb),
  label(12, 14, '1. ĐUÔI QUA MỐC: BẮT ĐẦU ĐẾM', { size: 9, fill: C.ego }),
  label(56, 32, 'MÌNH', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(160, 32, 'MỐC', { size: 8, fill: C.bike, anchor: 'middle' }),
  label(230, 32, 'XE TRƯỚC', { size: 8, anchor: 'middle' }),
  ...followingSnapshot('gap-start', 57, 56, 176),
  label(12, 98, '2. ĐẦU TỚI CÙNG MỐC: ≥ 3 s (KHÔ)', { size: 9, fill: C.ego }),
  ...followingSnapshot('gap-end', 131, 144, 264),
  note('Không theo tỷ lệ. Đếm đủ giây; vẫn theo biển, tốc độ và điều kiện đường.', 12)
]

const speedSign = (id, x, y, value, minimum = false) =>
  `<g id="${id}">` +
  `<circle cx="${x}" cy="${y}" r="18" fill="${minimum ? '#1956aa' : '#fff'}"/>` +
  (minimum ? '' : `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="#d22" stroke-width="3"/>`) +
  label(x, y + 5, value, { size: 15, fill: minimum ? '#fff' : '#111', anchor: 'middle', weight: 700 }) +
  '</g>'

const signsScene = changing => changing ? [
  rect(0, 0, W, 180, C.kerb),
  label(12, 14, 'VÍ DỤ RIÊNG: GIỚI HẠN MỚI 60', { size: 9 }),
  `<g id="signs-road">${rect(0, 76, W, 52, C.asphalt)}</g>`,
  `<g id="signs-new-limit-region">${rect(214, 76, 106, 52, C.ego, 0, 0.08)}</g>`,
  line(0, 76, W, 76, C.bay, 2),
  line(0, 128, W, 128, C.bay, 2),
  speedSign('signs-new-maximum', 214, 40, '60'),
  '<g id="signs-effective-position">',
  line(214, 58, 214, 136, C.text, 1, '2 3'),
  '</g>',
  label(188, 45, 'TỐI ĐA', { size: 8, anchor: 'end' }),
  label(246, 45, 'km/h', { size: 8 }),
  `<g id="signs-car">${car(64, 102, 90, C.ego, 18, 32)}</g>`,
  `<g id="signs-travel">${trail('M82 102L298 102')}</g>`,
  label(12, 148, 'GIẢM ÊM TỪ SỚM', { size: 8, fill: C.ego }),
  label(266, 148, '≤ 60 TỪ BIỂN', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(12, 164, 'Nét dọc: vị trí biển, không phải vạch đường', { size: 8 }),
  note('Không theo tỷ lệ. Ví dụ không có biển phụ; không có quãng phanh chung.')
] : [
  rect(0, 0, W, 180, C.kerb),
  label(160, 14, 'NHẬN DIỆN BIỂN (VÍ DỤ)', { size: 9, anchor: 'middle' }),
  speedSign('signs-maximum', 80, 42, '80'),
  speedSign('signs-minimum', 240, 42, '60', true),
  label(80, 78, 'TỐI ĐA 80 km/h', { size: 9, anchor: 'middle' }),
  label(240, 78, 'TỐI THIỂU 60 km/h', { size: 9, anchor: 'middle' }),
  label(80, 94, 'KHÔNG VƯỢT SỐ', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(240, 94, 'KHI THUẬN LỢI, AN TOÀN', { size: 8, fill: C.ego, anchor: 'middle' }),
  label(160, 113, 'GẶP NGUY: GIẢM TỐC, KHÔNG ÉP TỐI THIỂU', { size: 8, fill: C.bike, anchor: 'middle' }),
  `<g id="signs-road">${rect(0, 124, W, 42, C.asphalt)}</g>`,
  line(0, 124, W, 124, C.bay, 2),
  line(0, 166, W, 166, C.bay, 2),
  `<g id="signs-car">${car(52, 145, 90, C.ego, 18, 32)}</g>`,
  `<g id="signs-travel">${arrow(70, 145, 292, 145)}</g>`,
  note('Không theo tỷ lệ; bảng nhận diện, không mô tả cách đặt biển. Đủ hở mới đổi làn.')
]

const mergeRoad = () => [
  rect(0, 0, W, 180, C.kerb),
  rect(0, 30, W, 102, C.asphalt),
  `<g id="merge-receiving-lane">${rect(0, 80, W, 52, C.asphalt)}</g>`,
  `<g id="merge-acceleration-lane"><path d="M0 132L300 132L210 174L0 174Z" fill="${C.asphalt}"/></g>`,
  line(0, 30, W, 30, C.bay, 2),
  `<g id="merge-main-divider">${line(0, 80, W, 80, C.bay, 1.8, '12 10')}</g>`,
  `<g id="merge-solid-separator">${line(0, 132, 80, 132, C.bay, 2)}</g>`,
  `<g id="merge-entry-boundary">${line(80, 132, 300, 132, C.bay, 1.8, '8 6')}</g>`,
  `<g id="merge-outer-edge"><path d="M0 174L210 174L300 132L320 132" fill="none" stroke="${C.bay}" stroke-width="2"/></g>`,
  label(16, 20, 'NHẬP TỪ BÊN PHẢI', { size: 9 }),
  label(16, 54, 'CHIỀU ĐI', { size: 8 }),
  `<g id="merge-traffic-direction">${arrow(94, 51, 138, 51)}${arrow(250, 51, 294, 51)}</g>`,
  `<g id="merge-rear-car">${car(28, 106, 90, C.other, 18, 32)}</g>`,
  `<g id="merge-front-car">${car(278, 106, 90, C.other, 18, 32)}</g>`,
  label(8, 92, 'XE SAU', { size: 8 }),
  label(304, 92, 'XE TRƯỚC', { size: 8, anchor: 'end' })
]

const mergeScene = inserted => [
  ...mergeRoad(),
  `<g id="merge-ego-car">${car(inserted ? 160 : 64, inserted ? 106 : 153, 90, C.ego, 18, 32)}</g>`,
  ...(inserted ? [
    `<g id="merge-rear-gap">${gap(44, 144, 123, 'Hở sau')}</g>`,
    `<g id="merge-front-gap">${gap(176, 262, 123, 'Hở trước')}</g>`,
    label(160, 92, 'XE MÌNH', { size: 8, fill: C.ego, anchor: 'middle' }),
    label(16, 151, 'XÉT CẢ TỐC ĐỘ XE SAU ĐẾN GẦN', { size: 8.5 }),
    note('Không theo tỷ lệ. Khe ba giây không bảo đảm đủ chỗ nhập làn.')
  ] : [
    `<g id="merge-path">${trail('M82 153C126 153 144 106 188 106L198 106')}</g>`,
    label(16, 143, 'XE MÌNH', { size: 8, fill: C.ego }),
    label(160, 166, 'LÀN TĂNG TỐC', { size: 8, fill: C.ego, anchor: 'middle' }),
    label(198, 95, 'LÀN PHẢI', { size: 8, fill: C.ego, anchor: 'middle' }),
    note('Không theo tỷ lệ. Nhường xe làn chính; đủ hở trước và sau mới nhập.')
  ])
]

const overtakeScene = returning => {
  const truckX = returning ? 76 : 146
  return [
    rect(0, 0, W, 174, C.kerb),
    `<g id="overtake-road">${rect(0, 42, W, 108, C.asphalt)}</g>`,
    `<g id="overtake-edges">${line(0, 42, W, 42, C.bay, 2)}${line(0, 150, W, 150, C.bay, 2)}</g>`,
    `<g id="overtake-divider">${line(0, 96, W, 96, C.bay, 1.8, '10 8')}</g>`,
    label(16, 18, returning ? 'ĐỦ XA MỚI VỀ PHẢI' : 'ĐỦ ĐIỀU KIỆN MỚI QUA TRÁI', { size: 9, fill: C.ego }),
    label(16, 34, 'HAI LÀN CÙNG CHIỀU', { size: 8 }),
    `<g id="overtake-direction">${arrow(260, 29, 300, 29)}${arrow(260, 139, 300, 139)}</g>`,
    label(300, 57, 'LÀN TRÁI', { size: 8, anchor: 'end' }),
    label(300, 111, 'LÀN PHẢI', { size: 8, anchor: 'end' }),
    ...(!returning ? [
      `<g id="overtake-blind-areas" opacity=".3">`,
      rect(84, 111, 24, 24, C.hazard, 2),
      rect(184, 111, 26, 24, C.hazard, 2),
      rect(111, 60, 70, 48, C.hazard, 2),
      rect(111, 138, 70, 8, C.hazard, 2),
      '</g>'
    ] : []),
    `<g id="overtake-truck"><g transform="translate(${truckX} 123) rotate(90)">`,
    rect(-12, -35, 24, 15, C.other, 3),
    rect(-8, -32, 16, 3, '#0e1715'),
    rect(-12, -17, 24, 52, C.truck, 2),
    '</g></g>',
    label(truckX, 126, 'XE TẢI', { size: 7, fill: '#e3ede7', anchor: 'middle' }),
    `<g id="overtake-ego">${car(returning ? 210 : 36, returning ? 69 : 123, 90, C.ego, 18, 32)}</g>`,
    label(returning ? 210 : 36, returning ? 54 : 106, 'XE MÌNH', { size: 8, fill: C.ego, anchor: 'middle' }),
    ...(returning ? [
      `<g id="overtake-return-path">${trail('M226 69C250 69 252 123 278 123L300 123')}</g>`,
      `<g id="overtake-clearance">${gap(111, 194, 88, 'HỞ SAU')}</g>`,
      `<g id="overtake-clearance-guides">${line(111, 88, 111, 109, C.accent, 1, '2 3')}${line(194, 79, 194, 88, C.accent, 1, '2 3')}</g>`,
      label(16, 163, 'HỞ SAU: ĐẦU XE TẢI ĐẾN ĐUÔI XE MÌNH', { size: 8 }),
      note('Không theo tỷ lệ. Gương chỉ hỗ trợ; đủ hở, báo hiệu, kiểm tra điểm mù mới về phải.')
    ] : [
      `<g id="overtake-left-path">${trail('M52 123C78 123 82 69 108 69L232 69')}</g>`,
      rect(16, 155, 9, 9, C.hazard, 1, 0.5),
      label(31, 163, 'ĐIỂM MÙ MINH HỌA, KHÔNG CỐ ĐỊNH', { size: 8 }),
      note('Không theo tỷ lệ. Đủ hở mới đổi làn; không vượt giới hạn tốc độ để qua xe tải.')
    ])
  ]
}

const tailgaterScene = yielding => [
  rect(0, 0, W, 174, C.kerb),
  `<g id="tailgater-road">${rect(0, 42, W, 108, C.asphalt)}</g>`,
  `<g id="tailgater-edges">${line(0, 42, W, 42, C.bay, 2)}${line(0, 150, W, 150, C.bay, 2)}</g>`,
  `<g id="tailgater-divider">${line(0, 96, W, 96, C.bay, 1.8, '10 8')}</g>`,
  label(16, 18, yielding ? 'ĐỦ HỞ MỚI NHƯỜNG PHẢI' : 'BỊ BÁM SÁT: GIÃN TRƯỚC ÊM', { size: 9, fill: C.ego }),
  label(16, 34, 'HAI LÀN CÙNG CHIỀU', { size: 8 }),
  `<g id="tailgater-direction">${arrow(260, 29, 300, 29)}${arrow(260, 139, 300, 139)}</g>`,
  `<g id="tailgater-follower">${car(54, 69, 90, C.hazard, 18, 32)}</g>`,
  `<g id="tailgater-ego">${car(94, 69, 90, C.ego, 18, 32)}</g>`,
  label(54, 53, 'XE SAU', { size: 8, fill: C.hazard, anchor: 'middle' }),
  label(110, 53, 'XE MÌNH', { size: 8, fill: C.ego }),
  label(16, 92, 'LÀN TRÁI', { size: 8 }),
  label(16, 127, 'LÀN PHẢI', { size: 8 }),
  ...(yielding ? [
    `<g id="tailgater-yield-path">${trail('M110 69C145 69 160 123 208 123L244 123')}</g>`,
    label(170, 88, 'KIỂM TRA ĐIỂM MÙ PHẢI', { size: 8 }),
    label(160, 163, 'CHƯA AN TOÀN: GIỮ LÀN', { size: 8, fill: C.ego, anchor: 'middle' }),
    note('Không theo tỷ lệ. Chỉ qua một làn khi được phép, báo hiệu và đủ hở trước, sau, hai bên.')
  ] : [
    `<g id="tailgater-lead">${car(274, 69, 90, C.other, 18, 32)}</g>`,
    label(274, 53, 'XE TRƯỚC', { size: 8, anchor: 'middle' }),
    '<g id="tailgater-rear-gap">',
    line(70, 105, 78, 105, C.hazard, 1.6, '2 2'),
    line(70, 101, 70, 109, C.hazard, 1.6),
    line(78, 101, 78, 109, C.hazard, 1.6),
    label(86, 109, 'BÁM SÁT', { size: 8, fill: C.hazard }),
    '</g>',
    `<g id="tailgater-front-gap">${gap(110, 258, 92, 'TĂNG HỞ TRƯỚC ÊM')}</g>`,
    label(160, 163, 'KHÔNG PHANH CẢNH CÁO', { size: 8, fill: C.hazard, anchor: 'middle' }),
    note('Không theo tỷ lệ; không phải cự ly chuẩn. Vẫn phanh cần thiết khi nguy hiểm tức thời.')
  ])
]

const exitScene = missed => [
  rect(0, 0, W, 180, C.kerb),
  `<g id="exit-main-road">${rect(0, 34, W, 88, C.asphalt)}</g>`,
  `<g id="exit-deceleration-lane"><path d="M32 122L206 122L320 142L320 174L206 166L88 166Z" fill="${C.asphalt}"/></g>`,
  line(0, 34, W, 34, C.bay, 2),
  `<g id="exit-main-divider">${line(0, 78, W, 78, C.bay, 1.8, '12 10')}</g>`,
  `<g id="exit-entry-boundary">${line(32, 122, 194, 122, C.bay, 1.8, '8 6')}</g>`,
  `<g id="exit-solid-separation">${line(194, 122, W, 122, C.bay, 2)}${line(206, 122, W, 142, C.bay, 2)}</g>`,
  `<g id="exit-gore"><path d="M206 122L320 122L320 142Z" fill="${C.kerb}"/>` +
    line(228, 123, 238, 126, C.bay, 1.4) +
    line(252, 123, 274, 133, C.bay, 1.4) +
    line(282, 123, 309, 139, C.bay, 1.4) + '</g>',
  `<g id="exit-outer-edge"><path d="M0 122L32 122L88 166L206 166L320 174" fill="none" stroke="${C.bay}" stroke-width="2"/></g>`,
  label(16, 20, missed ? 'QUÁ MUỘN: ĐI TIẾP' : 'LỐI RA BÊN PHẢI', { size: 9, fill: C.ego }),
  label(16, 58, 'CHIỀU ĐI', { size: 8 }),
  `<g id="exit-traffic-direction">${arrow(94, 55, 140, 55)}${arrow(248, 55, 294, 55)}</g>`,
  `<g id="exit-branch-direction">${arrow(246, 149, 298, 155)}</g>`,
  label(274, 168, 'NHÁNH RA', { size: 8, anchor: 'middle' }),
  `<g id="exit-ego-car">${car(missed ? 222 : 40, 100, 90, C.ego, 18, 32)}</g>`,
  ...(missed ? [
    `<g id="exit-safe-continuation">${trail('M240 100L302 100')}</g>`,
    `<g id="exit-forbidden-path"><path d="M240 104L284 148" fill="none" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4"/></g>`,
    `<g id="exit-prohibition">${line(258, 122, 274, 138, C.hazard, 3)}${line(274, 122, 258, 138, C.hazard, 3)}</g>`,
    label(124, 101, 'GIỮ LÀN', { size: 8, fill: C.ego, anchor: 'middle' }),
    label(142, 149, 'KHÔNG CẮT', { size: 8, fill: C.hazard, anchor: 'middle' }),
    note('Không theo tỷ lệ. Lỡ lối ra: giữ làn, đi tiếp.')
  ] : [
    `<g id="exit-entry-path">${trail('M58 100C102 100 112 144 158 144L182 144')}</g>`,
    label(16, 88, 'XE MÌNH', { size: 8, fill: C.ego }),
    label(150, 96, 'LÀN PHẢI', { size: 8 }),
    label(144, 161, 'LÀN GIẢM TỐC', { size: 8, fill: C.ego, anchor: 'middle' }),
    note('Không theo tỷ lệ. Đủ hở mới vào; giảm tốc sớm nếu phía trước có nguy hiểm.')
  ])
]

const slopeLot = (down = true) => {
  const ridge = down ? 'M0 70L120 70L300 150L320 150' : 'M0 150L20 150L200 66L320 66'
  return [
    rect(0, 0, W, 180, '#1d2a26'),
    `<path d="${ridge}L320 180L0 180Z" fill="${C.asphalt}"/>`,
    `<path d="${ridge}" stroke="${C.bay}" stroke-width="2.4" fill="none"/>`
  ].join('')
}

const downhillScene = braking => braking ? [
  label(16, 16, 'HAI TÌNH HUỐNG PHANH', { size: 9, fill: C.ego }),
  '<g id="downhill-normal-braking">',
  rect(12, 24, 296, 65, C.asphalt, 6),
  label(22, 39, 'ĐI THƯỜNG: GIẢM TỐC KHI CẦN', { size: 8.5, fill: C.ego, weight: 700 }),
  label(22, 54, 'Tăng lực êm; nhả khi đã giảm đủ', { size: 8.5 }),
  label(22, 67, 'và vẫn kiểm soát được tốc độ.', { size: 8.5 }),
  label(22, 80, 'Không rà suốt dốc, không nhấp theo nhịp.', { size: 8.5 }),
  '</g>',
  '<g id="downhill-abs-emergency">',
  rect(12, 98, 296, 65, C.asphalt, 6),
  label(22, 113, 'KHẨN CẤP VỚI ABS', { size: 8.5, fill: C.hazard, weight: 700 }),
  label(22, 128, 'Đạp mạnh, giữ lực; không nhấp nhả.', { size: 8.5 }),
  label(22, 141, 'Lái tránh trong khoảng trống an toàn.', { size: 8.5 }),
  label(22, 154, 'ABS không bảo đảm dừng ngắn hơn.', { size: 8.5 }),
  '</g>',
  note('Phân biệt tình huống, không phải biểu đồ nhịp phanh.')
] : [
  label(16, 18, 'CHỌN CHẾ ĐỘ THEO SÁCH XE', { size: 9, fill: C.ego }),
  '<g id="downhill-grade">',
  `<path d="M32 60L292 164L292 174L32 174Z" fill="${C.asphalt}"/>`,
  line(32, 60, 292, 164, C.bay, 2.4),
  '</g>',
  '<g id="downhill-car" transform="translate(133.9 83.5) rotate(21.8)">',
  rect(-27, -11, 54, 22, C.ego, 7),
  `<path d="M-15 -10L-10 -20L9 -20L19 -10Z" fill="${C.ego}"/>`,
  `<path d="M2 -18L8 -18L14 -11L2 -11Z" fill="#0e1715" opacity=".55"/>`,
  rect(22, -6, 4, 4, C.bike, 1),
  `<circle cx="-15" cy="11" r="5" fill="#0e1715"/>`,
  `<circle cx="15" cy="11" r="5" fill="#0e1715"/>`,
  '</g>',
  label(24, 49, 'CAO', { size: 8 }),
  label(276, 151, 'THẤP', { size: 8, anchor: 'middle' }),
  label(73, 75, 'ĐUÔI', { size: 8, fill: C.ego }),
  line(98, 76, 109, 80, C.ego, 1),
  label(163, 54, 'ĐẦU', { size: 8, fill: C.ego }),
  line(174, 58, 158, 86, C.ego, 1),
  `<g id="downhill-forward">${arrow(180, 90, 245, 116)}</g>`,
  label(232, 85, 'ĐI XUỐNG', { size: 8, fill: C.ego, anchor: 'middle' }),
  note('Không theo tỷ lệ. Theo sách xe; đường trơn có hạn chế.')
]

const floodLot = (depth = 44) => [
  rect(0, 0, W, 180, '#1d2a26'),
  rect(0, 118, W, 62, C.asphalt),
  rect(0, 180 - depth, W, depth, C.water, 0, 0.55),
  `<path d="M0 ${180 - depth}q20 -5 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="${C.water}" stroke-width="2" fill="none" opacity=".9"/>`
].join('')

const cornerScene = risk => {
  const cx = risk ? 229 : 224
  const cy = risk ? 173 : 142
  const radius = 82
  const wheelbase = 28
  const halfTrack = 10
  const start = risk ? 45 : 0
  const angle = start * Math.PI / 180
  const rearX = cx - radius * Math.cos(angle)
  const rearY = cy - radius * Math.sin(angle)
  // Same-side wheel positions on one rigid vehicle, rotating about a common centre.
  const wheelPath = front => Array.from({ length: 31 }, (_, index) => {
    const theta = (start + (90 - start) * index / 30) * Math.PI / 180
    const x = cx - (radius - halfTrack) * Math.cos(theta) + (front ? wheelbase * Math.sin(theta) : 0)
    const y = cy - (radius - halfTrack) * Math.sin(theta) - (front ? wheelbase * Math.cos(theta) : 0)
    return `${index === 0 ? 'M' : 'L'}${num(x)} ${num(y)}`
  }).join('')
  const track = (id, front, color, marker = '') =>
    `<path id="${id}" d="${wheelPath(front)}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="${front ? '6 4' : '2 3'}"${marker ? ` marker-end="url(#${marker})"` : ''}/>`
  const parts = [
    '<defs><marker id="corner-rear-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">',
    `<path d="M0 1L9 5L0 9Z" fill="${C.bike}"/></marker></defs>`,
    rect(0, 0, W, 174, C.kerb),
    rect(76, 20, 244, 88, C.asphalt),
    rect(76, 108, 118, 66, C.asphalt),
    `<g id="corner-inner-wall">${rect(194, 108, 126, 66, C.kerb)}</g>`,
    '<g id="corner-boundaries">',
    line(76, 20, 320, 20, C.bay, 2),
    line(76, 20, 76, 174, C.bay, 2),
    line(194, 108, 320, 108, C.bay, 2),
    line(194, 108, 194, 174, C.bay, 2),
    '</g>',
    label(10, 13, 'VÍ DỤ RẼ PHẢI', { size: 8, fill: C.ego }),
    label(254, 39, 'LỐI RA →', { size: 8 }),
    risk ? '' : track('corner-front-track', true, C.ego, 'tip'),
    track('corner-rear-track', false, risk ? C.hazard : C.bike, risk ? '' : 'corner-rear-tip'),
    `<g id="corner-car" transform="translate(${num(rearX)} ${num(rearY)}) rotate(${start})">`,
    car(0, -14, 0, C.ego, 20, 46),
    '<g id="corner-open-mirrors">',
    rect(-14, -28, 4, 3, C.ego, 1),
    rect(10, -28, 4, 3, C.ego, 1),
    '</g>',
    '<g id="corner-wheels">',
    ...[-halfTrack, halfTrack].flatMap(x => [
      `<g transform="translate(${x} -28) rotate(${num(Math.atan(wheelbase / (radius - x)) * 180 / Math.PI)})">${rect(-1.5, -3, 3, 6, C.bay, 1)}</g>`,
      rect(x - 1.5, -3, 3, 6, C.bay, 1)
    ]),
    '</g></g>'
  ]
  if (risk) {
    const hitX = 194
    const hitY = cy - Math.sqrt((radius - halfTrack) ** 2 - (cx - hitX) ** 2)
    parts.push(
      '<g id="corner-contact-risk">',
      line(hitX - 4, hitY - 4, hitX + 4, hitY + 4, C.hazard, 2),
      line(hitX - 4, hitY + 4, hitX + 4, hitY - 4, C.hazard, 2),
      '</g>',
      label(82, 146, 'XE DỪNG', { size: 8, fill: C.ego }),
      line(124, 138, 155, 125, C.ego, 1),
      label(186, 78, 'ĐẦU', { size: 8, fill: C.ego }),
      label(124, 127, 'ĐUÔI', { size: 8, fill: C.ego }),
      label(224, 139, 'NGUY CƠ', { size: 8, fill: C.hazard }),
      line(222, 132, 198, 114, C.hazard, 1),
      note('Không theo tỷ lệ. Nét đỏ: nguy cơ nếu cố tiến, không phải lệnh đi.', 12)
    )
  } else {
    parts.push(
      line(10, 47, 58, 47, C.ego, 2, '6 4'),
      label(10, 60, 'TRƯỚC', { size: 8, fill: C.ego }),
      line(10, 78, 58, 78, C.bike, 2, '2 3'),
      label(10, 91, 'SAU', { size: 8, fill: C.bike }),
      label(93, 100, 'ĐẦU ↑', { size: 8, fill: C.ego }),
      label(110, 162, 'ĐUÔI', { size: 8, fill: C.ego }),
      label(220, 139, 'GÓC TRONG', { size: 8 }),
      line(218, 131, 196, 110, C.line, 1),
      note('Không theo tỷ lệ. Vệt bánh không phải vùng quét toàn xe hay mốc đánh lái.', 12)
    )
  }
  return parts
}

const templates = {
  bay: mode => {
    const scenes = {
      approach: () => [
        bayLot(2),
        car(250, 132, 90, C.ego),
        arrow(270, 132, 296, 132),
        label(270, 117, 'ĐẦU XE', { size: 7.5, fill: C.ego }),
        trail('M236 120C214 96 206 84 200 70'),
        pin(284, 157, '1'),
        tag(154, 145, 'HƯỚNG LÙI'),
        note('1. Dừng hẳn; nét đứt minh họa hướng lùi, không là mốc cố định.')
      ],
      'approach-angle': () => [
        bayLot(2),
        car(254, 140, 72, C.ego),
        arrow(274, 133, 292, 127),
        label(267, 116, 'ĐẦU XE', { size: 7.5, fill: C.ego }),
        trail('M238 126C216 104 204 86 198 70', C.accent, '5 5'),
        tag(154, 145, 'HƯỚNG LÙI'),
        note('Góc tiếp cận khác nhau; dừng nếu khoảng trống chưa rõ.')
      ],
      align: () => [
        alignmentLot(),
        label(160, 13, 'THÂN XE SONG SONG VẠCH', { size: 9, anchor: 'middle' }),
        '<g id="alignment-gaps">',
        gap(120, 140, 84, 'a'),
        gap(180, 200, 84, 'b'),
        '</g>',
        label(160, 153, 'So cả đầu và đuôi; chừa chỗ mở cửa', { size: 9, anchor: 'middle' }),
        note('Minh họa, không theo tỷ lệ; a, b là khoảng trống hai bên.')
      ],
      'align-mirror': () => [
        alignmentLot(),
        label(160, 13, 'GƯƠNG CHỈ HỖ TRỢ', { size: 9, anchor: 'middle' }),
        '<g id="mirror-sightlines">',
        line(137.5, 104, 120, 50, C.accent, 1.6, '4 4'),
        line(182.5, 104, 200, 50, C.accent, 1.6, '4 4'),
        '</g>',
        label(160, 153, 'Kết hợp quan sát trực tiếp quanh xe', { size: 9, anchor: 'middle' }),
        note('Nét đứt: hướng nhìn minh họa, không là quỹ đạo.')
      ],
      correct: () => [
        correctionLot(),
        label(160, 13, 'DỪNG ĐỂ ĐÁNH GIÁ', { size: 9, anchor: 'middle' }),
        label(306, 153, 'Thân nghiêng so với vạch', { size: 8, anchor: 'end' }),
        note('Không theo tỷ lệ; chưa rõ khoảng trống thì giữ phanh.')
      ],
      'correct-out': () => [
        correctionLot(),
        label(160, 13, 'CHỈ TIẾN KHI LỐI ĐI ĐÃ RÕ', { size: 9, anchor: 'middle' }),
        '<g id="correction-forward">',
        arrow(166.9, 116.1, 179.9, 151.8),
        '</g>',
        label(192, 151, 'TIẾN', { size: 8, fill: C.ego }),
        note('Mũi tên: tiến thẳng minh họa, không theo tỷ lệ. Dừng hẳn trước đổi chiều.')
      ],
      lowlight: () => [
        lowlightLot(),
        label(160, 15, 'CHỈ LÙI KHI THẤY RÕ ĐƯỜNG ĐI', { size: 9, anchor: 'middle' }),
        `<g id="lowlight-dipped">${cone(150, 136, 180, 9, 25, '#fff2c4')}${cone(170, 136, 180, 9, 25, '#fff2c4')}</g>`,
        `<g id="lowlight-reverse-lamps">${cone(150, 88, 0, 6, 24, '#e0f3ff')}${cone(170, 88, 0, 6, 24, '#e0f3ff')}</g>`,
        '<g id="lowlight-reverse">',
        arrow(160, 82, 160, 44),
        '</g>',
        label(220, 55, 'LÙI', { size: 8, fill: C.ego }),
        label(16, 113, 'Chiếu gần', { size: 8 }),
        line(77, 115, 144, 145, C.text, 1),
        label(220, 72, 'Đèn lùi', { size: 8 }),
        line(215, 74, 174, 79, C.text, 1),
        note('Đèn và hướng lùi minh họa, không theo tỷ lệ. Không bảo đảm vùng nhìn rõ.')
      ],
      'lowlight-mirror': () => [
        lowlightLot(),
        label(160, 15, 'XE DỪNG ĐỂ THỐNG NHẤT TÍN HIỆU', { size: 9, anchor: 'middle' }),
        '<g id="lowlight-guide">',
        '<circle cx="242" cy="64" r="5" fill="' + C.bike + '"/>',
        line(242, 70, 242, 82, C.bike, 3),
        line(235, 74, 249, 74, C.bike, 2),
        line(242, 82, 236, 90, C.bike, 2),
        line(242, 82, 248, 90, C.bike, 2),
        '</g>',
        label(242, 43, 'NGƯỜI HỖ TRỢ', { size: 8, fill: C.bike, anchor: 'middle' }),
        '<g id="lowlight-sight">',
        line(179, 116, 232, 79, C.text, 1.6, '4 4'),
        '</g>',
        label(306, 158, 'XE ĐANG DỪNG', { size: 8, anchor: 'end' }),
        note('Nét đứt: liên lạc minh họa, không là quỹ đạo. Mất liên lạc thì dừng.')
      ],
      column: () => [
        columnLot(),
        label(160, 14, 'VÍ DỤ ĐÃ THẲNG HƯỚNG VÀO Ô', { size: 9, anchor: 'middle' }),
        columnCar(145),
        `<g id="column-reverse">${trail('M154 117L154 44')}</g>`,
        label(16, 44, 'HƯỚNG LÙI', { size: 8, fill: C.ego }),
        line(88, 42, 149, 44, C.line, 1),
        label(16, 111, 'RÕ HAI BÊN', { size: 8 }),
        note('Không theo tỷ lệ; chỉ ví dụ lùi thẳng. Chưa rõ khoảng hở thì dừng, không chờ tiếng báo.')
      ],
      'column-gap': () => [
        columnLot(),
        label(160, 14, 'ĐÃ GIỮ XE CHẮC, KIỂM TRA CỬA', { size: 9, anchor: 'middle' }),
        columnCar(74),
        '<g id="column-door">',
        `<path d="M168 64A18 18 0 0 1 186 82L168 82Z" fill="${C.bike}" opacity=".25"/>`,
        '<path d="M168 64A18 18 0 0 1 186 82" fill="none" stroke="#ffc66d" stroke-width="1.4" stroke-dasharray="3 3"/>',
        line(168, 82, 186, 82, C.bike, 2),
        '</g>',
        label(234, 128, 'CỬA LÁI', { size: 8, fill: C.bike }),
        label(234, 140, 'MINH HỌA', { size: 8, fill: C.bike }),
        line(230, 126, 186, 82, C.bike, 1),
        label(16, 131, 'XE TAY LÁI TRÁI', { size: 8 }),
        note('Không theo tỷ lệ; kiểm tra cả khoảng quét cửa và lối ra thực tế, không chen sát cột.')
      ]
    }
    return (scenes[mode] ?? scenes.approach)()
  },
  slopeParking: mode => {
    const base = [
      '<defs>',
      '<marker id="slope-grade-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">',
      `<path d="M0 1L9 5L0 9Z" fill="${C.text}"/></marker>`,
      '<marker id="slope-roll-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">',
      `<path d="M0 1L9 5L0 9Z" fill="${C.hazard}"/></marker></defs>`,
      rect(0, 0, W, 174, C.asphalt),
      rect(120, 26, 80, 60, '#31463f'),
      '<g id="slope-bay">',
      line(120, 26, 120, 86, C.bay, 1.6),
      line(200, 26, 200, 86, C.bay, 1.6),
      line(120, 26, 200, 26, C.bay, 1.6),
      '</g>',
      label(218, 43, 'Ô ĐỖ', { size: 9 }),
      label(218, 55, 'ĐƯỢC PHÉP', { size: 8 }),
      label(44, 34, 'CAO', { size: 9, anchor: 'middle' }),
      '<g id="slope-grade">',
      `<path d="M44 48L44 134" fill="none" stroke="${C.text}" stroke-width="1.8" marker-end="url(#slope-grade-tip)"/>`,
      '</g>',
      label(44, 151, 'THẤP', { size: 9, anchor: 'middle' }),
      label(60, 92, 'DỐC', { size: 8 }),
      label(60, 104, 'XUỐNG', { size: 8 }),
      `<g id="slope-car">${car(160, 112, 180, C.ego)}</g>`,
      label(184, 96, 'ĐUÔI', { size: 8, fill: C.ego }),
      label(184, 133, 'ĐẦU', { size: 8, fill: C.ego })
    ]
    return mode === 'reverse' ? [
      ...base,
      label(160, 13, 'VÍ DỤ LÙI THẲNG LÊN DỐC', { size: 9, anchor: 'middle' }),
      `<g id="slope-reverse">${trail('M160 84L160 36')}</g>`,
      label(218, 72, 'HƯỚNG LÙI', { size: 8, fill: C.ego }),
      note('Không theo tỷ lệ; không có mức nhả phanh chung. Chỉ lùi khi giữ được xe.', 12)
    ] : [
      ...base,
      label(160, 13, 'NGUY CƠ NẾU KHÔNG GIỮ PHANH', { size: 9, fill: C.hazard, anchor: 'middle' }),
      '<g id="slope-roll">',
      `<path d="M160 140L160 163" fill="none" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4" marker-end="url(#slope-roll-tip)"/>`,
      '</g>',
      label(178, 155, 'TRÔI XUỐNG', { size: 8, fill: C.hazard }),
      note('Không theo tỷ lệ; R vẫn có thể trôi xuống. Đạp phanh, không dùng P để dừng.', 12)
    ]
  },
  parallel: mode => {
    const base = [
      rect(0, 0, W, 174, C.asphalt),
      rect(246, 0, 74, 174, C.kerb),
      `<g id="parallel-curb">${line(246, 0, 246, 174, C.bay, 2.4)}</g>`,
      `<g id="parallel-front">${car(226, 44, 0, C.other, 24, 44)}</g>`,
      `<g id="parallel-rear">${car(226, 144, 0, C.other, 24, 44)}</g>`,
      label(260, 88, 'LỀ', { size: 9 }),
      label(260, 102, 'PHẢI', { size: 9 }),
      `<g id="parallel-traffic">${arrow(44, 146, 44, 120)}</g>`,
      label(16, 160, 'CHIỀU ĐI', { size: 8 })
    ]
    const scenes = {
      enter: () => [
        ...base,
        `<g id="parallel-car">${car(166, 44, 0, C.ego, 24, 44)}</g>`,
        label(166, 15, 'ĐẦU', { size: 8, fill: C.ego, anchor: 'middle' }),
        label(146, 65, 'ĐUÔI', { size: 8, fill: C.ego, anchor: 'end' }),
        `<g id="parallel-alignment">${line(178, 66, 214, 66, C.line, 1, '3 3')}</g>`,
        label(16, 27, 'ĐẦU QUÉT TRÁI', { size: 8, fill: C.hazard }),
        line(100, 29, 148, 36, C.hazard, 1),
        label(16, 97, 'HƯỚNG ĐUÔI LÙI', { size: 8, fill: C.ego }),
        line(112, 94, 167, 87, C.line, 1),
        `<g id="parallel-reverse">${trail('M166 70C166 82 183 94 198 104')}</g>`,
        note('Không theo tỷ lệ; chỉ hướng lùi ban đầu, không phải toàn quỹ đạo hay mốc lái chung.')
      ],
      settle: () => [
        ...base,
        `<g id="parallel-car">${car(226, 94, 0, C.ego, 24, 44)}</g>`,
        label(195, 79, 'ĐẦU', { size: 8, fill: C.ego, anchor: 'end' }),
        label(195, 113, 'ĐUÔI', { size: 8, fill: C.ego, anchor: 'end' }),
        '<g id="parallel-end-gaps">',
        line(204, 66, 204, 72, C.accent, 1.4),
        line(201, 66, 207, 66, C.accent, 1.4),
        line(201, 72, 207, 72, C.accent, 1.4),
        line(204, 116, 204, 122, C.accent, 1.4),
        line(201, 116, 207, 116, C.accent, 1.4),
        line(201, 122, 207, 122, C.accent, 1.4),
        '</g>',
        label(16, 48, 'CHỪA CẢ HAI ĐẦU', { size: 8, fill: C.ego }),
        line(124, 46, 204, 69, C.line, 1),
        line(124, 50, 132, 119, C.line, 1),
        line(132, 119, 204, 119, C.line, 1),
        label(92, 150, 'SONG SONG, KHÔNG CHẠM LỀ', { size: 8, fill: C.ego }),
        note('Không theo tỷ lệ; kiểm tra khoảng hở thực tế. Giới hạn sát lề không phải mốc đổi lái.')
      ]
    }
    return (scenes[mode] ?? scenes.enter)()
  },
  alley: mode => {
    const scenes = {
      creep: () => [
        ...creepLot(),
        `<g id="creep-parked-bikes">${bike(128, 48, 0)}${bike(192, 48, 0)}</g>`,
        label(14, 28, 'MÔ TÔ ĐỖ', { size: 8, fill: C.bike }),
        line(80, 30, 125, 39, C.bike, 1),
        label(220, 28, 'MÔ TÔ ĐỖ', { size: 8, fill: C.bike }),
        line(216, 30, 195, 39, C.bike, 1),
        `<g id="creep-forward">${trail('M160 99L160 24')}</g>`,
        label(14, 85, 'HƯỚNG TIẾN ↑', { size: 8, fill: C.ego }),
        tag(16, 166, 'Đi bộ hoặc chậm hơn'),
        note('Không theo tỷ lệ. Chỉ tiến khi nhìn rõ và đủ khoảng hở toàn xe.')
      ],
      'creep-stop': () => [
        ...creepLot(true),
        '<defs><marker id="creep-bike-tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">',
        `<path d="M0 1L9 5L0 9Z" fill="${C.hazard}"/></marker></defs>`,
        `<g id="creep-conflict">${rect(136, 44, 48, 38, C.hazard, 4, 0.18)}</g>`,
        `<g id="creep-crossing-bike">${bike(238, 63, 270, C.hazard)}</g>`,
        '<g id="creep-bike-motion">',
        `<path d="M220 63L160 63" fill="none" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4" marker-end="url(#creep-bike-tip)"/>`,
        '</g>',
        label(216, 31, 'LỐI RA NHÁNH', { size: 8 }),
        label(14, 61, 'VÙNG XUNG ĐỘT', { size: 8, fill: C.hazard }),
        line(94, 64, 133, 64, C.hazard, 1),
        label(14, 129, 'XE ĐANG DỪNG', { size: 8, fill: C.ego }),
        tag(16, 166, 'Giữ phanh, chờ lối đi rõ'),
        note('Không theo tỷ lệ. Dừng trước vùng xung đột; quan sát lại trước khi đi tiếp.')
      ],
      mirror: () => [
        ...mirrorLot(),
        '<g id="mirror-parked-bike"><g transform="translate(218 108) rotate(0)">',
        '<g id="mirror-bike-wheels">',
        rect(-3, -25, 6, 12, C.bike, 2),
        rect(-3, 13, 6, 12, C.bike, 2),
        '</g>',
        rect(-6, -12, 12, 26, C.bike, 4),
        rect(-4, -1, 8, 12, C.kerb, 2),
        rect(-3, -17, 6, 5, C.bay, 1),
        '</g>',
        `<g id="mirror-handlebar">${rect(208, 96, 20, 4, C.bike, 1)}</g></g>`,
        label(246, 62, 'MÔ TÔ ĐỖ', { size: 8, fill: C.bike }),
        line(246, 66, 224, 90, C.bike, 1),
        `<g id="mirror-gap-left">${gap(90, 122, 98, 'a')}</g>`,
        `<g id="mirror-gap-right">${gap(174, 208, 98, 'b')}</g>`,
        label(14, 28, 'TƯỜNG', { size: 8 }),
        label(246, 28, 'TƯỜNG', { size: 8 }),
        label(14, 136, 'GƯƠNG MỞ', { size: 8, fill: C.ego }),
        line(78, 132, 123, 102, C.ego, 1),
        note('Không theo tỷ lệ. a, b: khoảng hở, không phải số đo.', 12)
      ],
      'mirror-stop': () => [
        ...mirrorLot(),
        `<g id="mirror-obstruction">${rect(90, 28, 43, 38, C.other, 2)}</g>`,
        '<g id="mirror-uncertain-gap">',
        line(133, 48, 236, 48, C.hazard, 1.6, '3 3'),
        line(133, 43, 133, 53, C.hazard, 1.6),
        line(236, 43, 236, 53, C.hazard, 1.6),
        '</g>',
        label(184, 40, 'CHƯA RÕ', { size: 8, fill: C.hazard, anchor: 'middle' }),
        label(14, 20, 'TƯỜNG NHÔ', { size: 8 }),
        line(74, 23, 108, 33, C.line, 1),
        label(248, 112, 'XE DỪNG', { size: 8, fill: C.ego }),
        line(240, 108, 178, 108, C.ego, 1),
        label(14, 136, 'GƯƠNG MỞ', { size: 8, fill: C.ego }),
        line(78, 132, 123, 102, C.ego, 1),
        note('Không theo tỷ lệ. Chưa rõ khoảng hở thì dừng; không gập gương để cố lọt.', 12)
      ],
      corner: () => cornerScene(false),
      'corner-risk': () => cornerScene(true),
      yield: () => yieldScene(false),
      'yield-pocket': () => yieldScene(true),
      cutoff: () => cutoffScene(false),
      'cutoff-stop': () => cutoffScene(true)
    }
    return (scenes[mode] ?? scenes.creep)()
  },
  highway: mode => {
    const scenes = {
      merge: () => mergeScene(false),
      'merge-gap': () => mergeScene(true),
      exit: () => exitScene(false),
      'exit-miss': () => exitScene(true),
      signs: () => signsScene(false),
      'signs-speed': () => signsScene(true),
      gap: () => followingScene(false),
      'gap-rain': () => followingScene(true),
      overtake: () => overtakeScene(false),
      'overtake-return': () => overtakeScene(true),
      tailgate: () => tailgaterScene(false),
      'tailgate-let': () => tailgaterScene(true)
    }
    return (scenes[mode] ?? scenes.merge)()
  },
  slope: mode => {
    const scenes = {
      downhill: () => downhillScene(false),
      'downhill-braking': () => downhillScene(true),
      uphill: () => [
        slopeLot(false),
        sideCar(160, 104, -22, C.ego),
        trail('M122 128C150 114 182 96 216 80'),
        tag(16, 56, 'Giữ phanh trước khi sang ga'),
        note('Giữ phanh chân tới khi cảm nhận xe chớm bò lên.')
      ],
      'uphill-hold': () => [
        slopeLot(false),
        sideCar(150, 110, -22, C.ego),
        `<path d="M184 96L150 114" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4" fill="none" marker-end="url(#tip)"/>`,
        tag(16, 56, 'Trôi ngược nếu nhả sớm'),
        note('Xe trôi ngược là do nhả phanh trước khi đủ lực kéo.')
      ],
      engine: () => [
        slopeLot(true),
        sideCar(190, 98, 24, C.ego),
        rect(212, 24, 92, 36, '#25352f', 6),
        label(258, 40, 'LẪY SỐ', { size: 8, anchor: 'middle' }),
        label(258, 53, '− giảm số', { size: 9, fill: C.accent, anchor: 'middle' }),
        note('Kéo lẫy trừ để về số thấp, vòng tua tăng là đúng.')
      ],
      'engine-gear': () => [
        slopeLot(true),
        sideCar(168, 90, 24, C.ego),
        rect(196, 20, 108, 44, '#25352f', 6),
        label(250, 40, 'D → 3 → 2', { size: 11, fill: C.accent, anchor: 'middle', weight: 700 }),
        label(250, 55, 'giảm từng cấp', { size: 8, anchor: 'middle' }),
        note('Giảm từng cấp số, không nhảy thẳng về số thấp nhất.')
      ]
    }
    return (scenes[mode] ?? scenes.downhill)()
  },
  flood: mode => {
    const scenes = {
      cross: () => [
        floodLot(46),
        sideCar(150, 124, 0, C.ego),
        line(58, 134, 58, 178, C.accent, 2),
        label(64, 150, 'Mực nước dưới 25 cm', { size: 9, fill: C.accent }),
        trail('M188 124L266 124'),
        note('Đi số thấp, đều ga, không dừng giữa vùng ngập.')
      ],
      depth: () => [
        floodLot(66),
        sideCar(140, 120, 0, C.hazard),
        line(246, 114, 246, 178, C.hazard, 2),
        label(240, 106, 'Quá nửa bánh xe', { size: 9, fill: C.hazard, anchor: 'end' }),
        `<g stroke="${C.hazard}" stroke-width="3"><path d="M266 128L288 150"/><path d="M288 128L266 150"/></g>`,
        note('Nước ngập quá nửa bánh thì quay đầu, không thử vượt qua.')
      ],
      rain: () => [
        rect(0, 0, W, 180, '#1b2b34'),
        rect(0, 118, W, 62, C.asphalt),
        `<g stroke="#8fc4e8" stroke-width="1.5" opacity=".65"><path d="M30 12L20 42"/><path d="M84 6L74 36"/><path d="M140 14L130 44"/><path d="M196 4L186 34"/><path d="M252 12L242 42"/><path d="M296 8L286 38"/></g>`,
        sideCar(112, 126, 0, C.ego),
        sideCar(254, 126, 0, C.other),
        gap(142, 224, 104, 'Giãn khoảng cách'),
        note('Bật đèn chiếu gần, giảm tốc và tăng khoảng cách khi mưa to.')
      ],
      'rain-stop': () => [
        rect(0, 0, W, 180, '#1b2b34'),
        rect(0, 118, W, 62, C.asphalt),
        rect(0, 150, W, 30, C.kerb),
        sideCar(220, 138, 0, C.ego),
        `<g fill="${C.hazard}"><circle cx="196" cy="126" r="4"/><circle cx="244" cy="126" r="4"/></g>`,
        label(16, 172, 'Đỗ sát lề an toàn · bật đèn cảnh báo', { size: 9 }),
        note('Mưa quá lớn thì tấp vào nơi được phép dừng và bật đèn khẩn.')
      ]
    }
    return (scenes[mode] ?? scenes.cross)()
  }
}

const render = ({ template, mode, title }) => [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="ttl">`,
  `<title id="ttl">${esc(title)}</title>`,
  '<defs><marker id="tip" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">',
  `<path d="M0 1L9 5L0 9Z" fill="${C.accent}"/></marker></defs>`,
  rect(0, 0, W, H, C.bg),
  templates[template](mode).join(''),
  '</svg>\n'
].join('')

// Mỗi thẻ học có 1 sơ đồ chính + 1 sơ đồ biến thể (chuẩn nội dung mục 5.1).
const specs = [
  ['parking-start', 'bay', ['approach', 'Vị trí dừng và hướng lùi minh họa', 'Sơ đồ nhìn từ trên xuống: xe dừng trước ô đỗ; mũi tên chỉ đầu xe và hướng lùi tham khảo.'], ['approach-angle', 'Góc tiếp cận thay đổi', 'Sơ đồ nhìn từ trên xuống: xe ở góc tiếp cận khác; mũi tên chỉ đầu xe và một quỹ đạo lùi minh họa.']],
  ['parking-align', 'bay', ['align', 'Phân biệt song song vạch và khoảng trống hai bên', 'Sơ đồ không theo tỷ lệ: xe lùi vào ô, đầu xe hướng ra lối đi ở dưới; thân song song hai vạch, a và b chỉ khoảng trống từ thân xe tới vạch, không phải mốc đo cố định.'], ['align-mirror', 'Hướng nhìn qua gương, không phải đường xe chạy', 'Sơ đồ nhìn từ trên xuống: đầu xe ở dưới, đuôi ở trên; nét đứt từ hai gương hướng về vạch phía sau chỉ minh họa hướng nhìn, không mô tả đầy đủ vùng thấy hay thay thế quan sát trực tiếp.']],
  ['parking-correct', 'bay', ['correct', 'Dừng để phân biệt thân nghiêng và lệch ngang', 'Sơ đồ không theo tỷ lệ: xe đang dừng, thân nghiêng so với trục ô; đuôi ở trên, đầu hướng xuống lối đi qua cửa ô mở. Nét đứt là trục ô, không phải đường xe chạy; không có mũi tên chuyển động.'], ['correct-out', 'Một đoạn tiến minh họa, không phải toàn bộ cách sửa', 'Sơ đồ không theo tỷ lệ, cùng vị trí xe đang nghiêng: đầu xe ở dưới, mũi tên thẳng hướng về phía trước qua cửa ô mở. Chỉ tiến khi đã nhường người và xe, quan sát rõ khoảng trống; không quy định quãng tiến hay hướng đánh lái cho mọi xe. Dừng hẳn trước đổi chiều.']],
  ['parking-parallel', 'parallel', ['enter', 'Ví dụ tiếp cận lề phải và hướng đuôi lùi ban đầu, không phải toàn quỹ đạo', 'Sơ đồ không theo tỷ lệ, đầu các xe hướng lên, lề phải ở bên phải hình; xe mình bên trái xe trước, hai đuôi ngang nhau chỉ là ví dụ. Mũi tên cong từ sau đuôi xe chỉ hướng lùi ban đầu xuống và sang phải về lề; đầu xe quét trái. Mũi tên thẳng bên trái chỉ chiều đi, không phải hướng lùi.'], ['settle', 'Ví dụ xe song song lề phải, chừa khoảng hở hai đầu; không phải mốc đo', 'Sơ đồ không theo tỷ lệ: xe mình hướng đầu lên, song song lề phải ở bên phải hình, có khoảng hở với lề và cả xe trước, xe sau. Dấu ngoặc chỉ khoảng hở hai đầu, không phải số đo. Mũi tên bên trái chỉ chiều đi; xe đã đỗ không có mũi tên chuyển động.']],
  ['parking-slope', 'slopeParking', ['reverse', 'Ví dụ lùi thẳng lên dốc tại ô được phép, không phải đường dốc ra vào hầm', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: phía cao ở trên, thấp ở dưới; đầu xe hướng xuống, đuôi hướng lên. Mũi tên xám bên trái chỉ chiều dốc xuống; mũi tên xanh từ sau đuôi hướng lên vào cửa ô mở chỉ hướng lùi lên dốc, không phải quỹ đạo đánh lái hay mức nhả phanh chung.'], ['hold', 'Nguy cơ trôi xuống dốc về phía đầu xe dù đã cài R', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ, cùng vị trí xe và hướng dốc: cao ở trên, thấp ở dưới, đầu xe ở dưới. Mũi tên xám bên trái chỉ dốc xuống; mũi tên đỏ nét đứt trước đầu xe chỉ nguy cơ trôi xuống nếu không giữ phanh, ngược hướng lùi lên dốc ở hình chính; không phải lệnh tiến hay trạng thái đã đỗ an toàn. Đạp phanh để dừng, không dùng P khi xe đang chuyển động.']],
  ['parking-lowlight', 'bay', ['lowlight', 'Đèn hướng trước và sau khác nhau; chỉ lùi khi thấy rõ', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: đầu xe hướng xuống lối đi, đuôi hướng lên cửa ô mở. Vệt vàng trước đầu xe minh họa đèn chiếu gần; vệt nhạt sau đuôi minh họa đèn lùi, không phải phạm vi nhìn rõ hay vùng cảm biến. Mũi tên xanh từ sau đuôi hướng thẳng lên ô chỉ một hướng lùi minh họa, không là chỉ dẫn đánh lái cho mọi vị trí.'], ['lowlight-mirror', 'Xe dừng, người hướng dẫn ở bên ngoài đường xe chạy', 'Sơ đồ không theo tỷ lệ, cùng hướng xe và cửa ô mở: xe đang dừng, người hỗ trợ đứng bên phải hình, ngoài hành lang lùi thẳng minh họa, không giữa xe và vật cản. Nét đứt nối bên xe với người hỗ trợ chỉ liên lạc trong tầm nhìn, không phải quỹ đạo hay vùng quan sát bảo đảm. Vị trí thực tế phải tránh cả vùng đầu xe quét, luôn nhìn thấy nhau; mất liên lạc thì dừng ngay. Không có mũi tên chuyển động.']],
  ['parking-column', 'bay', ['column', 'Ví dụ lùi thẳng cạnh cột, không phải toàn bộ quỹ đạo vào ô', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: cột bên phải hình, cạnh cửa ô mở; đầu xe ở dưới, đuôi ở trên. Xe đã thẳng hướng, mũi tên từ sau đuôi hướng lên ô chỉ ví dụ lùi thẳng, không phải hướng đánh lái hay bảo đảm khoảng hở. Phải kiểm tra cả thân, gương, góc xe, hai bên và vùng đầu xe quét; chưa rõ thì dừng, không chờ cảm biến.'], ['column-gap', 'Xe đã giữ chắc; kiểm tra cửa lái và lối ra, không chỉ thân xe', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ, cùng ô và cột bên phải hình: xe đã giữ chắc, nằm trong vạch, đầu ở dưới và đuôi ở trên. Với xe tay lái trái minh họa, cửa lái ở bên phải hình; cung vàng cạnh cột chỉ khoảng quét một cánh cửa trước minh họa, không phải quỹ đạo xe hay khoảng mở bảo đảm. Kiểm tra cả hai bên, khoảng quét cửa thực tế, người xung quanh và lối ra; không chen giữa xe với cột. Không có mũi tên chuyển động.']],
  ['narrow-creep', 'alley', ['creep', 'Chỉ tiến khi nhìn rõ và đủ khoảng hở cả gương', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: đầu xe ở trên, đuôi ở dưới, gương nhô hai bên; hai mô tô đang đỗ sát mép phía trước. Mũi tên xanh từ trước đầu xe hướng lên chỉ hướng tiến minh họa, không phải điểm nhìn hay bảo đảm xe lọt. Đi bộ hoặc chậm hơn, chỉ tiến khi quan sát rõ và đủ khoảng hở toàn xe.'], ['creep-stop', 'Xe dừng trước vùng xe máy từ nhánh bên phải cắt ngang', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ, cùng hướng xe: đầu ở trên, đuôi ở dưới. Xe mình đang dừng trước vùng xung đột tô đỏ, không có mũi tên chuyển động của xe mình. Xe máy hướng sang trái từ lối mở bên phải; mũi tên đỏ nét đứt chỉ hướng xe máy cắt ngang, không phải lệnh đánh lái. Giữ phanh, chờ lối đi rõ và quan sát lại trước khi đi tiếp.']],
  ['narrow-mirror', 'alley', ['mirror', 'Khoảng hở từ mép gương tới vật cản, không phải số đo hay hình phản chiếu', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: đầu xe hướng lên, đuôi ở dưới, hai gương mở nhô ngoài thân; mô tô đỗ bên phải có tay lái nhô ra. a nối tường trái với mép ngoài gương trái, b nối mép ngoài gương phải với mép gần nhất tay lái tại cùng mặt cắt; không phải số đo, mức hở an toàn chung hay vùng nhìn thấy trong gương. Không có mũi tên chuyển động.'], ['mirror-stop', 'Dừng trước chỗ tường nhô khi chưa rõ khoảng hở; không gập gương để cố lọt', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: cùng xe đầu hướng lên, hai gương vẫn mở; xe đang dừng trước đoạn tường trái nhô vào lối đi. Nét đứt đỏ ngang đoạn thắt chỉ khoảng hở chưa rõ, không phải hướng xe chạy hay bằng chứng xe lọt. Không có mũi tên tiến, lùi hoặc gập gương; chỉ đi tiếp sau khi kiểm tra rõ và đủ khoảng hở toàn xe.']],
  ['narrow-corner', 'alley', ['corner', 'Ví dụ rẽ phải: bánh sau phía trong đi hẹp hơn bánh trước', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: xe con có gương mở, đầu hướng lên rồi tiến rẽ phải trong lối hình chữ L. Vệt xanh có mũi tên là bánh trước phải, vệt vàng có mũi tên là bánh sau phải của cùng xe; bánh sau đi phía trong. Chỉ minh họa một đoạn cung quay, không phải toàn bộ vùng quét thân, gương, đầu đuôi xe, mốc đánh lái hay bảo đảm xe thực tế quay lọt.'], ['corner-risk', 'Xe dừng trước nguy cơ bánh sau cắt góc, không tự lùi ở góc khuất', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ, cùng góc tường: xe có gương mở đang dừng khi đầu hướng chéo lên phải, thân chưa chạm tường. Nét đỏ đứt dự báo bánh sau phải nếu cố tiến theo cung quay hiện tại, giao chân tường tại dấu X; không phải lệnh đi hay đường lùi. Chưa rõ khoảng hở thì giữ xe, quan sát lại và gọi hỗ trợ; không tự lùi ở góc khuất.']],
  ['narrow-yield', 'alley', ['yield', 'Hai xe dừng đánh giá; chỗ tránh phía trước bên phải xe bạn, không mặc định phải lùi.', 'Sơ đồ không theo tỷ lệ trên nền bằng: xe bạn màu xanh hướng lên, xe đối diện hướng xuống, cả hai dừng; chỗ tránh mở về phía trước bên phải xe bạn. Không vẽ quỹ đạo đánh lái.'], ['yield-pocket', 'Xe bạn giữ yên trong chỗ tránh; chờ hết xe và người, kiểm tra lại trước khi ra.', 'Sơ đồ không theo tỷ lệ: toàn xe bạn và gương nằm trong chỗ tránh bên phải, đầu hướng lên và đang dừng; xe đối diện hướng xuống với mũi tên cùng chiều. Hai trạng thái không phải quỹ đạo bảo đảm xe lọt.']],
  ['narrow-cutoff', 'alley', ['cutoff', 'Dừng trước vùng xe máy cắt ngang tại ngã ba, không nhô đầu dò vùng khuất', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: ngõ nhánh từ dưới nối đường chính hai chiều ở trên. Đầu ô tô hướng lên, gương mở; xe đang dừng trước vùng cắt ngang tô đỏ, không có mũi tên chuyển động của ô tô. Xe máy hướng sang phải trên phần đường gần miệng ngõ; mũi tên đỏ nét đứt chỉ hướng xe máy, không phải lệnh đánh lái hay khoảng cách phanh bảo đảm.'], ['cutoff-stop', 'Một xe vừa qua: vẫn giữ xe, kiểm tra xe đi tiếp và cả hai hướng', 'Sơ đồ không theo tỷ lệ, cùng ngã ba và vị trí ô tô đang dừng, đầu hướng lên. Xe máy đầu đã sang phải qua miệng ngõ nhưng còn xe đi tiếp từ trái và xe từ hướng đối diện trên phần đường xa hơn. Các mũi tên đỏ nét đứt khớp hướng đầu xe máy; ô tô không có mũi tên chuyển động. Giữ xe, quan sát lại cả hai hướng và người qua đường; không có mốc một thân xe máy hay khoảng trống bảo đảm để đi.']],
  ['highway-merge', 'highway', ['merge', 'Từ làn tăng tốc bên phải, chỉ nhập một làn khi đủ hở', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: các xe hướng đầu sang phải; làn tăng tốc nằm dưới làn sát bên phải cao tốc và thu hẹp ở cuối. Mũi tên xanh từ trước đầu xe mình đi qua vạch đứt vào đúng làn sát bên phải, không sang làn trái; xe trên làn chính có quyền ưu tiên. Đây là hướng nhập minh họa, không phải quỹ đạo hoặc khoảng cách bảo đảm.'], ['merge-gap', 'Sau khi nhập cần đủ khoảng hở cả trước và sau, xét tốc độ tương đối', 'Sơ đồ không theo tỷ lệ: ba xe cùng hướng sang phải trên làn sát bên phải cao tốc; xe mình ở giữa. Hai ngoặc nét đứt đo khoảng hở từ đầu xe sau tới đuôi xe mình và từ đầu xe mình tới đuôi xe trước, không phải mũi tên chuyển động hay mốc giây cố định. Hình không chứng minh khe an toàn; cần xét xe sau đến gần nhanh, không ép xe khác phanh gấp hoặc đánh lái tránh.']],
  ['highway-exit', 'highway', ['exit', 'Từ làn phải vào làn giảm tốc qua vạch đứt, chỉ khi đủ khoảng hở', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: xe mình hướng đầu sang phải trong làn sát bên phải cao tốc. Mũi tên xanh từ trước đầu xe đi qua vạch đứt xuống làn giảm tốc bên phải, ổn định trước nhánh ra; đường nhánh và chiều đi nối liền, vùng gạch chéo nằm giữa nhánh và làn chính sau đoạn được phép vào. Đây không phải quỹ đạo lái chính xác hay mốc khoảng cách, tốc độ; vẫn giảm tốc hoặc phanh sớm khi có nguy hiểm, kể cả trên làn chính.'], ['exit-miss', 'Đã quá đoạn được phép vào: giữ làn đi tiếp, không cắt vùng gạch chéo', 'Sơ đồ không theo tỷ lệ: xe mình hướng đầu sang phải, đã qua đoạn vạch đứt vào lối ra. Mũi tên xanh đi thẳng trong làn chính tới lối ra phù hợp tiếp theo. Nét đỏ cắt qua vạch liền và vùng gạch chéo sang nhánh ra bị dấu X đỏ cấm, không phải hướng nên đi. Không lùi, quay đầu, dừng để quay lại hoặc dùng làn dừng khẩn cấp hay lề đường; nếu đã vào đường nhánh thì tiếp tục theo biển, không cắt ngược về làn chính.']],
  ['highway-signs', 'highway', ['signs', 'Nhận diện tối đa và tối thiểu có điều kiện, không phải lệnh đổi làn', 'Bảng nhận diện minh họa, không theo tỷ lệ hay mô tả cách đặt biển: vòng đỏ nền trắng số đen 80 là tối đa 80 km/h; vòng xanh lam số trắng 60 là tối thiểu 60 km/h khi giao thông thuận lợi và an toàn. Gặp nguy hiểm cần giảm tốc, kể cả dưới mức tối thiểu. Phía dưới là xe hướng đầu sang phải và mũi tên đi thẳng trên mặt đường, không phải quỹ đạo chuyển làn.'], ['signs-speed', 'Giảm tốc trước vị trí giới hạn mới có hiệu lực, không chờ qua biển', 'Ví dụ riêng nhìn từ trên xuống, không theo tỷ lệ: xe hướng đầu sang phải, còn ở trước biển tối đa 60 km/h, không có biển phụ. Nét dọc mảnh nối vị trí biển với đường chỉ vị trí hiệu lực, không phải vạch đường hay lệnh dừng. Vùng sáng bên phải bắt đầu tại vị trí này: không vượt 60 từ đây, vẫn chậm hơn nếu cần an toàn. Mũi tên đi thẳng khớp đầu xe; giảm tốc êm từ sớm, không có quãng phanh hoặc tốc độ cao tốc chung được bảo đảm.']],
  ['highway-gap', 'highway', ['gap', 'Đếm đủ giây qua cùng mốc; vẫn theo biển và cự ly quy định', 'Hai thời điểm nhìn từ trên xuống, không theo tỷ lệ: xe mình màu xanh và xe trước màu xám cùng làn, đầu và mũi tên hướng sang phải. Nét dọc vàng là cùng một mốc cố định bên đường, không phải vạch dừng. Bắt đầu khi đuôi xe trước ngang mốc ở hình trên; kết thúc khi đầu xe mình ngang mốc ở hình dưới. Ít nhất ba giây chỉ là tham khảo khi khô, thuận lợi; vẫn giữ cự ly theo biển, tốc độ và điều kiện. Dấu ngoặc chỉ cự ly giữa hai cản xe, không quy đổi độ dài hình thành giây hay mét.'], ['gap-rain', 'Mưa: từ mốc ba giây khô tăng ít nhất sáu giây, có thể cần hơn', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: mưa, hai xe cùng làn hướng sang phải; xe mình màu xanh theo sau xe xám, dấu ngoặc từ đầu xe mình đến đuôi xe trước minh họa cự ly tăng, không phải quãng phanh hay số mét. Từ mốc ba giây khô tăng ít nhất sáu giây khi ướt, có thể cần hơn; tuân thủ cự ly lớn hơn biển hoặc bảng trong điều kiện xấu và giảm tốc theo độ bám, tầm nhìn. Sáu giây không bảo đảm an toàn.']],
  ['highway-overtake-truck', 'highway', ['overtake', 'Đủ điều kiện mới qua trái, không vượt giới hạn tốc độ', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: hai làn cùng chiều sang phải, xe tải có ca-bin ở đầu bên phải nằm trọn làn phải. Xe mình màu xanh ở sau xe tải; mũi tên từ đầu xe chuyển qua vạch đứt sang làn trái rồi đi thẳng. Vùng cam trước, sau và hai bên xe tải chỉ minh họa điểm mù thay đổi theo xe và gương, không phải ranh giới chính xác hoặc vùng ngoài đó chắc chắn được nhìn thấy. Chỉ đi khi được phép, đủ hở và không vượt giới hạn tốc độ; đường vẽ không phải quỹ đạo lái chính xác.'], ['overtake-return', 'Đủ cự ly trước sau, báo hiệu và kiểm tra lại mới về phải', 'Thời điểm sau riêng biệt nhìn từ trên xuống, không theo tỷ lệ: xe mình đã đi hẳn lên trước trong làn trái; xe tải nằm trong làn phải, cả hai hướng đầu sang phải. Mũi tên từ đầu xe mình qua vạch đứt rồi đi thẳng giữa làn phải, không ra lề. Dấu ngoặc hở sau nối theo phương dọc từ đầu xe tải đến đuôi xe mình, không phải số mét, giây hay khoảng cách được bảo đảm. Sơ đồ không chứng minh tầm nhìn trong gương: thấy toàn bộ xe tải trong gương trong chỉ hỗ trợ; còn phải đủ cự ly với xe trước, khoảng hở sau theo tốc độ tương đối, báo hiệu và kiểm tra lại gương, điểm mù phải trước khi về làn.']],
  ['highway-tailgater', 'highway', ['tailgate', 'Giãn trước êm, không phanh cảnh cáo; vẫn phanh khi nguy hiểm', 'Sơ đồ nhìn từ trên xuống, không theo tỷ lệ: hai làn cùng chiều sang phải. Xe mình màu xanh ở giữa làn trái, xe sau màu cam bám sát cùng làn, xe trước màu xám ở xa hơn phía trước. Ngoặc cam nối đầu xe sau đến đuôi xe mình là tình huống nguy hiểm, không phải cự ly chuẩn; ngoặc xanh nối đầu xe mình đến đuôi xe trước nhắc tăng khoảng trống phía trước êm theo biển, tốc độ và điều kiện, không phải số mét hay giây bảo đảm. Không phanh cảnh cáo, nhưng vẫn phanh cần thiết khi có nguy hiểm tức thời.'], ['tailgate-let', 'Chỉ nhường một làn phải khi được phép và an toàn; chưa đủ hở thì giữ làn', 'Thời điểm chuẩn bị riêng biệt nhìn từ trên xuống, không theo tỷ lệ: xe mình màu xanh và xe bám sau màu cam vẫn nằm trọn trong làn trái, cả hai hướng đầu sang phải. Mũi tên từ đầu xe mình qua vạch đứt sang làn phải ở phía dưới và kết thúc thẳng trong làn, không ra lề. Đây chỉ là phương án có điều kiện, không phải quỹ đạo lái chính xác hay bằng chứng làn nhận an toàn: cần được phép, báo hiệu sớm, kiểm tra gương, điểm mù phải và đủ hở trước, sau, hai bên, xét cả xe đang đi lên bên phải. Nếu đã ở làn phải ngoài cùng hoặc chưa an toàn thì giữ làn, không dùng làn dừng khẩn cấp hay lề để nhường.']],
  ['weather-downhill', 'slope', ['downhill', 'Giảm tốc trước dốc; chọn chế độ theo xe và độ bám', 'Sơ đồ nhìn ngang, không theo tỷ lệ: phía cao bên trái, thấp bên phải; đầu xe có đèn ở bên phải, đuôi bên trái, hai bánh tiếp xúc mặt dốc. Mũi tên xanh phía trước xe đi sang phải và xuống, song song mặt đường, chỉ chiều tiến xuống dốc, không phải quỹ đạo hay độ dốc đo được. Giảm tốc trước dốc, dùng chế độ theo sách xe và giới hạn trên đường trơn; không có cấp số chung cho mọi xe.'], ['downhill-braking', 'Phanh thường khác phanh khẩn cấp với ABS, không theo nhịp cố định', 'Sơ đồ hai khung chữ, không phải biểu đồ thời gian, lực phanh hay chu kỳ đạp nhả: khung trên mô tả phanh thường tăng lực êm khi cần, nhả khi đã giảm đủ và vẫn kiểm soát tốc độ; không rà suốt dốc hoặc nhấp theo nhịp. Khung dưới mô tả khẩn cấp với ABS: đạp mạnh, giữ lực, không nhấp nhả, lái tránh trong khoảng trống an toàn; ABS không bảo đảm dừng ngắn hơn.']],
  ['weather-uphill-start', 'slope', ['uphill', 'Khởi hành ngang dốc', 'Sơ đồ cắt ngang: xe khởi hành trên đoạn dốc lên.'], ['uphill-hold', 'Trôi ngược khi nhả sớm', 'Sơ đồ cắt ngang: hướng trôi ngược khi nhả phanh quá sớm trên dốc.']],
  ['weather-engine-brake', 'slope', ['engine', 'Lẫy số sau vô-lăng', 'Sơ đồ cắt ngang: vị trí lẫy số dùng để hãm tốc bằng động cơ.'], ['engine-gear', 'Giảm số từng cấp', 'Sơ đồ cắt ngang: trình tự giảm số D về 3 rồi về 2 khi đổ đèo.']],
  ['weather-flood-cross', 'flood', ['cross', 'Qua điểm ngập nông', 'Sơ đồ cắt ngang: xe đi qua vùng ngập dưới 25 cm với tốc độ đều.'], ['depth', 'Mức ngập phải quay đầu', 'Sơ đồ cắt ngang: mức nước ngập quá nửa bánh xe, cần quay đầu.']],
  ['weather-heavy-rain', 'flood', ['rain', 'Mưa lớn, tầm nhìn kém', 'Sơ đồ cắt ngang: hai xe giãn khoảng cách khi trời mưa lớn.'], ['rain-stop', 'Tấp vào lề an toàn', 'Sơ đồ cắt ngang: xe tấp vào lề và bật đèn cảnh báo khi mưa quá lớn.']]
]

const checksum = value => `sha256-${createHash('sha256').update(value, 'utf8').digest('hex')}`
const sizeKb = value => Math.round((Buffer.byteLength(value, 'utf8') / 1024) * 100) / 100

if (existsSync(outDir)) readdirSync(outDir).filter(file => file.endsWith('.svg')).forEach(file => rmSync(join(outDir, file)))
mkdirSync(outDir, { recursive: true })

const assets = []
for (const [cardId, template, main, variant] of specs) {
  for (const [role, spec] of [['main', main], ['variant', variant]]) {
    const [mode, caption, alt] = spec
    const id = `${cardId}-${role === 'main' ? 'main' : 'var'}`
    const svg = render({ template, mode, title: alt })
    writeFileSync(join(outDir, `${id}.svg`), svg, 'utf8')
    assets.push({
      id,
      cardId,
      role,
      type: 'svg-diagram',
      url: `/content/svg/${id}.svg`,
      width: W,
      height: H,
      sizeKb: sizeKb(svg),
      checksum: checksum(svg),
      offlinePack: 'core',
      caption,
      alt
    })
  }
}

const manifest = {
  contentVersion: CONTENT_VERSION,
  generator: 'scripts/generate-assets.mjs',
  license: 'Tài sản tự tạo cho dự án Lái Xe Nhàn.',
  totalSizeKb: Math.round(assets.reduce((sum, asset) => sum + asset.sizeKb, 0) * 100) / 100,
  assets
}

writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`Đã tạo ${assets.length} sơ đồ SVG (${manifest.totalSizeKb} KB) trong public/content/svg`)
