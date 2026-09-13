import { describe, expect, it } from 'vitest'
import {
  dashboardLights,
  findLights,
  getLightById,
  normalizeKeyword,
  LIGHT_COLOR_LABEL,
  SEVERITY_LABEL
} from './lights'
import { DashboardLightSchema } from '../lib/schema'

describe('tra cứu đèn cảnh báo táp-lô', () => {
  it('có tối thiểu 20 đèn phổ biến, không trùng mã', () => {
    expect(dashboardLights.length).toBeGreaterThanOrEqual(20)
    const ids = dashboardLights.map((light) => light.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('mỗi đèn đủ thông tin xử lý theo chuẩn nội dung', () => {
    for (const light of dashboardLights) {
      const parsed = DashboardLightSchema.safeParse(light)
      expect(parsed.success, `${light.id} sai schema`).toBe(true)
      expect(light.actions).toHaveLength(3)
      expect(light.avoid.length).toBeGreaterThan(10)
      expect(light.callHelp.length).toBeGreaterThan(10)
      expect(light.keywords.length).toBeGreaterThan(0)
      expect(SEVERITY_LABEL[light.severity]).toBeTruthy()
      expect(LIGHT_COLOR_LABEL[light.color]).toBeTruthy()
    }
  })

  it('phủ đủ nhóm đèn quan trọng nhất', () => {
    for (const id of ['engine', 'oil', 'battery', 'brake', 'abs', 'temperature', 'tpms', 'airbag', 'eps', 'transmission']) {
      expect(getLightById(id), `thiếu đèn ${id}`).toBeDefined()
    }
  })

  it('tìm được theo từ khóa có dấu lẫn không dấu', () => {
    expect(findLights({ query: 'phanh' }).some((light) => light.id === 'brake')).toBe(true)
    expect(findLights({ query: 'ac quy' }).some((light) => light.id === 'battery')).toBe(true)
    expect(findLights({ query: 'dong co' }).some((light) => light.id === 'engine')).toBe(true)
    expect(findLights({ query: 'khong-co-dau-nay' })).toHaveLength(0)
  })

  it('lọc theo mức độ và màu đèn', () => {
    const critical = findLights({ severity: 'critical' })
    expect(critical.length).toBeGreaterThan(0)
    expect(critical.every((light) => light.severity === 'critical')).toBe(true)

    const green = findLights({ color: 'green' })
    expect(green.length).toBeGreaterThan(0)
    expect(green.every((light) => light.color === 'green')).toBe(true)
  })

  it('xếp đèn khẩn cấp lên đầu danh sách', () => {
    const results = findLights()
    expect(results).toHaveLength(dashboardLights.length)
    expect(results[0].severity).toBe('critical')
    const severityOrder = results.map((light) => light.severity)
    expect(severityOrder.lastIndexOf('critical')).toBeLessThan(severityOrder.indexOf('info'))
  })

  it('chuẩn hóa từ khóa bỏ dấu tiếng Việt', () => {
    expect(normalizeKeyword('Ắc Quy')).toBe('ac quy')
    expect(normalizeKeyword('Động cơ')).toBe('dong co')
  })
})
