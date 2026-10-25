import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardAssets, getCardById, getChecklist, getLessonById, getReview } from './index'
import { contentReleases } from './version'

const card = getCardById('weather-heavy-rain')!
const assets = getCardAssets(card.id)
const diagram = (role: 'main' | 'variant') =>
  readFileSync(resolve(process.cwd(), 'public', assets.find(asset => asset.role === role)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing diagram group ${id}`).not.toBeNull()
  return match![1]
}
const visibleText = (svg: string) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]).join(' ')
const pose = (svg: string) => svg.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
const segment = (svg: string) => svg.match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)

describe('weather-heavy-rain: real-world decisions', () => {
  it('preserves identities/history and high risk, without a sample certification', () => {
    expect(card.lessonId).toBe('weather-flood')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.assetIds).toEqual(['weather-heavy-rain-main', 'weather-heavy-rain-var'])
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.risk).toBe('high')
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.23')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('prepares tires, visibility equipment and weather alternatives before travel', () => {
    expect(card.context).toMatch(/giảm tầm nhìn, độ bám.*quãng đường dừng.*ABS.*lốp còn mới/)
    expect(card.steps[0].instruction).toMatch(/dự báo, lộ trình và điểm dừng trước khi đi/)
    expect(card.steps[0].instruction).toMatch(/áp suất theo sách xe, độ mòn, gạt mưa, nước rửa kính, đèn và sấy kính/)
    expect(card.steps[0].instruction).toMatch(/Hoãn đi.*không cho phép nhìn và điều khiển an toàn/)
    expect(card.steps[0].instruction).toMatch(/không chỉnh thiết bị hay xem điện thoại.*đang lái/)
  })

  it('checks actual low-beam and rear lighting, not assumed automatic/daytime operation', () => {
    expect(card.steps[1].instruction).toMatch(/Bật đèn chiếu gần.*đèn hậu sáng khi mưa hạn chế tầm nhìn/)
    expect(card.steps[1].instruction).toMatch(/không dùng đèn chiếu xa gây chói/)
    expect(card.steps[1].instruction).toMatch(/Không mặc định AUTO hoặc đèn ban ngày.*đèn hậu/)
    expect(card.steps[1].instruction).toMatch(/gạt mưa và sấy kính theo sách xe, dừng an toàn nếu kính vẫn không rõ/)
  })

  it('uses visible stopping space and grip rather than a percentage or cruise/ACC guarantee', () => {
    expect(card.steps[2].instruction).toMatch(/Giảm tốc sớm, êm.*biển, tầm nhìn, nước đọng, độ bám và tải xe/)
    expect(card.steps[2].instruction).toMatch(/dừng trong phần đường nhìn rõ và trống.*không có tỷ lệ.*bảo đảm/)
    expect(card.steps[2].instruction).toMatch(/Tắt cruise control hoặc ACC theo sách xe.*trước đoạn mưa trơn/)
    expect(card.steps[2].instruction).toMatch(/không dựa vào hệ thống tự giữ tốc độ hay làn/)
    expect(card.steps[2].cueText).toMatch(/Giới hạn tốc độ không phải tốc độ an toàn/)
    expect(card.steps.map(step => step.instruction).join(' ')).not.toMatch(/ít nhất hai mươi phần trăm|ít nhất 20%/)
  })

  it('retains legal spacing plus condition-dependent margin and broad observation', () => {
    expect(card.steps[3].instruction).toMatch(/cự ly.*theo quy định.*tăng thêm khi mưa, trơn hoặc bị che tầm nhìn/)
    expect(card.steps[3].instruction).toMatch(/nhìn xa và hai bên, không chỉ nhìn đèn hậu/i)
    expect(card.steps[3].instruction).toMatch(/Bốn đến năm giây không phải khoảng cách bảo đảm/)
    expect(card.steps[3].instruction).toMatch(/tránh tăng tốc để thoát xe bám sau/)
    expect(card.steps[3].cueText).toContain('không có số giây chung')
  })

  it('avoids track-following, blind lane changes and flooded roads, including vulnerable road users', () => {
    const text = card.steps[4].instruction
    expect(text).toMatch(/Giữ làn.*giảm tốc trước vũng nước, cua.*xe lớn/)
    expect(text).toMatch(/không mặc định vệt bánh xe trước khô hay an toàn/)
    expect(text).toMatch(/không đánh lái gấp né nước hoặc đổi làn khi chưa thấy rõ/)
    expect(text).toMatch(/Tránh đường ngập che mặt đường, không đi theo xe khác để thử vượt ngập/)
    expect(text).toMatch(/người đi bộ, xe máy.*không tạt nước/)
    expect(card.steps[4].cueText).toContain('rãnh đọng nước')
  })

  it('treats handling signs as possible loss of grip and uses smooth appropriate steering, not a diagnosis', () => {
    expect(card.steps[5].instruction).toMatch(/Nhả ga êm.*vô-lăng nhẹ, phản hồi kém hoặc xe chao.*có thể là mất bám/)
    expect(card.steps[5].instruction).toMatch(/giữ hướng ổn định phù hợp đường.*không giật lái.*về số đột ngột chỉ để thử/)
    expect(card.steps[5].instruction).toMatch(/Khi bám lại, giảm tốc và điều chỉnh êm/)
    expect(card.steps[5].cueText).toMatch(/không phải chẩn đoán chắc chắn.*dừng kiểm tra/)
    expect(card.steps[5].instruction).not.toMatch(/giữ (?:vô-lăng )?thẳng/)
    expect(card.recovery).toMatch(/Bất thường lái, phanh hoặc đèn cảnh báo kéo dài.*dừng an toàn, gọi hỗ trợ.*không cố thử tiếp/)
  })

  it('does not let a generic no-braking rule suppress emergency ABS braking in audio/quick sources', () => {
    for (const text of [card.steps[5].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/va chạm tức thời.*phanh.*ABS.*đạp mạnh.*giữ lực.*không nhấp nhả/i)
    }
    expect(card.steps[5].instruction).toMatch(/ABS và cân bằng điện tử không tạo lại độ bám/)
    expect(card.safety).toMatch(/không dựa vào ABS, ACC hay lốp mới/)
  })

  it('plans a legal dry refuge before visibility fails, without prescribing a dangerous roadside stop', () => {
    const text = card.steps[6].instruction
    expect(text).toMatch(/Chọn nơi dừng sớm.*nhìn đủ xa để dừng.*không chờ mất vạch/)
    expect(text).toMatch(/kiểm tra gương, giảm tốc êm, báo rẽ và quan sát.*điểm dừng được phép, khô, ngoài dòng xe/)
    expect(text).toMatch(/trạm nghỉ hoặc lối ra còn tiếp cận an toàn/)
    expect(text).toMatch(/không dừng trú mưa trên làn đang chạy, làn khẩn cấp cao tốc, dưới gầm cầu.*trũng dễ ngập/)
    expect(text).toMatch(/không phanh gấp hay cắt làn/)
    expect(card.steps[6].cueText).toMatch(/Chỉ chuyển vào khi thấy rõ.*không phải bãi nghỉ/)
  })

  it('warns and calls for help if forced to stop, and rejoins only with control and observation', () => {
    expect(card.steps[7].instruction).toMatch(/buộc phải dừng vì không thể đi tiếp an toàn.*cảnh báo sự cố theo quy định.*gọi hỗ trợ khi đã dừng.*không cố chạy mù/)
    expect(card.steps[7].instruction).toMatch(/bất khả kháng buộc dừng.*làn dừng khẩn cấp cùng chiều nếu còn tiếp cận an toàn.*bật đèn khẩn cấp/)
    expect(card.steps[7].instruction).toMatch(/không vào được.*báo ngay CSGT hoặc đơn vị quản lý đường.*biển hoặc đèn cảnh báo phía sau tối thiểu 150 mét.*hỗ trợ triển khai an toàn.*không bước vào dòng xe/)
    expect(card.steps[7].instruction).toContain('Gọi cứu nạn nếu người gặp nguy hiểm')
    expect(card.steps[7].instruction).toMatch(/giữ chắc xe.*chỉ nhập lại khi tầm nhìn, độ bám và xe đáp ứng.*gương, điểm mù, báo rẽ và nhường/)
    expect(card.steps[7].cueText).toMatch(/không thay xi-nhan, đèn chiếu sáng.*đỗ sai.*không bật chỉ vì đang lái trong mưa/i)
    const audio = [card.mnemonic.text, ...card.steps.map(step => step.instruction), card.safety].join(' ')
    for (const phrase of ['AUTO', 'ACC', 'không mặc định vệt bánh', 'giữ hướng ổn định', 'ABS',
      'không chờ mất vạch', 'làn khẩn cấp', 'không cố chạy mù', 'cứu nạn']) {
      expect(audio).toContain(phrase)
    }
  })

  it('grades conditional speed/space, gentle recovery and safe-stop decisions', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/quy định, tầm nhìn và độ bám.*dừng trong khoảng thấy rõ.*theo điều kiện/)
    expect(card.quickCheck[1].prompt).toMatch(/chưa có nguy hiểm va chạm tức thời/)
    expect(answers[1]).toMatch(/Nhả ga êm.*phù hợp đường.*khi bám lại/)
    expect(answers[2]).toMatch(/điểm dừng được phép nếu tiếp cận an toàn.*cảnh báo.*không chạy mù/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(card.quickCheck.every(question => question.correctIndex === 1)).toBe(true)
    expect(answers.join(' ')).not.toMatch(/bốn giây|hai mươi phần trăm|lốp mới/)
  })

  it('preserves all shared checklist identities and prior flood/brake rules with rain-specific hints', () => {
    const items = getChecklist(card.checklistId)!.items
    expect(items.map(item => item.id)).toEqual(['bw-lights', 'bw-speed', 'bw-gap', 'bw-brake', 'bw-stop', 'bw-flood'])
    expect(items.map(item => item.itemNo)).toEqual([1, 2, 3, 4, 5, 6])
    expect(items[0].hint).toMatch(/đèn hậu.*AUTO.*đèn ban ngày.*sấy kính/)
    expect(items[1].hint).toMatch(/dừng trong khoảng thấy rõ.*không có tỷ lệ.*cruise hoặc ACC/)
    expect(items[2].hint).toMatch(/4–5 giây không phải.*bảo đảm/)
    expect(items[3].hint).toContain('không chờ hết dốc')
    expect(items[4].hint).toMatch(/khô cao.*không chờ ở chỗ trũng.*làn khẩn cấp cao tốc.*cảnh báo/)
    expect(items[5].hint).toMatch(/Không dựa vào nửa bánh.*không lội đo hoặc vòng rào/)
  })
})

describe('weather-heavy-rain: actual illustration geometry', () => {
  it('grounds both right-facing cars on the same road and connects the gap to actual bumpers', () => {
    const svg = diagram('main')
    const roadY = Number(group(svg, 'rain-road').match(/<rect x="[\d.]+" y="([\d.]+)"/)![1])
    const positions = ['rain-ego', 'rain-lead'].map(id => {
      const car = group(svg, id)
      const [x, y, rotation] = pose(car)
      expect(rotation).toBe(0)
      const wheels = [...car.matchAll(/<circle cx="(-?[\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)]
      expect(wheels).toHaveLength(2)
      for (const wheel of wheels) expect(y + Number(wheel[2]) + Number(wheel[3])).toBe(roadY)
      return x
    })
    const [startX, startY, endX, endY] = segment(group(svg, 'rain-following-gap'))
    expect(startX).toBe(positions[0] + 27)
    expect(endX).toBe(positions[1] - 27)
    expect(startY).toBe(endY)
    expect(startY).toBeLessThan(116 - 18)
    expect(group(svg, 'rain-following-gap')).not.toContain('marker-end=')
    const [fromX, fromY, toX, toY] = segment(group(svg, 'rain-direction'))
    expect(toX).toBeGreaterThan(fromX)
    expect(fromY).toBe(toY)
    expect(toY).toBeLessThan(startY)
    expect(visibleText(svg)).toMatch(/CHIỀU ĐI.*CỰ LY GIỮA HAI XE.*ĐẦU.*ĐẦU/)
    const lamps = group(svg, 'rain-lamps')
    for (const x of positions) {
      expect(lamps).toContain(`x="${x + 24}" y="110"`)
      expect(lamps).toContain(`x="${x - 27}" y="110"`)
    }
    expect(visibleText(svg)).not.toMatch(/\d+\s*(?:giây|m|km)|20%/)
  })

  it('keeps the stationary car wholly in the permitted bay, outside the live lane, with correctly placed hazards', () => {
    const svg = diagram('variant')
    const [x, y, rotation] = pose(group(svg, 'rain-stopped-car'))
    expect(rotation).toBe(90)
    const bay = group(svg, 'rain-permitted-bay').match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
    expect(x - 23).toBeGreaterThan(bay[0])
    expect(x + 23).toBeLessThan(bay[0] + bay[2])
    expect(y - 13).toBeGreaterThan(bay[1])
    expect(y + 13).toBeLessThan(bay[1] + bay[3])
    const lane = group(svg, 'rain-live-lane').match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
    expect(y - 13).toBeGreaterThan(lane[1] + lane[3])
    const [passingX, passingY, passingRotation] = pose(group(svg, 'rain-passing-car'))
    expect(passingRotation).toBe(90)
    expect(passingY - 13).toBeGreaterThan(lane[1])
    expect(passingY + 13).toBeLessThan(lane[1] + lane[3])
    const [fromX, fromY, toX, toY] = segment(group(svg, 'rain-through-direction'))
    expect(fromX).toBeGreaterThan(passingX + 23)
    expect(toX).toBeGreaterThan(fromX)
    expect(fromY).toBe(passingY)
    expect(toY).toBe(passingY)
    expect(svg.match(/marker-end=/g)).toHaveLength(1)
    const lamps = [...group(svg, 'rain-hazard-lamps').matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="3" height="3"/g)]
    expect(lamps).toHaveLength(4)
    expect(lamps.map(match => Number(match[1]) + 1.5).sort()).toEqual([x - 21, x - 21, x + 21, x + 21])
    expect(lamps.map(match => Number(match[2]) + 1.5).sort()).toEqual([y - 11, y - 11, y + 11, y + 11])
    expect(visibleText(svg)).toMatch(/ĐIỂM DỪNG ĐƯỢC PHÉP.*XE ĐÃ DỪNG.*KHÔNG TRÚ MƯA.*Không là làn khẩn cấp/)
  })

  it('describes orientation, gap versus arrows, permitted refuge and lamp limitations accessibly', () => {
    const main = assets.find(asset => asset.role === 'main')!
    const variant = assets.find(asset => asset.role === 'variant')!
    expect(main.alt).toMatch(/bánh tiếp xúc mặt đường.*Mũi tên phía trên chỉ chiều đi.*ngoặc nét đứt.*đầu xe mình tới đuôi xe trước/)
    expect(main.alt).toMatch(/không phải.*quãng phanh bảo đảm.*không phải phạm vi chiếu sáng/)
    expect(variant.alt).toMatch(/nhìn từ trên xuống.*dừng hoàn toàn.*đầu sang phải.*không phải đường tấp vào/i)
    expect(variant.alt).toMatch(/Bốn dấu vàng.*theo quy định.*không.*luôn bật khi mưa.*không ngập/)
    expect(main.caption).toContain('không có số giây bảo đảm')
    expect(variant.caption).toContain('không phải làn khẩn cấp')
    for (const asset of assets) {
      expect([asset.width, asset.height]).toEqual([320, 200])
      const svg = diagram(asset.role)
      const footerY = [...svg.matchAll(/<text x="16" y="([\d.]+)"/g)].slice(-2).map(match => Number(match[1]))
      expect(footerY).toHaveLength(2)
      expect(footerY[1] - footerY[0]).toBeGreaterThanOrEqual(12)
    }
  })
})
