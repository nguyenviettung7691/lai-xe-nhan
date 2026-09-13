import { describe, it, expect } from 'vitest'
import { syncEngine } from './index'

describe('Sync Engine (Offline-First & Conflict Resolution)', () => {
  it('correctly resolves progress conflicts by merging completed card sets', () => {
    const localIds = ['parking-narrow-space', 'narrow-creep']
    const cloudIds = ['parking-narrow-space', 'highway-merge', 'weather-heavy-rain']

    const merged = syncEngine.resolveProgressConflict(localIds, cloudIds)

    expect(merged).toContain('parking-narrow-space')
    expect(merged).toContain('narrow-creep')
    expect(merged).toContain('highway-merge')
    expect(merged).toContain('weather-heavy-rain')
    expect(merged.length).toBe(4)
  })

  it('correctly resolves checklist conflicts with item-level merge without losing checked states', () => {
    const localChecklist = {
      item_1: true,
      item_2: false,
      item_3: true
    }
    const cloudChecklist = {
      item_1: false,
      item_2: true,
      item_4: true
    }

    const merged = syncEngine.resolveChecklistConflict(localChecklist, cloudChecklist)

    // item_1 is true locally => must stay true
    expect(merged.item_1).toBe(true)
    // item_2 is true in cloud => must stay true
    expect(merged.item_2).toBe(true)
    // item_3 is true locally => must stay true
    expect(merged.item_3).toBe(true)
    // item_4 is true in cloud => must stay true
    expect(merged.item_4).toBe(true)
  })

  it('tracks sync state and notifies subscribers', () => {
    let receivedState: unknown = null
    const unsubscribe = syncEngine.subscribe((state) => {
      receivedState = state
    })

    expect(receivedState).toBeDefined()
    expect(typeof (receivedState as { status: string }).status).toBe('string')
    unsubscribe()
  })
})
