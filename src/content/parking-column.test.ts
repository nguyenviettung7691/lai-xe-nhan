import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { allCards, getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { CONTENT_VERSION, contentReleases } from './version'

const card = allCards.find(item => item.id === 'parking-column')!
const diagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const opening = `<g id="${id}">`
  const start = svg.indexOf(opening)
  if (start < 0) throw new Error(`Missing SVG group: ${id}`)
  const content = svg.slice(start + opening.length)
  let depth = 1
  for (const match of content.matchAll(/<g(?:\s[^>]*)?>|<\/g>/g)) {
    depth += match[0] === '</g>' ? -1 : 1
    if (depth === 0) return content.slice(0, match.index)
  }
  throw new Error(`Unclosed SVG group: ${id}`)
}
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const rectangle = (svg: string) =>
  svg.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
const pose = (svg: string) => {
  const vehicle = group(svg, 'column-car')
  const [cx, cy, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [x, y, width, height] = rectangle(vehicle)
  expect(rotation).toBe(180)
  const mirrors = [...group(svg, 'column-mirrors').matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
    .map(match => match.slice(1).map(Number))
  expect(mirrors).toHaveLength(2)
  return {
    cx, left: cx - x - width, right: cx - x, rear: cy - y - height, front: cy - y,
    outerLeft: Math.min(...mirrors.map(([mx]) => mx)),
    outerRight: Math.max(...mirrors.map(([mx, , mw]) => mx + mw)),
    mirrorTop: Math.min(...mirrors.map(([, my]) => my))
  }
}
const instructions = card.steps.map(step => step.instruction).join(' ')

describe('parking-column: real-world guidance and editorial state', () => {
  it('preserves draft filtering and identifiers instead of inventing professional approval', () => {
    expect(card.reviewStatus).toBe('draft')
    expect(getCardById(card.id)).toBeUndefined()
    expect(publishedCards.some(item => item.id === card.id)).toBe(false)
    expect(getReview(card.id)).toBeUndefined()
    expect(card.lessonId).toBe('parking-underground')
    expect(card.assetIds).toEqual(['parking-column-main', 'parking-column-var'])
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `parking-column-s${i + 1}`))
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'parking-column-qc1', 'parking-column-qc2', 'parking-column-qc3'
    ])
    expect(card.mnemonic.id).toBe('parking-column-mn')
  })

  it('versions the revised draft and pack without removing historical entries', () => {
    expect(card.version).toBe('0.2.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['0.1.0', card.version])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.7')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(CONTENT_VERSION).toBe(contentReleases.at(-1)?.version)
  })

  it('assesses a permitted bay and current visibility without relying on a remembered survey', () => {
    expect(card.context).toMatch(/xe số tự động.*ngoài tầm nhìn.*cảm biến.*Chỉ lùi khi thấy rõ/)
    expect(card.steps[0].instruction).toMatch(/^Dừng ở vị trí an toàn.*được phép.*vật cản thấp.*lối người đi bộ.*lối ra vào/)
    expect(card.steps[0].instruction).toMatch(/Không cố đi qua để nhớ mốc.*bị cột che khuất.*giữ xe.*hỗ trợ/)
    expect(card.safety).toMatch(/không lùi vào vùng bị cột che khuất.*lối thoát hiểm/)
  })

  it('checks both sides, mirrors and doors without numeric clearance or sensor thresholds', () => {
    expect(card.steps[1].instruction).toMatch(/gương.*cả hai bên.*trong vạch.*không lấn ô.*Không có.*cố định.*lối mở cửa/)
    expect(instructions).not.toMatch(/\d+\s*(cm|m\b|km\/h)|mỗi đoạn ngắn/i)
    expect(card.steps[5].instruction).toMatch(/dừng hẳn và giữ xe ngay.*chưa rõ.*cảnh báo.*không chờ cảm biến kêu liên tục/)
    expect(card.steps[5].instruction).toMatch(/im lặng không chứng minh an toàn.*thấy rõ/)
  })

  it('checks all around before R and continuously during slow movement, not at set intervals', () => {
    expect(card.steps[2].instruction).toMatch(/^Dừng hẳn, giữ phanh chân.*trực tiếp.*gương và điểm mù.*phía sau cột.*đầu xe.*Chỉ chọn R.*tín hiệu lùi.*nhường/)
    expect(card.steps[4].instruction).toMatch(/dừng được trong khoảng trống nhìn rõ.*liên tục.*thân, gương, góc xe.*phía đối diện.*đầu xe quét.*không chờ hết/)
    expect(card.steps[4].speedHint).toBe('tốc độ đi bộ hoặc chậm hơn')
    const checklist = getChecklist(card.checklistId)!
    expect(checklist.id).toBe('pre_reverse')
    expect(checklist.items.find(item => item.id === 'reverse-camera')?.hint).toMatch(/chỉ hỗ trợ.*trực tiếp.*dừng/)
    expect(checklist.items.find(item => item.id === 'reverse-speed')?.hint).toContain('không phải tốc độ mục tiêu')
  })

  it('keeps helpers out of crush and swing zones and stops on loss of contact', () => {
    expect(card.steps[3].instruction).toMatch(/tín hiệu khi xe đang dừng.*ngoài đường xe chạy.*đầu xe quét.*vùng kẹp.*cột.*tầm nhìn/)
    expect(card.steps[3].instruction).toMatch(/Mất dấu hoặc mất liên lạc thì dừng ngay.*không cho người đứng sát cột/)
    expect(card.safety).toMatch(/Người hướng dẫn.*tầm nhìn.*vùng kẹp.*mất liên lạc thì dừng/)
  })

  it('requires stopping, yielding and checking the entire new path before repositioning', () => {
    expect(card.steps[6].instruction).toMatch(/^Dừng hẳn trước mỗi lần đổi R\/D.*trực tiếp, gương, điểm mù.*đường tiến hoặc lùi mới.*nhường/)
    expect(card.steps[6].instruction).toMatch(/không mặc định tiến ra.*phía đối diện.*giữ xe.*gọi hỗ trợ/)
    expect(card.recovery).toMatch(/^Đạp phanh dừng hẳn và giữ xe.*không tự động tiến ra.*Trước đổi R\/D, dừng hẳn.*đường đi mới.*nhường/)
  })

  it('secures before exit and checks door sweep, road users and escape space in quick/TTS fields too', () => {
    for (const text of [card.steps[7].instruction, card.recovery]) {
      expect(text).toMatch(/giữ phanh chân.*phanh đỗ và P theo hướng dẫn.*xe đứng chắc trước khi nhả phanh chân/)
      expect(text).toMatch(/trước, sau, bên mở cửa.*quét.*lối ra/)
      expect(text).toMatch(/không.*chen.*giữa xe.*cột/)
      expect(text).toMatch(/ở lại vị trí lái, giữ phanh và gọi hỗ trợ/)
    }
    expect(card.steps[7].cueText).toContain('không chọn P khi xe đang chuyển động')
    expect(card.safety).toMatch(/Dừng hẳn trước đổi R\/D.*phanh đỗ và P.*xe đứng chắc.*quét cửa.*lối ra/)
  })

  it('tests uncertainty despite silent sensors, both-side clearance and secured exit', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(card.quickCheck[0].prompt).toMatch(/im lặng.*gương với cột/)
    expect(card.quickCheck[0].isStopCondition).toBe(true)
    expect(answers[0]).toMatch(/phanh dừng hẳn và giữ xe.*trực tiếp.*thấy rõ an toàn/)
    expect(answers[1]).toMatch(/^Không.*thân, gương, cả hai bên.*quét cửa.*trong vạch.*đường đi an toàn/)
    expect(answers[2]).toMatch(/^Dừng hẳn.*phanh chân.*phanh đỗ và P.*xe đứng chắc.*quét cửa.*lối ra.*ở lại giữ phanh/)
  })
})

describe('parking-column: actual illustration geometry and accessible meaning', () => {
  it.each(card.assetIds)('%s has an open bay and consistent heading, pillar and mirrors', id => {
    const svg = diagram(id)
    const vehicle = pose(svg)
    const bay = segments(group(svg, 'column-bay'))
    expect(bay).toHaveLength(3)
    const [[left, mouth, , top], , [right]] = bay
    expect(mouth).toBeGreaterThan(top)
    expect(bay.some(([, y1, , y2]) => y1 === mouth && y2 === mouth)).toBe(false)
    expect(vehicle.outerLeft).toBeGreaterThan(left)
    expect(vehicle.outerRight).toBeLessThan(right)
    const [pillarX, pillarY, , pillarHeight] = rectangle(group(svg, 'column-pillar'))
    expect(pillarX).toBeGreaterThan(right)
    expect(pillarY).toBeGreaterThan(top)
    expect(pillarY + pillarHeight).toBeLessThan(mouth)
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('ĐUÔI')
    expect(svg).not.toMatch(/\d+\s*cm/)
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*cột bên phải hình/i)
    expect(getAsset(id)?.alt).toMatch(/cửa ô mở|cùng ô/)
  })

  it('starts reverse behind the rear, points into the bay and clears the column with the entire straight envelope', () => {
    const svg = diagram(card.assetIds[0])
    const vehicle = pose(svg)
    const [[x1, y1, x2, y2]] = segments(group(svg, 'column-reverse'))
    const [[left, mouth, , top], , [right]] = segments(group(svg, 'column-bay'))
    expect(vehicle.rear).toBeGreaterThan(mouth)
    expect(x1).toBe(vehicle.cx)
    expect(x2).toBe(x1)
    expect(y1).toBeLessThan(vehicle.rear)
    expect(y2).toBeLessThan(y1)
    expect(y2).toBeGreaterThan(top)
    expect(vehicle.outerLeft).toBeGreaterThan(left)
    expect(vehicle.outerRight).toBeLessThan(right)
    expect(vehicle.outerRight).toBeLessThan(rectangle(group(svg, 'column-pillar'))[0])
    expect(svg.match(/marker-end=/g)).toHaveLength(1)
    expect(getAsset(card.assetIds[0])?.alt).toMatch(/từ sau đuôi.*ví dụ lùi thẳng.*không phải.*bảo đảm/)
  })

  it('parks fully inside the bay and attaches the driver front door to the correct side, behind the mirror', () => {
    const svg = diagram(card.assetIds[1])
    const vehicle = pose(svg)
    const [[, mouth, , top]] = segments(group(svg, 'column-bay'))
    expect(vehicle.rear).toBeGreaterThan(top)
    expect(vehicle.front).toBeLessThan(mouth)
    const door = group(svg, 'column-door')
    const [[hingeX, hingeY, openX, openY]] = segments(door)
    const [closedX, closedY, radiusX, radiusY, arcEndX, arcEndY] =
      door.match(/M([\d.]+) ([\d.]+)A([\d.]+) ([\d.]+) 0 0 1 ([\d.]+) ([\d.]+)/)!.slice(1).map(Number)
    expect(hingeX).toBe(vehicle.right)
    expect(closedX).toBe(hingeX)
    expect(hingeY).toBeLessThan(vehicle.front)
    expect(hingeY).toBeLessThan(vehicle.mirrorTop)
    expect(closedY).toBeGreaterThan(vehicle.rear)
    expect(hingeY).toBeGreaterThan(closedY)
    expect(openY).toBe(hingeY)
    expect(openX).toBeGreaterThan(vehicle.outerRight)
    expect(radiusX).toBe(hingeY - closedY)
    expect(radiusY).toBe(radiusX)
    expect(openX - hingeX).toBe(radiusX)
    expect([arcEndX, arcEndY]).toEqual([openX, openY])
    expect(openX).toBeLessThan(rectangle(group(svg, 'column-pillar'))[0])
    expect(svg).not.toContain('marker-end=')
    expect(getAsset(card.assetIds[1])?.alt).toMatch(/tay lái trái.*cửa lái ở bên phải hình.*cung vàng.*không phải quỹ đạo xe.*lối ra/)
  })
})
