import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getCardAssets, getChecklist, getLessonById, getReview } from './index'
import { contentReleases } from './version'

const card = getCardById('weather-uphill-start')!
const assets = getCardAssets(card.id)
const diagram = (role: 'main' | 'variant') =>
  readFileSync(resolve(process.cwd(), 'public', assets.find(asset => asset.role === role)!.url.slice(1)), 'utf8')
const instructions = card.steps.map(step => step.instruction).join(' ')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing diagram group ${id}`).not.toBeNull()
  return match![1]
}
const segment = (svg: string) =>
  svg.match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
const visibleText = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)]
  .map(match => match[1]).join(' ')
const pose = (svg: string) => {
  const [cx, cy, degrees] = svg.match(/id="uphill-start-car" transform="translate\(([\d.]+) ([\d.]+)\) rotate\((-?[\d.]+)\)"/)!.slice(1).map(Number)
  const theta = degrees * Math.PI / 180
  const corners = [-27, 27].flatMap(x => [-11, 11].map(y => cx + x * Math.cos(theta) - y * Math.sin(theta)))
  return { cx, cy, theta, rear: Math.min(...corners), front: Math.max(...corners) }
}

describe('weather-uphill-start: real-world operation', () => {
  it('preserves identities and original history without claiming sample certification', () => {
    expect(card.lessonId).toBe('weather-slope')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.assetIds).toEqual(['weather-uphill-start-main', 'weather-uphill-start-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(contentReleases.find(release => release.version === '2026.10.20')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('defines an automatic supported-start example, not a universal handbrake or clutch technique', () => {
    expect(card.context).toMatch(/xe số tự động.*hỗ trợ giữ xe.*đã được hướng dẫn.*theo sách xe/)
    expect(card.context).toMatch(/vẫn có thể trôi.*không hoạt động hoặc hết thời gian giữ/)
    expect(card.safety).toMatch(/không thay bài tập côn và phanh tay của xe số sàn/)
    expect(instructions).not.toMatch(/chồm về trước|Nhả phanh tay từ từ trong khi giữ đều chân ga/)
  })

  it('holds with brakes, leaves situational space and resists pressure from a close follower', () => {
    expect(card.steps[0].instruction).toMatch(/phanh chân.*dừng hẳn và giữ xe.*phanh đỗ.*theo sách xe.*không giữ xe bằng ga/)
    expect(card.steps[0].instruction).toMatch(/khoảng trống phía trước theo dốc, độ bám và khả năng dừng.*không theo mốc/)
    expect(card.steps[0].cueText).toMatch(/dây an toàn đã cài và cửa đã đóng/)
    expect(card.steps[1].instruction).toMatch(/Cài D khi xe đứng hẳn, chân phải còn giữ phanh.*sẵn sàng.*đúng số/)
    expect(card.steps[1].instruction).toMatch(/Không coi D là khóa chống trôi.*không nhả phanh.*xe sau thúc giục/)
    expect(card.safety).not.toMatch(/ít nhất một thân xe/)
  })

  it('checks all around, yields and rechecks before moving, without fixing attention on the rear mirror', () => {
    expect(card.steps[2].instruction).toMatch(/phía trước, hai bên, gương và điểm mù.*nhường người đi bộ, xe máy/i)
    expect(card.steps[2].instruction).toMatch(/từ lề nhập dòng xe, báo hiệu khi cần và kiểm tra lại ngay trước khi đi/)
    expect(card.steps[2].instruction).toMatch(/chưa đủ khoảng trống thì giữ phanh chờ/)
    expect(card.steps[2].cueText).toMatch(/Gương và camera chỉ hỗ trợ/)
    expect(card.steps[5].instruction).toMatch(/trong làn.*phía trước là chính.*chuyển động thực tế.*liếc gương ngắn.*không nhìn chằm chằm gương sau/)
  })

  it('distinguishes temporary HSA from Auto Hold, EPB and a mechanical lever, and declines unsupported trials', () => {
    for (const text of [card.steps[3].instruction, card.safety]) {
      expect(text).toMatch(/HSA chỉ giữ tạm thời.*có thể không kích hoạt/)
      expect(text).toMatch(/theo sách|sách hướng dẫn/)
    }
    expect(card.steps[3].instruction).toMatch(/không có hỗ trợ phù hợp.*giữ phanh, nhờ giáo viên.*nơi tập an toàn.*không tự thử giữa dòng xe/)
    expect(card.steps[3].instruction).toContain('không thay phanh đỗ khi đỗ xe')
    expect(card.steps[3].cueText).toMatch(/đèn chờ không đồng nghĩa đã giữ xe.*EPB không nhả dần như cần phanh tay cơ/)
    expect(card.safety).toMatch(/Auto Hold, EPB và phanh tay cơ.*khác nhau/)
    expect(card.steps[4].cueText).toMatch(/Không có số giây chờ, mức ga hay vòng tua chung/)
  })

  it('explains right-foot transfer, smooth propulsion and model-specific parking-brake release', () => {
    expect(card.steps[4].instruction).toMatch(/Chuyển chân phải từ phanh sang ga chỉ khi đã sẵn sàng đi, đường trống.*theo sách xe/)
    expect(card.steps[4].instruction).toMatch(/tăng ga êm.*sẵn sàng trở lại phanh/)
    expect(card.steps[4].instruction).toMatch(/Nhả phanh đỗ đúng quy trình.*không mặc định mọi xe cho phép đạp ga khi phanh đỗ còn giữ/)
    expect(card.steps[4].instruction).toMatch(/không đạp đồng thời ga và phanh chân/)
    expect(card.steps[5].instruction).toMatch(/phanh đỗ đã nhả.*còn cảnh báo.*nhả ga và đạp phanh dừng lại.*không tăng ga để thắng phanh/)
  })

  it('keeps immediate stop and secure-before-retry guidance in quick/audio sources and recovery', () => {
    for (const text of [card.steps[6].instruction, card.safety, card.recovery]) {
      expect(text).toMatch(/nhả ga.*đạp phanh chân.*dừng/i)
      expect(text).toMatch(/không chọn P|không thêm ga hoặc chọn P/i)
      expect(text).toMatch(/R khi.*chuyển động/)
      expect(text).toMatch(/dừng hẳn|đứng hẳn/)
      expect(text).toMatch(/đánh giá lại|kiểm tra khoảng trống/)
    }
    expect(card.steps[6].instruction).toMatch(/trôi ngược, trượt bánh.*có người, xe.*không tăng ga để cứu trôi/)
    expect(card.steps[6].instruction).toMatch(/chỉ sau khi dừng hẳn mới giữ chắc.*phanh đỗ/)
    expect(card.steps[6].cueText).toMatch(/Chưa rõ nguyên nhân.*không khởi hành lại/)
    expect(card.recovery).toMatch(/không mặc định cứ làm lại là an toàn/)
  })

  it('stops repeated slipping or overheating attempts, warns others and never exits an unsecured car', () => {
    for (const text of [card.steps[7].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/lặp lại/)
      expect(text).toMatch(/cảnh báo.*phanh|phanh.*cảnh báo/)
      expect(text).toMatch(/mùi khét/)
      expect(text).toMatch(/dừng thử.*gọi hỗ trợ|gọi hỗ trợ.*dừng thử/i)
      expect(text).toMatch(/không rời vị trí lái/i)
      expect(text).toMatch(/giữ chắc/)
    }
    expect(card.steps[7].instruction).toMatch(/không giữ được xe, cảnh báo người xung quanh.*hướng dẫn khẩn cấp/)
    expect(card.steps[7].cueText).toMatch(/Không để ai đứng phía thấp.*chèn, đẩy xe/)
    expect(card.recovery).toMatch(/không nhờ ai đứng phía thấp, chèn hoặc đẩy xe chưa giữ chắc/i)
  })

  it('grades safe readiness, equipment limits and braking rather than accelerating to save rollback', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Giữ phanh.*đường trống và điểm mù.*đúng số.*theo sách xe.*chưa chắc.*giữ xe/)
    expect(answers[1]).toMatch(/HSA chỉ giữ tạm thời.*có thể không kích hoạt.*Auto Hold và EPB.*đèn chờ không bảo đảm/)
    expect(answers[2]).toMatch(/Nhả ga, đạp phanh chân dừng hẳn và giữ xe.*không chọn P, R khi đang chạy.*giữ chắc.*lỗi lặp lại.*gọi hỗ trợ/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(card.mnemonic.text).toMatch(/trôi thì phanh/)
    expect(card.checklistId).toBe('bad_weather')
    expect(getChecklist(card.checklistId)?.items.map(item => item.id)).toEqual([
      'bw-lights', 'bw-speed', 'bw-gap', 'bw-brake', 'bw-stop'
    ])
  })
})

describe('weather-uphill-start: actual diagram geometry', () => {
  it.each(['main', 'variant'] as const)('%s has an uphill-right car with both wheels tangent to the same grade', role => {
    const svg = diagram(role)
    const [x1, y1, x2, y2] = segment(group(svg, 'uphill-start-grade'))
    const { cx, cy, theta } = pose(svg)
    const slope = (y2 - y1) / (x2 - x1)
    expect(x2).toBeGreaterThan(x1)
    expect(y2).toBeLessThan(y1)
    expect(Math.tan(theta)).toBeCloseTo(slope, 3)
    const wheels = [...group(svg, 'uphill-start-car').matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/g)]
    expect(wheels).toHaveLength(2)
    for (const wheel of wheels) {
      const [x, y, radius] = wheel.slice(1).map(Number)
      const wx = cx + x * Math.cos(theta) - y * Math.sin(theta)
      const wy = cy + x * Math.sin(theta) + y * Math.cos(theta)
      const roadY = y1 + (wx - x1) * slope
      expect((roadY - wy) / Math.sqrt(1 + slope ** 2)).toBeCloseTo(radius, 1)
      expect(wx).toBeGreaterThan(x1)
      expect(wx).toBeLessThan(x2)
    }
    for (const text of ['THẤP', 'CAO', 'ĐẦU', 'ĐUÔI', 'Không theo tỷ lệ']) {
      expect(visibleText(svg)).toContain(text)
    }
    expect(visibleText(svg)).not.toMatch(/\d+%|\d+ giây|km\/h/)
    expect(group(svg, 'uphill-start-car')).toContain('x="22" y="-6"')
  })

  it('draws the forward arrow wholly ahead of the car, parallel to the grade and conditional', () => {
    const svg = diagram('main')
    const [ax, ay, bx, by] = segment(group(svg, 'uphill-start-forward'))
    expect(ax).toBeGreaterThan(pose(svg).front)
    expect(bx).toBeGreaterThan(ax)
    expect(by).toBeLessThan(ay)
    expect((by - ay) / (bx - ax)).toBeCloseTo(Math.tan(pose(svg).theta), 3)
    expect(group(svg, 'uphill-start-forward')).toContain('stroke="#b7f36b"')
    expect(group(svg, 'uphill-start-forward')).toContain('marker-end="url(#tip)"')
    expect(visibleText(svg)).toContain('CHỈ TIẾN KHI AN TOÀN')
    expect(visibleText(svg)).toContain('Hỗ trợ giữ xe có giới hạn')
    expect(svg).not.toContain('id="uphill-start-rollback"')
    expect(assets.find(asset => asset.role === 'main')?.alt).toMatch(/hướng tiến có điều kiện.*không phải xe đang tự bò.*không quy định/)
  })

  it('shows only conditional rollback wholly behind the same rear with matching hazard shaft and arrowhead', () => {
    const svg = diagram('variant')
    const main = diagram('main')
    expect(pose(svg)).toEqual(pose(main))
    expect(group(svg, 'uphill-start-grade')).toBe(group(main, 'uphill-start-grade'))
    const motion = group(svg, 'uphill-start-rollback')
    const [ax, ay, bx, by] = segment(motion)
    expect(ax).toBeLessThan(pose(svg).rear)
    expect(bx).toBeLessThan(ax)
    expect(by).toBeGreaterThan(ay)
    expect((by - ay) / (bx - ax)).toBeCloseTo(Math.tan(pose(svg).theta), 3)
    expect(motion).toContain('stroke="#ff8a6b"')
    expect(motion).toContain('stroke-dasharray="4 4"')
    expect(motion).toContain('marker-end="url(#uphill-start-rollback-tip)"')
    const marker = svg.match(/<marker id="uphill-start-rollback-tip"[\s\S]*?<\/marker>/)![0]
    expect(marker).toContain('fill="#ff8a6b"')
    expect(svg).not.toContain('id="uphill-start-forward"')
    expect(visibleText(svg)).toMatch(/NGUY CƠ TRÔI.*CÓ THỂ TRÔI.*nhả ga, phanh chân; không thêm ga/)
    expect(assets.find(asset => asset.role === 'variant')?.alt).toMatch(/hoàn toàn sau đuôi.*không phải lệnh lùi.*không thêm ga hoặc chọn P, R/)
  })
})
