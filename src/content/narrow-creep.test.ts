import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('narrow-creep')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const pose = (svg: string, id: string) => {
  const [x, y, rotation] = group(svg, id).match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  return { x, y, rotation }
}
const rects = (svg: string) =>
  [...svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)].map(match => match.slice(1).map(Number))

describe('narrow-creep: real-world guidance', () => {
  it('preserves progress/asset/quiz identifiers and release history without sample approval', () => {
    expect(card.lessonId).toBe('narrow-control')
    expect(card.assetIds).toEqual(['narrow-creep-main', 'narrow-creep-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'narrow-creep-qc1', 'narrow-creep-qc2', 'narrow-creep-qc3'
    ])
    expect(card.checklistId).toBe('pre_drive')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(publishedCards).toContain(card)
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.2.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0', '1.2.0'])
    expect(contentReleases.find(release => release.version === '2026.08.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.8')?.cardIds).toEqual([card.id])
  })

  it('assesses the complete vehicle before entering, not an arbitrary width threshold', () => {
    expect(card.steps[0].instruction).toMatch(/^Dừng.*được phép.*thân, gương, góc xe.*chưa chắc.*không vào/)
    expect(card.steps[0].cueText).toMatch(/tay lái xe máy, cửa.*người/)
    expect(card.steps[1].instruction).toMatch(/Giữ gương mở.*xe đã dừng.*hướng dẫn.*quan sát.*khoảng hở toàn xe/)
    expect(card.steps[1].cueText).toMatch(/Không có mốc bề rộng chung.*mở lại/)
    expect(instructions).not.toMatch(/hai mét rưỡi|2,5 m|dưới 10 km\/h/)
  })

  it('qualifies automatic creep and controls actual speed using the right foot', () => {
    expect(card.context).toMatch(/xe số tự động trên nền bằng/)
    expect(card.steps[2].instruction).toMatch(/phanh chân.*D.*đứng hẳn.*có chế độ tự bò.*chân phải/)
    expect(card.steps[2].instruction).toMatch(/đi bộ hoặc chậm hơn.*dừng được.*nhìn rõ còn trống/)
    expect(card.steps[2].cueText).toMatch(/Không đạp ga và phanh cùng lúc.*không tự bò.*dừng.*hướng dẫn/)
    expect(card.safety).toMatch(/Auto Hold và xe điện.*mẫu xe.*không mặc định nhả phanh/)
    expect(card.safety).toMatch(/không thay.*xe số sàn.*trên dốc/)
  })

  it('scans far/near, both sides and blind spots instead of staring at 10 m', () => {
    expect(card.steps[3].instruction).toMatch(/xa và gần.*hai bên.*gương và điểm mù.*trẻ nhỏ.*người đi bộ/)
    expect(card.steps[3].instruction).toContain('không nhìn cố định')
    expect(card.steps[3].cueText).toMatch(/Không có điểm nhìn cố định 10 m.*chỉ hỗ trợ/)
    expect(card.steps[4].instruction).toMatch(/hai tay.*nhịp nhỏ.*góc đầu xe, thân, gương.*bánh sau/)
    expect(card.mnemonic.text).toContain('chưa rõ thì dừng')
  })

  it('retains stop/hold and restart checks even in quick and spoken modes', () => {
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/phanh dừng hẳn và giữ xe/)
      expect(text).toMatch(/không.*lách.*lùi.*vùng khuất/)
    }
    expect(card.steps[5].instruction).toMatch(/người hoặc xe cắt ngang.*mất tầm nhìn.*cảnh báo.*khoảng hở/)
    expect(card.steps[5].cueText).toContain('không chọn P khi xe còn chuyển động')
    expect(card.steps[6].instruction).toMatch(/Quan sát lại.*hai bên, gương và điểm mù.*chỉ đi tiếp.*đủ khoảng hở/)
    expect(card.steps[6].cueText).toMatch(/Không tự bò theo xe máy.*cảm biến im lặng/)
  })

  it('requires secure inspection, a safe guide and lawful visible reversing, not blind retreat', () => {
    expect(card.recovery).toMatch(/^Đạp phanh dừng hẳn và giữ xe.*không chọn P khi đang lăn/)
    expect(card.recovery).toMatch(/hạ kính chỉ hỗ trợ.*không chứng minh/)
    expect(card.recovery).toMatch(/xuống kiểm tra.*phanh chân.*phanh đỗ và P.*đứng chắc.*mở cửa an toàn/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy.*vùng quét.*không giữa xe với tường.*mất liên lạc thì dừng/)
    expect(card.recovery).toMatch(/Chỉ lùi khi được phép.*hai bên và phía sau.*tín hiệu lùi/)
    expect(card.recovery).toMatch(/không lùi trên đường một chiều.*tầm nhìn bị che khuất/)
    expect(card.recovery).toMatch(/gọi hỗ trợ thay vì tự lùi/)
  })

  it('tests pedal control, context-based clearance/observation and a mandatory stop', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Chân phải.*phanh.*đi bộ.*nhìn rõ còn trống/)
    expect(answers[1]).toMatch(/Quét xa, gần.*toàn xe.*không dùng mốc bề rộng chung/)
    expect(answers[2]).toMatch(/^Đạp phanh dừng hẳn và giữ xe.*quan sát lại.*đủ khoảng hở/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('narrow-creep: actual illustration geometry', () => {
  it.each(card.assetIds)('%s shows the same upward car heading and mirrors within walls', id => {
    const svg = readDiagram(id)
    const vehicle = pose(svg, 'creep-car')
    expect(vehicle).toEqual({ x: 160, y: 128, rotation: 0 })
    const [x, y, width, height] = rects(group(svg, 'creep-car'))[0]
    const front = vehicle.y + y
    const rear = front + height
    expect(front).toBeLessThan(rear)
    expect(vehicle.x + x).toBeGreaterThan(120)
    expect(vehicle.x + x + width).toBeLessThan(200)
    const mirrors = rects(group(svg, 'creep-mirrors'))
    expect(mirrors).toHaveLength(2)
    for (const [mx, my, mw, mh] of mirrors) {
      expect(mx).toBeGreaterThan(120)
      expect(mx + mw).toBeLessThan(200)
      expect(my).toBeGreaterThan(front)
      expect(my + mh).toBeLessThan(rear)
    }
    expect(mirrors[0][0]).toBeLessThan(vehicle.x + x)
    expect(mirrors[1][0] + mirrors[1][2]).toBeGreaterThan(vehicle.x + x + width)
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('ĐUÔI')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(getAsset(id)?.alt).toContain('không theo tỷ lệ')
    expect(svg).not.toMatch(/10 km|2,5 m|10 m|chờ hết khoảng trống/)
  })

  it('main arrow starts ahead of the front and follows its heading without colliding with parked bikes', () => {
    const svg = readDiagram('narrow-creep-main')
    const vehicle = pose(svg, 'creep-car')
    const [, y] = rects(group(svg, 'creep-car'))[0]
    const [[x1, y1, x2, y2]] = segments(group(svg, 'creep-forward'))
    expect(x1).toBe(vehicle.x)
    expect(x2).toBe(x1)
    expect(y1).toBeLessThan(vehicle.y + y)
    expect(y2).toBeLessThan(y1)
    const bikePoses = [...svg.matchAll(/translate\((128|192) ([\d.]+)\) rotate\(0\)/g)].map(match => match.slice(1).map(Number))
    expect(bikePoses).toHaveLength(2)
    const mirrors = rects(group(svg, 'creep-mirrors'))
    for (const [bx, by] of bikePoses) {
      expect(by + 11).toBeLessThan(vehicle.y + y)
      expect(bx - 5).toBeGreaterThan(120)
      expect(bx + 5).toBeLessThan(200)
      expect(bx + 5 < mirrors[0][0] || bx - 5 > mirrors[1][0] + mirrors[1][2]).toBe(true)
    }
    expect(svg.match(/MÔ TÔ ĐỖ/g)).toHaveLength(2)
    expect(getAsset('narrow-creep-main')?.alt).toMatch(/đang đỗ.*không phải điểm nhìn/)
  })

  it('variant provides a real right-side opening and points motorcycle and arrow leftward into the conflict zone', () => {
    const svg = readDiagram('narrow-creep-var')
    const motorcycle = pose(svg, 'creep-crossing-bike')
    expect(motorcycle.rotation).toBe(270)
    const walls = segments(group(svg, 'creep-walls'))
    const rightWall = walls.filter(([x1, , x2]) => x1 === 200 && x2 === 200)
    expect(rightWall).toEqual([[200, 0, 200, 42], [200, 84, 200, 174]])
    expect(motorcycle.y - 5).toBeGreaterThan(42)
    expect(motorcycle.y + 5).toBeLessThan(84)
    const [[x1, y1, x2, y2]] = segments(group(svg, 'creep-bike-motion'))
    expect(x1).toBeLessThan(motorcycle.x - 16)
    expect(x1).toBeGreaterThan(200)
    expect(x2).toBeLessThan(200)
    expect(x2).toBeLessThan(x1)
    expect(y1).toBe(motorcycle.y)
    expect(y2).toBe(y1)
    const [[cx, cy, cw, ch]] = rects(group(svg, 'creep-conflict'))
    expect(x2).toBeGreaterThan(cx)
    expect(x2).toBeLessThan(cx + cw)
    expect(y2).toBeGreaterThan(cy)
    expect(y2).toBeLessThan(cy + ch)
    const vehicle = pose(svg, 'creep-car')
    const [, frontOffset] = rects(group(svg, 'creep-car'))[0]
    expect(cy + ch).toBeLessThan(vehicle.y + frontOffset)
    expect(svg).not.toContain('id="creep-forward"')
    expect(svg).toContain('XE ĐANG DỪNG')
    expect(getAsset('narrow-creep-var')?.alt).toMatch(/đang dừng.*không có mũi tên chuyển động của xe mình/)
  })

  it('uses one hazard colour for motorcycle, arrow shaft and arrowhead, not a green movement command', () => {
    const svg = readDiagram('narrow-creep-var')
    const motion = group(svg, 'creep-bike-motion')
    const stroke = motion.match(/stroke="(#[a-f\d]+)"/)![1]
    const markerId = motion.match(/marker-end="url\(#([^)]+)\)"/)![1]
    const marker = svg.match(new RegExp(`<marker id="${markerId}"[^>]*>([\\s\\S]*?)</marker>`))![1]
    expect(stroke).toBe('#ff8a6b')
    expect(marker).toContain(`fill="${stroke}"`)
    expect(group(svg, 'creep-crossing-bike')).toContain(`fill="${stroke}"`)
  })
})
