import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('parking-slope')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const currentText = [
  card.context, card.objective, instructions, ...card.steps.map(step => step.cueText),
  ...card.mistakes, card.recovery, card.safety, card.mnemonic.text,
  ...card.quickCheck.flatMap(question => [question.prompt, ...question.options])
].join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const segments = (svg: string) =>
  [...svg.matchAll(/d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/g)].map(match => match.slice(1).map(Number))
const pose = (svg: string) => {
  const vehicle = group(svg, 'slope-car')
  const [cx, cy, rotation] = vehicle.match(/translate\(([\d.]+) ([\d.]+)\) rotate\(([\d.]+)\)/)!.slice(1).map(Number)
  const [x, y, width, height] = vehicle.match(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/)!.slice(1).map(Number)
  expect(rotation).toBe(180)
  return { cx, left: cx - x - width, right: cx - x, rear: cy - y - height, front: cy - y }
}

describe('parking-slope: real-world guidance', () => {
  it('preserves identifiers and release history without claiming sample certification', () => {
    expect(card.lessonId).toBe('parking-underground')
    expect(card.assetIds).toEqual(['parking-slope-main', 'parking-slope-var'])
    expect(card.checklistId).toBe('pre_reverse')
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'parking-slope-qc1', 'parking-slope-qc2', 'parking-slope-qc3'
    ])
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.version).toBe('1.2.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.at(-1)?.version).toBe(card.version)
    expect(contentReleases.some(release => release.version === '2026.08.1' && release.cardIds.includes(card.id))).toBe(true)
    const release = contentReleases.find(item => item.version === '2026.10.5')
    expect(release?.cardIds).toEqual([card.id])
    expect(release?.date).toBe(card.updatedAt)
  })

  it('uses a permitted automatic-car example, not a mandate to park on a ramp', () => {
    expect(card.context).toMatch(/xe số tự động.*được phép lùi.*không trên đường dốc ra vào hầm/)
    expect(card.context).toMatch(/Lùi có thể lên hoặc xuống dốc/)
    expect(card.steps[0].instruction).toMatch(/phía cao, phía thấp, độ bám.*bằng phẳng khác/)
    expect(card.safety).toMatch(/không thay bài tập côn.*xe số sàn/)
    expect(currentText).not.toMatch(/một phần ba|8%|phải lùi vào ô|chạy một vòng/)
  })

  it('requires continuous all-round observation, yielding and a full stop before R', () => {
    expect(card.steps[1].instruction).toMatch(/gương, điểm mù.*trực tiếp hai bên, phía sau.*đầu xe.*nhường người/i)
    expect(card.steps[1].cueText).toMatch(/Camera và cảm biến chỉ hỗ trợ/)
    expect(card.steps[2].instruction).toMatch(/^Dừng hẳn, giữ phanh chân rồi cài R, có tín hiệu lùi/)
    expect(card.steps[2].instruction).toMatch(/đèn chiếu gần khi thiếu sáng/)
    expect(card.steps[4].instruction).toMatch(/liên tục.*quan sát trực tiếp.*đầu xe quét/)
    expect(currentText).not.toMatch(/Quay đầu nhìn liên tục nên/)
  })

  it('distinguishes downhill braking from model-specific uphill starting without fixed pedal travel', () => {
    expect(card.steps[3].instruction).toMatch(/lùi xuống dốc, giảm lực phanh có kiểm soát theo tốc độ thực tế/)
    expect(card.steps[3].instruction).toMatch(/lùi lên dốc.*hướng dẫn của xe.*giáo viên.*không mặc định/)
    expect(card.steps[3].cueText).toMatch(/Không có hành trình nhả phanh chung.*không dùng ga để giữ xe đứng yên/)
    expect(card.steps[3].speedHint).toBe('tốc độ đi bộ hoặc chậm hơn')
    expect(card.steps[2].cueText).toMatch(/R không ngăn xe trôi/)
    expect(card.steps[5].cueText).toMatch(/chỉ giữ tạm thời.*có thể không kích hoạt/)
  })

  it('stops unexpected motion and hazards with the brake, not P, before every direction change', () => {
    expect(card.steps[5].instruction).toMatch(/^Đạp phanh để dừng hẳn và giữ xe.*tăng tốc, trôi sai hướng/)
    expect(card.steps[5].instruction).toMatch(/người hoặc xe.*cảm biến cảnh báo.*không chắc khoảng cách/)
    expect(card.steps[5].instruction).toMatch(/không chọn P khi đang chuyển động.*đổi R\/D sau khi đứng hẳn và quan sát lại/)
    for (const text of [card.recovery, card.safety]) {
      expect(text).toMatch(/phanh.*giữ xe|giữ phanh chân/)
      expect(text).toMatch(/không dùng P làm phanh dừng|không chọn P khi xe còn chuyển động/)
    }
  })

  it('secures before releasing the foot brake, checks holding and avoids unsafe chocking or exit', () => {
    expect(card.steps[6].instruction).toMatch(/^Dừng hẳn.*giữ phanh chân.*hướng dẫn của xe.*phanh đỗ và chọn P trước khi nhả phanh chân/)
    expect(card.steps[6].instruction).toMatch(/không dựa riêng vào P hoặc Auto Hold/)
    expect(card.steps[7].instruction).toMatch(/vẫn ngồi ở vị trí lái, đạp giữ lại ngay nếu xe dịch chuyển/)
    expect(card.steps[7].instruction).toMatch(/chỉ tắt máy, rời xe.*quan sát trước, sau và bên mở cửa/)
    expect(card.safety).toMatch(/đỗ dốc trên đường bộ phải đánh lái về phía lề và chèn bánh/)
    expect(card.recovery).toMatch(/không tự bước ra sau hoặc xuống phía thấp.*chưa được giữ chắc/i)
    expect(card.recovery).toMatch(/nếu xe vẫn dịch chuyển.*không rời vị trí lái và gọi hỗ trợ/)
  })

  it('covers safe recovery, guide positioning and prohibited reversing areas', () => {
    expect(card.recovery).toMatch(/chỉ chọn D.*đứng hẳn.*phía trước, hai bên và vùng đuôi xe quét/)
    expect(card.recovery).toMatch(/ngoài đường xe chạy.*trong tầm nhìn, mất liên lạc thì dừng/)
    for (const location of ['đường dốc ra vào hầm', 'đường một chiều', 'cấm dừng', 'người đi bộ qua đường', 'nơi giao nhau', 'đường sắt', 'khuất tầm nhìn', 'hầm đường bộ', 'cao tốc']) {
      expect(card.safety).toContain(location)
    }
    expect(getChecklist(card.checklistId)?.items.find(item => item.id === 'reverse-speed')?.hint).toContain('không phải tốc độ mục tiêu')
  })

  it('tests actual braking control, assist limits and stop-and-secure behaviour', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(answers[0]).toMatch(/lực phanh theo tốc độ thực tế.*luôn dừng được ngay/)
    expect(answers[1]).toMatch(/chỉ tạm thời.*có thể không kích hoạt.*giữ xe bằng phanh/)
    expect(answers[2]).toMatch(/^Đạp phanh dừng hẳn, giữ xe.*phanh đỗ và P.*trước khi nhả phanh chân/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
  })
})

describe('parking-slope: diagram geometry and meaning', () => {
  it.each(['parking-slope-main', 'parking-slope-var'])('%s establishes the same high/low direction, car heading and open bay', id => {
    const svg = readDiagram(id)
    const vehicle = pose(svg)
    expect(vehicle.front).toBeGreaterThan(vehicle.rear)
    const bay = segments(group(svg, 'slope-bay'))
    expect(bay).toHaveLength(3)
    const [[left, top, , mouth], [right]] = bay
    expect(top).toBeLessThan(mouth)
    expect(vehicle.rear).toBeGreaterThan(mouth)
    expect(vehicle.left).toBeGreaterThan(left)
    expect(vehicle.right).toBeLessThan(right)
    expect(bay.some(([, y1, , y2]) => y1 === mouth && y2 === mouth)).toBe(false)
    const [[x1, y1, x2, y2]] = segments(group(svg, 'slope-grade'))
    expect(x1).toBe(x2)
    expect(y2).toBeGreaterThan(y1)
    expect(x1).toBeLessThan(left)
    expect(svg).toContain('>CAO</text>')
    expect(svg).toContain('>THẤP</text>')
    expect(svg).toContain('>ĐẦU</text>')
    expect(svg).toContain('>ĐUÔI</text>')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(svg).not.toMatch(/8%|một phần ba|✓/)
    expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*cao ở trên.*thấp ở dưới/i)
  })

  it('starts the uphill reverse arrow behind the rear and enters the bay without crossing its walls', () => {
    const svg = readDiagram('parking-slope-main')
    const vehicle = pose(svg)
    const [[left, top, , mouth], [right]] = segments(group(svg, 'slope-bay'))
    const [[x1, y1, x2, y2]] = segments(group(svg, 'slope-reverse'))
    expect(x1).toBe(vehicle.cx)
    expect(x2).toBe(x1)
    expect(y1).toBeLessThan(vehicle.rear)
    expect(y1).toBeGreaterThan(top)
    expect(y2).toBeLessThan(y1)
    expect(y2).toBeLessThan(mouth)
    expect(y2).toBeGreaterThan(top)
    expect(x1).toBeGreaterThan(left)
    expect(x1).toBeLessThan(right)
    // At the illustrated endpoint, the entire body still fits in the bay.
    const halfWidth = (vehicle.right - vehicle.left) / 2
    const length = vehicle.front - vehicle.rear
    expect(x2 - halfWidth).toBeGreaterThan(left)
    expect(x2 + halfWidth).toBeLessThan(right)
    expect(y2 + length).toBeLessThan(mouth)
    expect(svg).not.toContain('id="slope-roll"')
    expect(getAsset('parking-slope-main')?.alt).toMatch(/từ sau đuôi.*hướng lùi lên dốc/)
  })

  it('shows conditional downhill roll from the front in the opposite direction, not a command to drive', () => {
    const svg = readDiagram('parking-slope-var')
    expect(group(svg, 'slope-car')).toBe(group(readDiagram('parking-slope-main'), 'slope-car'))
    const vehicle = pose(svg)
    const [[x1, y1, x2, y2]] = segments(group(svg, 'slope-roll'))
    expect(x1).toBe(vehicle.cx)
    expect(x2).toBe(x1)
    expect(y1).toBeGreaterThan(vehicle.front)
    expect(y2).toBeGreaterThan(y1)
    expect(y2).toBeLessThan(174)
    expect(svg).not.toContain('id="slope-reverse"')
    expect(svg).toContain('NGUY CƠ NẾU KHÔNG GIỮ PHANH')
    expect(svg).toContain('không dùng P để dừng')
    expect(getAsset('parking-slope-var')?.alt).toMatch(/nguy cơ trôi xuống.*không phải lệnh tiến hay trạng thái đã đỗ an toàn/)
  })

  it('keeps the roll hazard arrowhead red and grade arrowhead grey, matching their shafts', () => {
    const svg = readDiagram('parking-slope-var')
    for (const [id, marker] of [['slope-roll', 'slope-roll-tip'], ['slope-grade', 'slope-grade-tip']]) {
      const shaft = group(svg, id)
      const colour = shaft.match(/stroke="(#[\da-f]+)"/)![1]
      const head = svg.match(new RegExp(`<marker id="${marker}"[^>]*>([\\s\\S]*?)</marker>`))![1]
      expect(shaft).toContain(`marker-end="url(#${marker})"`)
      expect(head).toContain(`fill="${colour}"`)
    }
    expect(group(svg, 'slope-roll')).toContain('stroke="#ff8a6b"')
  })

  it.each(['parking-slope-main', 'parking-slope-var'])('%s separates footer lines from each other and the arrows', id => {
    const svg = readDiagram(id)
    const baselines = [...svg.matchAll(/<text x="16" y="([\d.]+)"[^>]*font-size="8.8"/g)]
      .map(match => Number(match[1]))
    expect(baselines).toHaveLength(2)
    expect(baselines[1] - baselines[0]).toBeGreaterThanOrEqual(12)
    expect(baselines[1]).toBeLessThan(198)
    expect(svg).toContain('<rect x="0" y="170" width="320" height="30"')
    for (const [, y1, , y2] of segments(group(svg, id.endsWith('main') ? 'slope-reverse' : 'slope-roll'))) {
      expect(Math.max(y1, y2) + 3).toBeLessThan(170)
    }
  })
})
