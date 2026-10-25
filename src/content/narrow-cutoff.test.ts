import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getCardById, getChecklist, getReview, publishedCards } from './index'
import { getAsset } from './assets'
import { contentReleases } from './version'

const card = getCardById('narrow-cutoff')!
const instructions = card.steps.map(step => step.instruction).join(' ')
const readDiagram = (id: string) =>
  readFileSync(resolve(process.cwd(), 'public', getAsset(id)!.url.slice(1)), 'utf8')
type Point = [number, number]
type Box = [number, number, number, number]
const rects = (svg: string): Box[] =>
  [...svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)]
    .map(match => [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])])
const group = (svg: string, id: string) =>
  svg.match(new RegExp(`<g id="${id}">([\\s\\S]*?)</g>`))![1]
const pose = (svg: string, id: string) =>
  svg.match(new RegExp(`id="${id}" transform="translate\\(([\\d.]+) ([\\d.]+)\\) rotate\\(([\\d.]+)\\)"`))!
    .slice(1).map(Number)
const path = (svg: string, id: string): Point[] =>
  [...svg.match(new RegExp(`<path id="${id}" d="([^"]+)"`))![1].matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g)]
    .map(match => [Number(match[1]), Number(match[2])])
const inside = ([x, y, w, h]: Box, [px, py]: Point) =>
  px >= x && px <= x + w && py >= y && py <= y + h
const corners = ([x, y, w, h]: Box): Point[] =>
  [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
const transform = ([x, y]: Point, [rx, ry, rotation]: number[]): Point => {
  const angle = rotation * Math.PI / 180
  return [rx + x * Math.cos(angle) - y * Math.sin(angle), ry + x * Math.sin(angle) + y * Math.cos(angle)]
}

describe('narrow-cutoff: real-world guidance', () => {
  it('preserves identity/history and publishes without seed expert approval', () => {
    expect(card.lessonId).toBe('narrow-negotiation')
    expect(card.topicId).toBe('narrow')
    expect(card.assetIds).toEqual(['narrow-cutoff-main', 'narrow-cutoff-var'])
    expect(card.quickCheck.map(question => question.id)).toEqual([
      'narrow-cutoff-qc1', 'narrow-cutoff-qc2', 'narrow-cutoff-qc3'
    ])
    expect(getChecklist(card.checklistId)).toBeDefined()
    expect(publishedCards).toContain(card)
    expect(card.reviewStatus).toBe('published_unverified')
    expect(getReview(card.id)).toBeUndefined()
    expect(card.risk).toBe('high')
    expect(card.difficulty).toBe(3)
    expect(card.minutes).toBe(6)
    expect(card.tags.speedRange).toBe('creep')
    expect(card.version).toBe('1.1.0')
    expect(card.updatedAt).toBe('2026-10-25')
    expect(card.changelog.map(change => change.version)).toEqual(['1.0.0', '1.1.0'])
    expect(contentReleases.find(release => release.version === '2026.09.1')?.cardIds).toContain(card.id)
    expect(contentReleases.find(release => release.version === '2026.10.12')?.cardIds).toEqual([card.id])
  })

  it('defines the scenario without treating every alley as non-priority', () => {
    expect(card.context).toMatch(/ngõ nhánh ra đường chính.*cả hai phía.*không theo tỷ lệ.*không mặc định mọi ngõ/)
    expect(card.steps[0].instruction).toMatch(/người điều khiển giao thông, đèn, biển và vạch.*đi bộ hoặc chậm hơn/i)
    expect(card.steps[0].instruction).toMatch(/dừng được.*nhìn rõ còn trống.*dừng trước vùng.*không.*chắn lối đi bộ/)
    expect(card.steps[1].instruction).toMatch(/đường nhánh ra đường chính.*đường không ưu tiên ra đường ưu tiên.*bất kỳ hướng/)
    expect(card.steps[1].instruction).toMatch(/xi-nhan liên tục.*nhường người đi bộ, xe thô sơ và xe đi ngược chiều/)
    expect(card.steps[1].cueText).toContain('không tạo quyền ưu tiên')
  })

  it('observes all directions and rejects blind nose probing and universal distance markers', () => {
    expect(card.steps[2].instruction).toMatch(/luân phiên cả hai hướng.*sát trước đầu xe.*gương và điểm mù/)
    expect(card.steps[2].instruction).toMatch(/xe máy đi sát mép.*trẻ em.*ngoài vạch.*Kiểm tra lại.*không chỉ nhìn hướng đông/)
    expect(card.steps[2].cueText).toMatch(/Cột A.*camera, cảm biến chỉ hỗ trợ/)
    expect(card.steps[3].instruction).toMatch(/giữ xe đứng yên.*chỉ xem xét tiến.*nhìn rõ còn trống và không cản/i)
    expect(card.steps[3].instruction).toMatch(/Không nhô từng đoạn 30 cm.*không thể lấy tầm nhìn.*tiếp tục dừng.*hỗ trợ.*lối khác/)
    expect(card.mnemonic.text).toBe('Chưa rõ thì dừng, nguy hiểm phanh ngay, nhìn lại mới đi.')
    expect(card.objective).not.toContain('tránh phanh gấp')
    expect(instructions).not.toContain('Nhô đầu xe từng đoạn ngắn để người đi đường nhìn thấy')
  })

  it('distinguishes emergency braking from smooth slowing without prescribing a reflex swerve', () => {
    for (const text of [card.steps[4].instruction, card.safety]) {
      expect(text).toMatch(/nhả ga và.*phanh ngay.*lực cần thiết/i)
      expect(text).toMatch(/ABS.*đạp mạnh.*giữ áp lực.*không nhấp nhả/i)
      expect(text).toMatch(/hướng dẫn của xe/)
      expect(text).toMatch(/không (đánh lái né theo phản xạ|giật lái).*chưa kiểm tra/i)
    }
    expect(card.steps[4].instruction).toMatch(/không trì hoãn chỉ để phanh êm/)
    expect(card.steps[4].cueText).toMatch(/ABS không bảo đảm quãng dừng ngắn hơn/)
    expect(card.steps[4].steeringHint).toContain('không ép vô-lăng thẳng nếu xe đang rẽ')
  })

  it('keeps stop, no-blind-reverse and all-traffic restart conditions in quick/audio surfaces', () => {
    expect(card.steps[3].instruction).toMatch(/không tự lùi.*đường giao nhau.*tầm nhìn bị che khuất/)
    expect(card.safety).toMatch(/dừng hẳn và giữ xe trước vùng xung đột.*ngoài vạch/)
    expect(card.safety).toMatch(/không tự lùi.*đường giao nhau.*tầm nhìn bị che khuất/)
    for (const text of [card.steps[5].instruction, card.safety]) {
      expect(text).toMatch(/quan sát lại cả hai hướng.*điểm mù.*xe đi tiếp phía sau/)
      expect(text).toMatch(/thời gian và khoảng trống cho toàn.*không.*người khác phanh.*đổi hướng/)
    }
    expect(card.steps[5].instruction).toMatch(/chưa rõ.*chờ.*không đi theo còi hay cái vẫy tay/)
    expect(card.steps[6].instruction).toMatch(/kiểm tra lần cuối.*phần đường được phép.*phanh dừng và giữ xe.*không cố tăng ga/i)
    expect(card.safety).toMatch(/Còi chỉ dùng cảnh báo.*không thay phanh.*không bấm liên tục.*22 giờ đến 05 giờ.*trừ xe ưu tiên/)
  })

  it('handles exposed nose, contact and safe assistance without automatic reversing', () => {
    expect(card.recovery).toMatch(/^Nếu đầu xe đã lấn ra.*dừng hẳn và giữ xe.*không cố tiến hoặc tự lùi/)
    expect(card.recovery).toMatch(/đã va chạm.*kiểm tra người.*cấp cứu.*nghĩa vụ.*không tự chạy đi/)
    expect(card.recovery).toMatch(/lực lượng chức năng.*ngoài đường xe chạy, vùng quét và vùng kẹp.*mất liên lạc thì dừng/)
    expect(card.recovery).toMatch(/được phép rời.*phanh chân.*phanh đỗ.*P.*đứng hẳn.*đứng chắc.*trước khi mở cửa/)
  })

  it('tests visibility, immediate ABS braking and a second conflict rather than length recall', () => {
    const answers = card.quickCheck.map(question => question.options[question.correctIndex])
    expect(card.quickCheck[0].isStopCondition).toBe(true)
    expect(answers[0]).toMatch(/Dừng trước vùng xung đột.*không lấn dò.*hỗ trợ/)
    expect(card.quickCheck[1].prompt).toContain('có ABS')
    expect(answers[1]).toMatch(/đạp phanh mạnh và giữ áp lực.*không giật lái/)
    expect(card.quickCheck[2].isStopCondition).toBe(true)
    expect(card.quickCheck[2].prompt).toMatch(/xe đi tiếp phía sau.*ngoài vạch/)
    expect(answers[2]).toMatch(/Giữ xe đứng yên.*cả hai hướng và điểm mù.*toàn xe/)
  })
})

describe('narrow-cutoff: actual diagram geometry', () => {
  it.each(card.assetIds)('%s has an open T-junction and the whole stopped car before conflict', id => {
    const svg = readDiagram(id)
    const road = rects(group(svg, 'cutoff-main-road'))[0]
    const branch = rects(group(svg, 'cutoff-branch'))[0]
    const conflict = rects(group(svg, 'cutoff-conflict'))[0]
    expect(road).toEqual([0, 30, 320, 58])
    expect(branch).toEqual([124, 88, 80, 86])
    expect(branch[1]).toBe(road[1] + road[3])
    expect(corners(conflict).every(point => inside(road, point))).toBe(true)
    const walls = group(svg, 'cutoff-walls')
    expect(walls).toContain('M0 88L124 88')
    expect(walls).toContain('M204 88L320 88')
    expect(walls).not.toContain('M124 88L204 88')
    const carPose = pose(svg, 'cutoff-ego')
    expect(carPose[2]).toBe(0)
    const body = svg.match(/id="cutoff-ego"[^>]+><g transform="[^"]+">(<rect[^>]+>)/)![1]
    const boxes = [...rects(body), ...rects(group(svg, 'cutoff-mirrors'))]
    const world = boxes.flatMap(box => corners(box).map(point => transform(point, carPose)))
    expect(world.every(point => inside(branch, point))).toBe(true)
    expect(Math.min(...world.map(point => point[1]))).toBeGreaterThan(conflict[1] + conflict[3])
    expect(boxes).toHaveLength(3)
    expect(svg).toContain('ĐẦU XE')
    expect(svg).toContain('XE DỪNG')
    expect(svg).toContain('HƯỚNG XE MÁY')
    expect(svg).toContain('Không theo tỷ lệ')
    expect(svg).not.toContain('Một thân xe máy')
    expect(svg.match(/marker-end=/g)).toHaveLength(id.endsWith('-main') ? 2 : 4)
  })

  it.each(card.assetIds)('%s aligns every motorcycle front, arrow and colour within its road', id => {
    const svg = readDiagram(id)
    const road = rects(group(svg, 'cutoff-main-road'))[0]
    const pairs = [['cutoff-crossing-bike', 'cutoff-crossing-motion']]
    if (id.endsWith('-var')) pairs.push(
      ['cutoff-following-bike', 'cutoff-following-motion'],
      ['cutoff-opposing-bike', 'cutoff-opposing-motion']
    )
    for (const [bikeId, motionId] of pairs) {
      const bikePose = pose(svg, bikeId)
      // Include the front wheel's full extent, not only the bike's rectangular body.
      const outline = corners([-5, -16, 10, 27]).map(point => transform(point, bikePose))
      expect(outline.every(point => inside(road, point))).toBe(true)
      const [start, end] = path(svg, motionId)
      expect(start[1]).toBe(bikePose[1])
      expect(end[1]).toBe(bikePose[1])
      const front = transform([0, -16], bikePose)
      const direction = bikePose[2] === 90 ? 1 : -1
      expect((start[0] - front[0]) * direction).toBeGreaterThan(0)
      expect((end[0] - start[0]) * direction).toBeGreaterThan(0)
      for (let sample = 0; sample <= 20; sample++) {
        expect(inside(road, [start[0] + (end[0] - start[0]) * sample / 20, start[1]])).toBe(true)
      }
      const motion = svg.match(new RegExp(`<path id="${motionId}"[^>]+>`))![0]
      expect(motion).toContain('stroke="#ff8a6b"')
      expect(motion).toContain('stroke-dasharray="4 4"')
      expect(motion).toContain('marker-end="url(#cutoff-bike-tip)"')
    }
    expect(svg).toMatch(/id="cutoff-bike-tip"[^>]+><path[^>]+fill="#ff8a6b"/)
  })

  it('shows the first bike clear but following and opposite hazards remain, without a safe-gap claim', () => {
    const main = readDiagram(card.assetIds[0])
    const variant = readDiagram(card.assetIds[1])
    expect(pose(main, 'cutoff-ego')).toEqual(pose(variant, 'cutoff-ego'))
    const conflict = rects(group(variant, 'cutoff-conflict'))[0]
    expect(pose(variant, 'cutoff-crossing-bike')[0] - 16).toBeGreaterThan(conflict[0] + conflict[2])
    expect(pose(variant, 'cutoff-following-bike')[0] + 16).toBeLessThan(conflict[0])
    expect(pose(variant, 'cutoff-opposing-bike')[1]).toBeLessThan(pose(variant, 'cutoff-following-bike')[1])
    expect(variant).toContain('giữ xe, kiểm tra lại cả hai hướng')
    for (const id of card.assetIds) {
      expect(getAsset(id)?.alt).toMatch(/không theo tỷ lệ.*đang dừng/i)
      expect(getAsset(id)?.alt).toMatch(/không có mũi tên chuyển động|không có mũi tên chuyển động của ô tô/)
    }
    expect(getAsset(card.assetIds[1])?.caption).toMatch(/kiểm tra.*cả hai hướng/)
    expect(getAsset(card.assetIds[1])?.alt).toMatch(/không có mốc một thân xe máy/)
  })
})
