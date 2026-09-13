import type { Card, ContentPack, Lesson, Topic } from '../types'
import { CONTENT_GENERATED_AT, CONTENT_LOCALE, CONTENT_VERSION, contentReleases } from './version'
import { disclaimer } from './disclaimer'
import { allCards, allTopics, buildTopics } from './topics'
import { checklists } from './checklists'
import {
  dashboardLights,
  findLights,
  getLightById,
  normalizeKeyword,
  LIGHT_COLOR_LABEL,
  SEVERITY_LABEL,
  SEVERITY_SHORT_LABEL
} from './lights'
import { expertReviews } from './reviews'
import { assetManifest, assets, getAsset, getCardAssets, offlineSizeKb } from './assets'
import { errorsOf, validateContent, warningsOf } from './validation'
import { learningPaths, getLearningPath } from './learning-paths'

/** Chỉ thẻ đã qua thẩm định mới được phát hành cho người học. */
export const publishedCards: Card[] = allCards.filter((card) => card.reviewStatus === 'approved')

/** Cây nội dung mặc định của ứng dụng, đã lọc theo trạng thái duyệt. */
export const topics: Topic[] = buildTopics(publishedCards)

const cardById = new Map(publishedCards.map((card) => [card.id, card]))

export const getCardById = (id: string): Card | undefined => cardById.get(id)

export const getLessonById = (id: string): Lesson | undefined =>
  topics.flatMap((topic) => topic.lessons).find((lesson) => lesson.id === id)

export const getTopicById = (id: string): Topic | undefined => topics.find((topic) => topic.id === id)

export const getChecklist = (id: Card['checklistId']) => checklists.find((checklist) => checklist.id === id)

export const getReview = (cardId: string) => expertReviews.find((review) => review.cardId === cardId)

/** Tiêu chí "đạt bài học" theo mục 9.3: ≥80% thẻ đã học và ≥70% quick check đúng. */
export const LESSON_COMPLETION_RATIO = 0.8
export const LESSON_QUICK_CHECK_RATIO = 0.7

export interface LessonMastery {
  completedRatio: number
  quickCheckRatio: number
  achieved: boolean
}

export const getLessonMastery = (lesson: Lesson, completedCardIds: string[], passedCardIds: string[]): LessonMastery => {
  const total = lesson.cards.length
  if (total === 0) return { completedRatio: 0, quickCheckRatio: 0, achieved: false }
  const completedCount = lesson.cards.filter((card) => completedCardIds.includes(card.id)).length
  const passedCount = lesson.cards.filter((card) => passedCardIds.includes(card.id)).length
  const completedRatio = completedCount / total
  const quickCheckRatio = passedCount / total
  return {
    completedRatio,
    quickCheckRatio,
    achieved: completedRatio >= LESSON_COMPLETION_RATIO && quickCheckRatio >= LESSON_QUICK_CHECK_RATIO
  }
}

export const contentPack: ContentPack = {
  version: CONTENT_VERSION,
  locale: CONTENT_LOCALE,
  generatedAt: CONTENT_GENERATED_AT,
  disclaimer,
  topics,
  checklists,
  lights: dashboardLights,
  assets,
  reviews: expertReviews,
  releases: contentReleases,
  offlineSizeKb
}

export const validationInput = {
  cards: allCards,
  checklists,
  assets,
  reviews: expertReviews,
  contentVersion: CONTENT_VERSION,
  manifestVersion: assetManifest.contentVersion
}

if (import.meta.env.DEV) {
  const issues = validateContent(validationInput)
  const errors = errorsOf(issues)
  const warnings = warningsOf(issues)
  if (errors.length > 0) {
    console.warn('[content] Nội dung chưa đạt cổng chất lượng:', errors)
  }
  if (warnings.length > 0) {
    console.warn('[content] Nội dung cần kiểm tra:', warnings)
  }
}

export {
  CONTENT_GENERATED_AT,
  CONTENT_LOCALE,
  CONTENT_VERSION,
  allCards,
  allTopics,
  assetManifest,
  assets,
  checklists,
  contentReleases,
  dashboardLights,
  disclaimer,
  expertReviews,
  findLights,
  getAsset,
  getCardAssets,
  getLearningPath,
  getLightById,
  learningPaths,
  normalizeKeyword,
  offlineSizeKb,
  LIGHT_COLOR_LABEL,
  SEVERITY_LABEL,
  SEVERITY_SHORT_LABEL
}
