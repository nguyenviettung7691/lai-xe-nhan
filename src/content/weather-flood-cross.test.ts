import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardAssets, getCardById, getChecklist, getLessonById, getReview } from './index'
import { contentReleases } from './version'

const card = getCardById('weather-flood-cross')!
const assets = getCardAssets(card.id)
const diagram = (role: 'main' | 'variant') =>
  readFileSync(resolve(process.cwd(), 'public', assets.find(asset => asset.role === role)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing diagram group ${id}`).not.toBeNull()
  return match![1]
}
const visibleText = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]).join(' ')

describe('weather-flood-cross: real-world flood decisions', () => {
  it('preserves identities and history, disclosing the absence of independent approval', () => {
    expect(card.lessonId).toBe('weather-flood')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.assetIds).toEqual(['weather-flood-cross-main', 'weather-flood-cross-var'])
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.risk).toBe('high')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.22')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('recognizes hidden road damage and life/electrical risk, not only engine damage', () => {
    expect(card.context).toMatch(/hố sâu.*nắp cống mất.*nền đường bị cuốn trôi.*xe trước vừa đi qua/)
    expect(card.context).toMatch(/tính mạng, phanh, động cơ.*hệ thống điện.*hybrid.*xe điện/)
    expect(card.objective).toMatch(/Tránh đi vào đường ngập.*lối khô hợp pháp/)
    expect(card.mnemonic.text).toMatch(/tránh vào.*gọi cứu nạn/)
  })

  it('stops early on dry ground without abrupt stopping or waiting in a flood-prone hollow', () => {
    expect(card.steps[0].instruction).toMatch(/Giảm tốc sớm, kiểm tra gương.*nơi khô.*không gây nguy hiểm/)
    expect(card.steps[0].instruction).toMatch(/không phanh gấp.*chỗ trũng dễ bị nước dâng/)
    expect(card.steps[0].cueText).toContain('chưa chạm nước')
  })

  it('rejects wheel/camera measurement and numerical safe-depth assumptions without wading to measure', () => {
    expect(card.steps[1].instruction).toMatch(/từ nơi khô.*tránh đi vào.*không xuống lội đo/)
    expect(card.steps[1].instruction).toMatch(/không suy độ sâu từ bánh xe trước, camera hay xe tải/)
    expect(card.steps[1].instruction).toMatch(/Không có ngưỡng nửa bánh xe.*bảo đảm an toàn/)
    expect(card.steps[2].instruction).toMatch(/không đi qua.*dòng chảy, nước dâng, hầm chui hoặc rào chắn/)
    expect(card.steps[2].instruction).toMatch(/không vòng rào hay đi giữa tim đường/)
    expect(card.steps[2].instruction).toMatch(/sách xe không bảo đảm.*xe gầm cao và xe điện/)
    expect(card.steps.every(step => step.speedHint === undefined)).toBe(true)
    expect(card.steps.map(step => step.instruction).join(' ')).not.toMatch(/ga đều|đều ga|đi số thấp|dưới 10 km/)
  })

  it('makes turning/diverting conditional on legality, observation and dry space', () => {
    expect(card.steps[3].instruction).toMatch(/chỉ tại nơi được phép, trên nền khô.*phía trước, sau, hai bên/)
    expect(card.steps[3].instruction).toMatch(/nhường người và xe, dừng hẳn trước đổi chiều/i)
    expect(card.steps[3].instruction).toMatch(/Không lùi mù hoặc quay vào dòng xe/)
    expect(card.steps[3].instruction).toMatch(/chưa có lối tránh khô an toàn.*chờ.*nhờ hỗ trợ.*không cố vượt/)
    expect(card.steps[3].cueText).toContain('nước dâng thì đổi nơi chờ')
  })

  it('prohibits restarting combustion/hybrid/EV systems and prioritizes people over vehicle salvage', () => {
    expect(card.steps[4].instruction).toMatch(/Dừng cố tăng ga.*không khởi động lại.*không bật lại READY/)
    expect(card.steps[4].instruction).toMatch(/không đẩy hoặc kéo để nổ máy/)
    expect(card.steps[4].instruction).toMatch(/Ưu tiên người.*cứu nạn.*vị trí, số người.*dâng hay chảy/)
    expect(card.steps[4].instruction).toMatch(/tắt hệ thống xe theo sách hướng dẫn nếu làm được an toàn.*không chạm thiết bị điện ngập/)
    expect(card.recovery).toMatch(/Không khởi động lại.*READY.*cứu nạn.*cứu hộ xe/)
  })

  it('allows leaving only by a safe dry route, not a blanket open-door or wading instruction', () => {
    expect(card.steps[5].instruction).toMatch(/chỉ khi có lối ra rõ ràng an toàn.*không phải lội hoặc bơi/)
    expect(card.steps[5].instruction).toMatch(/người đi cùng.*không quay lại lấy đồ/)
    expect(card.steps[5].instruction).toMatch(/Không mặc định mở cửa bước xuống.*nhiễm điện.*nắp cống mất/)
    expect(card.recovery).toMatch(/Chỉ ra nơi cao khô khi có lối an toàn, không lội vào nước/)
  })

  it('distinguishes fast-current entrapment and rising interior water, without prescribing swimming', () => {
    for (const text of [card.steps[6].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/nước chảy xiết/)
      expect(text).toMatch(/ở trong xe/i)
      expect(text).toMatch(/cứu nạn|trợ giúp/)
      expect(text).toMatch(/nước dâng vào.*lên nóc/i)
      expect(text).toMatch(/không nhảy xuống dòng chảy/)
    }
    expect(card.steps[6].instruction).toMatch(/không có lối thoát an toàn.*làm theo lực lượng cứu nạn/i)
    expect(card.steps[6].instruction).toContain('không tự di chuyển được')
    expect(card.safety).toMatch(/không phải.*quy trình thoát mọi loại xe chìm/)
  })

  it('conditions post-exposure braking checks and stops faults instead of assuming drying repairs damage', () => {
    const step = card.steps[7]
    expect(step.instruction).toMatch(/chỉ thử phanh nhẹ.*tốc độ rất thấp.*nền khô, trống.*không có xe sát sau.*sách xe/)
    expect(step.instruction).toMatch(/Phanh bất thường, đèn cảnh báo hoặc đã ngập đáng kể.*dừng an toàn, gọi cứu hộ kiểm tra trước khi chạy tiếp/)
    expect(step.instruction).toMatch(/không chứng minh hết hư hỏng.*không tự khởi động xe đã chết máy/)
  })

  it('retains all essential prohibitions and rescue branches in full-audio and quick-mode sources', () => {
    const text = [card.mnemonic.text, ...card.steps.map(step => step.instruction), card.safety].join(' ')
    for (const phrase of ['không đi qua đường ngập', 'không xuống lội đo', 'không khởi động lại',
      'READY', 'lối ra rõ ràng an toàn', 'ở trong xe', 'lên nóc', 'không nhảy xuống dòng chảy']) {
      expect(text.toLowerCase()).toContain(phrase.toLowerCase())
    }
    expect(card.safety).toContain('không dùng điện thoại khi đang điều khiển xe')
    expect(card.safety).not.toMatch(/\d+\s*cm|ba mươi|nửa bánh/)
  })

  it('tests avoidance, no restart and conditional rescue, with stop decisions clearly marked', () => {
    expect(card.quickCheck).toHaveLength(3)
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Không vào.*lối khô.*hợp pháp và an toàn/)
    expect(answers[1]).toMatch(/Không khởi động lại.*ưu tiên người.*cứu nạn.*cứu hộ xe/)
    expect(answers[2]).toMatch(/Ở trong xe.*nước dâng vào.*lên nóc.*không nhảy/)
    expect(card.quickCheck[0].isStopCondition).toBe(true)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(answers.join(' ')).not.toMatch(/nửa bánh|số thấp|ga đều/)
  })

  it('adds conditional flood avoidance to the existing checklist without losing its other checks', () => {
    const items = getChecklist(card.checklistId)!.items
    expect(items.map(item => item.id)).toEqual(['bw-lights', 'bw-speed', 'bw-gap', 'bw-brake', 'bw-stop', 'bw-flood'])
    expect(items.map(item => item.itemNo)).toEqual([1, 2, 3, 4, 5, 6])
    expect(items[5].criticalLevel).toBe('must')
    expect(items[5].label).toMatch(/Gặp đường ngập: không vào.*khô hợp pháp/)
    expect(items[5].hint).toMatch(/Không dựa vào nửa bánh.*không lội đo hoặc vòng rào.*chỉ quay đầu khi quan sát đủ/i)
    expect(items[4].hint).toMatch(/khô cao.*không chờ ở chỗ trũng.*nước dâng/)
  })
})

describe('weather-flood-cross: illustration semantics and geometry', () => {
  it('places the stationary car and wheel contact wholly on dry road before the boundary and water', () => {
    const svg = diagram('main')
    const car = group(svg, 'flood-stationary-car')
    const [x, y, rotation] = car.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
    expect(rotation).toBe(0)
    const road = group(svg, 'flood-dry-road')
    const [roadX, roadY, roadWidth] = road.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)"/)!.slice(1).map(Number)
    const wheels = [...car.matchAll(/<circle cx="(-?[\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)]
    expect(wheels).toHaveLength(2)
    for (const wheel of wheels) {
      const [wheelX, wheelY, radius] = wheel.slice(1).map(Number)
      expect(y + wheelY + radius).toBe(roadY)
      expect(x + wheelX - radius).toBeGreaterThan(roadX)
      expect(x + wheelX + radius).toBeLessThan(roadX + roadWidth)
    }
    const stop = group(svg, 'flood-no-entry-boundary')
    const stopX = Number(stop.match(/d="M([\d.]+) /)![1])
    const waterX = Number(group(svg, 'flood-unknown-water').match(/<rect x="([\d.]+)"/)![1])
    expect(x + 27).toBeLessThan(stopX)
    expect(stopX).toBeLessThan(waterX)
    expect(svg).toContain('x="99" y="110" width="3" height="5"')
    expect(visibleText(svg)).toMatch(/ĐUÔI.*ĐẦU/)
    expect(svg).not.toMatch(/marker-end=|stroke-dasharray=|\d+\s*cm|nửa bánh|đều ga/i)
    expect(visibleText(svg)).toMatch(/Độ sâu\?.*Hố, dòng chảy\?/)
  })

  it('shows two separate conditional rescue panels, not a sequence, depth chart or escape trajectory', () => {
    const svg = diagram('variant')
    const first = group(svg, 'flood-safe-exit')
    const second = group(svg, 'flood-trapped-current')
    expect(visibleText(first)).toMatch(/CÓ LỐI THOÁT KHÔ AN TOÀN.*không lội hoặc bơi/)
    expect(visibleText(second)).toMatch(/KẸT GIỮA DÒNG XIẾT, KHÔNG LỐI AN TOÀN.*Ở trong xe.*Nước dâng vào xe.*lên nóc.*Không nhảy/)
    const panels = [first, second].map(panel =>
      panel.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number))
    expect(panels[0][1] + panels[0][3]).toBeLessThan(panels[1][1])
    for (const [x, y, width, height] of panels) {
      expect(x).toBeGreaterThanOrEqual(0)
      expect(x + width).toBeLessThanOrEqual(320)
      expect(y + height).toBeLessThanOrEqual(174)
    }
    expect(svg).not.toContain('marker-end=')
    expect(visibleText(svg)).toContain('Không đề lại hoặc bật READY')
  })

  it('provides accurate accessible captions and alt descriptions without universal crossing limits', () => {
    expect(assets).toHaveLength(2)
    expect(assets.find(asset => asset.role === 'main')!.alt).toMatch(/đầu xe hướng phải.*bánh tiếp xúc nền khô.*đứng yên.*Không có mũi tên.*vạch đỏ không phải biển hay rào thật/)
    expect(assets.find(asset => asset.role === 'variant')!.alt).toMatch(/Hai bảng điều kiện.*không.*quy trình thoát mọi xe chìm.*lên nóc.*Không đề lại hay bật READY/)
    expect(assets.map(asset => asset.caption).join(' ')).toMatch(/không có ngưỡng sâu an toàn.*không phải thứ tự bắt buộc/)
    for (const asset of assets) {
      expect(asset.width).toBe(320)
      expect(asset.height).toBe(200)
    }
  })
})
