import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('narrow-yield')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
type Box = [number, number, number, number]
const rects = (svg: string): Box[] =>
  [...svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
    .map(match => [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])])
const pose = (svg: string, id: string) =>
  svg.match(new RegExp(`id="${id}" transform="translate\\(([\\d.]+) ([\\d.]+)\\) rotate\\(([\\d.]+)\\)"`))!
    .slice(1).map(Number)
const vehicleBoxes = (svg: string, id: string): Box[] => {
  const [x, y, rotation] = pose(svg, id)
  const body = svg.match(new RegExp(`id="${id}" transform="[^"]+"><g transform="[^"]+">(<rect[^>]+)`))![1]
  return [...rects(body), ...rects(group(svg, `${id}-mirrors`))].map(([bx, by, w, h]) =>
    rotation === 0 ? [x + bx, y + by, w, h] : [x - bx - w, y - by - h, w, h])
}
const contains = ([x, y, w, h]: Box, [bx, by, bw, bh]: Box) =>
  bx > x && by > y && bx + bw < x + w && by + bh < y + h

describe('narrow-yield: real-world guidance', () => {
  it('preserves identifiers/history without claiming independent approval', () => {
    expect(card.lessonId).toBe('narrow-negotiation')
    expect(card.assetIds).toEqual(['narrow-yield-main', 'narrow-yield-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'narrow-yield-qc1', 'narrow-yield-qc2', 'narrow-yield-qc3'
    ])
    expect(card.checklistId).toBe('pre_drive')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(publishedCards).toContain(card)
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.minutes).toBe(6)
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.11')?.cardIds).toEqual([card.id])
  })

  it('stops according to visibility, keeps right and covers all three meeting rules', () => {
    expect(card.steps[0].instruction).toMatch(/^Giảm tốc.*bên phải.*được phép.*dừng sớm.*nhìn rõ còn trống/)
    expect(card.steps[0].cueText).toMatch(/Không có mốc dừng 10 m chung.*không tiến/)
    expect(card.steps[1].instruction).toMatch(/gần chỗ tránh hơn phải vào nhường/)
    expect(card.steps[1].instruction).toMatch(/xuống dốc nhường xe lên dốc/)
    expect(card.steps[1].instruction).toMatch(/có chướng ngại vật.*nhường xe không có chướng ngại vật/)
    expect(card.steps[1].cueText).toMatch(/không có nghĩa luôn phải lùi.*không.*cố chen/)
    expect(instructions).not.toMatch(/ít nhất mười mét|dưới 5 km\/h|trở lại giữa ngõ/)
  })

  it('assesses legal whole-vehicle clearance, not just any recess or turn', () => {
    expect(card.steps[2].instruction).toMatch(/phía trước, phía sau, hai bên và điểm mù/)
    expect(card.steps[2].instruction).toMatch(/được phép, nhìn rõ, nền chắc.*thân, gương, đầu và đuôi.*xe kia qua/)
    expect(card.steps[2].instruction).toMatch(/Không.*sân nhà.*vỉa hè.*cửa.*người đi bộ.*nút giao/)
    expect(card.steps[2].cueText).toMatch(/không mặc nhiên.*không gập gương/)
    expect(card.context).toMatch(/nền bằng.*bên phải.*phía trước.*không phải hướng dẫn/i)
  })

  it('negotiates while stopped, preferring safe forward access without trusting gestures', () => {
    expect(card.steps[3].instruction).toMatch(/cả hai xe đã dừng.*xi-nhan.*tiến vào khi được phép.*kiểm tra lại.*vẫn chờ/)
    expect(card.steps[3].cueText).toMatch(/vẫy tay.*nháy đèn không tạo quyền ưu tiên.*phía sau/)
    expect(card.steps[4].speedHint).toMatch(/đi bộ hoặc chậm hơn.*nhìn rõ còn trống/)
  })

  it('keeps reversing legality and stop conditions in quick/spoken instructions and safety', () => {
    for (const text of [card.steps[4].instruction, card.safety]) {
      expect(text).toMatch(/lùi.*được phép.*tín hiệu lùi.*hai bên và phía sau/)
      expect(text).toMatch(/không lùi.*đường một chiều.*(nơi giao nhau|nút giao).*tầm nhìn bị che khuất/)
      expect(text).toMatch(/dừng hẳn và giữ xe.*người, xe máy/)
    }
    expect(card.steps[4].instruction).toMatch(/nơi cấm dừng.*đường lùi|đường lùi.*nơi cấm dừng/)
    expect(card.steps[4].instruction).toMatch(/vùng quét đầu, đuôi và gương.*mất liên lạc/)
    expect(card.steps[4].cueText).toMatch(/Không đủ.*giữ xe.*hỗ trợ.*camera, cảm biến chỉ hỗ trợ/i)
  })

  it('holds for the entire vehicle and following users, then rechecks and returns right', () => {
    expect(card.steps[5].instruction).toMatch(/Dừng hẳn và giữ xe.*toàn xe.*khoảng hở.*toàn bộ xe.*xe máy, người đi bộ.*qua hết/)
    expect(card.steps[6].instruction).toMatch(/Quan sát lại.*phía sau.*điểm mù.*báo hướng.*nhường.*lối đi rõ.*bên phải/)
    expect(card.steps[6].cueText).toMatch(/tiếp tục chờ.*không đi theo.*vẫy tay/)
  })

  it('secures any necessary exit and positions guides outside crush/swept areas', () => {
    expect(card.recovery).toMatch(/^Dừng hẳn và giữ xe.*không xuống xe chỉ để tranh luận/)
    expect(card.recovery).toMatch(/không mặc định bật đèn cảnh báo.*được lùi/)
    expect(card.recovery).toMatch(/hỗ trợ.*lực lượng chức năng/)
    expect(card.recovery).toMatch(/được phép rời.*phanh đỗ.*P với xe tự động.*đứng chắc.*trước khi mở cửa/)
    expect(card.recovery).toMatch(/không đứng giữa hai xe.*tường/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy, vùng quét và vùng kẹp.*mất liên lạc thì dừng/)
  })

  it('qualifies emergency duty/signals and tests a realistic stop instead of distance recall', () => {
    expect(card.safety).toMatch(/có tín hiệu.*đang làm nhiệm vụ.*giảm tốc.*lề phải.*dừng an toàn/)
    expect(card.safety).toMatch(/Không phải mọi xe cứu thương hay xe công vụ.*luôn.*ưu tiên/)
    expect(card.safety).toMatch(/cấp cứu và có tín hiệu ưu tiên/)
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Dừng sớm.*tiến vào.*đủ điều kiện.*giữ xe/)
    expect(answers[1]).toMatch(/Dừng hẳn và giữ xe, không lùi.*được phép.*hỗ trợ/)
    expect(card.quickCheck[1].isStopCondition).toBe(true)
    expect(card.quickCheck[2].prompt).toMatch(/đang làm nhiệm vụ cấp cứu có tín hiệu ưu tiên/)
    expect(answers[2]).toMatch(/lề phải.*dừng an toàn.*không lùi nguy hiểm/)
  })
})

describe('narrow-yield: actual illustration geometry', () => {
  it.each(card.assetIds)('%s has an actual opening, opposing headings and room for only one car', id => {
    const svg = readDiagram(id)
    const road = rects(group(svg, 'yield-road'))[0]
    const pocket = rects(group(svg, 'yield-pocket'))[0]
    expect(road).toEqual([126, 0, 64, 174])
    expect(pocket).toEqual([190, 70, 80, 88])
    expect(pocket[0]).toBe(road[0] + road[2])
    const walls = group(svg, 'yield-walls')
    const rightWalls = [...walls.matchAll(/d="M190 ([\d.]+)L190 ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
    expect(rightWalls).toEqual([[0, 70], [158, 174]])
    expect(walls).toContain('M190 70L270 70')
    expect(walls).toContain('M270 70L270 158')
    expect(walls).toContain('M270 158L190 158')
    expect(pose(svg, 'yield-ego')[2]).toBe(0)
    expect(pose(svg, 'yield-other')[2]).toBe(180)
    expect(rects(group(svg, 'yield-ego-mirrors'))).toEqual([[-19, -13, 4, 4], [15, -13, 4, 4]])
    expect(road[2]).toBeLessThan(2 * 38) // Combined width including mirrors.
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(getAsset(id)?.alt).toContain('không theo tỷ lệ')
    expect(svg).not.toContain('url(#tip)')
  })

  it('main stops both cars on the road and shows a pocket ahead/right, without a false path', () => {
    const svg = readDiagram('narrow-yield-main')
    const road = rects(group(svg, 'yield-road'))[0]
    for (const id of ['yield-ego', 'yield-other']) {
      expect(vehicleBoxes(svg, id).every(box => contains(road, box))).toBe(true)
    }
    const [x, y] = pose(svg, 'yield-ego')
    expect(x).toBeGreaterThan(road[0] + road[2] / 2)
    expect(pose(svg, 'yield-other')[0]).toBeLessThan(road[0] + road[2] / 2)
    const [px, py] = rects(group(svg, 'yield-pocket'))[0]
    expect(px).toBeGreaterThan(x)
    expect(py).toBeLessThan(y - 24)
    const egoFront = vehicleBoxes(svg, 'yield-ego')[0][1]
    const [, otherRear, , otherHeight] = vehicleBoxes(svg, 'yield-other')[0]
    expect(egoFront).toBeGreaterThan(otherRear + otherHeight)
    expect(svg).toContain('CẢ HAI DỪNG')
    expect(svg).not.toContain('marker-end=')
    expect(svg).not.toContain('yield-pass')
    expect(getAsset('narrow-yield-main')?.caption).toContain('không mặc định phải lùi')
  })

  it('variant fits all of ego in the pocket, leaving the road clear and the arrow facing down', () => {
    const svg = readDiagram('narrow-yield-var')
    const pocket = rects(group(svg, 'yield-pocket'))[0]
    const road = rects(group(svg, 'yield-road'))[0]
    expect(vehicleBoxes(svg, 'yield-ego').every(box => contains(pocket, box))).toBe(true)
    expect(vehicleBoxes(svg, 'yield-other').every(box => contains(road, box))).toBe(true)
    const movement = svg.match(/<path id="yield-pass" d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"[^>]+/)![0]
    const [, x1, y1, x2, y2] = movement.match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.map(Number)
    const [ox, oy] = pose(svg, 'yield-other')
    expect(x1).toBe(ox)
    expect(x2).toBe(ox)
    expect(y1).toBeGreaterThan(oy + 24)
    expect(y2).toBeGreaterThan(y1)
    expect(y2).toBeLessThan(174)
    expect(movement).toContain('stroke="#7e978c"')
    expect(movement).toContain('marker-end="url(#yield-pass-tip)"')
    expect(svg).toContain('<path d="M0 1L9 5L0 9Z" fill="#7e978c"/>')
    expect(svg.match(/marker-end=/g)).toHaveLength(1)
    expect(svg).toContain('GIỮ XE')
    expect(getAsset('narrow-yield-var')?.alt).toContain('không phải quỹ đạo bảo đảm xe lọt')
  })
})
