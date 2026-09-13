import { describe, it, expect, vi } from 'vitest'
import { analytics } from './index'

describe('Analytics & Web Vitals Service', () => {
  it('tracks learning events and records properties', () => {
    analytics.track('card_view', { cardId: 'parking-narrow-space', topicId: 'parking' })
    analytics.track('card_complete', { cardId: 'parking-narrow-space' })
    analytics.track('checklist_item_checked', { itemId: 'chk_1', checked: true })

    const events = analytics.getEvents()
    expect(events.length).toBeGreaterThanOrEqual(3)

    const viewEvt = events.find((e) => e.type === 'card_view')
    expect(viewEvt).toBeDefined()
    expect(viewEvt?.properties.cardId).toBe('parking-narrow-space')
  })

  it('records web vitals with correct rating thresholds', () => {
    analytics.recordWebVital('LCP', 1500) // good
    analytics.recordWebVital('LCP', 3500) // needs-improvement
    analytics.recordWebVital('LCP', 4500) // poor

    analytics.recordWebVital('CLS', 0.05) // good
    analytics.recordWebVital('CLS', 0.15) // needs-improvement
    analytics.recordWebVital('CLS', 0.3)  // poor

    const vitals = analytics.getVitals()
    const lcpGood = vitals.find((v) => v.name === 'LCP' && v.value === 1500)
    expect(lcpGood?.rating).toBe('good')

    const clsPoor = vitals.find((v) => v.name === 'CLS' && v.value === 0.3)
    expect(clsPoor?.rating).toBe('poor')
  })

  it('ghi nhận đủ sự kiện lõi của nhóm tính năng hữu dụng', () => {
    analytics.reset()
    analytics.track('checklist_started', { scope: 'pre_drive' })
    analytics.track('checklist_completed', { scope: 'pre_drive', durationMs: 18000 })
    analytics.track('tts_started', { mode: 'sequence' })
    analytics.track('tts_step_skipped', { direction: 'next' })
    analytics.track('tts_completed', { mode: 'sequence' })
    analytics.track('light_search_used', { keyword: 'phanh' })
    analytics.track('light_detail_viewed', { lightId: 'brake' })
    analytics.track('night_mode_enabled', { preference: 'system' })

    const types = analytics.getEvents().map((event) => event.type)
    for (const expected of [
      'checklist_started',
      'checklist_completed',
      'tts_started',
      'tts_step_skipped',
      'tts_completed',
      'light_search_used',
      'light_detail_viewed',
      'night_mode_enabled'
    ] as const) {
      expect(types).toContain(expected)
    }
  })

  it('giữ hàng đợi khi offline và gửi lại khi có mạng', async () => {
    analytics.reset()

    const failing = vi.fn().mockResolvedValue(false)
    analytics.setTransport(failing)
    analytics.track('offline_mode_used', { scope: 'pre_drive' })
    analytics.track('checklist_completed', { scope: 'pre_drive' })

    await vi.waitFor(() => expect(failing).toHaveBeenCalled())
    expect(analytics.getPendingEvents()).toHaveLength(2)

    const sender = vi.fn().mockResolvedValue(true)
    analytics.setTransport(sender)

    await vi.waitFor(() => expect(analytics.getPendingEvents()).toHaveLength(0))
    expect(sender).toHaveBeenCalled()
    expect(sender.mock.calls[0][0]).toHaveLength(2)

    analytics.setTransport(null)
    analytics.reset()
  })
})
