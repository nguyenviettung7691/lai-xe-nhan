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
const CONTENT_VERSION = '2026.09.1'

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

const note = value => {
  const lines = wrapNote(value)
  const height = lines.length * 10 + 6
  const top = H - height
  return (
    rect(0, top, W, height, C.kerb, 0, 0.92) +
    lines.map((text, index) => label(16, top + 11 + index * 10, text, { size: 8.8 })).join('')
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

const templates = {
  bay: mode => {
    const scenes = {
      approach: () => [
        bayLot(2),
        car(250, 132, 90, C.ego),
        trail('M236 120C214 96 206 84 200 70'),
        pin(190, 104, '1'),
        tag(196, 150, 'Vai xe ngang mép ô'),
        note('Dừng khi vai xe ngang mép ô đỗ, giữ cách 1 cánh tay.')
      ],
      'approach-angle': () => [
        bayLot(2),
        car(254, 140, 72, C.ego),
        trail('M238 126C216 104 204 86 198 70', C.accent, '5 5'),
        cone(254, 128, 200, 20, 52),
        pin(212, 118, '2'),
        note('Góc vào hẹp thì lùi chậm và sửa lái từng nhịp nhỏ.')
      ],
      align: () => [
        bayLot(2),
        car(196, 56, 180, C.ego),
        gap(160, 182, 78, '40 cm'),
        gap(210, 232, 78, '40 cm'),
        pin(196, 112, '✓'),
        note('Hai bên đều khoảng cách, thân xe song song vạch.')
      ],
      'align-mirror': () => [
        bayLot(2),
        car(196, 60, 180, C.ego),
        cone(180, 74, 160, 18, 56, C.accent),
        cone(212, 74, 200, 18, 56, C.accent),
        tag(110, 150, 'Quét gương hai bên'),
        note('Soi gương hai bên để kiểm tra vạch trước khi tắt máy.')
      ],
      correct: () => [
        bayLot(2),
        car(202, 64, 160, C.ego),
        line(176, 20, 176, 86, C.hazard, 2, '4 4'),
        trail('M214 108C208 96 202 88 198 78', C.hazard, '5 4'),
        tag(186, 152, 'Lệch hơn 20 cm'),
        note('Lệch nhiều thì tiến ra một nhịp rồi lùi lại từ đầu.')
      ],
      'correct-out': () => [
        bayLot(2),
        car(196, 96, 180, C.ego),
        trail('M196 122C196 142 210 152 238 152'),
        pin(244, 128, '1'),
        note('Tiến thẳng ra giữa lối đi rồi tạo lại góc lùi mới.')
      ],
      slope: () => [
        bayLot(2, [0, 1, 3]),
        `<g opacity=".45">${line(22, 118, 42, 130, C.bike, 2)}${line(42, 130, 22, 142, C.bike, 2)}${line(52, 118, 72, 130, C.bike, 2)}${line(72, 130, 52, 142, C.bike, 2)}</g>`,
        car(250, 132, 90, C.ego),
        trail('M236 120C216 98 206 84 200 70'),
        tag(18, 166, 'Dốc xuống 8%'),
        note('Giữ phanh chân, nhả từng chút để xe bò đều xuống dốc.')
      ],
      'slope-hold': () => [
        bayLot(2, [0, 1, 3]),
        car(200, 78, 180, C.ego),
        `<path d="M200 108L200 140" stroke="${C.hazard}" stroke-width="2.4" stroke-dasharray="4 4" fill="none" marker-end="url(#tip)"/>`,
        tag(108, 166, 'Xe trôi khi nhả phanh'),
        note('Về P và kéo phanh tay ngay khi xe đứng hẳn trong ô.')
      ],
      lowlight: () => [
        bayLot(2, [0, 3]),
        rect(0, 0, W, 180, '#050a08', 0, 0.42),
        `<g opacity=".3">${cone(240, 116, 160, 26, 70, '#fff2c4')}${cone(262, 116, 200, 26, 70, '#fff2c4')}</g>`,
        car(250, 132, 90, C.ego),
        trail('M236 120C214 96 206 84 200 70'),
        note('Bật đèn chiếu gần và dừng lại nếu gương bị lóa.')
      ],
      'lowlight-mirror': () => [
        bayLot(2, [0, 3]),
        rect(0, 0, W, 180, '#050a08', 0, 0.42),
        car(196, 70, 180, C.ego),
        cone(196, 100, 0, 34, 58, '#fff2c4'),
        tag(104, 166, 'Hạ kính để nghe còi'),
        note('Thiếu sáng thì hạ kính, đi chậm và nghe âm thanh xung quanh.')
      ],
      column: () => [
        bayLot(2, [1, 3]),
        rect(148, 92, 22, 22, '#7d8f88', 3),
        label(148, 128, 'CỘT', { size: 8 }),
        car(250, 140, 90, C.ego),
        trail('M236 128C218 108 208 88 200 72'),
        gap(170, 186, 120, '60 cm'),
        note('Cột chắn tầm nhìn: lùi từng đoạn ngắn và kiểm tra lại.')
      ],
      'column-gap': () => [
        bayLot(2, [1, 3]),
        rect(148, 92, 22, 22, '#7d8f88', 3),
        car(202, 62, 180, C.ego),
        gap(174, 190, 100, 'Chỗ mở cửa'),
        note('Đỗ lệch về phía xa cột để còn chỗ mở cửa.')
      ]
    }
    return (scenes[mode] ?? scenes.approach)()
  },
  parallel: mode => {
    const base = [rect(0, 0, W, 180, C.asphalt), rect(0, 0, 74, 180, C.kerb), line(74, 0, 74, 180, C.bay, 2.4)]
    const scenes = {
      enter: () => [
        ...base,
        car(104, 40, 0, C.other),
        car(104, 150, 0, C.other),
        car(168, 92, 0, C.ego),
        trail('M156 104C136 114 118 106 110 96'),
        gap(104, 168, 66, 'Ngang xe trước'),
        note('Dừng song song xe trước rồi mới đánh lái lùi vào.')
      ],
      settle: () => [
        ...base,
        car(104, 40, 0, C.other),
        car(104, 150, 0, C.other),
        car(104, 95, 0, C.ego),
        gap(88, 118, 66, '30 cm'),
        pin(140, 95, '✓'),
        note('Căn đều hai đầu xe và cách lề khoảng 30 cm.')
      ]
    }
    return (scenes[mode] ?? scenes.enter)()
  },
  alley: mode => {
    const corner = [
      rect(0, 0, W, 180, C.kerb),
      rect(106, 0, 108, 180, C.asphalt),
      rect(106, 96, 214, 84, C.asphalt),
      line(106, 0, 106, 180, C.bay, 2),
      line(214, 0, 214, 96, C.bay, 2),
      line(214, 96, 320, 96, C.bay, 2)
    ]
    const scenes = {
      creep: () => [
        alleyLot(),
        car(160, 120, 0, C.ego),
        bike(124, 58, 0),
        bike(196, 44, 0),
        trail('M160 94L160 38'),
        tag(16, 166, 'Dưới 10 km/h'),
        note('Chân đặt hờ phanh, xe bò đều để luôn dừng được ngay.')
      ],
      'creep-stop': () => [
        alleyLot(),
        car(160, 126, 0, C.ego),
        bike(146, 68, 14, C.hazard),
        cone(160, 102, 0, 30, 56),
        tag(16, 166, 'Dừng hẳn, nhường trước'),
        note('Có xe máy cắt ngang thì dừng hẳn và chờ hết khoảng trống.')
      ],
      mirror: () => [
        alleyLot(96),
        car(154, 118, 0, C.ego),
        bike(198, 96, 0),
        gap(168, 198, 148, '40 cm'),
        note('Giữ khoảng cách gương với xe máy đang dựng ven hẻm.')
      ],
      'mirror-fold': () => [
        alleyLot(84),
        car(160, 112, 0, C.ego),
        rect(120, 56, 12, 40, '#7d8f88', 3),
        tag(16, 166, 'Gập gương khi hẻm dưới 2,2 m'),
        note('Hẻm quá hẹp thì gập gương và nhờ người hướng dẫn bên ngoài.')
      ],
      corner: () => [
        ...corner,
        car(160, 134, 0, C.ego),
        trail('M160 110C160 82 186 66 248 66', C.accent, '6 5'),
        pin(210, 120, '1'),
        note('Ôm cua rộng để bánh sau không cắt vào góc tường.')
      ],
      'corner-wide': () => [
        ...corner,
        car(150, 140, 0, C.ego),
        `<path d="M150 118C150 96 176 84 240 84" stroke="${C.hazard}" stroke-width="2.2" stroke-dasharray="4 4" fill="none"/>`,
        tag(16, 166, 'Bánh sau cắt góc'),
        note('Vào cua sớm sẽ làm bánh sau leo lề hoặc quệt tường.')
      ],
      yield: () => [
        alleyLot(112),
        car(140, 126, 0, C.ego),
        car(182, 52, 180, C.other),
        rect(214, 92, 30, 44, '#31463f', 4),
        label(212, 150, 'CHỖ TRÁNH', { size: 7.5 }),
        trail('M140 102C140 86 168 86 186 102', C.accent, '5 4'),
        note('Xe nào gần chỗ tránh hơn thì chủ động lùi vào nhường.')
      ],
      'yield-pocket': () => [
        alleyLot(112),
        car(226, 112, 0, C.ego),
        car(150, 62, 180, C.other),
        gap(140, 214, 156, 'Chờ xe kia qua hẳn'),
        note('Đỗ gọn trong chỗ tránh, bật xi-nhan phải và chờ.')
      ],
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
  ['parking-start', 'bay', ['approach', 'Canh vai xe trước khi lùi', 'Sơ đồ nhìn từ trên xuống: xe dừng ngang mép ô đỗ trước khi cài số lùi.'], ['approach-angle', 'Góc vào hẹp trong hầm', 'Sơ đồ nhìn từ trên xuống: góc vào hẹp, quỹ đạo lùi chia thành nhiều nhịp.']],
  ['parking-align', 'bay', ['align', 'Căn đều hai bên ô đỗ', 'Sơ đồ nhìn từ trên xuống: xe nằm giữa ô đỗ với khoảng cách hai bên bằng nhau.'], ['align-mirror', 'Soi gương kiểm tra vạch', 'Sơ đồ nhìn từ trên xuống: vùng quan sát của hai gương chiếu hậu khi căn vạch.']],
  ['parking-correct', 'bay', ['correct', 'Nhận biết xe bị lệch', 'Sơ đồ nhìn từ trên xuống: thân xe lệch so với vạch ô đỗ quá 20 cm.'], ['correct-out', 'Tiến ra làm lại', 'Sơ đồ nhìn từ trên xuống: quỹ đạo tiến ra lối đi để tạo lại góc lùi.']],
  ['parking-parallel', 'parallel', ['enter', 'Ghép ngang giữa hai xe', 'Sơ đồ nhìn từ trên xuống: xe dừng song song xe trước trước khi ghép ngang.'], ['settle', 'Vị trí đỗ hoàn chỉnh', 'Sơ đồ nhìn từ trên xuống: xe nằm gọn giữa hai xe và cách lề khoảng 30 cm.']],
  ['parking-slope', 'bay', ['slope', 'Lùi chuồng trên dốc hầm', 'Sơ đồ nhìn từ trên xuống: lùi vào ô đỗ trên mặt dốc của hầm gửi xe.'], ['slope-hold', 'Giữ xe không trôi', 'Sơ đồ nhìn từ trên xuống: hướng trôi của xe khi nhả phanh trên dốc.']],
  ['parking-lowlight', 'bay', ['lowlight', 'Hầm thiếu sáng', 'Sơ đồ nhìn từ trên xuống: vùng sáng đèn xe khi lùi trong hầm thiếu sáng.'], ['lowlight-mirror', 'Quan sát bằng mắt và tai', 'Sơ đồ nhìn từ trên xuống: vùng quan sát phía sau khi hạ kính trong hầm tối.']],
  ['parking-column', 'bay', ['column', 'Ô đỗ sát cột bê tông', 'Sơ đồ nhìn từ trên xuống: ô đỗ có cột bê tông chắn tầm nhìn bên trái.'], ['column-gap', 'Chừa chỗ mở cửa', 'Sơ đồ nhìn từ trên xuống: xe đỗ lệch xa cột để còn khoảng trống mở cửa.']],
  ['narrow-creep', 'alley', ['creep', 'Bò đều trong hẻm', 'Sơ đồ nhìn từ trên xuống: xe đi chậm trong hẻm hẹp có xe máy phía trước.'], ['creep-stop', 'Dừng khi có xe cắt ngang', 'Sơ đồ nhìn từ trên xuống: vùng nguy hiểm khi xe máy cắt ngang đầu xe.']],
  ['narrow-mirror', 'alley', ['mirror', 'Giữ khoảng cách gương', 'Sơ đồ nhìn từ trên xuống: khoảng cách an toàn giữa gương xe và xe máy dựng ven hẻm.'], ['mirror-fold', 'Gập gương khi hẻm quá hẹp', 'Sơ đồ nhìn từ trên xuống: hẻm hẹp dưới 2,2 m cần gập gương để đi qua.']],
  ['narrow-corner', 'alley', ['corner', 'Ôm cua rộng trong hẻm', 'Sơ đồ nhìn từ trên xuống: quỹ đạo ôm cua rộng để bánh sau không cắt góc.'], ['corner-wide', 'Lỗi bánh sau cắt góc', 'Sơ đồ nhìn từ trên xuống: quỹ đạo sai khi vào cua sớm làm bánh sau leo lề.']],
  ['narrow-yield', 'alley', ['yield', 'Nhường đường trong hẻm', 'Sơ đồ nhìn từ trên xuống: hai xe ngược chiều và vị trí chỗ tránh trong hẻm.'], ['yield-pocket', 'Đỗ gọn trong chỗ tránh', 'Sơ đồ nhìn từ trên xuống: xe đỗ gọn trong chỗ tránh để xe ngược chiều đi qua.']],
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
