import { describe, it, expect } from 'vitest'
import {
  CardSchema,
  TopicSchema,
  ChecklistSchema,
  DashboardLightSchema,
  ContentPackSchema,
  UserProgressSchema,
  UserChecklistStateSchema,
  SyncEventSchema,
  FeedbackSchema,
  validateContentPack
} from './index'
import { contentPack } from '../../content'

describe('Zod Schema Validation Layer (Data Contracts)', () => {
  it('validates the built-in content pack successfully', () => {
    const result = validateContentPack(contentPack)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.version).toBe(contentPack.version)
      expect(result.data.topics.length).toBeGreaterThanOrEqual(3)
      expect(result.data.checklists.length).toBeGreaterThan(0)
      expect(result.data.lights.length).toBeGreaterThan(0)
    }
  })

  it('validates individual topics and lessons', () => {
    for (const topic of contentPack.topics) {
      const parsed = TopicSchema.safeParse(topic)
      expect(parsed.success).toBe(true)
    }
  })

  it('validates individual cards and their steps', () => {
    for (const topic of contentPack.topics) {
      for (const lesson of topic.lessons) {
        for (const card of lesson.cards) {
          const parsed = CardSchema.safeParse(card)
          expect(parsed.success).toBe(true)
        }
      }
    }
  })

  it('validates checklists and checklist items', () => {
    for (const checklist of contentPack.checklists) {
      const parsed = ChecklistSchema.safeParse(checklist)
      expect(parsed.success).toBe(true)
    }
  })

  it('validates dashboard warning lights', () => {
    for (const light of contentPack.lights) {
      const parsed = DashboardLightSchema.safeParse(light)
      expect(parsed.success).toBe(true)
    }
  })

  it('rejects invalid card data', () => {
    const invalidCard = {
      id: '',
      title: 'Hi', // too short
      difficulty: 99 // out of 1-5 range
    }
    const parsed = CardSchema.safeParse(invalidCard)
    expect(parsed.success).toBe(false)
  })

  it('validates user progress schema', () => {
    const validProgress = {
      userId: 'user_123',
      completedCardIds: ['parking-narrow-space', 'highway-merge'],
      lastUpdated: new Date().toISOString(),
      version: 1
    }
    const parsed = UserProgressSchema.safeParse(validProgress)
    expect(parsed.success).toBe(true)
  })

  it('validates user checklist state schema', () => {
    const validChecklist = {
      userId: 'user_123',
      checkedItems: { 'pre_drive_1': true, 'pre_drive_2': false },
      lastUpdated: new Date().toISOString(),
      version: 1
    }
    const parsed = UserChecklistStateSchema.safeParse(validChecklist)
    expect(parsed.success).toBe(true)
  })

  it('validates sync event schema', () => {
    const validSyncEvent = {
      id: 'sync_12345',
      type: 'progress_update',
      userId: 'local',
      payload: { completedCardIds: ['c1'] },
      timestamp: Date.now(),
      status: 'pending',
      retryCount: 0
    }
    const parsed = SyncEventSchema.safeParse(validSyncEvent)
    expect(parsed.success).toBe(true)
  })

  it('validates user feedback schema', () => {
    const validFeedback = {
      cardId: 'parking-narrow-space',
      type: 'suggestion',
      rating: 5,
      comment: 'Nội dung rất trực quan và dễ hiểu!'
    }
    const parsed = FeedbackSchema.safeParse(validFeedback)
    expect(parsed.success).toBe(true)
  })
})
