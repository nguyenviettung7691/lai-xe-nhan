import { describe, it, expect } from 'vitest'
import {
  saveContentPackToIDB,
  getContentPackFromIDB,
  saveProgressToIDB,
  getProgressFromIDB,
  saveChecklistToIDB,
  getChecklistFromIDB,
  getAllChecklistsFromIDB,
  enqueueSyncEvent,
  getPendingSyncEvents,
  getOfflineStorageEstimate
} from './index'
import { contentPack } from '../../content'

describe('Offline Storage & IndexedDB Module', () => {
  it('handles offline storage gracefully when window.indexedDB is unavailable (node env)', async () => {
    // In standard node test environment without fake-indexeddb
    const savePackRes = await saveContentPackToIDB(contentPack)
    expect(typeof savePackRes).toBe('boolean')

    const pack = await getContentPackFromIDB()
    expect(pack === null || typeof pack === 'object').toBe(true)

    const saveProgRes = await saveProgressToIDB('local', ['card-1'])
    expect(typeof saveProgRes).toBe('boolean')

    const prog = await getProgressFromIDB('local')
    expect(prog === null || Array.isArray(prog)).toBe(true)

    const saveChkRes = await saveChecklistToIDB('pre_drive', { item_1: true })
    expect(typeof saveChkRes).toBe('boolean')

    const chk = await getChecklistFromIDB('pre_drive')
    expect(chk === null || typeof chk === 'object').toBe(true)

    const allChk = await getAllChecklistsFromIDB()
    expect(typeof allChk).toBe('object')

    const enqueueRes = await enqueueSyncEvent({
      id: 'evt-test',
      type: 'progress_update',
      userId: 'local',
      payload: {},
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0
    })
    expect(typeof enqueueRes).toBe('boolean')

    const pending = await getPendingSyncEvents()
    expect(Array.isArray(pending)).toBe(true)

    const estimate = await getOfflineStorageEstimate()
    expect(estimate).toHaveProperty('usageKb')
    expect(estimate).toHaveProperty('quotaKb')
  })
})
