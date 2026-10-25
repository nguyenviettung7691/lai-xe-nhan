import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset, getCardAssets } from './assets'
import { contentReleases } from './version'

const card = getCardById('highway-gap')!
const diagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))
  expect(match, `missing SVG group ${id}`).not.toBeNull()
  return match![1]
}
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const pose = (svg: string, id: string) => {
  const vehicle = group(svg, id)
  const [x, y, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [, , width, length] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  expect(rotation).toBe(90)
  return { x, y, front: x + length / 2, rear: x - length / 2, top: y - width / 2, bottom: y + width / 2 }
}

describe('highway-gap: real-world decisions', () => {
  it('preserves identities/history without claiming independent certification', () => {
    expect(card.lessonId).toBe('highway-flow')
    expect(card.assetIds).toEqual(['highway-gap-main', 'highway-gap-var'])
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'highway-gap-qc1', 'highway-gap-qc2', 'highway-gap-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.16')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('states legal speed bands with correct endpoints, distances and dry-road conditions', () => {
    const legal = card.steps[0].instruction
    expect(legal).toMatch(/biển cự ly tối thiểu/)
    expect(legal).toMatch(/khô, không trơn, thẳng, bằng phẳng và tầm nhìn tốt/)
    expect(legal).toMatch(/đúng 60 km\/h.*35 m/)
    const bands = [...legal.matchAll(/trên (\d+) đến (\d+) km\/h: (\d+) m/g)]
      .map(match => match.slice(1).map(Number))
    expect(bands).toEqual([[60, 80, 55], [80, 100, 70], [100, 120, 100]])
    expect(legal).toMatch(/Dưới 60 km\/h.*mật độ.*thực tế, không mặc định 35 m/)
    expect(card.steps[0].cueText).toMatch(/38\/2024\/TT-BGTVT, Điều 11.*không phải quãng dừng chung/)
    expect(card.context).not.toMatch(/mét để dừng/)
    expect(card.mistakes[0]).not.toMatch(/^Ước lượng khoảng cách bằng mét/)
  })

  it('qualifies the three-second reference in instruction and quick/full-audio safety sources', () => {
    expect(card.steps[1].instruction).toMatch(/khô ráo.*ít nhất ba giây.*tham khảo bổ sung/)
    expect(card.steps[1].instruction).toMatch(/đủ cự ly theo biển và tốc độ.*lớn hơn nếu cần/)
    expect(card.steps[1].instruction).toMatch(/không phải mức tối thiểu pháp luật chung.*bảo đảm dừng kịp/)
    const dryDistanceAt120 = 120 / 3.6 * 3
    expect(dryDistanceAt120).toBeCloseTo(100, 8)
    expect(card.steps[1].cueText).toMatch(/120 km\/h.*100 m.*chưa có dự phòng/)
    expect(card.safety).toMatch(/Ba giây chỉ là mốc tham khảo.*không thay thế số mét.*bảo đảm/)
    expect(card.mnemonic.text).not.toMatch(/đếm năm/)
  })

  it('measures actual seconds from lead rear to ego front at the same fixed reference', () => {
    expect(card.steps[2].instruction).toMatch(/mốc cố định.*đuôi xe trước.*đầu xe mình.*cùng mốc/)
    expect(card.steps[2].instruction).toMatch(/đủ từng giây, không đếm ba nhịp nhanh/)
    expect(card.steps[2].instruction).toMatch(/liếc ngắn.*phía trước.*không nhìn đồng hồ hay điện thoại/)
  })

  it('doubles the dry reference to at least six seconds, with no wet-road guarantee or cap', () => {
    for (const text of [card.steps[4].instruction, card.safety]) {
      expect(text).toMatch(/ít nhất.*gấp đôi|ít nhất tăng gấp đôi/)
      expect(text).toMatch(/ba.*ít nhất sáu giây.*có thể cần/)
      expect(text).toMatch(/lớn hơn trị số trên biển hoặc bảng/)
      expect(text).toMatch(/trơn.*quanh co.*đèo dốc.*tầm nhìn hạn chế/)
      expect(text).toMatch(/giảm tốc/)
    }
    expect(card.steps[4].instruction).toMatch(/không coi sáu giây là đủ/)
    expect(card.steps[4].cueText).toMatch(/không phải công thức pháp luật hay giới hạn tối đa/)
    expect(card.steps[5].instruction).toMatch(/dừng trong phần đường nhìn rõ là trống/)
    expect(card.steps[5].instruction).toMatch(/xe lớn che tầm nhìn.*không dựa hoàn toàn.*ga tự động thích ứng/)
  })

  it('rebuilds gaps smoothly but preserves immediate emergency braking throughout', () => {
    for (const text of [card.steps[3].instruction, card.steps[6].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/êm khi có thể|phanh êm.*khi có thể/)
      expect(text).toMatch(/phanh ngay.*va chạm|va chạm.*phanh ngay/)
    }
    expect(card.steps[3].instruction).toMatch(/phía trước và gương.*không phanh gấp chỉ để chỉnh cự ly/)
    expect(card.steps[6].instruction).toMatch(/đổi tốc độ, vượt, chuyển làn hoặc xe khác chen/)
    expect(card.steps[6].instruction).toMatch(/không tăng tốc chặn.*đánh lái đột ngột.*làn dừng khẩn cấp.*lề đường/)
    expect(card.recovery).toMatch(/không chờ đếm xong hay chỉ nhả ga/)
    expect(card.recovery).toMatch(/gương, điểm mù.*trước sau.*báo hiệu và vạch cho phép/)
  })

  it('grades timing/legal compliance, adverse conditions and emergency decisions, not rote fixed gaps', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/^Đếm đủ giây từ đuôi xe trước đến đầu xe mình qua cùng mốc.*biển.*tốc độ, điều kiện đường$/)
    expect(answers[1]).toMatch(/^Tăng lên ít nhất sáu giây, có thể hơn.*lớn hơn biển hoặc bảng.*giảm tốc.*độ bám, tầm nhìn$/)
    expect(answers[2]).toMatch(/^Phanh ngay.*tránh va chạm.*không chờ đếm xong.*không đánh lái đột ngột$/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('highway-gap: actual illustration geometry', () => {
  const main = diagram('highway-gap-main')
  const rain = diagram('highway-gap-var')

  it.each([
    ['gap-start', main], ['gap-end', main], ['gap-rain', rain]
  ])('%s keeps both right-facing cars wholly inside one lane and aligns arrows with their noses', (id, svg) => {
    const lane = group(svg, `${id}-lane`)
      .match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
    const [left, top, width, height] = lane
    const cars = ['ego', 'lead'].map(role => pose(svg, `${id}-${role}`))
    const arrows = segments(group(svg, `${id}-direction`))
    expect(arrows).toHaveLength(2)
    cars.forEach((car, index) => {
      expect(car.rear).toBeGreaterThan(left)
      expect(car.front).toBeLessThan(left + width)
      expect(car.top).toBeGreaterThan(top)
      expect(car.bottom).toBeLessThan(top + height)
      const [x1, y1, x2, y2] = arrows[index]
      expect(x1).toBeGreaterThan(car.front)
      expect(y1).toBe(car.y)
      expect(y2).toBe(y1)
      expect(x2).toBeGreaterThan(x1)
      expect(x2).toBeLessThan(320)
    })
    expect(cars[0].y).toBe(cars[1].y)
    expect(cars[0].front).toBeLessThan(cars[1].rear)
    const [start, , end] = segments(group(svg, `${id}-clearance`))[0]
    expect(start).toBe(cars[0].front)
    expect(end).toBe(cars[1].rear)
  })

  it('starts at the lead rear, ends at the ego front and uses the same stationary reference', () => {
    const startMarker = segments(group(main, 'gap-start-marker'))[0]
    const endMarker = segments(group(main, 'gap-end-marker'))[0]
    expect(startMarker[0]).toBe(startMarker[2])
    expect(endMarker[0]).toBe(endMarker[2])
    expect(startMarker[0]).toBe(endMarker[0])
    const initialLead = pose(main, 'gap-start-lead')
    const initialEgo = pose(main, 'gap-start-ego')
    const finalLead = pose(main, 'gap-end-lead')
    const finalEgo = pose(main, 'gap-end-ego')
    expect(initialLead.rear).toBe(startMarker[0])
    expect(initialEgo.front).toBeLessThan(startMarker[0])
    expect(finalEgo.front).toBe(endMarker[0])
    expect(finalLead.rear).toBeGreaterThan(endMarker[0])
    expect(finalLead.x - initialLead.x).toBe(finalEgo.x - initialEgo.x)
    expect(main).toContain('1. ĐUÔI QUA MỐC: BẮT ĐẦU ĐẾM')
    expect(main).toContain('2. ĐẦU TỚI CÙNG MỐC: ≥ 3 s (KHÔ)')
    expect(main).toContain('Đếm đủ giây')
  })

  it('shows rain and a larger actual clearance without equating pixels with seconds or metres', () => {
    const dryClearance = pose(main, 'gap-start-lead').rear - pose(main, 'gap-start-ego').front
    const wetClearance = pose(rain, 'gap-rain-lead').rear - pose(rain, 'gap-rain-ego').front
    expect(wetClearance).toBeGreaterThan(dryClearance)
    const bracketY = segments(group(rain, 'gap-rain-clearance'))[0][1]
    expect(bracketY - 7 - 8.5).toBeGreaterThan(104)
    expect(rain).toContain('id="gap-rain-cues"')
    expect(rain).toContain('TỪ 3 s KHÔ → ÍT NHẤT 6 s')
    expect(rain).toContain('CÓ THỂ CẦN HƠN; GIẢM TỐC KHI CẦN')
    expect(rain).toContain('sáu giây không bảo đảm an toàn')
    expect(rain).not.toMatch(/4–5|bốn đến năm|nhân đôi khoảng cách và bật đèn/)
    for (const svg of [main, rain]) {
      expect(svg).toContain('Không theo tỷ lệ')
      expect(svg).toContain('theo biển')
    }
  })

  it('keeps captions and accessible descriptions consistent with timing, direction and qualifications', () => {
    const assets = getCardAssets(card.id)
    expect(assets).toHaveLength(2)
    for (const asset of assets) {
      expect(asset.alt).toMatch(/không theo tỷ lệ/)
      expect(asset.alt).toMatch(/sang phải/)
      expect(asset.alt).toMatch(/biển/)
      expect(asset.alt).toMatch(/Dấu ngoặc|dấu ngoặc/)
    }
    expect(assets[0].alt).toMatch(/đuôi xe trước.*hình trên.*đầu xe mình.*hình dưới/)
    expect(assets[0].alt).toMatch(/không phải vạch dừng/)
    expect(assets[0].alt).toMatch(/không quy đổi độ dài hình thành giây hay mét/)
    expect(assets[1].caption).toMatch(/ít nhất sáu giây, có thể cần hơn/)
    expect(assets[1].alt).toMatch(/Sáu giây không bảo đảm an toàn/)
  })
})
