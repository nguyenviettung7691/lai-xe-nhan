import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getCardAssets, getChecklist, getLessonById, getReview } from './index'
import { contentReleases } from './version'

const card = getCardById('weather-engine-brake')!
const assets = getCardAssets(card.id)
const readAsset = (url: string) => readFileSync(resolve(process.cwd(), 'public', url.slice(1)), 'utf8')
const diagram = (role: 'main' | 'variant') => readAsset(assets.find(asset => asset.role === role)!.url)
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing diagram group ${id}`).not.toBeNull()
  return match![1]
}
const visibleText = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]).join(' ')
const segment = (svg: string) => svg.match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)

describe('weather-engine-brake: real-world operation', () => {
  it('preserves identities/history with transparent publication and high downhill-control risk', () => {
    expect(card.lessonId).toBe('weather-slope')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.assetIds).toEqual(['weather-engine-brake-main', 'weather-engine-brake-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.risk).toBe('high')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.21')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('frames engine braking as assistance, not guaranteed speed control or a substitute for brakes', () => {
    expect(card.context).toMatch(/xe số tự động.*động cơ đốt trong.*giảm tải phanh chân, không thay thế phanh/)
    expect(card.context).toMatch(/không.*bảo đảm xe tự giữ tốc độ/)
    expect(card.objective).toMatch(/phối hợp phanh chân và dừng/)
    expect(card.safety).toMatch(/không thay phanh chân.*tốc độ thực tế.*không phải tiếng máy/)
    expect(card.mnemonic.text).toContain('phanh vẫn cần')
  })

  it('requires vehicle-specific modes and limits, and preparation before entering the descent', () => {
    expect(card.steps[0].instruction).toMatch(/Đọc sách hướng dẫn trước hành trình.*giới hạn tốc độ, vòng tua.*M, L, B.*không có cùng ý nghĩa/)
    expect(card.steps[0].instruction).toMatch(/Kiểm tra phanh trước dốc.*không vào dốc nếu phanh bất thường.*chưa biết kiểm soát/i)
    expect(card.steps[1].instruction).toMatch(/Giảm tốc trước dốc và trước cua theo biển, tải xe, độ bám và tầm nhìn/)
    expect(card.steps[1].instruction).toMatch(/cự ly theo quy định.*tăng thêm khi mưa, trơn/)
    expect(card.steps[1].cueText).toMatch(/Nhả ga đơn thuần không bảo đảm.*đủ chậm/)
    expect(card.steps[2].instruction).toMatch(/chọn chế độ hãm được phép theo sách xe khi tốc độ đã phù hợp/)
    expect(card.steps[2].cueText).toMatch(/Không mặc định.*M.*L/)
  })

  it('obeys slippery-road restrictions and prevents coasting or abrupt mid-bend downshifts', () => {
    expect(card.steps[1].instruction).toMatch(/hạn chế.*đường trơn, không chủ động về số để hãm nếu sách xe cấm/)
    expect(card.steps[2].instruction).toMatch(/giữ hướng ổn định, không đổi số đột ngột giữa cua/)
    for (const text of [card.steps[2].instruction, card.safety]) {
      expect(text).toMatch(/không về N/i)
      expect(text).toMatch(/giữ côn cho xe trôi/)
      expect(text).toMatch(/tắt máy khi.*chạy/)
    }
  })

  it('makes discrete requests conditional and checks rejection, overrides and displayed ranges', () => {
    expect(card.steps[3].instruction).toMatch(/giảm một cấp.*kiểm tra số hiển thị và phản hồi nếu xe cho phép chọn từng cấp/)
    expect(card.steps[3].instruction).toMatch(/chỉ yêu cầu tiếp khi tốc độ, vòng tua và độ bám cho phép/)
    expect(card.steps[3].instruction).toMatch(/từ chối lệnh hoặc tự đổi số, không bấm trừ liên tục hay ép số/)
    expect(card.steps[3].instruction).toMatch(/chỉ dải số chứ không phải số đang gài/)
    expect(card.steps[3].cueText).toMatch(/Không có chuỗi D về 3 rồi 2/)
    expect(card.recovery).toMatch(/lệnh bị từ chối.*dừng bấm trừ.*phanh chân còn hiệu lực.*chỉ chọn lại khi đáp ứng sách xe/)
  })

  it('keeps forward attention, actual speed and pre-limit action rather than sound or universal RPM', () => {
    expect(card.steps[4].instruction).toMatch(/tốc độ thực tế, chỉ liếc ngắn.*nhìn lại đường.*tiếng máy lớn không chứng minh/)
    expect(card.steps[4].instruction).toMatch(/vòng tua gần giới hạn, dừng yêu cầu số thấp hơn.*phanh chân giảm tốc.*số cao hơn khi sách xe cho phép/)
    expect(card.steps[4].instruction).toMatch(/không chờ vào vùng đỏ.*không mặc định hộp số luôn tự bảo vệ/)
    expect(card.steps[4].cueText).toMatch(/không có mức vòng tua an toàn chung/)
    expect(card.recovery).toMatch(/đã vượt giới hạn.*dừng an toàn và gọi hỗ trợ kiểm tra, không tự thử lại/)
    expect(card.steps[6].instruction).toMatch(/Dừng an toàn.*đã vượt giới hạn vòng tua/)
  })

  it('distinguishes normal braking from emergency maintained ABS pressure in quick/audio text', () => {
    expect(card.steps[5].instruction).toMatch(/Phanh chân sớm, tăng lực êm.*nhả khi đã giảm đủ và còn kiểm soát/)
    expect(card.steps[5].instruction).toMatch(/không rà suốt dốc hoặc nhấp theo nhịp cố định/)
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/khẩn cấp với ABS.*đạp mạnh.*giữ lực.*không nhấp nhả/i)
    }
    expect(card.steps[5].instruction).toMatch(/nguy hiểm tức thời, vẫn phanh ngay/)
    expect(card.steps[5].cueText).toContain('ABS không bảo đảm dừng ngắn hơn')
    expect(card.safety).toContain('không chờ về số mới phanh')
    expect(card.steps.map(step => step.instruction).join(' ')).not.toContain('từng nhịp ngắn')
  })

  it('stops faults with control remaining, handles uncontrolled speed and never selects P/R or switches off while moving', () => {
    expect(card.steps[6].instruction).toMatch(/phanh giảm hiệu lực.*mùi khét.*tiếng bất thường, giật mạnh.*cảnh báo.*không cố về số thêm/)
    expect(card.steps[6].cueText).toMatch(/Không chờ có mùi khét.*phanh nguội không chứng minh hết lỗi/)
    for (const text of [card.steps[6].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/dừng an toàn|dừng ngoài dòng xe/i)
      expect(text).toMatch(/không khống chế được tốc độ.*cảnh báo.*đường cứu nạn có biển nếu tiếp cận an toàn/)
      expect(text).toMatch(/chọn P, R/)
      expect(text).toMatch(/tắt máy khi đang chạy/)
      expect(text).toMatch(/giữ chắc xe sau khi dừng/)
    }
    expect(card.recovery).toMatch(/không rời vị trí lái khi xe chưa được giữ chắc/)
  })

  it('returns to normal mode conditionally and distinguishes EV/hybrid regen from gear selection', () => {
    expect(card.steps[7].instruction).toMatch(/D hoặc chế độ đi bình thường theo sách xe khi không còn cần lực hãm và điều kiện cho phép/)
    expect(card.steps[7].instruction).toMatch(/không chỉ vì vừa qua chân dốc/)
    for (const text of [card.steps[7].instruction, card.safety]) {
      expect(text).toMatch(/xe điện, hybrid/i)
      expect(text).toMatch(/tái sinh khi pin đầy, quá nóng hoặc lạnh/)
      expect(text).toMatch(/phanh chân khi cần/)
    }
    expect(card.steps[7].instruction).toMatch(/không coi lẫy trừ luôn là lệnh về số/)
    expect(card.steps[7].cueText).toMatch(/chức năng lẫy có thể đổi theo xe, chế độ lái/)
  })

  it('grades actual safe decisions and retains the appropriate supplemental weather checklist', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Giảm tốc phù hợp trước dốc.*theo sách xe và độ bám.*không về số.*cấm trên đường trơn/)
    expect(answers[1]).toMatch(/Dừng yêu cầu số thấp hơn.*phanh chân.*sách xe cho phép.*kiểm tra số hiển thị và phản hồi/)
    expect(answers[2]).toMatch(/Còn kiểm soát thì dừng an toàn, giữ chắc xe và gọi hỗ trợ kiểm tra.*không khống chế được tốc độ.*đường cứu nạn.*nếu tiếp cận an toàn/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(card.checklistId).toBe('bad_weather')
    expect(getChecklist(card.checklistId)?.items.find(item => item.id === 'bw-brake')?.hint).toContain('Kiểm tra trước khi xuống dốc')
  })
})

describe('weather-engine-brake: diagram geometry and meaning', () => {
  it('reuses the corrected descent scene without changing the previous lesson or claiming a cockpit view', () => {
    const svg = diagram('main')
    const downhill = readAsset(getCardAssets('weather-downhill').find(asset => asset.role === 'main')!.url)
    expect(svg.replace(/<title[\s\S]*?<\/title>/, '')).toBe(downhill.replace(/<title[\s\S]*?<\/title>/, ''))
    for (const label of ['CAO', 'THẤP', 'ĐẦU', 'ĐUÔI', 'ĐI XUỐNG', 'Không theo tỷ lệ', 'đường trơn có hạn chế']) {
      expect(visibleText(svg)).toContain(label)
    }
    expect(visibleText(svg)).not.toMatch(/LẪY SỐ|L hoặc 2|\d+%|km\/h/)
    expect(assets.find(asset => asset.role === 'main')?.alt).toMatch(/hai bánh tiếp xúc.*không mô tả vị trí lẫy.*dùng phanh chân khi cần/)
  })

  it('places actual wheel circumferences on the road and the forward arrow ahead of the downhill-facing front', () => {
    const svg = diagram('main')
    const [x1, y1, x2, y2] = segment(group(svg, 'downhill-grade'))
    const [cx, cy, degrees] = svg.match(/id="downhill-car" transform="translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)"/)!.slice(1).map(Number)
    const theta = degrees * Math.PI / 180
    const slope = (y2 - y1) / (x2 - x1)
    expect(slope).toBeGreaterThan(0)
    expect(Math.tan(theta)).toBeCloseTo(slope, 3)
    const wheels = [...group(svg, 'downhill-car').matchAll(/<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/g)]
    expect(wheels).toHaveLength(2)
    for (const wheel of wheels) {
      const [x, y, radius] = wheel.slice(1).map(Number)
      const wx = cx + x * Math.cos(theta) - y * Math.sin(theta)
      const wy = cy + x * Math.sin(theta) + y * Math.cos(theta)
      expect((y1 + (wx - x1) * slope - wy) / Math.sqrt(1 + slope ** 2)).toBeCloseTo(radius, 1)
    }
    const [ax, ay, bx, by] = segment(group(svg, 'downhill-forward'))
    const frontEdge = Math.max(...[-11, 11].map(y => cx + 27 * Math.cos(theta) - y * Math.sin(theta)))
    expect(ax).toBeGreaterThan(frontEdge)
    expect(bx).toBeGreaterThan(ax)
    expect(by).toBeGreaterThan(ay)
    expect((by - ay) / (bx - ax)).toBeCloseTo(slope, 3)
    expect(group(svg, 'downhill-forward')).toContain('marker-end="url(#tip)"')
  })

  it('replaces a gear ladder with three ordered conceptual stages and gap-only connectors', () => {
    const svg = diagram('variant')
    const stages = ['engine-brake-slow', 'engine-brake-select', 'engine-brake-check'].map(id => group(svg, id))
    expect(stages[0]).toMatch(/GIẢM TỐC TRƯỚC.*Theo biển, độ bám và tầm nhìn/)
    expect(stages[1]).toMatch(/CHỌN MỨC ĐƯỢC PHÉP.*Theo sách xe; không ép số, quá tua/)
    expect(stages[2]).toMatch(/KIỂM TRA PHẢN HỒI.*Không nhận: dừng bấm trừ, phanh giảm tốc/)
    const boxes = stages.map(stage => stage.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number))
    for (const [i, id] of ['engine-brake-connect-first', 'engine-brake-connect-second'].entries()) {
      const [x, y, width, height] = boxes[i]
      const motion = group(svg, id)
      const [ax, ay, bx, by] = segment(motion)
      expect(ax).toBe(x + width / 2)
      expect(bx).toBe(ax)
      expect(ay).toBeGreaterThan(y + height)
      expect(by).toBeGreaterThan(ay)
      expect(by + 3).toBeLessThan(boxes[i + 1][1])
      expect(motion).toContain('stroke="#b7f36b"')
      expect(motion).toContain('marker-end="url(#tip)"')
    }
    expect(visibleText(svg)).toContain('KHÔNG CÓ CHUỖI SỐ CHUNG')
    expect(visibleText(svg)).toContain('không là cấp số hay nhịp phanh')
    expect(visibleText(svg)).not.toMatch(/D → 3 → 2|\d+ rpm|km\/h|LẪY SỐ/)
    expect(assets.find(asset => asset.role === 'variant')?.alt).toMatch(/thứ tự kiểm tra, không phải hướng xe chạy.*nhịp đạp phanh/)
  })
})
