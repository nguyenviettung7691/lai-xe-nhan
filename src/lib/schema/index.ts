import { z } from 'zod'

export const RiskSchema = z.enum(['low', 'medium', 'high'])
export const SeveritySchema = z.enum(['info', 'warn', 'critical'])
export const ReviewStatusSchema = z.enum(['draft', 'in_review', 'needs_revision', 'approved'])
export const ReviewDecisionSchema = z.enum(['approved', 'needs_revision', 'rejected'])
export const ConfidenceScoreSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
])
export const DifficultySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5)
])

export const CueTypeSchema = z.enum(['mirror', 'marker', 'sound', 'feel', 'timing', 'sign'])
export const SpeedRangeSchema = z.enum(['creep', 'urban', 'suburban', 'highway'])
export const SpaceConstraintSchema = z.enum(['tight', 'medium', 'open'])
export const VisibilityLevelSchema = z.enum(['good', 'reduced', 'poor'])
export const StressLevelSchema = z.enum(['calm', 'moderate', 'high'])

export const ChecklistScopeSchema = z.enum([
  'pre_drive',
  'pre_reverse',
  'post_park',
  'pre_highway',
  'bad_weather'
])
export const CriticalLevelSchema = z.enum(['must', 'should', 'nice'])

export const AssetRoleSchema = z.enum(['main', 'variant'])
export const AssetTypeSchema = z.enum(['svg-diagram', 'svg-icon'])
export const OfflinePackSchema = z.enum(['core', 'extended'])
export const RhythmStyleSchema = z.enum(['ba-nhip', 'doi-ve', 'van-dieu'])

export const CardStepSchema = z.object({
  id: z.string().min(1),
  stepNo: z.number().int().positive(),
  instruction: z.string().min(3),
  cueType: CueTypeSchema,
  cueText: z.string().min(1),
  speedHint: z.string().optional(),
  steeringHint: z.string().optional()
})

export const CardAssetSchema = z.object({
  id: z.string().min(1),
  cardId: z.string().min(1),
  role: AssetRoleSchema,
  type: AssetTypeSchema,
  url: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  sizeKb: z.number().nonnegative(),
  checksum: z.string().min(1),
  offlinePack: OfflinePackSchema,
  caption: z.string(),
  alt: z.string()
})

export const MnemonicSchema = z.object({
  id: z.string().min(1),
  cardId: z.string().min(1),
  text: z.string().min(3),
  rhythm: RhythmStyleSchema
})

export const ExpertReviewSchema = z.object({
  id: z.string().min(1),
  cardId: z.string().min(1),
  reviewer: z.string().min(2),
  credential: z.string().min(2),
  decision: ReviewDecisionSchema,
  notes: z.string(),
  confidenceScore: ConfidenceScoreSchema,
  reviewedAt: z.string()
})

export const CardTagsSchema = z.object({
  speedRange: SpeedRangeSchema,
  spaceConstraint: SpaceConstraintSchema,
  visibility: VisibilityLevelSchema,
  stress: StressLevelSchema
})

export const CardChangeSchema = z.object({
  version: z.string(),
  date: z.string(),
  summary: z.string(),
  author: z.string()
})

export const CardSchema = z.object({
  id: z.string().min(1),
  lessonId: z.string().min(1),
  topicId: z.string().min(1),
  title: z.string().min(3).max(100),
  context: z.string().min(5),
  objective: z.string().min(5),
  risk: RiskSchema,
  difficulty: DifficultySchema,
  minutes: z.number().positive(),
  tags: CardTagsSchema,
  steps: z.array(CardStepSchema).min(1),
  mistakes: z.tuple([z.string(), z.string(), z.string()]),
  recovery: z.string().min(3),
  safety: z.string().min(3),
  mnemonic: MnemonicSchema,
  checklistId: ChecklistScopeSchema,
  assetIds: z.array(z.string()),
  reviewStatus: ReviewStatusSchema,
  version: z.string(),
  updatedAt: z.string(),
  changelog: z.array(CardChangeSchema)
})

export const LessonSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  title: z.string().min(3),
  summary: z.string(),
  difficulty: DifficultySchema,
  estMinutes: z.number().positive(),
  isActive: z.boolean(),
  cards: z.array(CardSchema)
})

export const TopicSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(2),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  lessons: z.array(LessonSchema)
})

export const ChecklistItemSchema = z.object({
  id: z.string().min(1),
  itemNo: z.number().int().positive(),
  label: z.string().min(2),
  criticalLevel: CriticalLevelSchema,
  hint: z.string().optional()
})

export const ChecklistSchema = z.object({
  id: ChecklistScopeSchema,
  scope: ChecklistScopeSchema,
  title: z.string().min(2),
  description: z.string(),
  items: z.array(ChecklistItemSchema).min(1)
})

export const LightColorSchema = z.enum(['red', 'amber', 'green'])

export const DashboardLightSchema = z.object({
  id: z.string().min(1),
  icon: z.string().min(1),
  name: z.string().min(2),
  english: z.string().min(2),
  color: LightColorSchema,
  severity: SeveritySchema,
  description: z.string(),
  keywords: z.array(z.string()).min(1),
  actions: z.tuple([z.string(), z.string(), z.string()]),
  avoid: z.string(),
  callHelp: z.string()
})

export const ChecklistSessionSchema = z.object({
  id: z.string().min(1),
  scope: ChecklistScopeSchema,
  startedAt: z.string(),
  completedAt: z.string(),
  durationMs: z.number().nonnegative(),
  completedItems: z.number().int().nonnegative(),
  totalItems: z.number().int().positive()
})

export const ContentDisclaimerSchema = z.object({
  short: z.string(),
  full: z.string(),
  legal: z.string()
})

export const ContentReleaseSchema = z.object({
  version: z.string(),
  date: z.string(),
  summary: z.string(),
  cardIds: z.array(z.string())
})

export const ContentPackSchema = z.object({
  version: z.string(),
  locale: z.literal('vi-VN'),
  generatedAt: z.string(),
  disclaimer: ContentDisclaimerSchema,
  topics: z.array(TopicSchema),
  checklists: z.array(ChecklistSchema),
  lights: z.array(DashboardLightSchema),
  assets: z.array(CardAssetSchema),
  reviews: z.array(ExpertReviewSchema),
  releases: z.array(ContentReleaseSchema),
  offlineSizeKb: z.number().nonnegative()
})

/* User Data Contracts & Sync Schemas */

export const UserProgressSchema = z.object({
  userId: z.string(),
  completedCardIds: z.array(z.string()),
  lastUpdated: z.string(),
  version: z.number().int().default(1)
})

export const UserChecklistStateSchema = z.object({
  userId: z.string(),
  checkedItems: z.record(z.string(), z.boolean()),
  lastUpdated: z.string(),
  version: z.number().int().default(1)
})

export const SyncEventTypeSchema = z.enum([
  'progress_update',
  'checklist_toggle',
  'checklist_reset',
  'checklist_session',
  'feedback_submit'
])

export const SyncEventSchema = z.object({
  id: z.string(),
  type: SyncEventTypeSchema,
  userId: z.string(),
  payload: z.record(z.string(), z.unknown()),
  timestamp: z.number(),
  status: z.enum(['pending', 'syncing', 'synced', 'failed']),
  retryCount: z.number().int().default(0),
  error: z.string().optional()
})

export const FeedbackSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  cardId: z.string().optional(),
  type: z.enum(['bug', 'content_issue', 'suggestion', 'praise']),
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().min(3).max(1000),
  createdAt: z.string().optional()
})

export type ZCard = z.infer<typeof CardSchema>
export type ZTopic = z.infer<typeof TopicSchema>
export type ZContentPack = z.infer<typeof ContentPackSchema>
export type ZChecklistSession = z.infer<typeof ChecklistSessionSchema>
export type ZUserProgress = z.infer<typeof UserProgressSchema>
export type ZUserChecklistState = z.infer<typeof UserChecklistStateSchema>
export type ZSyncEvent = z.infer<typeof SyncEventSchema>
export type ZFeedback = z.infer<typeof FeedbackSchema>

/** Validate raw payload safely with Zod */
export function validateContentPack(data: unknown): { success: true; data: ZContentPack } | { success: false; errors: z.ZodError } {
  const result = ContentPackSchema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error }
}
