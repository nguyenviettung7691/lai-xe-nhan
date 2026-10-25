import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset } from './assets'
import { CONTENT_VERSION, contentReleases } from './version'

const card = getCardById('parking-lowlight')!
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const opening = `<g id="${id}">`
  const start = svg.indexOf(opening)
  if (start < 0) throw new Error(`Missing SVG group: ${id}`)
  const content = svg.slice(start + opening.length)
  let depth = 1
  for (const match of content.matchAll(/<g(?:\s[^>]*)?>|<\/g>/g)) {
    depth += match[0] === '</g>' ? -1 : 1
    if (depth === 0) return content.slice(0, match.index)
  }
  throw new Error(`Unclosed SVG group: ${id}`)
}
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const pose = (svg: string) => {
  const vehicle = group(svg, 'lowlight-car')
  const [cx, cy, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [x, y, width, height] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  expect(rotation).toBe(180)
  return { cx, left: cx - x - width, right: cx - x, rear: cy - y - height, front: cy - y }
}

describe('parking-lowlight: real-world guidance', () => {
  it('preserves progress identifiers and historical releases without sample approval', () => {
    expect(card.lessonId).toBe('parking-underground')
    expect(card.assetIds).toEqual(['parking-lowlight-main', 'parking-lowlight-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'parking-lowlight-qc1', 'parking-lowlight-qc2', 'parking-lowlight-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', card.version])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.6')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(CONTENT_VERSION).toBe(contentReleases.at(-1)?.version)
  })

  it('requires currently visible clearance, not a remembered survey or empty adjacent space', () => {
    expect(card.context).toMatch(/xe số tự động.*âm thanh và mốc đã nhớ không chứng minh/)
    expect(card.steps[0].instruction).toMatch(/được phép.*đủ sáng.*vật cản thấp.*tránh lối qua đường/)
    expect(card.steps[0].instruction).toMatch(/chưa thấy rõ.*dừng.*không cố đi qua để ghi nhớ/)
    const instructions = card.steps.map(step => step.instruction).join(' ')
    expect(instructions).not.toMatch(/50 cm|10 km\/h|5 km\/h|ít nhất một bên trống/)
    expect(card.safety).toContain('Không chọn ô chắn lối người đi bộ')
  })

  it('distinguishes lighting directions, glare, fog lamps and safely cleaning equipment', () => {
    expect(card.steps[1].instruction).toMatch(/đèn chiếu gần.*không dùng đèn chiếu xa.*đèn lùi.*giữ bằng phanh/)
    expect(card.steps[1].instruction).toContain('Không bật đèn sương mù chỉ vì hầm tối')
    expect(card.steps[1].instruction).toMatch(/chỉ làm sạch khi xe đã đỗ và giữ chắc/)
    expect(card.steps[1].cueText).toMatch(/hướng trước.*không bảo đảm thấy hết phía sau/)
  })

  it('checks all around before R and continuously while creeping, with no fixed distance', () => {
    expect(card.steps[2].instruction).toMatch(/^Dừng hẳn, giữ phanh chân.*trực tiếp.*gương, điểm mù.*đầu xe.*Chỉ chọn R.*tín hiệu lùi.*nhường/)
    expect(card.steps[2].cueText).toMatch(/chỉ hỗ trợ.*không thay quan sát trực tiếp/)
    expect(card.steps[5].instruction).toMatch(/khoảng trống nhìn rõ.*liên tục.*trực tiếp.*đầu xe quét.*không chờ đủ một quãng cố định/)
    expect(card.steps[5].speedHint).toBe('tốc độ đi bộ hoặc chậm hơn')
    expect(getChecklist(card.checklistId)?.items.find(item => item.id === 'reverse-speed')?.hint).toContain('không phải tốc độ mục tiêu')
  })

  it('makes listening optional and places the guide outside motion and crush zones', () => {
    expect(card.steps[3].instruction).toMatch(/có thể hạ kính nếu an toàn.*không có nghĩa là đường trống.*không dùng âm thanh/)
    expect(card.steps[4].instruction).toMatch(/tín hiệu khi xe đang dừng.*ngoài đường xe chạy.*đầu xe quét.*không đứng giữa xe.*tầm nhìn.*dừng ngay/)
    expect(card.safety).toMatch(/mất liên lạc.*ngoài đường xe chạy, vùng kẹp.*trong tầm nhìn/)
  })

  it('keeps stop and secure-before-exit conditions in steps and safety for quick/TTS modes', () => {
    expect(card.steps[6].instruction).toMatch(/^Đạp phanh dừng hẳn và giữ xe.*không rõ khoảng cách.*người hoặc xe.*chỉ khi có đường đi an toàn.*Dừng hẳn trước đổi R\/D/)
    for (const text of [card.steps[7].instruction, card.recovery]) {
      expect(text).toMatch(/phanh chân.*phanh đỗ.*P.*hướng dẫn.*xe đứng chắc/)
      expect(text).toMatch(/trước, sau.*bên mở cửa/)
      expect(text).toMatch(/ở lại vị trí lái.*giữ phanh.*gọi (hỗ trợ|nhân viên bãi)/)
    }
    expect(card.steps[7].cueText).toMatch(/Không chọn P khi xe đang chuyển động/)
    expect(card.recovery).toMatch(/Đèn cảnh báo.*không cho phép tiếp tục lùi.*quyền ưu tiên/)
    expect(card.safety).toMatch(/Trước khi rời xe, dừng hẳn, cài phanh đỗ và P.*xe đứng chắc.*lối mở cửa/)
    expect(card.safety).toMatch(/không lùi ở nơi tầm nhìn bị che khuất.*hầm đường bộ/)
  })

  it('tests actual observation, lost-guide stopping and safe exit rather than obsolete advice', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/Chưa.*quan sát trực tiếp.*gương.*chỉ hỗ trợ/)
    expect(answers[1]).toMatch(/phanh dừng hẳn và giữ xe.*quan sát rõ.*liên lạc lại/)
    expect(card.quickCheck[1].isStopCondition).toBe(true)
    expect(answers[2]).toMatch(/phanh chân.*phanh đỗ và P.*xe đứng chắc.*lối mở cửa.*ở lại giữ phanh/)
  })
})

describe('parking-lowlight: diagram geometry and meaning', () => {
  it.each(card.assetIds)('%s labels heading and leaves an open bay with side clearance', id => {
    const svg = readDiagram(id)
    const vehicle = pose(svg)
    const bay = segments(group(svg, 'lowlight-bay'))
    expect(bay).toHaveLength(3)
    const [[left, mouth, , top], , [right]] = bay
    expect(vehicle.left).toBeGreaterThan(left)
    expect(vehicle.right).toBeLessThan(right)
    expect(vehicle.rear).toBeGreaterThan(mouth)
    expect(vehicle.front).toBeGreaterThan(vehicle.rear)
    expect(mouth).toBeGreaterThan(top)
    expect(bay.some(([, y1, , y2]) => y1 === mouth && y2 === mouth)).toBe(false)
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('ĐUÔI')
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*cửa ô mở/)
  })

  it('points reverse from the rear into the bay, and places lamps at the correct ends', () => {
    const svg = readDiagram(card.assetIds[0])
    const vehicle = pose(svg)
    const [[x1, y1, x2, y2]] = segments(group(svg, 'lowlight-reverse'))
    expect(x1).toBe(vehicle.cx)
    expect(x2).toBe(vehicle.cx)
    expect(y1).toBeLessThan(vehicle.rear)
    expect(y2).toBeLessThan(y1)
    expect(y2).toBeGreaterThan(30)
    expect(group(svg, 'lowlight-reverse')).toContain('marker-end="url(#tip)"')
    for (const [id, y, rotation] of [
      ['lowlight-dipped', vehicle.front, 180],
      ['lowlight-reverse-lamps', vehicle.rear, 0]
    ] as const) {
      const cones = [...group(svg, id).matchAll(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/g)]
      expect(cones).toHaveLength(2)
      for (const cone of cones) {
        expect(Number(cone[1])).toBeGreaterThan(vehicle.left)
        expect(Number(cone[1])).toBeLessThan(vehicle.right)
        expect(Number(cone[2])).toBe(y)
        expect(Number(cone[3])).toBe(rotation)
      }
    }
    expect(getAsset(card.assetIds[0])?.alt).toMatch(/không phải phạm vi nhìn rõ hay vùng cảm biến/)
  })

  it('places a visible guide outside the straight reverse corridor without a motion arrow or audio cone', () => {
    const svg = readDiagram(card.assetIds[1])
    const vehicle = pose(svg)
    const guide = group(svg, 'lowlight-guide')
    const [x, y, radius] = guide.match(/cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/)!.slice(1).map(Number)
    expect(x - radius).toBeGreaterThan(200)
    const [[startX, startY, endX, endY]] = segments(group(svg, 'lowlight-sight'))
    expect(startX).toBeGreaterThan(vehicle.right)
    expect(startY).toBeGreaterThan(vehicle.rear)
    expect(startY).toBeLessThan(vehicle.front)
    expect(endX).toBeGreaterThan(200)
    expect(Math.abs(endX - x)).toBeLessThan(16)
    expect(Math.abs(endY - y)).toBeLessThan(20)
    expect(svg).not.toContain('marker-end=')
    expect(svg).not.toContain('opacity=".28"')
    expect(svg).toContain('XE ĐANG DỪNG')
    expect(svg).toContain('Mất liên lạc thì dừng')
    expect(getAsset(card.assetIds[1])?.alt).toMatch(/không phải quỹ đạo.*đầu xe quét.*mất liên lạc thì dừng/)
  })
})
