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
const CONTENT_VERSION = '2026.10.11'

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

const highwayLot = (lanes = 3) => {
  const parts = [rect(0, 0, W, 180, C.kerb), rect(0, 30, W, lanes * 38, C.asphalt)]
  for (let i = 1; i < lanes; i += 1) parts.push(line(0, 30 + i * 38, W, 30 + i * 38, C.bay, 1.8, '14 12'))
  parts.push(line(0, 30, W, 30, C.bay, 2.4))
  parts.push(line(0, 30 + lanes * 38, W, 30 + lanes * 38, C.bay, 2.4))
  return parts.join('')
}

const slopeLot = (down = true) => {
  const ridge = down ? 'M0 70L120 70L300 150L320 150' : 'M0 150L20 150L200 66L320 66'
  return [
    rect(0, 0, W, 180, '#1d2a26'),
    `<path d="${ridge}L320 180L0 180Z" fill="${C.asphalt}"/>`,
    `<path d="${ridge}" stroke="${C.bay}" stroke-width="2.4" fill="none"/>`
  ].join('')
}

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
      cutoff: () => [
        alleyLot(120),
        car(160, 128, 0, C.ego),
        bike(118, 82, 44, C.hazard),
        `<path d="M120 86C136 94 148 100 154 106" stroke="${C.hazard}" stroke-width="2.2" stroke-dasharray="4 4" fill="none" marker-end="url(#tip)"/>`,
        cone(160, 106, 0, 32, 54),
        note('Xe máy tạt đầu bên trái: nhả ga, rà phanh, không đánh lái gấp.')
      ],
      'cutoff-stop': () => [
        alleyLot(120),
        car(160, 132, 0, C.ego),
        bike(178, 66, 0),
        gap(144, 176, 100, 'Một thân xe máy'),
        note('Dừng thẳng bánh, chờ xe máy đi hết rồi mới đi tiếp.')
      ]
    }
    return (scenes[mode] ?? scenes.creep)()
  },
  highway: mode => {
    const scenes = {
      merge: () => [
        highwayLot(),
        `<path d="M0 170L120 122L320 122" fill="none" stroke="${C.bay}" stroke-width="2" stroke-dasharray="10 8"/>`,
        car(60, 152, 68, C.ego),
        car(214, 60, 90, C.other),
        car(118, 98, 90, C.other),
        trail('M92 136C130 118 162 108 206 102'),
        tag(16, 166, 'Tăng tốc bằng dòng xe'),
        note('Tăng tốc dứt khoát trong làn nhập, không dừng giữa làn.')
      ],
      'merge-gap': () => [
        highwayLot(),
        car(140, 98, 90, C.ego),
        car(252, 98, 90, C.other),
        car(50, 98, 90, C.other),
        gap(166, 228, 82, 'Trống 3 giây'),
        note('Chỉ chuyển làn khi khoảng trống đủ ba giây.')
      ],
      exit: () => [
        highwayLot(),
        `<path d="M200 144L320 176" fill="none" stroke="${C.bay}" stroke-width="2" stroke-dasharray="10 8"/>`,
        rect(226, 6, 82, 20, '#2f6b3f', 3),
        label(267, 20, 'LỐI RA 500m', { size: 8, fill: '#d8ffd0', anchor: 'middle' }),
        car(120, 136, 90, C.ego),
        trail('M146 140C190 146 240 160 288 172'),
        note('Về làn phải sớm 1 km, giảm tốc sau khi vào làn giảm tốc.')
      ],
      'exit-miss': () => [
        highwayLot(),
        car(150, 98, 90, C.ego),
        `<path d="M176 104L244 148" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4" fill="none"/>`,
        `<g stroke="${C.hazard}" stroke-width="3"><path d="M244 126L268 150"/><path d="M268 126L244 150"/></g>`,
        tag(16, 166, 'Không cắt ngang gấp'),
        note('Lỡ lối ra thì đi tiếp tới nút kế, tuyệt đối không lùi.')
      ],
      signs: () => [
        highwayLot(),
        rect(28, 4, 88, 24, '#2a4b8d', 3),
        label(72, 20, 'GỘP LÀN', { size: 8.5, fill: '#dce7ff', anchor: 'middle' }),
        `<circle cx="204" cy="16" r="13" fill="#f4f6f2"/><circle cx="204" cy="16" r="11" fill="none" stroke="#d33" stroke-width="3"/>`,
        label(204, 20, '80', { size: 10, fill: '#1b1b1b', anchor: 'middle', weight: 700 }),
        car(118, 98, 90, C.ego),
        trail('M144 104C178 104 208 114 244 130'),
        note('Đọc biển sớm, giảm tốc trước vạch rồi mới nhập làn.')
      ],
      'signs-speed': () => [
        highwayLot(),
        `<circle cx="78" cy="16" r="13" fill="#f4f6f2"/><circle cx="78" cy="16" r="11" fill="none" stroke="#d33" stroke-width="3"/>`,
        label(78, 20, '60', { size: 10, fill: '#1b1b1b', anchor: 'middle', weight: 700 }),
        car(206, 98, 90, C.ego),
        gap(110, 190, 82, 'Giảm tốc trước biển'),
        note('Tốc độ đổi theo biển gần nhất, không đi theo trí nhớ.')
      ],
      gap: () => [
        highwayLot(),
        car(88, 98, 90, C.ego),
        car(252, 98, 90, C.other),
        gap(116, 226, 82, '3 giây'),
        label(16, 166, 'Đếm 1-2-3 khi xe trước qua cột mốc', { size: 9 }),
        note('Đếm ba nhịp từ lúc xe trước qua một mốc cố định.')
      ],
      'gap-rain': () => [
        highwayLot(),
        rect(0, 0, W, 180, '#1a2c3a', 0, 0.35),
        `<g stroke="#8fc4e8" stroke-width="1.4" opacity=".6"><path d="M40 10L30 32"/><path d="M112 6L102 28"/><path d="M188 12L178 34"/><path d="M264 4L254 26"/></g>`,
        car(68, 98, 90, C.ego),
        car(262, 98, 90, C.other),
        gap(96, 236, 82, 'Mưa: 4–5 giây'),
        note('Trời mưa thì nhân đôi khoảng cách và bật đèn chiếu gần.')
      ],
      overtake: () => [
        highwayLot(),
        car(150, 138, 90, C.truck, 30, 74),
        car(88, 98, 90, C.ego),
        trail('M114 96C150 88 202 88 242 96'),
        tag(16, 166, 'Vượt bên trái, không tạt đầu'),
        note('Chỉ vượt bên trái khi thấy rõ đầu xe tải trong gương.')
      ],
      'overtake-return': () => [
        highwayLot(),
        car(96, 138, 90, C.truck, 30, 74),
        car(232, 98, 90, C.ego),
        trail('M250 106C268 120 274 130 276 140'),
        gap(140, 218, 82, 'Thấy cả đầu xe tải'),
        note('Về làn phải khi đã thấy đầu xe tải trong gương trong.')
      ],
      tailgate: () => [
        highwayLot(),
        car(182, 98, 90, C.ego),
        car(120, 98, 90, C.hazard),
        gap(146, 156, 82, 'Quá gần'),
        note('Bị bám đuôi thì giữ đều tốc độ và tăng khoảng cách phía trước.')
      ],
      'tailgate-let': () => [
        highwayLot(),
        car(150, 136, 90, C.ego),
        car(184, 98, 90, C.other),
        trail('M176 130C198 130 222 126 248 120'),
        tag(16, 166, 'Nhường làn cho xe sau'),
        note('Chuyển sang làn phải khi an toàn để xe sau vượt.')
      ]
    }
    return (scenes[mode] ?? scenes.merge)()
  },
  slope: mode => {
    const scenes = {
      downhill: () => [
        slopeLot(true),
        sideCar(196, 100, 24, C.ego),
        trail('M150 92C180 104 212 120 252 140'),
        tag(16, 56, 'Số thấp L hoặc 2'),
        note('Chọn số thấp từ đầu dốc để động cơ hãm bớt tốc độ.')
      ],
      'downhill-pulse': () => [
        slopeLot(true),
        sideCar(178, 92, 24, C.ego),
        `<g fill="${C.accent}"><circle cx="232" cy="120" r="4"/><circle cx="252" cy="130" r="4"/><circle cx="272" cy="140" r="4"/></g>`,
        label(150, 170, 'Phanh ngắt quãng · nhả · lặp lại', { size: 9 }),
        note('Phanh từng nhịp ngắn thay vì rà phanh liên tục.')
      ],
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
  ['narrow-cutoff', 'alley', ['cutoff', 'Xe máy tạt đầu', 'Sơ đồ nhìn từ trên xuống: xe máy cắt chéo trước đầu xe trong hẻm.'], ['cutoff-stop', 'Giữ khoảng trống phía trước', 'Sơ đồ nhìn từ trên xuống: khoảng trống một thân xe máy phía trước đầu xe.']],
  ['highway-merge', 'highway', ['merge', 'Nhập làn từ làn tăng tốc', 'Sơ đồ nhìn từ trên xuống: quỹ đạo nhập làn từ làn tăng tốc vào làn phải cao tốc.'], ['merge-gap', 'Chọn khoảng trống ba giây', 'Sơ đồ nhìn từ trên xuống: khoảng trống ba giây giữa hai xe trên làn chính.']],
  ['highway-exit', 'highway', ['exit', 'Thoát làn đúng lối ra', 'Sơ đồ nhìn từ trên xuống: quỹ đạo vào làn giảm tốc trước lối ra cao tốc.'], ['exit-miss', 'Lỡ lối ra', 'Sơ đồ nhìn từ trên xuống: thao tác cắt ngang gấp bị gạch bỏ khi lỡ lối ra.']],
  ['highway-signs', 'highway', ['signs', 'Biển gộp làn', 'Sơ đồ nhìn từ trên xuống: biển báo gộp làn và quỹ đạo nhập làn tương ứng.'], ['signs-speed', 'Biển đổi tốc độ', 'Sơ đồ nhìn từ trên xuống: biển giới hạn tốc độ 60 km/h và quãng giảm tốc trước biển.']],
  ['highway-gap', 'highway', ['gap', 'Khoảng cách ba giây', 'Sơ đồ nhìn từ trên xuống: cách đếm ba giây so với xe phía trước.'], ['gap-rain', 'Khoảng cách khi trời mưa', 'Sơ đồ nhìn từ trên xuống: khoảng cách bốn đến năm giây khi mặt đường ướt.']],
  ['highway-overtake-truck', 'highway', ['overtake', 'Vượt xe tải bên trái', 'Sơ đồ nhìn từ trên xuống: quỹ đạo vượt xe tải bằng làn bên trái.'], ['overtake-return', 'Thời điểm về làn', 'Sơ đồ nhìn từ trên xuống: thời điểm về làn phải khi đã thấy đầu xe tải trong gương.']],
  ['highway-tailgater', 'highway', ['tailgate', 'Bị xe sau bám đuôi', 'Sơ đồ nhìn từ trên xuống: xe phía sau bám sát đuôi ở khoảng cách nguy hiểm.'], ['tailgate-let', 'Nhường đường cho xe sau', 'Sơ đồ nhìn từ trên xuống: chuyển sang làn phải để xe bám đuôi vượt lên.']],
  ['weather-downhill', 'slope', ['downhill', 'Đổ dốc dài', 'Sơ đồ cắt ngang: xe xuống dốc dài với số thấp.'], ['downhill-pulse', 'Phanh theo nhịp', 'Sơ đồ cắt ngang: các nhịp phanh ngắt quãng khi đổ dốc.']],
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
