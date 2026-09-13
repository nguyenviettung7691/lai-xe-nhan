import { describe, expect, it } from 'vitest'
import {
  allCards,
  allTopics,
  checklists,
  contentPack,
  contentReleases,
  dashboardLights,
  disclaimer,
  getCardById,
  getChecklist,
  getLearningPath,
  getLessonMastery,
  getReview,
  learningPaths,
  publishedCards,
  topics,
  CONTENT_VERSION
} from './content'

describe('gói nội dung offline', () => {
  it('giữ đủ bốn chuyên đề và mọi bài học đều có thẻ', () => {
    expect(topics).toHaveLength(4)
    expect(topics.map(topic => topic.id)).toEqual(['parking', 'narrow', 'highway', 'weather'])
    expect(topics.every(topic => topic.lessons.length > 0)).toBe(true)
    expect(topics.flatMap(topic => topic.lessons).every(lesson => lesson.cards.length > 0)).toBe(true)
  })

  it('mỗi thẻ có đủ bước, lỗi thường gặp và khẩu quyết', () => {
    for (const card of publishedCards) {
      expect(card.steps.length).toBeGreaterThanOrEqual(5)
      expect(card.steps.length).toBeLessThanOrEqual(8)
      expect(card.mistakes).toHaveLength(3)
      expect(card.mnemonic.text.trim().split(/\s+/).length).toBeLessThanOrEqual(12)
      expect(card.assetIds).toHaveLength(2)
      expect(card.safety.length).toBeGreaterThan(20)
    }
  })

  it('chỉ phát hành thẻ đã được thẩm định', () => {
    expect(allCards.length).toBeGreaterThan(publishedCards.length)
    expect(publishedCards.every(card => card.reviewStatus === 'approved')).toBe(true)
    expect(getCardById('parking-column')).toBeUndefined()
    expect(getCardById('highway-tailgater')).toBeUndefined()
    expect(getCardById('parking-start')?.title).toBe('Chọn điểm bắt đầu lùi')
  })

  it('giữ nguyên mã bài học cũ để không mất tiến độ đã lưu', () => {
    for (const legacyId of ['parking-start', 'parking-slope', 'narrow-creep', 'highway-merge', 'weather-downhill']) {
      expect(getCardById(legacyId)).toBeDefined()
    }
  })

  it('mọi thẻ đều trỏ tới một checklist có thật', () => {
    expect(checklists.length).toBeGreaterThanOrEqual(5)
    expect(allCards.every(card => getChecklist(card.checklistId) !== undefined)).toBe(true)
    expect(getChecklist('pre_drive')?.items.map(item => item.id)).toEqual(['seat', 'mirrors', 'belt', 'brake', 'fuel', 'warning'])
  })

  it('thẻ đã duyệt luôn kèm hồ sơ thẩm định', () => {
    expect(publishedCards.every(card => getReview(card.id)?.decision === 'approved')).toBe(true)
    expect(getReview('highway-tailgater')?.decision).toBe('needs_revision')
    expect(getReview('parking-column')).toBeUndefined()
  })

  it('có hướng dẫn xử lý cho đèn cảnh báo táp-lô', () => {
    expect(dashboardLights.length).toBeGreaterThanOrEqual(6)
    expect(dashboardLights.every(light => light.actions.length >= 2 && light.avoid.length > 0)).toBe(true)
  })

  it('công bố phiên bản nội dung và tuyên bố miễn trừ', () => {
    expect(contentPack.version).toBe(CONTENT_VERSION)
    expect(contentPack.locale).toBe('vi-VN')
    expect(contentReleases.at(-1)?.version).toBe(CONTENT_VERSION)
    expect(disclaimer.short.length).toBeGreaterThan(20)
    expect(disclaimer.full).toMatch(/không thay thế/i)
    expect(contentPack.offlineSizeKb).toBeGreaterThan(0)
  })

  it('cây nội dung đầy đủ vẫn giữ thẻ chưa duyệt cho khâu biên tập', () => {
    const editorialCards = allTopics.flatMap(topic => topic.lessons).flatMap(lesson => lesson.cards)
    expect(editorialCards).toHaveLength(allCards.length)
    expect(editorialCards.some(card => card.reviewStatus === 'draft')).toBe(true)
  })

  it('mỗi thẻ có đúng 3 câu tự kiểm hợp lệ', () => {
    for (const card of publishedCards) {
      expect(card.quickCheck).toHaveLength(3)
      for (const question of card.quickCheck) {
        expect(question.options.length).toBeGreaterThanOrEqual(2)
        expect(question.correctIndex).toBeGreaterThanOrEqual(0)
        expect(question.correctIndex).toBeLessThan(question.options.length)
      }
    }
  })

  it('mọi thẻ rủi ro cao có ít nhất một câu tự kiểm điều kiện dừng', () => {
    for (const card of publishedCards.filter(card => card.risk === 'high')) {
      expect(card.quickCheck.some(question => question.isStopCondition)).toBe(true)
    }
  })

  it('lộ trình học phủ đủ ba mức năng lực và tăng dần số chuyên đề', () => {
    expect(learningPaths).toHaveLength(3)
    expect(getLearningPath('beginner')?.topicOrder).toEqual(['parking', 'narrow'])
    expect(getLearningPath('experienced')?.topicOrder).toHaveLength(4)
  })

  it('tính đúng mức độ đạt bài học theo tỷ lệ hoàn thành và quick check', () => {
    const lesson = topics[0].lessons[0]
    const allCardIds = lesson.cards.map(card => card.id)
    const achieved = getLessonMastery(lesson, allCardIds, allCardIds)
    expect(achieved.achieved).toBe(true)

    const notStarted = getLessonMastery(lesson, [], [])
    expect(notStarted.achieved).toBe(false)
    expect(notStarted.completedRatio).toBe(0)
  })
})
