import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset, getCardAssets } from './assets'
import { contentReleases } from './version'

const card = getCardById('highway-signs')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))
  expect(match, `missing SVG group ${id}`).not.toBeNull()
  return match![1]
}
const numbers = (value: string, pattern: RegExp) => {
  const match = value.match(pattern)
  expect(match).not.toBeNull()
  return match!.slice(1).map(Number)
}
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')

describe('highway-signs: real-world decisions', () => {
  it('preserves identities and history, without presenting demo approval as certification', () => {
    expect(card.lessonId).toBe('highway-entry')
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(card.assetIds).toEqual(['highway-signs-main', 'highway-signs-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'highway-signs-qc1', 'highway-signs-qc2', 'highway-signs-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.15')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('distinguishes signs and reads their lane, vehicle and effective scope throughout the route', () => {
    expect(card.steps[0].instruction).toMatch(/viền đỏ, nền trắng, số đen.*tối đa.*xanh lam, số trắng.*tối thiểu/)
    expect(card.steps[1].instruction).toMatch(/phân làn.*loại xe.*mũi tên làn.*biển phụ.*làn được phép/)
    expect(card.steps[1].instruction).toMatch(/không coi làn trái.*vượt giới hạn tốc độ/)
    expect(card.steps[2].instruction).toMatch(/liên tục, không chỉ tại nút giao.*biển điện tử.*biển tạm.*biển hết hạn chế.*người điều khiển/)
    expect(card.steps[2].instruction).toMatch(/phạm vi và vị trí hiệu lực.*biển phụ.*không tự coi qua nút giao.*tăng tốc/)
    expect(card.steps[2].cueText).toMatch(/không phải trí nhớ hay ứng dụng/)
  })

  it('puts minimum-speed exceptions in full/step audio and quick-mode sources', () => {
    for (const text of [card.steps[4].instruction, card.safety]) {
      expect(text).toMatch(/không vượt tốc độ tối đa/i)
      expect(text).toMatch(/tối thiểu.*thuận lợi và an toàn/)
      expect(text).toMatch(/ùn tắc, mưa trơn/i)
      expect(text).toMatch(/tầm nhìn.*chướng ngại/)
      expect(text).toMatch(/giảm tốc hoặc phanh.*dưới mức tối thiểu/)
    }
    expect(card.steps[4].cueText).toMatch(/trần, không phải mục tiêu/)
    expect(card.mnemonic.text).toMatch(/gặp nguy giảm tốc/)
    expect(card.mistakes.join(' ')).toMatch(/Cố giữ tốc độ tối thiểu/)
    expect(instructions).not.toMatch(/Giữ tốc độ trong khoảng giữa/)
  })

  it('adapts before the new limit applies, not after it or by changing lanes to evade it', () => {
    expect(card.steps[3].instruction).toMatch(/gương.*giảm tốc êm từ sớm.*ngay từ vị trí có hiệu lực/)
    expect(card.steps[3].instruction).toMatch(/không chờ qua biển.*đổi làn để né/)
    expect(card.steps[3].cueText).toMatch(/không có quãng phanh chung/)
    expect(card.steps[5].instruction).toMatch(/bên phải trong các làn được phép khi an toàn/)
    expect(card.steps[5].instruction).toMatch(/Sau khi vượt.*đủ khoảng hở, không tạt đầu/)
  })

  it('requires signaling, observation, a blind-spot recheck and safe adjacent-lane changes', () => {
    expect(card.steps[6].instruction).toMatch(/xi-nhan báo trước mỗi lần.*gương.*trước sau và hai bên/)
    expect(card.steps[6].instruction).toMatch(/điểm mù.*ngay trước.*liếc ngắn.*nhìn lại đường/)
    expect(card.steps[6].instruction).toMatch(/một làn liền kề.*vạch cho phép.*không cắt vạch liền.*ổn định.*quan sát lại.*tắt xi-nhan/)
    expect(card.steps[6].cueText).toMatch(/không tạo quyền ưu tiên/)
    for (const text of [card.recovery, card.safety]) {
      expect(text).toMatch(/gương và điểm mù/)
      expect(text).toMatch(/vạch cho phép/)
      expect(text).toMatch(/làn dừng khẩn cấp.*lề đường/)
      expect(text).toMatch(/không dừng đọc biển, lùi hay quay đầu/i)
      expect(text).toMatch(/đi tiếp/)
    }
    expect(card.steps[7].instruction).toMatch(/không phanh gấp.*dừng xem biển, lùi hay quay đầu/)
    expect(card.steps[7].cueText).toMatch(/Không đoán giới hạn cao hơn/)
    expect(card.recovery).toMatch(/phanh ngay khi cần tránh va chạm/)
    expect(card.recovery).toMatch(/sự cố.*gọi hỗ trợ/)
  })

  it('grades actual decisions including the unsafe minimum-speed trap', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/^Tối đa 80.*tối thiểu 60.*thuận lợi và an toàn.*không phải.*nguy hiểm$/)
    expect(answers[1]).toMatch(/^Giảm tốc hoặc phanh.*dưới mức tối thiểu.*không lách ra lề$/)
    expect(answers[2]).toMatch(/^Giảm tốc êm từ sớm.*vị trí hiệu lực.*làn phải được phép.*gương và điểm mù.*đủ hở.*vạch cho phép$/)
    expect(card.quickCheck[1].isStopCondition).toBe(true)
  })
})

describe('highway-signs: actual diagram geometry and meaning', () => {
  it('uses distinct maximum and minimum sign colors/numbers and keeps the safety condition visible', () => {
    const svg = readDiagram('highway-signs-main')
    const maximum = group(svg, 'signs-maximum')
    const minimum = group(svg, 'signs-minimum')
    expect(maximum).toContain('fill="#fff"')
    expect(maximum).toContain('stroke="#d22"')
    expect(maximum).toMatch(/fill="#111"[^>]*>80</)
    expect(minimum).toContain('fill="#1956aa"')
    expect(minimum).not.toContain('stroke="#d22"')
    expect(minimum).toMatch(/fill="#fff"[^>]*>60</)
    expect(svg).toContain('KHI THUẬN LỢI, AN TOÀN')
    expect(svg).toContain('GẶP NGUY: GIẢM TỐC')
    expect(svg).not.toContain('GỘP LÀN')
  })

  it.each(['highway-signs-main', 'highway-signs-var'])('%s keeps the whole car and straight forward arrow on pavement', id => {
    const svg = readDiagram(id)
    const [x, y, width, height] = numbers(group(svg, 'signs-road'),
      /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)
    const [cx, cy, rotation] = numbers(group(svg, 'signs-car'),
      /translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)
    const [localX, localY, carWidth, carLength] = numbers(group(svg, 'signs-car'),
      /<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)
    expect(rotation).toBe(90)
    // For a 90-degree pose, local car length is the road's horizontal footprint.
    expect(cx - (localY + carLength)).toBeGreaterThan(x)
    const nose = cx - localY
    expect(nose).toBeLessThan(x + width)
    expect(cy + localX).toBeGreaterThan(y)
    expect(cy + localX + carWidth).toBeLessThan(y + height)
    const [startX, startY, endX, endY] = numbers(group(svg, 'signs-travel'),
      /d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)
    expect(startX).toBeGreaterThanOrEqual(nose)
    expect(startX - nose).toBeLessThanOrEqual(2)
    expect(endX).toBeGreaterThan(startX)
    expect(endX).toBeLessThan(x + width - 10)
    expect(startY).toBe(cy)
    expect(endY).toBe(cy)
    expect(group(svg, 'signs-travel')).toContain('marker-end="url(#tip)"')
  })

  it('puts the approaching vehicle upstream of a sign-aligned effective position and new-limit region', () => {
    const svg = readDiagram('highway-signs-var')
    const [signX, signY, radius] = numbers(group(svg, 'signs-new-maximum'),
      /cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/)
    const [refX, refY, endX, endY] = numbers(group(svg, 'signs-effective-position'),
      /d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)
    expect(refX).toBe(signX)
    expect(endX).toBe(signX)
    expect(refY).toBe(signY + radius)
    const [regionX, regionY, regionWidth, regionHeight] = numbers(group(svg, 'signs-new-limit-region'),
      /x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)
    expect([regionX, regionY, regionWidth, regionHeight]).toEqual([refX, 76, 320 - refX, 52])
    expect(endY).toBeGreaterThan(regionY + regionHeight)
    const [cx] = numbers(group(svg, 'signs-car'), /translate\(([\d.]+) ([\d.]+)\)/)
    expect(cx + 16).toBeLessThan(refX)
    const [startX, , pathEndX] = numbers(group(svg, 'signs-travel'),
      /d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)
    expect(startX).toBeLessThan(refX)
    expect(pathEndX).toBeGreaterThan(refX)
    expect(svg).toContain('≤ 60 TỪ BIỂN')
    expect(svg).toContain('không phải vạch đường')
    const visibleText = [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(match => match[1]).join(' ')
    expect(visibleText).toContain('không có quãng phanh chung')
  })

  it('explains independent examples, conditional minimum and reference line without claiming steering distances', () => {
    const [main, variant] = getCardAssets(card.id)
    expect(main.alt).toMatch(/không theo tỷ lệ hay mô tả cách đặt biển.*80.*60.*thuận lợi và an toàn/)
    expect(main.alt).toMatch(/dưới mức tối thiểu.*sang phải.*đi thẳng/)
    expect(variant.alt).toMatch(/Ví dụ riêng.*trước biển.*không có biển phụ/)
    expect(variant.alt).toMatch(/không phải vạch đường hay lệnh dừng/)
    expect(variant.alt).toMatch(/không có quãng phanh/)
  })
})
