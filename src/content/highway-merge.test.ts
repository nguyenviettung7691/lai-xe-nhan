import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset, getCardAssets } from './assets'
import { contentReleases } from './version'

const card = getCardById('highway-merge')!
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
const pose = (svg: string, id: string) => {
  const vehicle = group(svg, id)
  const [x, y, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [, , width, length] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  expect(rotation).toBe(90)
  return { x, y, front: x + length / 2, rear: x - length / 2, top: y - width / 2, bottom: y + width / 2 }
}
const receivingLane = (svg: string) => {
  const [x, y, width, height] = group(svg, 'merge-receiving-lane')
    .match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  return { x, y, right: x + width, bottom: y + height }
}

describe('highway-merge: real-world decisions', () => {
  it('preserves identities/history but does not claim independent approval', () => {
    expect(card.lessonId).toBe('highway-entry')
    expect(card.assetIds).toEqual(['highway-merge-main', 'highway-merge-var'])
    expect(card.checklistId).toBe('pre_highway')
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'highway-merge-qc1', 'highway-merge-qc2', 'highway-merge-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.2.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0', '1.2.0'])
    expect(contentReleases.find(release => release.version === '2026.10.13')).toMatchObject({
      date: card.updatedAt, cardIds: [card.id]
    })
    expect(contentReleases.find(release => release.version === '2026.08.1')?.cardIds).toContain(card.id)
  })

  it('assesses the right-side approach and yields before adjusting speed', () => {
    expect(card.context).toMatch(/nhánh bên phải có làn tăng tốc/)
    expect(card.steps[0].instruction).toMatch(/biển, vạch.*chiều dài.*sát bên phải.*nhường xe/)
    expect(card.steps[1].instruction).toMatch(/xi-nhan trái.*gương trong, gương trái.*xe phía sau/)
    expect(card.steps[1].cueText).toMatch(/không tạo quyền ưu tiên.*điểm mù xe tải/)
    expect(card.steps[2].instruction).toMatch(/gần tốc độ dòng xe khi an toàn, không vượt giới hạn.*phía trước/)
    expect(card.steps[2].cueText).toMatch(/Dòng xe chậm thì giảm/)
    expect(card.steps[2].speedHint).toMatch(/biển báo, độ bám, tầm nhìn và dòng xe/)
  })

  it('assesses both post-insertion clearances and closing speed, not a three-second hole', () => {
    expect(card.steps[3].instruction).toMatch(/phía trước lẫn phía sau sau khi xe mình nhập.*tốc độ xe sau/)
    expect(card.steps[3].instruction).toMatch(/không ép xe khác phanh gấp hoặc đánh lái tránh/)
    expect(card.steps[3].cueText).toMatch(/ba giây.*không mặc nhiên đủ/)
    expect(instructions).not.toMatch(/ít nhất ba giây|bằng dòng xe|ba mươi/)
    expect(card.steps[7].instruction).toMatch(/khoảng cách.*biển báo, tốc độ và điều kiện đường/)
    expect(card.steps[7].cueText).toMatch(/mưa, trơn.*tầm nhìn kém/)
  })

  it('rechecks blind spots immediately before moving and crosses only a permitted boundary', () => {
    expect(card.steps[4].instruction).toMatch(/Kiểm tra lại gương và điểm mù bên trái ngay trước.*liếc ngắn.*phía trước.*hoãn nhập/)
    expect(card.steps[4].cueText).toMatch(/cảnh báo điểm mù chỉ hỗ trợ/)
    expect(card.steps[0].cueText).toMatch(/không cắt vạch liền hoặc vùng gạch chéo/)
    expect(card.steps[6].instruction).toMatch(/qua vạch đứt.*đúng làn sát bên phải, không cắt nhiều làn/)
    expect(card.steps[6].instruction).toMatch(/tiếp tục thành làn chạy riêng thì giữ làn đó/)
    expect(card.steps[7].instruction).toMatch(/^Tắt xi-nhan sau khi xe đã ổn định/)
  })

  it('keeps last-resort stopping and shoulder prohibition in quick/audio instruction sources', () => {
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/[Gg]iảm tốc sớm trong làn tăng tốc/)
      expect(text).toMatch(/buộc.*dừng.*trước cuối làn/)
      expect(text).toMatch(/không ép nhập/)
      expect(text).toMatch(/không.*làn dừng khẩn cấp.*lề/)
    }
    expect(card.steps[5].cueText).toMatch(/dừng chỉ là phương án cuối/)
    for (const text of [card.recovery, card.safety]) {
      expect(text).toMatch(/không lùi|không.*lùi, quay đầu/)
      expect(text).toMatch(/gọi.*hỗ trợ|gọi đơn vị quản lý cao tốc/)
    }
    expect(card.recovery).toMatch(/không đủ quãng tăng tốc.*đèn khẩn cấp.*không tự đi bộ/)
    expect(card.recovery).not.toMatch(/đi tiếp vào làn dừng khẩn cấp/)
  })

  it('tests yielding/legal speed, both gaps and safe abandonment with the actual correct answers', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/^Nhường xe.*khi an toàn, trong giới hạn và điều kiện đường$/)
    expect(answers[1]).toMatch(/^Chưa thể kết luận.*trước và sau khi nhập.*tốc độ xe sau.*không ép/)
    expect(answers[2]).toMatch(/^Giảm tốc sớm.*buộc dừng tránh va chạm.*trước cuối làn.*không ép nhập hay dùng lề.*hỗ trợ/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('highway-merge: diagram geometry', () => {
  it.each(['highway-merge-main', 'highway-merge-var'])('%s has consistent rightward traffic and a rightmost receiving lane', id => {
    const svg = diagram(id)
    const lane = receivingLane(svg)
    const divider = segments(group(svg, 'merge-main-divider'))[0]
    expect(divider[1]).toBe(lane.y)
    expect(divider[3]).toBe(lane.y)
    const boundary = segments(group(svg, 'merge-entry-boundary'))[0]
    expect(boundary[1]).toBe(lane.bottom)
    expect(boundary[3]).toBe(lane.bottom)
    expect(group(svg, 'merge-entry-boundary')).toContain('stroke-dasharray=')
    expect(group(svg, 'merge-solid-separator')).not.toContain('stroke-dasharray=')
    for (const vehicleId of ['merge-rear-car', 'merge-front-car']) {
      const car = pose(svg, vehicleId)
      expect(car.front).toBeGreaterThan(car.rear)
      expect(car.top).toBeGreaterThan(lane.y)
      expect(car.bottom).toBeLessThan(lane.bottom)
    }
    for (const [x1, y1, x2, y2] of segments(group(svg, 'merge-traffic-direction'))) {
      expect(x2).toBeGreaterThan(x1)
      expect(y2).toBe(y1)
    }
    expect(svg).toContain('Không theo tỷ lệ')
  })

  it('starts wholly within the acceleration lane and enters only the adjacent right lane through dashes', () => {
    const svg = diagram('highway-merge-main')
    const lane = receivingLane(svg)
    const ego = pose(svg, 'merge-ego-car')
    const [startX, boundaryY, endX] = segments(group(svg, 'merge-entry-boundary'))[0]
    const acceleration = group(svg, 'merge-acceleration-lane')
      .match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)Z"/)!.slice(1).map(Number)
    const [left, top, tipX, tipY, taperX, bottom] = acceleration
    expect(top).toBe(lane.bottom)
    expect(tipY).toBe(top)
    expect(bottom).toBeGreaterThan(top)
    expect(tipX).toBe(endX)
    expect(tipX).toBeGreaterThan(taperX)
    const edge = group(svg, 'merge-outer-edge')
      .match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    expect(edge.slice(0, 6)).toEqual([left, bottom, taperX, bottom, tipX, tipY])
    expect(ego.rear).toBeGreaterThan(left)
    expect(ego.front).toBeLessThan(taperX)
    expect(ego.top).toBeGreaterThan(top)
    expect(ego.bottom).toBeLessThan(bottom)

    const path = group(svg, 'merge-path')
    expect(path).toContain('marker-end="url(#tip)"')
    const [x0, y0, x1, y1, x2, y2, x3, y3, x4, y4] = path
      .match(/d="M([\d.]+) ([\d.]+)C([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    expect(x0).toBeGreaterThan(ego.front)
    expect(y0).toBe(ego.y)
    expect(x1).toBeGreaterThan(x0)
    expect(y1).toBe(y0)
    let crossedBoundary = false
    for (let index = 0; index <= 100; index += 1) {
      const t = index / 100
      const u = 1 - t
      const x = u ** 3 * x0 + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * x3
      const y = u ** 3 * y0 + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * y3
      expect(y).toBeGreaterThan(lane.y)
      expect(x).toBeLessThan(taperX)
      if (Math.abs(y - boundaryY) < 1) {
        crossedBoundary = true
        expect(x).toBeGreaterThan(startX)
        expect(x).toBeLessThan(endX)
      }
    }
    expect(crossedBoundary).toBe(true)
    expect(y3).toBe(y4)
    expect(y4).toBeGreaterThan(lane.y)
    expect(y4).toBeLessThan(lane.bottom)
    expect(x4).toBeGreaterThan(x3)
    expect(x4).toBeLessThan(pose(svg, 'merge-front-car').rear)
    expect(x4).toBeGreaterThan(pose(svg, 'merge-rear-car').front)
  })

  it('shows both actual bumper clearances around the inserted car, without movement arrows or numeric thresholds', () => {
    const svg = diagram('highway-merge-var')
    const lane = receivingLane(svg)
    const rear = pose(svg, 'merge-rear-car')
    const ego = pose(svg, 'merge-ego-car')
    const front = pose(svg, 'merge-front-car')
    expect(ego.top).toBeGreaterThan(lane.y)
    expect(ego.bottom).toBeLessThan(lane.bottom)
    expect(ego.y).toBe(rear.y)
    expect(ego.y).toBe(front.y)
    expect(rear.front).toBeLessThan(ego.rear)
    expect(ego.front).toBeLessThan(front.rear)
    for (const [id, start, end, caption] of [
      ['merge-rear-gap', rear.front, ego.rear, 'Hở sau'],
      ['merge-front-gap', ego.front, front.rear, 'Hở trước']
    ] as const) {
      const bracket = group(svg, id)
      const [[x1, , x2]] = segments(bracket)
      expect([x1, x2]).toEqual([start, end])
      expect(bracket).toContain(caption)
      expect(bracket).not.toMatch(/marker-end|giây/)
    }
    expect(svg).not.toContain('id="merge-path"')
    expect(svg).toContain('TỐC ĐỘ XE SAU')
    expect(svg).toContain('Khe ba giây không bảo đảm')
  })

  it('explains arrow semantics, limitations and both gaps in accessible metadata', () => {
    expect(getCardAssets(card.id)).toHaveLength(2)
    const main = getAsset('highway-merge-main')!
    const variant = getAsset('highway-merge-var')!
    expect(main.alt).toMatch(/không theo tỷ lệ.*hướng đầu sang phải.*từ trước đầu xe.*vạch đứt.*không sang làn trái/)
    expect(main.alt).toContain('quyền ưu tiên')
    expect(variant.alt).toMatch(/đầu xe sau tới đuôi xe mình.*đầu xe mình tới đuôi xe trước/)
    expect(variant.alt).toMatch(/không phải mũi tên chuyển động.*không chứng minh khe an toàn/)
    expect(variant.caption).toMatch(/trước và sau.*tốc độ tương đối/)
    for (const asset of [main, variant]) {
      expect(asset.caption).not.toMatch(/ba giây|3 giây/)
      expect(diagram(asset.id)).toContain(`<title id="ttl">${asset.alt}</title>`)
    }
  })
})
