import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset, getCardAssets } from './assets'
import { contentReleases } from './version'

const card = getCardById('highway-overtake-truck')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const diagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))
  expect(match, `missing group ${id}`).not.toBeNull()
  return match![1]
}
const rects = (svg: string) =>
  [...svg.matchAll(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
    .map(match => match.slice(1).map(Number))
const pose = (svg: string, id: string) => {
  const content = group(svg, id)
  const [x, y, rotation] = content.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const angle = rotation * Math.PI / 180
  const corners = rects(content).flatMap(([rx, ry, w, h]) =>
    [[rx, ry], [rx + w, ry], [rx, ry + h], [rx + w, ry + h]]
      .map(([px, py]) => [
        x + px * Math.cos(angle) - py * Math.sin(angle),
        y + px * Math.sin(angle) + py * Math.cos(angle)
      ]))
  return {
    x, y, rotation,
    left: Math.min(...corners.map(point => point[0])),
    right: Math.max(...corners.map(point => point[0])),
    top: Math.min(...corners.map(point => point[1])),
    bottom: Math.max(...corners.map(point => point[1]))
  }
}
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const route = (svg: string, id: string) => {
  const content = group(svg, id)
  const match = content.match(/d="M([\d.]+) ([\d.]+)C([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!
  expect(match).not.toBeNull()
  const [x0, y0, x1, y1, x2, y2, x3, y3, endX, endY] = match.slice(1).map(Number)
  const samples = Array.from({ length: 101 }, (_, i) => {
    const t = i / 100
    const u = 1 - t
    return [
      u ** 3 * x0 + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * x3,
      u ** 3 * y0 + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * y3
    ]
  })
  samples.push([endX, endY])
  expect(content).toContain('marker-end="url(#tip)"')
  return { x0, y0, x1, y1, x3, y3, endX, endY, samples }
}

describe('highway-overtake-truck: real-world decisions', () => {
  it('preserves identities and history without sample certification', () => {
    expect(card.lessonId).toBe('highway-flow')
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(card.assetIds).toEqual(['highway-overtake-truck-main', 'highway-overtake-truck-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([1, 2, 3].map(n => `${card.id}-qc${n}`))
    expect(card.steps.map(step => step.id)).toEqual(card.steps.map((_, i) => `${card.id}-s${i + 1}`))
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.17')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('makes passing optional, speed-limited and condition-dependent', () => {
    expect(card.context).toMatch(/các làn cùng chiều.*điểm mù trước, sau và hai bên.*không cần vượt/i)
    expect(card.steps[0].instruction).toMatch(/theo biển báo, tốc độ và điều kiện.*tăng thêm khi mưa.*Thấy gương.*không bảo đảm/)
    expect(card.steps[1].instruction).toMatch(/biển, vạch và phân làn.*trống phía trước.*không vượt giới hạn tốc độ/)
    expect(card.steps[1].instruction).toMatch(/gần bằng tốc độ.*hàng xe chờ.*mưa.*gió mạnh.*hoãn vượt/)
    expect(card.steps[3].instruction).toMatch(/không vượt giới hạn.*không áp sát.*không luồn sang phải.*làn dừng khẩn cấp.*lề đường/)
    expect(card.steps[4].instruction).toMatch(/giữ giữa làn.*khoảng hở ngang.*gió và bụi nước.*không giật lái.*giảm tốc vì nguy hiểm/i)
    expect(card.steps[4].instruction).toMatch(/bỏ ý định vượt.*không tăng tốc đua/)
    expect([card.objective, card.mnemonic.text, instructions].join(' ')).not.toMatch(/nhanh nhất|Vượt nhanh|làn trái trống hẳn|mười lăm mét/)
  })

  it('checks fast rear traffic, signals and rechecks blind spots for both adjacent-lane changes', () => {
    expect(card.steps[2].instruction).toMatch(/xi-nhan trái.*gương trong, gương trái.*phía trước, phía sau và hai bên.*đến nhanh.*điểm mù trái ngay trước.*liếc ngắn.*nhìn lại đường/)
    expect(card.steps[3].instruction).toMatch(/một làn liền kề.*vạch đứt.*ổn định.*tắt xi-nhan/)
    expect(card.steps[6].instruction).toMatch(/xi-nhan phải.*gương và điểm mù phải ngay trước.*nhường xe.*một làn liền kề.*đủ hở trước, sau và hai bên.*Tắt xi-nhan/)
  })

  it('does not mistake mirror visibility for guaranteed clearance or forget the truck behind', () => {
    expect(card.steps[5].instruction).toMatch(/cự ly với xe trước.*khoảng hở sau.*tốc độ tương đối/)
    expect(card.steps[5].instruction).toMatch(/toàn bộ xe tải trong gương trong.*chỉ là mốc hỗ trợ, không bảo đảm/)
    expect(card.steps[5].instruction).toMatch(/không chỉ dựa vào đầu xe tải trong gương phải.*gương trong bị che.*không đoán/)
    expect(card.steps[6].instruction).toMatch(/cự ly với xe trước theo biển, tốc độ và điều kiện.*không giảm tốc không cần thiết/)
    expect(instructions).not.toMatch(/giữ khoảng cách ba giây/)
  })

  it('keeps safe abort and emergency exceptions in quick/audio sources, not just recovery', () => {
    for (const text of [card.steps[7].instruction, card.safety, card.recovery]) {
      expect(text).toMatch(/giữ làn.*xe sau.*tốc độ êm|giữ làn.*xe sau.*giảm tốc êm/i)
      expect(text).toMatch(/phía sau xe tải/)
      expect(text).toMatch(/đủ.*hở.*điểm mù|điểm mù.*đủ.*hở/)
      expect(text).toMatch(/không chạy lùi/i)
      expect(text).toMatch(/phanh gấp chỉ để/)
      expect(text).toMatch(/phanh cần thiết/)
      expect(text).toMatch(/nguy hiểm tức thời/)
    }
    expect(card.safety).toMatch(/Không vượt giới hạn tốc độ.*hoãn hay bỏ vượt/)
    expect(card.recovery).toMatch(/Chưa chuyển làn.*hoãn vượt.*Đã ở cạnh/)
    expect(card.recovery).toMatch(/không giật lái sang làn chưa quan sát/)
  })

  it('grades preparation, safe return and speed-limited abort decisions', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/biển, vạch.*đúng giới hạn.*báo hiệu.*gương.*đến nhanh.*điểm mù trái.*một làn/)
    expect(answers[1]).toMatch(/^Chưa.*cự ly trước và sau.*tốc độ tương đối.*điểm mù phải.*chỉ hỗ trợ/)
    expect(answers[2]).toMatch(/^Bỏ vượt, giữ làn.*xe sau.*tốc độ êm.*phía sau xe tải.*kiểm tra lại/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('highway-overtake-truck: actual diagram geometry', () => {
  it.each(['main', 'var'])('%s contains both full vehicle footprints with rightward cab headings', role => {
    const svg = diagram(`${card.id}-${role}`)
    const [x, y, width, height] = rects(group(svg, 'overtake-road'))[0]
    const divider = segments(group(svg, 'overtake-divider'))[0][1]
    expect(group(svg, 'overtake-divider')).toContain('stroke-dasharray=')
    expect(group(svg, 'overtake-edges')).not.toContain('stroke-dasharray=')
    const truck = pose(svg, 'overtake-truck')
    const ego = pose(svg, 'overtake-ego')
    for (const vehicle of [truck, ego]) {
      expect(vehicle.rotation).toBe(90)
      expect(vehicle.left).toBeGreaterThan(x)
      expect(vehicle.right).toBeLessThan(x + width)
      expect(vehicle.top).toBeGreaterThan(y)
      expect(vehicle.bottom).toBeLessThan(y + height)
    }
    expect(truck.top).toBeGreaterThan(divider)
    expect(role === 'main' ? ego.top : ego.bottom).toSatisfy((value: number) =>
      role === 'main' ? value > divider : value < divider)
    const [cab, , trailer] = rects(group(svg, 'overtake-truck'))
    expect(cab[1] + cab[3]).toBeLessThan(trailer[1])
    for (const [x1, y1, x2, y2] of segments(group(svg, 'overtake-direction'))) {
      expect(x2).toBeGreaterThan(x1)
      expect(y2).toBe(y1)
    }
  })

  it.each(['main', 'var'])('%s path starts at the nose, crosses one dashed divider and ends forward inside the receiving lane', role => {
    const svg = diagram(`${card.id}-${role}`)
    const ego = pose(svg, 'overtake-ego')
    const truck = pose(svg, 'overtake-truck')
    const path = route(svg, role === 'main' ? 'overtake-left-path' : 'overtake-return-path')
    const [left, top, width, height] = rects(group(svg, 'overtake-road'))[0]
    const divider = segments(group(svg, 'overtake-divider'))[0][1]
    expect([path.x0, path.y0]).toEqual([ego.right, ego.y])
    expect(path.x1).toBeGreaterThan(path.x0)
    expect(path.y1).toBe(path.y0)
    expect(path.endX).toBeGreaterThan(path.x3)
    expect(path.endY).toBe(path.y3)
    expect(Math.abs(path.endY - (role === 'main' ? top + 27 : top + height - 27))).toBeLessThan(1)
    let crossings = 0
    path.samples.forEach(([x, y], i) => {
      expect(x - 16).toBeGreaterThanOrEqual(left)
      expect(x + 16).toBeLessThanOrEqual(left + width)
      expect(y - 9).toBeGreaterThan(top)
      expect(y + 9).toBeLessThan(top + height)
      expect(x + 16 < truck.left || x - 16 > truck.right || y + 9 < truck.top || y - 9 > truck.bottom).toBe(true)
      if (i > 0) {
        expect(x).toBeGreaterThan(path.samples[i - 1][0])
        if ((y > divider) !== (path.samples[i - 1][1] > divider)) crossings += 1
      }
    })
    expect(crossings).toBe(1)
  })

  it('shows preparation behind the truck and indicative blind areas, not a visibility guarantee', () => {
    const svg = diagram(`${card.id}-main`)
    const truck = pose(svg, 'overtake-truck')
    expect(pose(svg, 'overtake-ego').right).toBeLessThan(truck.left)
    const zones = rects(group(svg, 'overtake-blind-areas'))
    expect(zones).toHaveLength(4)
    expect(zones.some(([x, , w]) => x + w < truck.left)).toBe(true)
    expect(zones.some(([x]) => x > truck.right)).toBe(true)
    expect(zones.some(([, y, , h]) => y + h < truck.top)).toBe(true)
    expect(zones.some(([, y]) => y > truck.bottom)).toBe(true)
    const divider = segments(group(svg, 'overtake-divider'))[0][1]
    expect(zones.some(([, y, , h]) => y < divider && y + h > divider)).toBe(true)
    expect(svg).toContain('ĐIỂM MÙ MINH HỌA, KHÔNG CỐ ĐỊNH')
  })

  it('uses bumper-referenced separation in the later return snapshot', () => {
    const svg = diagram(`${card.id}-var`)
    const truck = pose(svg, 'overtake-truck')
    const ego = pose(svg, 'overtake-ego')
    const [x1, , x2] = segments(group(svg, 'overtake-clearance'))[0]
    expect([x1, x2]).toEqual([truck.right, ego.left])
    expect(ego.left).toBeGreaterThan(truck.right)
    expect(svg).toContain('ĐẦU XE TẢI ĐẾN ĐUÔI XE MÌNH')
    expect(svg).toContain('Gương chỉ hỗ trợ')
  })

  it('explains limitations in both accessible descriptions and captions', () => {
    const assets = getCardAssets(card.id)
    expect(assets).toHaveLength(2)
    for (const asset of assets) {
      expect(asset.alt).toMatch(/không theo tỷ lệ/)
      expect(asset.alt).toMatch(/cùng chiều|cả hai hướng đầu sang phải/)
      expect(asset.caption).not.toMatch(/Vượt nhanh/)
    }
    expect(assets[0].alt).toMatch(/không phải ranh giới chính xác.*chắc chắn được nhìn thấy/)
    expect(assets[1].alt).toMatch(/không chứng minh tầm nhìn.*chỉ hỗ trợ.*điểm mù phải/)
  })
})
