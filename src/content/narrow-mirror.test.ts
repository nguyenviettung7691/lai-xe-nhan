import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('narrow-mirror')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const rects = (svg: string) =>
  [...svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
    .map(match => match.slice(1).map(Number))
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)]
    .map(match => match.slice(1).map(Number))
const vehicleGeometry = (svg: string) => {
  const vehicle = group(svg, 'mirror-car')
  const [x, y, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [dx, dy, width, height] = rects(vehicle)[0]
  return { x, rotation, left: x + dx, right: x + dx + width, front: y + dy, rear: y + dy + height }
}

describe('narrow-mirror: real-world guidance', () => {
  it('preserves identifiers/history and publishes honestly without a sample approval', () => {
    expect(card.lessonId).toBe('narrow-control')
    expect(card.assetIds).toEqual(['narrow-mirror-main', 'narrow-mirror-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'narrow-mirror-qc1', 'narrow-mirror-qc2', 'narrow-mirror-qc3'
    ])
    expect(card.checklistId).toBe('pre_drive')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(publishedCards).toContain(card)
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.risk).toBe('medium')
    expect(card.minutes).toBe(5)
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.9')?.cardIds).toEqual([card.id])
  })

  it('assesses all of the vehicle before entry, not apparent mirror-gap symmetry', () => {
    expect(card.context).toMatch(/chỉ hỗ trợ.*không phải thước đo.*điểm mù/)
    expect(card.objective).toMatch(/quan sát trực tiếp.*toàn xe.*dừng trước/)
    expect(card.steps[0].instruction).toMatch(/^Dừng.*được phép.*thân, hai gương, góc đầu xe.*bánh sau.*chưa chắc.*không vào/)
    expect(card.steps[0].cueText).toMatch(/tay lái xe máy.*cửa.*thấp hoặc nhô cao.*người/)
    expect(card.steps[4].instruction).toMatch(/hai bên, góc đầu xe, thân.*bánh sau.*dừng.*không.*bằng nhau/)
    expect(card.steps[4].cueText).toMatch(/không phải số đo.*vật cản thấp.*đầu xe quét/)
    expect(card.mnemonic.text).toBe('Gương hỗ trợ, chưa rõ thì dừng.')
  })

  it('adjusts only while stopped, preserving rear/side view and model-specific references', () => {
    expect(card.steps[1].instruction).toMatch(/ghế và gương.*đứng hẳn.*hướng dẫn.*phía sau và hai bên/)
    expect(card.steps[1].instruction).toMatch(/thân xe.*tham chiếu nếu phù hợp.*tư thế ngồi/)
    expect(card.steps[1].cueText).toMatch(/Không chỉnh khi xe đang chạy.*mất quan sát phía sau/)
  })

  it('keeps open mirrors by default and gates exceptional folding in steps and spoken safety', () => {
    for (const text of [card.steps[2].instruction, card.safety]) {
      expect(text).toMatch(/Giữ gương mở.*chỉ cân nhắc gập khi.*dừng.*hướng dẫn.*quan sát.*khoảng hở toàn xe/)
    }
    expect(card.steps[2].instruction).toMatch(/nếu không.*lối khác.*hỗ trợ/)
    expect(card.steps[2].cueText).toMatch(/Không có mốc bề rộng.*mở lại.*an toàn/)
    expect(card.safety).toMatch(/mở lại ngay khi đủ chỗ an toàn/)
    expect(instructions).not.toMatch(/2,2 m|40 cm|dưới một giây/)
  })

  it('scans ahead/near/both mirrors/blind spots without a timed stare or precision claim', () => {
    expect(card.steps[3].instruction).toMatch(/phía trước xa và gần.*hai gương.*điểm mù.*trực tiếp/)
    expect(card.steps[3].instruction).toMatch(/chỉ bò khi.*dừng được.*nhìn rõ còn trống/)
    expect(card.steps[3].cueText).toMatch(/Không nhìn cố định.*không dùng nhịp.*giây.*gương cầu.*xa hơn thực tế/)
    expect(card.steps[3].speedHint).toMatch(/đi bộ hoặc chậm hơn.*dừng/)
  })

  it('stops before contact and requires fresh checks before restarting, including quick/TTS modes', () => {
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/phanh dừng hẳn và giữ xe.*trước/)
      expect(text).toMatch(/không.*lách.*lùi.*vùng khuất/)
    }
    expect(card.steps[5].instruction).toMatch(/chưa chắc khoảng hở.*mất tầm nhìn.*người.*cửa mở.*cảnh báo/)
    expect(card.steps[5].instruction).toContain('không chờ gương chạm mới dừng')
    expect(card.steps[5].cueText).toMatch(/Cảm biến im lặng không chứng minh.*đã va chạm.*dừng.*không cố đi tiếp/)
    expect(card.steps[6].instruction).toMatch(/Quan sát lại.*điểm mù.*chỉ đi tiếp.*đủ khoảng hở toàn xe.*không còn người/)
    expect(card.steps[6].cueText).toMatch(/ngoài đường xe chạy và vùng quét.*không giữa xe với tường.*mất liên lạc thì dừng/)
    expect(card.safety).toMatch(/gương cầu.*điểm mù.*chỉ đi tiếp sau khi quan sát lại/)
  })

  it('secures inspection and contact recovery, protects guides and prohibits blind retreat', () => {
    expect(card.recovery).toMatch(/^Đạp phanh dừng hẳn và giữ xe.*đã va chạm.*không cố tiến hoặc lùi.*kiểm tra người/)
    expect(card.recovery).toMatch(/xuống kiểm tra.*phanh chân.*phanh đỗ.*hướng dẫn.*P với xe có số P.*đứng chắc.*mở cửa an toàn/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy và vùng quét.*không giữa xe với tường.*tín hiệu.*luôn thấy nhau.*mất liên lạc thì dừng/)
    expect(card.recovery).toMatch(/chỉ lùi khi được phép.*hai bên và phía sau.*tín hiệu lùi.*đường lùi an toàn/)
    expect(card.recovery).toMatch(/không lùi.*đường một chiều.*tầm nhìn bị che khuất/)
  })

  it('tests observation, non-measured clearance and a mandatory early stop with plausible distractors', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/đứng hẳn.*hướng dẫn.*phía trước, hai bên và điểm mù/)
    expect(answers[1]).toMatch(/Không suy ra số đo.*toàn xe.*dừng.*không gập gương để cố lọt/)
    expect(answers[2]).toMatch(/^Đạp phanh dừng hẳn và giữ xe trước vật cản.*quan sát lại.*toàn xe/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('narrow-mirror: actual diagram geometry', () => {
  it.each(card.assetIds)('%s has an upward-facing car and protruding open mirrors, no motion command', id => {
    const svg = readDiagram(id)
    const vehicle = vehicleGeometry(svg)
    expect(vehicle.rotation).toBe(0)
    expect(vehicle.front).toBeLessThan(vehicle.rear)
    const walls = segments(group(svg, 'mirror-walls'))
    const mirrors = rects(group(svg, 'mirror-open'))
    expect(mirrors).toHaveLength(2)
    expect(mirrors[0][0] + mirrors[0][2]).toBe(vehicle.left)
    expect(mirrors[1][0]).toBe(vehicle.right)
    expect(mirrors[0][0]).toBeGreaterThan(walls[0][0])
    expect(mirrors[1][0] + mirrors[1][2]).toBeLessThan(walls[1][0])
    for (const [, y, , h] of mirrors) {
      expect(y).toBeGreaterThan(vehicle.front)
      expect(y + h).toBeLessThan(vehicle.rear)
    }
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('ĐUÔI')
    expect(svg).toContain('GƯƠNG MỞ')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(svg).not.toContain('marker-end=')
    expect(svg).not.toMatch(/40 cm|2,2 m|Gập gương khi hẻm/)
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*gương.*Không có mũi tên/)
  })

  it('anchors both brackets to physical edges at the same mirror/handlebar cross-section', () => {
    const svg = readDiagram('narrow-mirror-main')
    const mirrors = rects(group(svg, 'mirror-open'))
    const [hx, hy, hw, hh] = rects(group(svg, 'mirror-handlebar'))[0]
    const left = segments(group(svg, 'mirror-gap-left'))[0]
    const right = segments(group(svg, 'mirror-gap-right'))[0]
    const walls = segments(group(svg, 'mirror-walls'))
    expect(left[0]).toBe(walls[0][0])
    expect(left[2]).toBe(mirrors[0][0])
    expect(right[0]).toBe(mirrors[1][0] + mirrors[1][2])
    expect(right[2]).toBe(hx)
    expect(right[2]).toBeGreaterThan(right[0])
    expect(left[1]).toBe(left[3])
    expect(left[1]).toBe(right[1])
    expect(right[1]).toBe(right[3])
    expect(right[1]).toBeGreaterThan(hy)
    expect(right[1]).toBeLessThan(hy + hh)
    expect(right[1]).toBeGreaterThan(mirrors[1][1])
    expect(right[1]).toBeLessThan(mirrors[1][1] + mirrors[1][3])
    const parked = group(svg, 'mirror-parked-bike')
    const [bx, by] = parked.match(/translate\(([\d.]+) ([\d.]+)\)/)!.slice(1).map(Number)
    const wheels = rects(group(svg, 'mirror-bike-wheels'))
    expect(wheels).toHaveLength(2)
    expect(wheels[0][0]).toBe(wheels[1][0])
    expect(by + wheels[0][1] + wheels[0][3]).toBeLessThan(hy)
    expect(by + wheels[1][1]).toBeGreaterThan(hy + hh)
    expect(hx).toBeLessThan(bx - 5)
    expect(hx + hw).toBeGreaterThan(bx + 5)
    expect(hy).toBeGreaterThan(by - 16)
    expect(hx + hw).toBeLessThan(walls[1][0])
    expect(svg).toContain('MÔ TÔ ĐỖ')
    expect(svg).toContain('không phải số đo')
    expect(getAsset('narrow-mirror-main')?.alt).toMatch(/cùng mặt cắt.*không phải số đo.*hay vùng nhìn thấy/)
  })

  it('stops the entire car before a wall projection that obstructs its current straight envelope', () => {
    const svg = readDiagram('narrow-mirror-var')
    const vehicle = vehicleGeometry(svg)
    const mirrors = rects(group(svg, 'mirror-open'))
    const [x, y, width, height] = rects(group(svg, 'mirror-obstruction'))[0]
    const walls = segments(group(svg, 'mirror-walls'))
    expect(x).toBe(walls[0][0])
    expect(x + width).toBeGreaterThan(vehicle.left)
    expect(x + width).toBeGreaterThan(mirrors[0][0])
    expect(y + height).toBeLessThan(vehicle.front)
    expect(y + height).toBeLessThan(mirrors[0][1])
    const [[x1, y1, x2, y2]] = segments(group(svg, 'mirror-uncertain-gap'))
    expect(x1).toBe(x + width)
    expect(x2).toBe(walls[1][0])
    expect(y1).toBe(y2)
    expect(y1).toBeGreaterThan(y)
    expect(y1).toBeLessThan(y + height)
    expect(svg).toContain('XE DỪNG')
    expect(svg).toContain('TƯỜNG NHÔ')
    expect(svg).toContain('CHƯA RÕ')
    expect(svg).toContain('không gập gương để cố lọt')
    expect(getAsset('narrow-mirror-var')?.alt).toMatch(/đang dừng trước.*không phải hướng xe chạy.*chỉ đi tiếp sau khi kiểm tra/)
  })
})
