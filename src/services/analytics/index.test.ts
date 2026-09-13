import { describe, it, expect } from 'vitest'
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
})
