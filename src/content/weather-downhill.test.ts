import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getCardAssets, getChecklist, getLessonById, getReview } from './index'
import { contentReleases } from './version'

const card = getCardById('weather-downhill')!
const assets = getCardAssets(card.id)
const diagram = (role: 'main' | 'variant') =>
  readFileSync(resolve(process.cwd(), 'public', assets.find(asset => asset.role === role)!.url.slice(1)), 'utf8')
const instructions = card.steps.map(step => step.instruction).join(' ')
const spoken = `${instructions} ${card.safety}`
const visibleText = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)]
  .map(match => match[1]).join(' ')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing diagram group ${id}`).not.toBeNull()
  return match![1]
}

describe('weather-downhill: real-world decisions', () => {
  it('preserves stable identity and history without sample certification', () => {
    expect(card.lessonId).toBe('weather-slope')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.assetIds).toEqual(['weather-downhill-main', 'weather-downhill-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.2.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0', '1.2.0'])
    expect(card.changelog[0].date).toBe('2026-08-20')
    expect(contentReleases.find(release => release.version === '2026.10.19')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
  })

  it('prepares brakes and escape options before entering and refuses an unsafe descent', () => {
    expect(card.context).toMatch(/động cơ đốt trong.*mưa.*độ bám giảm/)
    expect(card.context).toMatch(/không bảo đảm tự giữ tốc độ/)
    expect(card.steps[0].instruction).toMatch(/lốp, phanh, đèn và gạt mưa.*hướng dẫn.*điểm dừng, đường cứu nạn theo biển/)
    expect(card.steps[0].instruction).toMatch(/Không vào dốc nếu phanh bất thường.*không chắc kiểm soát/)
  })

  it('controls road speed and spacing for actual conditions, not revs or universal gear numbers', () => {
    expect(card.steps[1].instruction).toMatch(/trước đỉnh dốc và trước cua.*biển, độ bám, tải xe và tầm nhìn/)
    expect(card.steps[1].instruction).toMatch(/đèn chiếu gần.*cự ly theo quy định.*tăng thêm.*dừng được.*nhìn rõ/)
    expect(card.steps[2].instruction).toMatch(/phù hợp trước dốc theo sách.*giảm tốc trước khi về số.*không ép số.*quá vòng tua/)
    expect(card.steps[2].instruction).toMatch(/đường trơn.*hạn chế.*không chủ động về số.*nhà sản xuất cấm/)
    expect(card.steps[2].cueText).toMatch(/Không có số L, 2.*chung/)
    expect(card.steps[3].instruction).toMatch(/tốc độ thực tế.*vòng tua không thay đồng hồ tốc độ/)
    expect(card.steps[5].instruction).toMatch(/giữ trong làn.*trước cua.*không cắt cua.*về số đột ngột/)
  })

  it('keeps normal braking distinct from emergency ABS braking in quick/audio sources', () => {
    expect(card.steps[4].instruction).toMatch(/Phanh chân sớm, tăng lực êm.*nhả khi đã giảm đủ.*vẫn kiểm soát/)
    expect(card.steps[4].instruction).toMatch(/không rà suốt dốc hay nhấp theo nhịp cố định/)
    expect(card.steps[4].instruction).toMatch(/phanh liên tục.*nơi dừng an toàn.*không cố đi tiếp/)
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/khẩn cấp|nguy hiểm tức thời/)
      expect(text).toMatch(/ABS.*đạp.*mạnh.*giữ lực.*không nhấp nhả/)
    }
    expect(card.steps[5].instruction).toMatch(/lái tránh trong khoảng trống an toàn/)
    expect(card.steps[5].cueText).toMatch(/ABS.*rung.*không bảo đảm quãng dừng ngắn hơn/)
    expect(spoken).not.toMatch(/từng nhịp ngắn|phanh chỉ điểm xuyết|Giữ tốc độ ổn định bằng vòng tua/)
  })

  it('does not misdiagnose soft brakes or require a smell before stopping', () => {
    expect(card.steps[6].instruction).toMatch(/mùi khét, bàn đạp mềm, hành trình tăng hoặc xe giảm tốc kém/)
    expect(card.steps[6].instruction).toMatch(/không chờ đủ mọi dấu hiệu/)
    expect(card.steps[6].cueType).toBe('feel')
    expect(card.steps[6].cueText).toMatch(/có thể không có mùi.*không chỉ là quá nhiệt/)
    expect(card.steps[6].instruction).toMatch(/phanh còn hiệu lực.*báo hiệu, quan sát.*giữ chắc xe.*gọi hỗ trợ kiểm tra trước khi đi tiếp/)
  })

  it('distinguishes a controlled safe stop from a runaway without an unsafe gear or parking-brake shortcut', () => {
    for (const text of [card.steps[7].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/không khống chế được tốc độ|tốc độ không khống chế được/)
      expect(text).toMatch(/cảnh báo.*đường cứu nạn có biển nếu tiếp cận.*an toàn/)
      expect(text).toMatch(/không tắt máy/i)
      expect(text).toMatch(/không chọn P|không tắt máy hoặc chọn P/i)
      expect(text).toMatch(/R khi.*chạy/)
      expect(text).toMatch(/giữ chắc xe/)
    }
    expect(card.steps[7].instruction).toMatch(/không cố chạy tới bãi nghỉ/)
    expect(card.steps[7].cueText).toMatch(/không phải chỗ nghỉ làm nguội phanh/)
    expect(card.recovery).toMatch(/Không ép về số thấp.*quá tua.*phanh đỗ khẩn cấp chỉ theo hướng dẫn riêng.*không giật phanh tay/)
    expect(card.recovery).toMatch(/không đứng phía xe có thể trôi.*Không đổ nước.*không chứng minh đã sửa.*kiểm tra trước khi đi tiếp/)
  })

  it('covers coasting and model-specific EV/hybrid limits without promising automatic descent control', () => {
    expect(card.steps[3].instruction).toMatch(/không về N.*không đạp giữ côn.*không tắt máy/)
    expect(card.safety).toMatch(/xe điện, hybrid.*tái sinh có thể giảm.*pin đầy, quá nóng hoặc lạnh.*dùng phanh chân/)
    expect(card.safety).toMatch(/không mặc định xe tự hãm/)
    expect(card.mnemonic.text).toMatch(/hãm đúng xe, phanh lỗi dừng/)
  })

  it('aligns the linked checklist with pre-descent checks and variable wet-road spacing', () => {
    expect(card.checklistId).toBe('bad_weather')
    const checklist = getChecklist(card.checklistId)!
    expect(checklist.items.map(item => item.id)).toEqual([
      'bw-visibility', 'bw-lights', 'bw-speed', 'bw-gap', 'bw-brake', 'bw-stop', 'bw-flood'
    ])
    expect(checklist.items.find(item => item.id === 'bw-gap')?.label).toMatch(/biển, tốc độ, độ bám và tầm nhìn/)
    expect(checklist.items.find(item => item.id === 'bw-gap')?.hint).toMatch(/quy định.*tăng thêm.*4–5 giây không phải.*bảo đảm/)
    expect(checklist.items.find(item => item.id === 'bw-brake')?.hint).toMatch(/trước khi xuống dốc.*phanh mềm, giảm hiệu lực.*dừng an toàn.*không chờ hết dốc/)
  })

  it('grades safe mode selection, braking and conditional emergency response', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Giảm tốc trước dốc.*sách hướng dẫn.*không về số.*cấm trên đường trơn/)
    expect(answers[1]).toMatch(/Phanh thường.*êm.*còn kiểm soát.*ABS.*giữ lực, không nhấp nhả/)
    expect(answers[2]).toMatch(/Còn kiểm soát.*dừng an toàn.*kiểm tra.*không khống chế được.*cảnh báo.*đường cứu nạn.*nếu.*an toàn/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('weather-downhill: illustration geometry and semantics', () => {
  it('puts both wheels tangent to the downhill road and the front at the lower end', () => {
    const svg = diagram('main')
    const [x1, y1, x2, y2] = group(svg, 'downhill-grade')
      .match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    const [cx, cy, degrees] = svg.match(/id="downhill-car" transform="translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)"/)!.slice(1).map(Number)
    const theta = degrees * Math.PI / 180
    const slope = (y2 - y1) / (x2 - x1)
    expect(x2).toBeGreaterThan(x1)
    expect(y2).toBeGreaterThan(y1)
    expect(Math.tan(theta)).toBeCloseTo(slope, 3)
    const wheels = [...group(svg, 'downhill-car').matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/g)]
    expect(wheels).toHaveLength(2)
    for (const wheel of wheels) {
      const [x, y, radius] = wheel.slice(1).map(Number)
      const wx = cx + x * Math.cos(theta) - y * Math.sin(theta)
      const wy = cy + x * Math.sin(theta) + y * Math.cos(theta)
      const roadY = y1 + (wx - x1) * slope
      const clearance = (roadY - wy) / Math.sqrt(1 + slope ** 2)
      expect(clearance).toBeGreaterThan(0)
      expect(clearance).toBeCloseTo(radius, 1)
    }
    const [ax, ay, bx, by] = group(svg, 'downhill-forward')
      .match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    const frontX = cx + 27 * Math.cos(theta)
    expect(ax).toBeGreaterThan(frontX)
    expect(bx).toBeGreaterThan(ax)
    expect(by).toBeGreaterThan(ay)
    expect((by - ay) / (bx - ax)).toBeCloseTo(slope, 3)
    expect(group(svg, 'downhill-forward')).toContain('marker-end="url(#tip)"')
  })

  it('labels heading, grade and limits without a universal gear or numeric gradient', () => {
    const svg = diagram('main')
    for (const label of ['CAO', 'THẤP', 'ĐẦU', 'ĐUÔI', 'ĐI XUỐNG', 'Không theo tỷ lệ', 'đường trơn có hạn chế']) {
      expect(visibleText(svg)).toContain(label)
    }
    expect(svg).not.toMatch(/L hoặc 2|\d+%|km\/h/)
    expect(assets[0].alt).toMatch(/nhìn ngang.*cao bên trái, thấp bên phải.*đầu xe.*bên phải.*hai bánh tiếp xúc/)
    expect(assets[0].alt).toMatch(/không phải quỹ đạo.*không có cấp số chung/)
  })

  it('replaces pulse dots and timing implications with two distinct braking cases', () => {
    const svg = diagram('variant')
    expect(group(svg, 'downhill-normal-braking')).toMatch(/Tăng lực êm.*nhả khi đã giảm đủ.*vẫn kiểm soát.*Không rà suốt dốc/)
    expect(group(svg, 'downhill-abs-emergency')).toMatch(/KHẨN CẤP VỚI ABS.*Đạp mạnh, giữ lực; không nhấp nhả.*không bảo đảm dừng ngắn hơn/)
    expect(visibleText(svg)).toContain('không phải biểu đồ nhịp phanh')
    expect(svg).not.toMatch(/<circle|marker-end=|lặp lại|Phanh từng nhịp/)
    const asset = assets.find(item => item.role === 'variant')!
    expect(asset.caption).toMatch(/Phanh thường khác phanh khẩn cấp với ABS/)
    expect(asset.alt).toMatch(/không phải biểu đồ thời gian, lực phanh hay chu kỳ/)
    expect(asset.alt).toMatch(/khung trên.*khung dưới/i)
  })
})
