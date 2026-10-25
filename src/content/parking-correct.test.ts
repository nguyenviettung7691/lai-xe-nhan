import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('parking-correct')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const segments = (svg: string) => [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)]
  .map(match => match.slice(1).map(Number))
const pose = (svg: string) => {
  const vehicle = group(svg, 'correction-car')
  const [cx, cy, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [x, y, width, height] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  const angle = rotation * Math.PI / 180
  const transform = (px: number, py: number) =>
    [cx + px * Math.cos(angle) - py * Math.sin(angle), cy + px * Math.sin(angle) + py * Math.cos(angle)]
  return { cx, cy, rotation, height, transform, corners: [[x, y], [x + width, y], [x, y + height], [x + width, y + height]].map(([px, py]) => transform(px, py)) }
}

describe('parking-correct: real-world content', () => {
  it('preserves stable IDs and explicitly removes sample approval', () => {
    expect(card.lessonId).toBe('parking-basics')
    expect(card.assetIds).toEqual(['parking-correct-main', 'parking-correct-var'])
    expect(card.checklistId).toBe('pre_reverse')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.changelog.at(-1)?.version).toBe(card.version)
    expect(contentReleases.at(-1)?.cardIds).toContain(card.id)
  })

  it('distinguishes angle from lateral position without universal measurements', () => {
    expect(instructions).toMatch(/dọc cả đầu và đuôi.*quan sát trực tiếp/)
    expect(instructions).toMatch(/thân nghiêng.*song song nhưng lệch/)
    expect(instructions).toMatch(/dừng nếu vẫn lệch ngang/i)
    expect(instructions).not.toMatch(/\d+\s*cm|một phần tư vòng/)
    expect(card.objective).not.toMatch(/một nhịp/)
    expect(card.recovery).toMatch(/không dựa vào số lần thử/)
  })

  it('requires a full stop, clear forward space and yielding before changing direction', () => {
    expect(card.steps[0].instruction).toMatch(/^Dừng hẳn.*giữ phanh/)
    expect(card.steps[2].instruction).toMatch(/điểm mù.*phía trước, sau, hai bên/)
    expect(card.steps[2].instruction).toMatch(/các góc xe.*vật cản thấp.*nhường người và xe/)
    expect(card.steps[3].instruction).toMatch(/số tiến.*đứng hẳn.*chỉ tiến.*đường đi đã rõ/)
    expect(card.steps[3].instruction).toMatch(/không bắt buộc đi hết một thân xe/)
    expect(card.steps[4].instruction).toMatch(/^Dừng hẳn.*trước khi cài số lùi.*không đổi chiều/)
  })

  it('requires continuous observation both ways, front swing checks and immediate stopping', () => {
    expect(card.steps[3].cueText).toMatch(/Quan sát liên tục.*khi tiến/)
    expect(card.steps[5].instruction).toMatch(/liên tục quét quanh xe.*đầu xe quét ra/)
    expect(card.steps[5].cueText).toMatch(/Dừng ngay.*mất tầm nhìn/)
    expect(card.safety).toMatch(/^Dừng ngay.*không chắc khoảng cách.*cảm biến cảnh báo/)
    expect(card.safety).toMatch(/không đợi còi liên tục/)
    expect(card.steps[2].cueText).toMatch(/chỉ hỗ trợ/)
  })

  it('secures the vehicle before safe exit and stops if the guide is lost', () => {
    expect(card.recovery).toMatch(/chỉ ra ngoài khi vị trí và giao thông cho phép/)
    expect(card.recovery).toMatch(/phanh đỗ, P.*số sàn.*tắt máy.*ngoái nhìn trước khi mở cửa/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy.*trong tầm nhìn.*mất liên lạc thì dừng/)
    expect(card.steps[7].instruction).toMatch(/toàn bộ xe.*cản, gương và cửa.*hướng dẫn của nhà sản xuất/)
  })

  it('tests stopping first, conditional forward travel and an unsuitable lateral position', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/^Dừng hẳn, giữ phanh/)
    expect(card.quickCheck[0].isStopCondition).toBe(true)
    expect(answers[1]).toMatch(/đứng hẳn.*nhường người và xe.*quan sát rõ/)
    expect(answers[2]).toMatch(/^Dừng.*chỉ chỉnh tiếp khi đủ chỗ/)
    expect(answers.join(' ')).not.toMatch(/\d+\s*cm|một phần tư|một thân xe/)
  })

  it('linked checklist does not treat working aids or its speed ceiling as permission to move', () => {
    const checklist = getChecklist(card.checklistId)!
    expect(checklist.items.find(item => item.id === 'reverse-camera')?.hint)
      .toMatch(/chỉ hỗ trợ.*quan sát trực tiếp, dừng nếu chưa rõ/)
    expect(checklist.items.find(item => item.id === 'reverse-speed')?.hint)
      .toMatch(/không phải tốc độ mục tiêu.*luôn dừng được ngay/)
  })
})

describe('parking-correct: diagram geometry and meaning', () => {
  it.each(['parking-correct-main', 'parking-correct-var'])('%s has an open bay and a consistent angled vehicle facing the aisle', id => {
    const svg = readDiagram(id)
    expect(segments(group(svg, 'correction-bay'))).toEqual([
      [120, 24, 120, 112], [200, 24, 200, 112], [120, 24, 200, 24]
    ])
    expect(segments(group(svg, 'correction-axis'))).toEqual([[160, 32, 160, 104]])
    const vehicle = pose(svg)
    expect([vehicle.cx, vehicle.cy, vehicle.rotation]).toEqual([156, 86, 160])
    for (const [x, y] of vehicle.corners) {
      expect(x).toBeGreaterThan(120)
      expect(x).toBeLessThan(200)
      expect(y).toBeGreaterThan(24)
    }
    const front = vehicle.transform(0, -vehicle.height / 2)
    const rear = vehicle.transform(0, vehicle.height / 2)
    expect(front[1]).toBeGreaterThan(rear[1])
    expect(svg).toContain('>ĐẦU</text>')
    expect(svg).toContain('>ĐUÔI</text>')
    expect(svg).toContain('>LỐI ĐI</text>')
    expect(svg).toContain('không theo tỷ lệ')
    expect(svg).not.toMatch(/\d+\s*cm/)
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*đầu.*lối đi|không theo tỷ lệ.*đầu.*cửa ô mở/i)
  })

  it('diagnosis scene is stationary, without a reversing arrow or an unexplained hazard line', () => {
    const svg = readDiagram('parking-correct-main')
    expect(svg).toContain('DỪNG ĐỂ ĐÁNH GIÁ')
    expect(svg).not.toMatch(/marker-end=|#ff8a6b/)
    expect(getAsset('parking-correct-main')?.alt).toMatch(/Nét đứt là trục ô, không phải đường xe chạy/)
  })

  it('forward arrow starts beyond the front bumper, follows the car axis and exits through the open mouth', () => {
    const svg = readDiagram('parking-correct-var')
    const motion = group(svg, 'correction-forward')
    const [[x1, y1, x2, y2]] = segments(motion)
    const vehicle = pose(svg)
    const [fx, fy] = vehicle.transform(0, -vehicle.height / 2)
    const heading = [fx - vehicle.cx, fy - vehicle.cy]
    const length = Math.hypot(...heading)
    const crossTrack = (x: number, y: number) => Math.abs((x - vehicle.cx) * heading[1] - (y - vehicle.cy) * heading[0]) / length
    expect(crossTrack(x1, y1)).toBeLessThan(0.1)
    expect(crossTrack(x2, y2)).toBeLessThan(0.1)
    expect(y1).toBeGreaterThan(fy)
    expect(y1).toBeGreaterThan(112)
    expect(y2).toBeGreaterThan(y1)
    expect(y2).toBeLessThan(174)
    expect(x1).toBeGreaterThan(120)
    expect(x2).toBeLessThan(200)
    // For straight travel, checking both endpoint footprints bounds the swept body.
    for (const [x, y] of vehicle.corners) {
      expect(x + x2 - fx).toBeGreaterThan(120)
      expect(x + x2 - fx).toBeLessThan(200)
      expect(y + y2 - fy).toBeGreaterThan(24)
      expect(y + y2 - fy).toBeLessThan(174)
    }
    expect(motion).toContain('marker-end="url(#tip)"')
    expect(motion).not.toMatch(/[CQ]/)
    expect((svg.match(/marker-end=/g) ?? [])).toHaveLength(1)
    expect(svg).toContain('Dừng hẳn trước đổi chiều.')
    expect(getAsset('parking-correct-var')?.caption).toMatch(/không phải toàn bộ cách sửa/)
  })
})
