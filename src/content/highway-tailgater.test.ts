import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getCardAssets, getChecklist, getReview, getLessonById } from './index'
import { contentReleases } from './version'

const card = getCardById('highway-tailgater')!
const assets = getCardAssets('highway-tailgater')
const diagram = (role: 'main' | 'variant') =>
  readFileSync(resolve(process.cwd(), 'public', assets.find(asset => asset.role === role)!.url.slice(1)), 'utf8')
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
  return { x, y, front: x + length / 2, rear: x - length / 2, top: y - width / 2, bottom: y + width / 2, halfWidth: width / 2, halfLength: length / 2 }
}

describe('highway-tailgater: real-world decisions and publication', () => {
  it('publishes transparently, preserving identities and prior revision history', () => {
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.lessonId).toBe('highway-flow')
    expect(getLessonById(card.lessonId)?.cards).toContain(card)
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(card.assetIds).toEqual(['highway-tailgater-main', 'highway-tailgater-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.steps.map(step => step.id)).toEqual(Array.from({ length: 8 }, (_, i) => `${card.id}-s${i + 1}`))
    expect(card.version).toBe('1.0.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['0.9.0', '1.0.0'])
    expect(card.changelog[0].date).toBe('2026-09-12')
    expect(contentReleases.find(release => release.version === '2026.10.18')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
  })

  it('avoids retaliatory speed/braking and a universal four-second target', () => {
    expect(card.context).toMatch(/Không suy đoán ý định/)
    expect(card.context).not.toMatch(/một thân xe/)
    expect(card.steps[0].instruction).toMatch(/tốc độ phù hợp biển báo.*không tăng tốc vượt giới hạn.*không phanh cảnh cáo/)
    expect(card.steps[1].instruction).toMatch(/nhả ga êm khi an toàn.*quan sát xe sau.*tránh giảm tốc đột ngột/)
    expect(card.steps[1].instruction).toMatch(/cự ly theo biển, tốc độ và quy định.*mưa, trơn.*bốn giây.*bảo đảm/)
    expect(card.steps[3].instruction).toMatch(/không tăng tốc cản đường/)
    expect(card.steps[5].instruction).toMatch(/phía trước là chính.*gương ngắn.*cắt vào trước.*tạo lại cự ly/)
  })

  it('requires permission, closing-speed awareness and fresh right-side checks', () => {
    expect(card.steps[2].instruction).toMatch(/biển, vạch và phân làn.*phía trước, phía sau và hai bên.*tốc độ xe đến gần.*đi lên bên phải/)
    expect(card.steps[3].instruction).toMatch(/xi-nhan phải sớm.*gương trong, gương phải và điểm mù phải ngay trước.*liếc ngắn.*nhìn lại phía trước/)
    expect(card.steps[4].instruction).toMatch(/một làn liền kề qua vạch đứt.*được phép.*đủ hở trước, sau, hai bên/)
    expect(card.steps[4].instruction).toMatch(/khe đóng.*đi lên bên phải.*hoãn chuyển.*Tắt xi-nhan.*không cắt nhiều làn/)
    expect(card.steps[3].cueText).toMatch(/không tạo quyền.*chỉ hỗ trợ/)
  })

  it('keeps blocked/rightmost-lane fallbacks and emergency braking in audio/quick sources', () => {
    for (const text of [card.steps[2].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/làn phải ngoài cùng|hết làn phải/i)
      expect(text).toMatch(/giữ làn/)
      expect(text).toMatch(/không.*làn dừng khẩn cấp.*lề/)
    }
    for (const text of [card.steps[5].instruction, card.recovery, card.safety]) {
      expect(text).toMatch(/phanh cần thiết/)
      expect(text).toMatch(/nguy hiểm tức thời/)
    }
    expect(card.steps[5].instruction).toMatch(/không.*trì hoãn.*không giật lái sang làn chưa kiểm tra/)
    expect(card.mnemonic.text).toMatch(/đủ hở mới nhường/)
  })

  it('handles prolonged threats without abrupt exits, isolated stops or distracted evidence gathering', () => {
    const spoken = card.steps.slice(6).map(step => step.instruction).join(' ')
    for (const text of [spoken, card.recovery, card.safety]) {
      expect(text).toMatch(/lối ra.*an toàn|an toàn.*lối ra/)
      expect(text).toMatch(/công cộng có nhân viên/)
      expect(text).toMatch(/Cảnh sát giao thông/)
      expect(text).toMatch(/người đi cùng/)
      expect(text).toMatch(/sau khi đỗ an toàn/)
      expect(text).toMatch(/camera.*tự ghi/i)
      expect(text).toMatch(/không.*đối chất/i)
    }
    expect(card.steps[6].instruction).toMatch(/quá muộn thì đi tiếp/)
    expect(card.steps[7].instruction).toMatch(/Không cầm điện thoại, chỉnh camera.*bám đuổi/)
    expect(card.recovery).toMatch(/giữ cửa khóa/)
    expect(card.recovery).not.toMatch(/chờ vài phút|gần nhất/)
  })

  it('grades safe spacing, aborting unsafe yielding and reporting after parking', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/trong giới hạn.*nhả ga êm khi an toàn.*cự ly trước.*vẫn phanh cần thiết/)
    expect(answers[1]).toMatch(/^Giữ làn, hoãn chuyển.*một làn liền kề được phép.*đủ hở.*gương và điểm mù phải/)
    expect(card.quickCheck[1].isStopCondition).toBe(true)
    expect(answers[2]).toMatch(/công cộng có nhân viên.*lối ra hợp lệ.*người đi cùng.*Cảnh sát giao thông.*sau khi đỗ an toàn.*camera tự ghi/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('highway-tailgater: actual SVG geometry', () => {
  it.each(['main', 'variant'] as const)('%s shows centered, non-overlapping rightward cars in bounded lanes', role => {
    const svg = diagram(role)
    expect(segments(group(svg, 'tailgater-edges'))).toEqual([[0, 42, 320, 42], [0, 150, 320, 150]])
    expect(segments(group(svg, 'tailgater-divider'))).toEqual([[0, 96, 320, 96]])
    expect(group(svg, 'tailgater-divider')).toContain('stroke-dasharray=')
    for (const [x1, y1, x2, y2] of segments(group(svg, 'tailgater-direction'))) {
      expect(x2).toBeGreaterThan(x1)
      expect(y2).toBe(y1)
    }
    const ego = pose(svg, 'tailgater-ego')
    const follower = pose(svg, 'tailgater-follower')
    const vehicles = role === 'main' ? [ego, follower, pose(svg, 'tailgater-lead')] : [ego, follower]
    for (const vehicle of vehicles) {
      expect(vehicle.y).toBe((42 + 96) / 2)
      expect(vehicle.top).toBeGreaterThan(42)
      expect(vehicle.bottom).toBeLessThan(96)
      expect(vehicle.rear).toBeGreaterThan(0)
      expect(vehicle.front).toBeLessThan(320)
    }
    expect(follower.front).toBeLessThan(ego.rear)
    expect(follower.y).toBe(ego.y)
  })

  it('anchors rear danger and forward buffer to actual bumpers, not vehicle centers', () => {
    const svg = diagram('main')
    const follower = pose(svg, 'tailgater-follower')
    const ego = pose(svg, 'tailgater-ego')
    const lead = pose(svg, 'tailgater-lead')
    const rear = segments(group(svg, 'tailgater-rear-gap'))[0]
    const front = segments(group(svg, 'tailgater-front-gap'))[0]
    expect(rear[0]).toBe(follower.front)
    expect(rear[2]).toBe(ego.rear)
    expect(front[0]).toBe(ego.front)
    expect(front[2]).toBe(lead.rear)
    expect(front[2] - front[0]).toBeGreaterThan(rear[2] - rear[0])
    expect(group(svg, 'tailgater-rear-gap')).toContain('BÁM SÁT')
    expect(group(svg, 'tailgater-front-gap')).toContain('TĂNG HỞ TRƯỚC ÊM')
  })

  it('starts at the ego nose, crosses right over the dashed divider, and ends forward inside the right lane', () => {
    const svg = diagram('variant')
    const ego = pose(svg, 'tailgater-ego')
    const path = group(svg, 'tailgater-yield-path')
    const match = path.match(/d="M([\d.]+) ([\d.]+)C([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!
    expect(match).not.toBeNull()
    const [x0, y0, x1, y1, x2, y2, x3, y3, endX, endY] = match.slice(1).map(Number)
    expect([x0, y0]).toEqual([ego.front, ego.y])
    expect(y1).toBe(y0)
    expect(y2).toBe(y3)
    expect(y3).toBe((96 + 150) / 2)
    expect(endY).toBe(y3)
    expect(endX).toBeGreaterThan(x3)
    expect(endX + ego.halfLength).toBeLessThan(320)
    expect(path).toContain('marker-end="url(#tip)"')
    let crossedDivider = false
    let previousX = x0
    for (let i = 0; i <= 100; i += 1) {
      const t = i / 100
      const u = 1 - t
      const x = u ** 3 * x0 + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * x3
      const y = u ** 3 * y0 + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * y3
      expect(x).toBeGreaterThanOrEqual(previousX)
      expect(y - ego.halfWidth).toBeGreaterThan(42)
      expect(y + ego.halfWidth).toBeLessThan(150)
      crossedDivider ||= y > 96
      previousX = x
    }
    expect(crossedDivider).toBe(true)
  })

  it('explains scale, emergency exception and conditional maneuver in visible and alternative text', () => {
    for (const role of ['main', 'variant'] as const) {
      expect(diagram(role)).toContain('Không theo tỷ lệ')
      expect(assets.find(asset => asset.role === role)!.alt).toMatch(/không theo tỷ lệ/)
    }
    const visibleMainText = diagram('main').replace(/<title>[\s\S]*?<\/title>/, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')
    expect(visibleMainText).toContain('Vẫn phanh cần thiết')
    expect(assets[0].alt).toMatch(/không phải số mét hay giây bảo đảm/)
    const variant = assets.find(asset => asset.role === 'variant')!
    expect(variant.alt).toMatch(/đi lên bên phải.*làn phải ngoài cùng.*giữ làn.*không dùng.*lề/)
    expect(variant.caption).toMatch(/chưa đủ hở thì giữ làn/)
    expect(diagram('variant')).toContain('CHƯA AN TOÀN: GIỮ LÀN')
  })
})
