import { describe, expect, it } from 'vitest'
import { checklists } from './checklists'

describe('nội dung checklist thực tế', () => {
  it('giữ scope, ID duy nhất và số thứ tự liên tục ở mọi checklist', () => {
    const allItemIds = checklists.flatMap((checklist) => checklist.items.map((item) => item.id))

    expect(new Set(allItemIds).size).toBe(allItemIds.length)
    for (const checklist of checklists) {
      expect(checklist.scope).toBe(checklist.id)
      expect(checklist.items.map((item) => item.itemNo)).toEqual(
        checklist.items.map((_, index) => index + 1)
      )
    }
  })

  it('bao quát kiểm tra người, xe và hành lý trước khi khởi hành', () => {
    const preDrive = checklists.find((checklist) => checklist.id === 'pre_drive')
    expect(preDrive).toBeDefined()
    expect(preDrive?.items.map((item) => item.id)).toContain('walkaround')
    expect(preDrive?.items.find((item) => item.id === 'mirrors')?.hint).toMatch(/điểm mù/i)
    expect(preDrive?.items.find((item) => item.id === 'belt')?.label).toMatch(/mọi hành khách/i)
    expect(preDrive?.items.find((item) => item.id === 'brake')?.hint).toMatch(/số sàn/i)
    expect(preDrive?.items.find((item) => item.id === 'driver-ready')?.criticalLevel).toBe('must')
    expect(preDrive?.items.find((item) => item.id === 'load-secure')?.hint).toMatch(/che tầm nhìn/i)
    expect(preDrive?.description).not.toMatch(/20 giây/i)
  })

  it('yêu cầu quan sát liên tục và dừng khi lùi không còn an toàn', () => {
    const preReverse = checklists.find((checklist) => checklist.id === 'pre_reverse')
    expect(preReverse).toBeDefined()
    expect(preReverse?.items.find((item) => item.id === 'reverse-speed')?.hint).toMatch(/không có một tốc độ số/i)
    expect(preReverse?.items.find((item) => item.id === 'reverse-people')?.hint).toMatch(/tiếp tục theo dõi/i)
    expect(preReverse?.items.find((item) => item.id === 'reverse-camera')?.hint).toMatch(/vùng khuất/i)
    expect(preReverse?.items.find((item) => item.id === 'reverse-spotter')?.hint).toMatch(/dừng ngay/i)
  })

  it('bao quát rời xe an toàn mà không mặc định hộp số tự động', () => {
    const postPark = checklists.find((checklist) => checklist.id === 'post_park')
    expect(postPark).toBeDefined()
    expect(postPark?.items.find((item) => item.id === 'park-gear')?.label).not.toMatch(/về P/i)
    expect(postPark?.items.find((item) => item.id === 'park-gear')?.hint).toMatch(/số sàn/i)
    expect(postPark?.items.find((item) => item.id === 'park-occupants')?.criticalLevel).toBe('must')
    expect(postPark?.items.find((item) => item.id === 'park-occupants')?.hint).toMatch(/vật nuôi/i)
    expect(postPark?.items.find((item) => item.id === 'park-door')?.hint).toMatch(/xe đạp/i)
    expect(postPark?.items.find((item) => item.id === 'park-lock')).toBeDefined()
  })
})
