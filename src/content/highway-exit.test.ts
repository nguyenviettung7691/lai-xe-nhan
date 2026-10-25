import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset, getCardAssets } from './assets'
import { contentReleases } from './version'

const card = getCardById('highway-exit')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const diagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) => {
  const match = svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))
  expect(match, `missing SVG group ${id}`).not.toBeNull()
  return match![1]
}
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
type Point = [number, number]
const polygon = (svg: string): Point[] =>
  [...svg.match(/d="([^"]+)"/)![1].matchAll(/[ML]([\d.]+) ([\d.]+)/g)]
    .map(match => [Number(match[1]), Number(match[2])])
const inside = ([x, y]: Point, points: Point[]) => {
  let result = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]
    const [xj, yj] = points[j]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) result = !result
  }
  return result
}
const road = (svg: string) => {
  const [x, y, width, height] = group(svg, 'exit-main-road')
    .match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  const branch = polygon(group(svg, 'exit-deceleration-lane'))
  const [start, boundary, end] = segments(group(svg, 'exit-entry-boundary'))[0]
  return {
    x, y, right: x + width, bottom: y + height, start, end, boundary, branch,
    paved: (point: Point) =>
      (point[0] >= x && point[0] <= x + width && point[1] >= y && point[1] <= y + height) ||
      inside(point, branch)
  }
}

describe('highway-exit: real-world decisions', () => {
  it('preserves identities/history and publishes without sample certification', () => {
    expect(card.lessonId).toBe('highway-entry')
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)?.items.some(item => item.id === 'hw-route')).toBe(true)
    expect(card.assetIds).toEqual(['highway-exit-main', 'highway-exit-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'highway-exit-qc1', 'highway-exit-qc2', 'highway-exit-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(card.changelog[0].date).toBe('2026-09-11')
    expect(contentReleases.find(release => release.version === '2026.10.14')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
  })

  it('plans from actual signs rather than fixed distances or seconds', () => {
    expect(card.context).toMatch(/lối ra bên phải.*không còn đủ khoảng trống.*đi tiếp/)
    expect(card.steps[0].instruction).toMatch(/đọc sớm biển.*vạch.*làn sát bên phải.*đủ đường và khoảng trống/)
    expect(card.steps[0].cueText).toMatch(/không chờ.*cố định.*dẫn đường trái biển/)
    expect(card.steps[2].cueText).toMatch(/Không đếm vài giây/)
    expect(instructions).not.toMatch(/hai ki-lô-mét|ba trăm mét|cách nhau vài giây|\b[1235]00\s?m|\b[12]\s?km/)
  })

  it('signals and observes before every adjacent-lane change, then stabilizes and reassesses', () => {
    expect(card.steps[1].instruction).toMatch(/xi-nhan phải báo trước mỗi lần.*gương trong, gương phải.*phía trước, phía sau, hai bên.*nhường/)
    expect(card.steps[1].cueText).toMatch(/không tạo quyền ưu tiên.*xe sau đến nhanh/)
    expect(card.steps[2].instruction).toMatch(/điểm mù bên phải ngay trước.*liếc ngắn.*phía trước.*vạch đứt.*một làn liền kề.*ổn định.*quan sát lại/)
    expect(card.steps[3].instruction).toMatch(/Báo hiệu phải.*quan sát.*hàng xe chờ.*vạch cho phép.*đủ khoảng hở/)
    expect(card.steps[6].instruction).toMatch(/giữ tín hiệu.*tắt khi hoàn tất/)
  })

  it('distinguishes planned exit deceleration from necessary earlier braking in audible sources', () => {
    for (const text of [card.steps[4].instruction, card.safety]) {
      expect(text).toMatch(/toàn bộ xe.*ổn định trong làn/)
      expect(text).toMatch(/ùn tắc, chướng ngại.*điều kiện xấu/)
      expect(text).toMatch(/làn giảm tốc ngắn/)
      expect(text).toMatch(/giảm tốc hoặc phanh sớm.*kể cả trên làn chính/)
    }
    expect(card.steps[4].instruction).toMatch(/không cố giữ tốc độ/)
    expect(card.steps[4].cueText).toMatch(/Không phanh gấp chỉ.*lối ra.*vẫn phanh/)
    expect(instructions).not.toMatch(/không phanh trên làn chính|Giữ nguyên tốc độ/)
  })

  it('covers exits without a separate lane and checks actual branch speed before bends and queues', () => {
    expect(card.steps[5].instruction).toMatch(/^Giảm tốc từ từ.*không có làn giảm tốc riêng.*biển và vạch.*quan sát xe sau/)
    expect(card.steps[6].instruction).toMatch(/Liếc ngắn đồng hồ.*nhìn lại đường.*thấp hơn thực tế/)
    expect(card.steps[6].instruction).toMatch(/Giảm tốc trước đoạn cong và hàng xe chờ.*biển tốc độ.*mưa trơn.*khuất tầm nhìn/)
    expect(card.steps[4].speedHint).toMatch(/biển báo, dòng xe, tầm nhìn và độ bám/)
  })

  it('keeps missed-exit prohibitions in quick/audio sources as well as recovery', () => {
    for (const text of [card.steps[7].instruction, card.safety, card.recovery]) {
      expect(text).toMatch(/đi tiếp/)
      expect(text).toMatch(/không.*lùi, quay đầu, dừng để quay lại/)
      expect(text).toMatch(/vùng gạch chéo/)
      expect(text).toMatch(/làn dừng khẩn cấp.*lề đường/)
    }
    expect(card.steps[7].instruction).toMatch(/^Giữ làn đi tiếp.*không đủ khoảng hở.*qua đoạn được phép/)
    expect(card.recovery).toMatch(/đã ở đường nhánh.*không cắt ngược/)
    expect(card.recovery).toMatch(/thao tác thiết bị khi đã dừng ở nơi được phép và an toàn/)
    expect(card.recovery).toMatch(/lỡ lối ra không phải.*dừng khẩn cấp/)
    expect(card.mnemonic.text).toMatch(/quá muộn, đi tiếp/)
  })

  it('grades actual safe decisions rather than distance recall', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/^Đọc biển sớm.*báo hiệu.*gương và điểm mù.*đủ hở.*từng làn.*quan sát lại$/)
    expect(answers[1]).toMatch(/^Giảm tốc hoặc phanh sớm.*kể cả trên làn chính.*toàn bộ xe ổn định/)
    expect(answers[2]).toMatch(/^Giữ làn đi tiếp.*không lùi, quay đầu, dừng để quay lại.*làn dừng khẩn cấp$/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('highway-exit: diagram geometry', () => {
  it.each(['highway-exit-main', 'highway-exit-var'])('%s has a paved right-side exit and consistent car/traffic headings', id => {
    const svg = diagram(id)
    const lane = road(svg)
    expect(lane.boundary).toBe(lane.bottom)
    expect(group(svg, 'exit-entry-boundary')).toContain('stroke-dasharray=')
    expect(group(svg, 'exit-solid-separation')).not.toContain('stroke-dasharray=')
    const [solidStart, solidY, solidEnd, solidEndY] = segments(group(svg, 'exit-solid-separation'))[0]
    expect(solidStart).toBe(lane.end)
    expect([solidY, solidEnd, solidEndY]).toEqual([lane.bottom, lane.right, lane.bottom])
    expect(lane.branch[0]).toEqual([lane.start, lane.bottom])
    const outerEdge = polygon(group(svg, 'exit-outer-edge'))
    expect(outerEdge.slice(1)).toEqual([lane.branch[0], ...lane.branch.slice(3).reverse()])
    const [x, y, rotation] = group(svg, 'exit-ego-car')
      .match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
    const [width, length] = group(svg, 'exit-ego-car')
      .match(/width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
    expect(rotation).toBe(90)
    expect(y - width / 2).toBeGreaterThan(segments(group(svg, 'exit-main-divider'))[0][1])
    expect(y + width / 2).toBeLessThan(lane.bottom)
    expect(x - length / 2).toBeGreaterThan(lane.x)
    expect(x + length / 2).toBeLessThan(lane.right)
    for (const [x1, y1, x2, y2] of segments(group(svg, 'exit-traffic-direction'))) {
      expect(x2).toBeGreaterThan(x1)
      expect(y2).toBe(y1)
      expect(lane.paved([x1, y1])).toBe(true)
      expect(lane.paved([x2, y2])).toBe(true)
    }
    for (const [x1, y1, x2, y2] of segments(group(svg, 'exit-branch-direction'))) {
      expect(x2).toBeGreaterThan(x1)
      expect(y2).toBeGreaterThan(y1)
      expect(inside([x1, y1], lane.branch)).toBe(true)
      expect(inside([x2, y2], lane.branch)).toBe(true)
    }
  })

  it('starts the exit path at the car nose, crosses only dashes and settles within the deceleration lane', () => {
    const svg = diagram('highway-exit-main')
    const lane = road(svg)
    const values = group(svg, 'exit-entry-path').match(/d="M([\d.]+) ([\d.]+)C([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    const [x0, y0, x1, y1, x2, y2, x3, y3, endX, endY] = values
    const [carX, carY] = group(svg, 'exit-ego-car').match(/translate\(([\d.]+) ([\d.]+)\)/)!.slice(1).map(Number)
    const length = Number(group(svg, 'exit-ego-car').match(/height="([\d.]+)"/)![1])
    expect(x0).toBeGreaterThanOrEqual(carX + length / 2)
    expect(x0 - carX - length / 2).toBeLessThanOrEqual(3)
    expect(y0).toBe(carY)
    let previousY = y0
    let crossings = 0
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const at = (a: number, b: number, c: number, d: number) =>
        (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d
      const x = at(x0, x1, x2, x3)
      const y = at(y0, y1, y2, y3)
      for (const offset of [-9, 0, 9]) expect(lane.paved([x, y + offset])).toBe(true)
      if (previousY < lane.boundary && y >= lane.boundary) {
        expect(x).toBeGreaterThan(lane.start + 16)
        expect(x).toBeLessThan(lane.end - 16)
        crossings++
      }
      previousY = y
    }
    expect(crossings).toBe(1)
    expect(endX).toBeGreaterThan(x3)
    expect(endY).toBe(y3)
    for (const x of [endX - 16, endX + 16]) {
      for (const y of [endY - 9, endY + 9]) expect(inside([x, y], lane.branch)).toBe(true)
    }
    expect(group(svg, 'exit-entry-path')).toContain('marker-end="url(#tip)"')
  })

  it('shows safe straight continuation after entry closes and crosses out the actual gore shortcut', () => {
    const svg = diagram('highway-exit-var')
    const lane = road(svg)
    const [carX, carY] = group(svg, 'exit-ego-car').match(/translate\(([\d.]+) ([\d.]+)\)/)!.slice(1).map(Number)
    const length = Number(group(svg, 'exit-ego-car').match(/height="([\d.]+)"/)![1])
    expect(carX - length / 2).toBeGreaterThan(lane.end)
    const [x1, y1, x2, y2] = segments(group(svg, 'exit-safe-continuation'))[0]
    expect(x1).toBeGreaterThanOrEqual(carX + length / 2)
    expect(x2).toBeGreaterThan(x1)
    expect([y1, y2]).toEqual([carY, carY])
    expect(x2).toBeLessThan(lane.right)
    const [badX1, badY1, badX2, badY2] = segments(group(svg, 'exit-forbidden-path'))[0]
    const crossX = badX1 + (lane.boundary - badY1) * (badX2 - badX1) / (badY2 - badY1)
    expect(crossX).toBeGreaterThan(lane.end)
    expect(crossX).toBeLessThan(lane.right)
    const gore = polygon(group(svg, 'exit-gore'))
    const crosses = segments(group(svg, 'exit-prohibition'))
    expect(crosses).toHaveLength(2)
    const [xa, ya, xb, yb] = crosses[0]
    const center: Point = [(xa + xb) / 2, (ya + yb) / 2]
    expect(inside(center, gore)).toBe(true)
    expect(center[1] - badY1).toBeCloseTo((center[0] - badX1) * (badY2 - badY1) / (badX2 - badX1))
    expect(crosses[1]).toEqual([xb, ya, xa, yb])
    expect(group(svg, 'exit-forbidden-path')).toContain('stroke="#ff8a6b"')
    expect(group(svg, 'exit-forbidden-path')).not.toContain('marker-end=')
    expect(group(svg, 'exit-safe-continuation')).toContain('stroke="#b7f36b"')
  })

  it('explains diagram limits, directions and the forbidden alternative accessibly', () => {
    const [main, variant] = getCardAssets(card.id)
    expect(main.alt).toMatch(/không theo tỷ lệ.*đầu sang phải.*vạch đứt.*làn giảm tốc bên phải/)
    expect(main.alt).toMatch(/không phải quỹ đạo lái chính xác.*phanh sớm.*làn chính/)
    expect(variant.alt).toMatch(/Mũi tên xanh đi thẳng.*Nét đỏ.*vạch liền.*dấu X đỏ.*không phải hướng nên đi/)
    for (const asset of [main, variant]) {
      const svg = diagram(asset.id)
      expect(svg).toContain('Không theo tỷ lệ')
      expect(svg).toContain(asset.alt)
      expect(`${svg} ${asset.caption}`).not.toMatch(/\b[1235]00\s?m|\b[12]\s?km/)
    }
  })
})
