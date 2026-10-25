import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('parking-parallel')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const diagramText = (svg: string) =>
  [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map(match => match[1]).join(' ')
const pose = (svg: string, id: string) => {
  const vehicle = group(svg, id)
  const [cx, cy, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [x, y, width, height] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  expect(rotation).toBe(0)
  return { cx, cy, left: cx + x, right: cx + x + width, front: cy + y, rear: cy + y + height }
}

describe('parking-parallel: real-world guidance', () => {
  it('preserves stable IDs, versions the revision and removes sample approval', () => {
    expect(card.lessonId).toBe('parking-basics')
    expect(card.checklistId).toBe('pre_reverse')
    expect(card.assetIds).toEqual(['parking-parallel-main', 'parking-parallel-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'parking-parallel-qc1', 'parking-parallel-qc2', 'parking-parallel-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.1.0')
    expect(card.changelog.at(-1)?.version).toBe(card.version)
    expect(contentReleases.some(release => release.cardIds.includes(card.id) && release.date === card.updatedAt)).toBe(true)
  })

  it('defines a right-curb level-road example without universal space or steering guarantees', () => {
    expect(card.context).toMatch(/lề phải.*bằng phẳng.*được phép đỗ và lùi/)
    expect(instructions).not.toMatch(/80 cm|30 cm|1,5 mét|đánh lái phải hết cỡ/)
    expect(card.objective).not.toMatch(/hai nhịp/)
    expect(card.steps[0].instruction).toMatch(/gương, khoảng quét đầu xe.*chọn chỗ khác nếu chưa chắc/)
    expect(card.steps[1].instruction).toMatch(/hai đuôi gần ngang nhau chỉ là ví dụ/)
    expect(card.steps[1].instruction).toMatch(/không dừng chờ song song/)
    expect(card.steps[1].cueText).toMatch(/không tạo quyền ưu tiên/)
  })

  it('stops before selecting reverse and requires direct, mirror and blind-spot observations', () => {
    expect(card.steps[2].instruction).toMatch(/^Dừng hẳn, giữ phanh/)
    expect(card.steps[2].instruction).toMatch(/gương, điểm mù.*trực tiếp hai bên, phía sau.*đầu xe/)
    expect(card.steps[2].instruction).toMatch(/nhường người đi bộ, xe đạp và xe máy.*R khi xe đứng hẳn/)
    expect(card.steps[2].cueText).toMatch(/chỉ hỗ trợ; có tín hiệu lùi/)
  })

  it('explains rearward-right motion and left front swing while observing continuously', () => {
    expect(card.steps[3].instruction).toMatch(/lái phải dần.*đuôi xe dịch về lề phải.*đầu xe sẽ quét sang trái/)
    expect(card.steps[3].instruction).toMatch(/liên tục quan sát.*chân sẵn trên phanh.*dừng ngay/)
    expect(card.steps[3].speedHint).toBe('tốc độ đi bộ hoặc chậm hơn')
    expect(card.steps[4].instruction).toMatch(/chỉnh lái trái khi có đủ khoảng hở.*xe trước.*không chạm lề hay xe sau/)
    expect(card.steps[4].instruction).toMatch(/dừng nếu chưa chắc/)
  })

  it('stops and rechecks before every direction change without a fixed attempt count', () => {
    expect(card.steps[5].instruction).toMatch(/Trả bánh thẳng.*song song lề/)
    expect(card.steps[5].instruction).toMatch(/dừng hẳn trước mỗi lần đổi chiều, kiểm tra lại đường đi/)
    expect(card.steps[5].instruction).toMatch(/không cố hoàn thành trong một số nhịp/)
  })

  it('distinguishes the legal final curb limit from steering timing and secures before exit', () => {
    expect(card.steps[6].instruction).toMatch(/không cần chia đều tuyệt đối/)
    expect(card.steps[6].instruction).toMatch(/trên đường phố, bánh xe gần nhất.*lề phải quá 0,25 m/)
    expect(card.steps[6].cueText).toMatch(/không phải mốc.*đổi lái/)
    expect(card.steps[7].instruction).toMatch(/Dừng hẳn.*phanh đỗ.*P.*số sàn.*tắt máy/)
    expect(card.steps[7].instruction).toMatch(/phía trước, phía sau và bên mở cửa.*khi an toàn/)
  })

  it('covers stop conditions, prohibited reversing sites and safe curb-contact recovery', () => {
    expect(card.safety).toMatch(/^Dừng ngay.*không chắc khoảng cách.*cảm biến cảnh báo/)
    for (const site of ['đường một chiều', 'cấm dừng', 'người đi bộ', 'giao nhau', 'đường sắt', 'khuất tầm nhìn', 'hầm đường bộ', 'cao tốc']) {
      expect(card.safety).toContain(site)
    }
    expect(card.recovery).toMatch(/^Dừng hẳn.*không leo lề.*nghi hỏng lốp hoặc bánh/)
    expect(card.recovery).toMatch(/Chỉ tiến ra.*phía trước, hai bên.*đuôi xe quét/)
    expect(card.recovery).toMatch(/phanh đỗ.*tắt máy.*mở cửa an toàn/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy.*trong tầm nhìn.*mất liên lạc thì dừng/)
  })

  it('tests yielding, vehicle-dependent clearance and legal safe exit rather than fixed markers', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(card.quickCheck[0].isStopCondition).toBe(true)
    expect(answers[0]).toMatch(/^Dừng hẳn, nhường xe qua.*quan sát rõ/)
    expect(answers[1]).toMatch(/Không có mốc chung.*vùng đầu xe quét/)
    expect(answers[2]).toMatch(/0,25 m.*phanh đỗ.*quan sát trước, sau và bên mở cửa/)
    const checklist = getChecklist(card.checklistId)!
    expect(checklist.items.find(item => item.id === 'reverse-camera')?.hint).toMatch(/chỉ hỗ trợ/)
    expect(checklist.items.find(item => item.id === 'reverse-speed')?.hint).toMatch(/không phải tốc độ mục tiêu/)
  })
})

describe('parking-parallel: diagram geometry and meaning', () => {
  it.each(['parking-parallel-main', 'parking-parallel-var'])('%s puts the curb on the right of upward-facing cars and traffic', id => {
    const svg = readDiagram(id)
    const [[curbX, , curbEndX]] = segments(group(svg, 'parallel-curb'))
    expect(curbX).toBe(curbEndX)
    for (const vehicleId of ['parallel-front', 'parallel-rear', 'parallel-car']) {
      const vehicle = pose(svg, vehicleId)
      expect(vehicle.right).toBeLessThan(curbX)
      expect(vehicle.front).toBeLessThan(vehicle.rear)
      expect(vehicle.front).toBeGreaterThan(0)
      expect(vehicle.rear).toBeLessThan(174)
    }
    const [[x1, y1, x2, y2]] = segments(group(svg, 'parallel-traffic'))
    expect(x1).toBe(x2)
    expect(y2).toBeLessThan(y1)
    expect(svg).toContain('>ĐẦU</text>')
    expect(svg).toContain('>ĐUÔI</text>')
    expect(svg).toContain('>CHIỀU ĐI</text>')
    expect(svg).toMatch(/Không theo tỷ lệ/)
    expect(svg).not.toMatch(/30 cm|80 cm|✓/)
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ/i)
    expect(getAsset(id)?.alt).toMatch(/Mũi tên.*bên trái chỉ chiều đi/)
  })

  it('starts beside the front car with rear ends aligned and a clear lateral gap', () => {
    const svg = readDiagram('parking-parallel-main')
    const ego = pose(svg, 'parallel-car')
    const front = pose(svg, 'parallel-front')
    expect(ego.rear).toBe(front.rear)
    expect(ego.right).toBeLessThan(front.left)
    expect(segments(group(svg, 'parallel-alignment'))).toEqual([[ego.right, ego.rear, front.left, front.rear]])
    expect(getAsset('parking-parallel-main')?.alt).toMatch(/hai đuôi ngang nhau chỉ là ví dụ/)
  })

  it('shows only an initial rearward-right direction, not a complete parking trajectory', () => {
    const svg = readDiagram('parking-parallel-main')
    const ego = pose(svg, 'parallel-car')
    const front = pose(svg, 'parallel-front')
    const rear = pose(svg, 'parallel-rear')
    const values = group(svg, 'parallel-reverse')
      .match(/d="M([\d.]+) ([\d.]+)C([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/)!.slice(1).map(Number)
    const [x0, y0, x1, y1, x2, y2, x3, y3] = values
    expect(x0).toBe(ego.cx)
    expect(y0).toBeGreaterThan(ego.rear)
    expect(x1).toBe(x0)
    expect(y1).toBeGreaterThan(y0)
    expect(x3).toBeGreaterThan(x2)
    expect(x2).toBeGreaterThan(x1)
    expect(y3).toBeGreaterThan(y2)
    for (let i = 0; i <= 100; i += 1) {
      const t = i / 100
      const u = 1 - t
      const x = u ** 3 * x0 + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * x3
      const y = u ** 3 * y0 + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * y3
      expect(x).toBeLessThan(front.left)
      expect(y).toBeGreaterThan(front.rear)
      expect(y).toBeLessThan(rear.front)
    }
    expect(svg).toContain('ĐẦU QUÉT TRÁI')
    expect(diagramText(svg)).toContain('không phải toàn quỹ đạo')
    expect(getAsset('parking-parallel-main')?.caption).toMatch(/không phải toàn quỹ đạo/)
  })

  it('parks parallel with actual positive gaps at the curb and both ends, without a motion arrow', () => {
    const svg = readDiagram('parking-parallel-var')
    const ego = pose(svg, 'parallel-car')
    const front = pose(svg, 'parallel-front')
    const rear = pose(svg, 'parallel-rear')
    expect(ego.cx).toBe(front.cx)
    expect(ego.cx).toBe(rear.cx)
    expect(ego.front).toBeGreaterThan(front.rear)
    expect(ego.rear).toBeLessThan(rear.front)
    const gaps = segments(group(svg, 'parallel-end-gaps'))
    expect(gaps[0].slice(1)).toEqual([front.rear, 204, ego.front])
    expect(gaps[3].slice(1)).toEqual([ego.rear, 204, rear.front])
    expect(svg.replace(group(svg, 'parallel-traffic'), '')).not.toContain('marker-end=')
    expect(svg).not.toMatch(/\d+\s*cm/)
    expect(getAsset('parking-parallel-var')?.alt).toMatch(/không phải số đo/)
    expect(diagramText(svg)).toContain('Giới hạn sát lề không phải mốc đổi lái')
  })
})
