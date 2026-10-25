import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getReview } from './index'
import { getAsset } from './assets'

const card = getCardById('parking-align')!
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const segments = (svg: string) => [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)]
  .map(match => match.slice(1).map(Number))

describe('parking-align: thực tế và an toàn', () => {
  it('giữ mã và checklist, công bố rõ chưa thẩm định độc lập', () => {
    expect(card.id).toBe('parking-align')
    expect(card.checklistId).toBe('post_park')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.risk).toBe('medium')
    expect(card.changelog.at(-1)?.version).toBe(card.version)
  })

  it('phân biệt song song và vị trí ngang, không dùng mốc centimet cố định', () => {
    const instructions = card.steps.map(step => step.instruction).join(' ')
    expect(instructions).toMatch(/dọc cả đầu và đuôi/)
    expect(instructions).toMatch(/phần thân xe nhìn thấy.*kết hợp quan sát trực tiếp/)
    expect(instructions).toMatch(/không suy ra song song/)
    expect(instructions).toMatch(/nếu vẫn lệch về một bên, dừng/)
    expect(instructions).toMatch(/cản sau/)
    expect(instructions).toMatch(/vật cản thấp/)
    expect(instructions).toMatch(/cả đầu xe nằm trong ô/)
    expect(instructions).not.toMatch(/\d+\s*cm|nửa thân xe/)
    expect(card.recovery).not.toMatch(/nửa thân xe|tối đa hai|số D/)
  })

  it('yêu cầu quan sát, dừng, đổi chiều an toàn và giữ xe trước khi mở cửa', () => {
    const instructions = card.steps.map(step => step.instruction).join(' ')
    expect(instructions).toMatch(/nhìn trực tiếp.*điểm mù/)
    expect(instructions).toMatch(/camera và cảm biến chỉ hỗ trợ/)
    expect(instructions).toMatch(/dừng ngay.*không còn chắc/)
    expect(card.steps[6].cueText).toMatch(/không đổi chiều hoặc chọn P khi xe còn lăn/i)
    expect(instructions).toMatch(/phanh đỗ.*số tự động.*số sàn/)
    expect(instructions).toMatch(/ngoái nhìn.*người đi bộ, xe đạp, xe máy/)
    expect(card.recovery).toMatch(/^Dừng hẳn.*trước khi đổi chiều/)
    expect(card.recovery).toMatch(/Chỉ tiến.*nhìn rõ/)
    expect(card.safety).toMatch(/Dừng ngay khi mất tầm nhìn/)
  })

  it('đáp án đúng kiểm tra song song, cản sau và điều kiện dừng', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/dọc cả đầu và đuôi/)
    expect(answers[1]).toMatch(/cản sau.*toàn bộ xe/)
    expect(answers[2]).toMatch(/^Dừng hẳn.*an toàn/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(answers.join(' ')).not.toMatch(/\d+\s*cm/)
  })
})

describe('parking-align: hình học sơ đồ', () => {
  it.each(['parking-align-main', 'parking-align-var'])('%s có xe gọn giữa ô mở, đầu hướng ra lối đi', id => {
    const svg = readDiagram(id)
    const bay = segments(group(svg, 'alignment-bay'))
    expect(bay).toEqual([[120, 24, 120, 134], [200, 24, 200, 134], [120, 24, 200, 24]])
    const vehicle = group(svg, 'alignment-car')
    const transform = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
    const body = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
    const [cx, cy, rotation] = transform
    const [x, y, width, height] = body
    expect(rotation).toBe(180)
    expect(x).toBe(-width / 2)
    expect(y).toBe(-height / 2)
    expect(cx - width / 2 - bay[0][0]).toBe(bay[1][0] - cx - width / 2)
    expect(cy - height / 2).toBeGreaterThan(bay[0][1])
    expect(cy + height / 2).toBeLessThan(bay[0][3])
    expect(svg).toContain('y="38"')
    expect(svg).toContain('>ĐUÔI</text>')
    expect(svg).toContain('>ĐẦU</text>')
    expect(svg).not.toMatch(/marker-end=|\d+\s*cm/)
    expect(getAsset(id)?.alt).toMatch(/đầu xe/i)
  })

  it('hai kích thước bằng nhau kết thúc đúng mép thân và vạch, không kéo sang ô khác', () => {
    const svg = readDiagram('parking-align-main')
    const horizontal = segments(group(svg, 'alignment-gaps')).filter(([, y1, , y2]) => y1 === y2)
    expect(horizontal).toEqual([[120, 84, 140, 84], [180, 84, 200, 84]])
    expect(horizontal[0][2] - horizontal[0][0]).toBe(horizontal[1][2] - horizontal[1][0])
    expect(svg).toContain('không theo tỷ lệ')
    expect(getAsset('parking-align-main')?.alt).toMatch(/không phải mốc đo cố định/)
  })

  it('hướng nhìn bắt đầu ở gương gần đầu xe và hướng về vạch phía đuôi, không tô vùng phủ giả', () => {
    const svg = readDiagram('parking-align-var')
    const sightlines = group(svg, 'mirror-sightlines')
    expect(segments(sightlines)).toEqual([[137.5, 104, 120, 50], [182.5, 104, 200, 50]])
    for (const [, y1, , y2] of segments(sightlines)) expect(y2).toBeLessThan(y1)
    expect(svg).toContain('x="135" y="102" width="5" height="4"')
    expect(svg).toContain('x="180" y="102" width="5" height="4"')
    expect(sightlines).not.toMatch(/fill=|marker-end=|rotate\(/)
    expect(svg).toContain('không là quỹ đạo')
    expect(getAsset('parking-align-var')?.alt).toMatch(/không mô tả đầy đủ vùng thấy/)
  })
})
