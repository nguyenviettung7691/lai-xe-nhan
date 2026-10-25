import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('narrow-corner')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
type Point = [number, number]
const points = (svg: string, id: string): Point[] => {
  const d = svg.match(new RegExp(`<path id="${id}" d="([^"]+)"`))![1]
  return [...d.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)].map(match => [Number(match[1]), Number(match[2])])
}
const insideWall = ([x, y]: Point) => x >= 194 && y >= 108
const onRoad = ([x, y]: Point) => x > 76 && x < 320 && y > 20 && y < 174 && !insideWall([x, y])
const transform = ([x, y]: Point, [rx, ry]: Point, degrees: number): Point => {
  const angle = degrees * Math.PI / 180
  return [rx + x * Math.cos(angle) - y * Math.sin(angle), ry + x * Math.sin(angle) + y * Math.cos(angle)]
}
const rectangle = (x: number, y: number, w: number, h: number): Point[] =>
  [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
const wall = rectangle(194, 108, 126, 66)
const intersects = (a: Point[], b: Point[]) => [a, b].flatMap(polygon =>
  polygon.map((point, index): Point => {
    const next = polygon[(index + 1) % polygon.length]
    return [-(next[1] - point[1]), next[0] - point[0]]
  })
).every(axis => {
  const project = (vertices: Point[]) => vertices.map(([x, y]) => x * axis[0] + y * axis[1])
  const pa = project(a)
  const pb = project(b)
  return Math.max(...pa) >= Math.min(...pb) && Math.max(...pb) >= Math.min(...pa)
})
const vehicleGeometry = (svg: string) => {
  const pose = svg.match(/id="corner-car" transform="translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)"/)!.slice(1).map(Number)
  const body = svg.match(/id="corner-car"[^>]+><g transform="translate\((-?[\d.]+) (-?[\d.]+)\) rotate\(0\)"><rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  const mirrors = svg.match(/id="corner-open-mirrors">([\s\S]*?)<\/g>/)![1]
  const shapes = [
    rectangle(body[0] + body[2], body[1] + body[3], body[4], body[5]),
    ...[...mirrors.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
      .map(match => rectangle(Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])))
  ]
  const rear: Point = [pose[0], pose[1]]
  return { rear, angle: pose[2], shapes }
}
const vehicleFits = (shapes: Point[][], rear: Point, angle: number) => shapes.every(shape => {
  const polygon = shape.map(point => transform(point, rear, angle))
  return polygon.every(onRoad) && !intersects(polygon, wall)
})

describe('narrow-corner: real-world lesson', () => {
  it('preserves identifiers/history and removes sample instructor approval honestly', () => {
    expect(card.lessonId).toBe('narrow-control')
    expect(card.assetIds).toEqual(['narrow-corner-main', 'narrow-corner-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'narrow-corner-qc1', 'narrow-corner-qc2', 'narrow-corner-qc3'
    ])
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(publishedCards).toContain(card)
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.risk).toBe('medium')
    expect(card.difficulty).toBe(3)
    expect(card.minutes).toBe(6)
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.10')?.cardIds).toEqual([card.id])
  })

  it('defines vehicle/turn scope and rejects a universal outside-edge or shoulder marker', () => {
    expect(card.context).toMatch(/xe con tiến rẽ phải.*không kéo rơ-moóc.*rẽ trái.*không sao chép/)
    expect(card.objective).toMatch(/toàn xe.*góc trong.*phía ngoài.*dừng/)
    expect(card.steps[0].instruction).toMatch(/được phép.*dừng.*chưa nhìn rõ.*toàn xe/)
    expect(card.steps[2].instruction).toMatch(/phần đường được phép.*thân, gương, góc đầu và đuôi.*cả hai bên.*không mặc định bám sát mép ngoài/)
    expect(card.steps[2].instruction).toMatch(/không đủ chỗ.*dừng.*lối khác.*hỗ trợ/)
    expect(card.steps[2].cueText).toMatch(/Gương mở.*không gập.*không dùng mốc vai xe/)
    expect(card.steps[3].cueText).toMatch(/chiều dài cơ sở, bán kính quay.*phần nhô.*không có mốc/)
    expect(card.mnemonic.text).toBe('Nhìn lối, chừa toàn xe, chưa rõ thì dừng.')
  })

  it('signals throughout and yields without substituting the horn for observation', () => {
    expect(card.steps[1].instruction).toMatch(/phía trước, phía sau, hai bên và điểm mù.*xi-nhan.*suốt.*nhường người đi bộ, xe đạp, xe máy và xe đi ngược chiều/)
    expect(card.steps[1].cueText).toMatch(/không tạo quyền ưu tiên.*xe máy/)
    expect(card.safety).toMatch(/Còi chỉ dùng.*cảnh báo.*theo quy định.*không thay quan sát, xi-nhan hay nhường đường/)
    expect(card.safety).toMatch(/không bấm liên tục.*22 giờ đến 05 giờ.*khu đông dân cư.*khám bệnh, chữa bệnh.*trừ xe ưu tiên/)
  })

  it('uses visible stopping distance, whole-vehicle observation and progressive exit steering', () => {
    expect(card.steps[3].instruction).toMatch(/đi bộ hoặc chậm hơn.*dừng được.*nhìn rõ còn trống.*góc đầu xe phía ngoài.*bánh sau phía trong/)
    expect(card.steps[4].instruction).toMatch(/phía trước, hai bên, gương và điểm mù.*không nhìn cố định.*hay mặc định gương thấy được lốp sau/)
    expect(card.steps[4].cueText).toMatch(/chỉ hỗ trợ.*đầu đuôi xe quét.*im lặng không chứng minh/)
    expect(card.steps[6].instruction).toMatch(/^Trả lái dần.*bánh sau, thân và đuôi.*đủ khoảng hở.*phía trước và hai bên.*toàn xe thẳng/)
    expect(card.steps[6].cueText).toMatch(/Đầu xe.*chưa chứng minh.*đuôi và bánh sau/)
    expect(instructions).not.toMatch(/dưới 10 km\/h|Đưa vai xe vượt|Đi sát mép ngoài/)
  })

  it('keeps essential stop/no-blind-reverse/restart conditions in quick and spoken surfaces', () => {
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/phanh dừng hẳn và giữ xe trước/)
      expect(text).toMatch(/không cố tiến.*tự lùi.*góc khuất/)
      expect(text).toMatch(/chỉ đi tiếp sau.*quan sát lại.*đủ khoảng hở.*nhường/)
    }
    expect(card.steps[5].instruction).toMatch(/mất tầm nhìn.*người hoặc xe.*cảnh báo/)
    expect(card.safety).toContain('nơi đường giao nhau')
    expect(card.steps[5].cueText).toMatch(/Không chờ.*chạm tường.*giữ xe.*hỗ trợ/)
  })

  it('secures inspection and guides, and does not prescribe reversing at the corner', () => {
    expect(card.recovery).toMatch(/^Đạp phanh dừng hẳn.*đã va chạm.*không cố tiến hoặc lùi.*kiểm tra người/)
    expect(card.recovery).toMatch(/xuống kiểm tra.*phanh chân.*phanh đỗ.*hướng dẫn.*P.*sau khi đứng hẳn.*đứng chắc.*mở cửa an toàn/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy và vùng quét.*không giữa xe với tường.*tín hiệu.*luôn thấy nhau.*mất liên lạc thì dừng/)
    expect(card.recovery).toMatch(/Không tự lùi thẳng.*quỹ đạo cong.*chỉ lùi khi được phép.*hai bên và phía sau.*tín hiệu lùi.*dừng hẳn trước đổi chiều/)
    expect(card.recovery).toMatch(/Không lùi.*đường giao nhau, đường một chiều.*tầm nhìn bị che khuất.*giữ xe và gọi hỗ trợ/)
  })

  it('tests conditional positioning, rear tracking and an explicit stop decision', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/phần đường được phép.*toàn xe.*không có mốc vai xe.*dừng/)
    expect(answers[1]).toMatch(/bánh trước.*bánh sau, thân, đuôi.*trả lái dần/)
    expect(answers[2]).toMatch(/phanh dừng hẳn và giữ xe.*không tự lùi.*quan sát lại.*nhường đường/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('narrow-corner: actual SVG geometry', () => {
  it.each(card.assetIds)('%s has the same L corridor, front/rear labels and open mirrors', id => {
    const svg = readDiagram(id)
    expect(svg).toContain('<g id="corner-inner-wall"><rect x="194" y="108" width="126" height="66"')
    expect(svg).toContain('M76 20L320 20')
    expect(svg).toContain('M194 108L320 108')
    expect(svg).toContain('M194 108L194 174')
    expect(svg).toContain('corner-open-mirrors')
    expect(svg).toContain('corner-wheels')
    expect(svg).toContain('ĐẦU')
    expect(svg).toContain('ĐUÔI')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*gương mở/)
    expect(svg).not.toContain('leo lề')
  })

  it('tracks the same vehicle wheels about a common turn centre, entirely on the road', () => {
    const svg = readDiagram('narrow-corner-main')
    const front = points(svg, 'corner-front-track')
    const rear = points(svg, 'corner-rear-track')
    expect(svg).toContain('id="corner-car" transform="translate(142 142) rotate(0)"')
    expect(front).toHaveLength(31)
    expect(rear).toHaveLength(front.length)
    expect(front[0]).toEqual([152, 114])
    expect(rear[0]).toEqual([152, 142])
    expect(front.at(-1)).toEqual([252, 70])
    expect(rear.at(-1)).toEqual([224, 70])
    front.forEach((point, index) => {
      const [x, y] = point
      const [rx, ry] = rear[index]
      expect(Math.hypot(x - rx, y - ry)).toBeCloseTo(28, 0)
      expect(Math.hypot(x - 224, y - 142)).toBeCloseTo(Math.hypot(72, 28), 0)
      expect(Math.hypot(rx - 224, ry - 142)).toBeCloseTo(72, 0)
      expect(onRoad(point)).toBe(true)
      expect(onRoad(rear[index])).toBe(true)
    })
    expect(svg).toMatch(/id="corner-front-track"[^>]+stroke="#b7f36b"[^>]+marker-end="url\(#tip\)"/)
    expect(svg).toMatch(/id="corner-rear-track"[^>]+stroke="#ffc66d"[^>]+marker-end="url\(#corner-rear-tip\)"/)
    expect(svg).toContain('TRƯỚC')
    expect(svg).toContain('SAU')
    expect(getAsset('narrow-corner-main')?.alt).toMatch(/bánh trước phải.*bánh sau phải.*cùng xe.*không phải toàn bộ vùng quét/)
    expect(svg.replace(/<[^>]+>/g, ' ')).toMatch(/không phải vùng quét\s+toàn xe/)
  })

  it('keeps body and mirrors clear of walls for every degree of the main illustrated turn', () => {
    const { shapes } = vehicleGeometry(readDiagram('narrow-corner-main'))
    expect(shapes).toHaveLength(3)
    const failures = Array.from({ length: 91 }, (_, angle) => {
      const radians = angle * Math.PI / 180
      return vehicleFits(shapes, [224 - 82 * Math.cos(radians), 142 - 82 * Math.sin(radians)], angle)
    }).filter(fits => !fits)
    expect(failures).toEqual([])
  })

  it('stops before contact but demonstrates a real predicted rear-wheel/wall intersection', () => {
    const svg = readDiagram('narrow-corner-var')
    const { rear: position, angle, shapes } = vehicleGeometry(svg)
    expect(angle).toBe(45)
    expect(shapes).toHaveLength(3)
    expect(vehicleFits(shapes, position, angle)).toBe(true)
    const rear = points(svg, 'corner-rear-track')
    expect(onRoad(rear[0])).toBe(true)
    const actualRearWheel = transform([10, 0], position, angle)
    expect(Math.hypot(rear[0][0] - actualRearWheel[0], rear[0][1] - actualRearWheel[1])).toBeLessThan(0.1)
    expect(rear.some(insideWall)).toBe(true)
    expect(rear.every(([x, y]) => Math.abs(Math.hypot(x - 229, y - 173) - 72) < 0.1)).toBe(true)
    const cross = svg.match(/id="corner-contact-risk">([\s\S]*?)<\/g>/)![1]
    const [x1, y1, x2, y2] = cross.match(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    const hit: Point = [(x1 + x2) / 2, (y1 + y2) / 2]
    expect(hit[0]).toBe(194)
    expect(hit[1]).toBeGreaterThan(108)
    expect(Math.hypot(hit[0] - 229, hit[1] - 173)).toBeCloseTo(72, 1)
    expect(svg).toContain('XE DỪNG')
    expect(svg).toContain('NGUY CƠ')
    expect(svg).toContain('không phải lệnh đi')
    expect(svg).not.toContain('marker-end=')
    expect(svg).not.toContain('corner-front-track')
    expect(getAsset('narrow-corner-var')?.alt).toMatch(/đang dừng.*chưa chạm tường.*nếu cố tiến.*dấu X.*không phải lệnh đi hay đường lùi/)
  })
})
