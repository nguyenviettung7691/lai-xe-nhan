export type Risk = 'low' | 'medium' | 'high'
export type Severity = 'info' | 'warn' | 'critical'

/** Trạng thái duyệt nội dung theo lớp B (Expert Validation Layer). */
export type ReviewStatus = 'draft' | 'in_review' | 'needs_revision' | 'approved'
export type ReviewDecision = 'approved' | 'needs_revision' | 'rejected'
export type ConfidenceScore = 1 | 2 | 3 | 4 | 5
export type Difficulty = 1 | 2 | 3 | 4 | 5

/** Loại mốc canh giúp học viên nhận biết thời điểm thao tác. */
export type CueType = 'mirror' | 'marker' | 'sound' | 'feel' | 'timing' | 'sign'
export type SpeedRange = 'creep' | 'urban' | 'suburban' | 'highway'
export type SpaceConstraint = 'tight' | 'medium' | 'open'
export type VisibilityLevel = 'good' | 'reduced' | 'poor'
export type StressLevel = 'calm' | 'moderate' | 'high'

export type ChecklistScope = 'pre_drive' | 'pre_reverse' | 'post_park' | 'pre_highway' | 'bad_weather'
export type CriticalLevel = 'must' | 'should' | 'nice'

export type AssetRole = 'main' | 'variant'
export type AssetType = 'svg-diagram' | 'svg-icon'
export type OfflinePack = 'core' | 'extended'

export type RhythmStyle = 'ba-nhip' | 'doi-ve' | 'van-dieu'

export interface CardStep {
  id: string
  stepNo: number
  /** Bắt đầu bằng động từ hành động, tránh diễn đạt mơ hồ. */
  instruction: string
  cueType: CueType
  cueText: string
  speedHint?: string
  steeringHint?: string
}

export interface CardAsset {
  id: string
  cardId: string
  role: AssetRole
  type: AssetType
  url: string
  width: number
  height: number
  sizeKb: number
  checksum: string
  offlinePack: OfflinePack
  caption: string
  alt: string
}

export interface Mnemonic {
  id: string
  cardId: string
  /** Khẩu quyết tối đa 12 từ. */
  text: string
  rhythm: RhythmStyle
}

export interface ExpertReview {
  id: string
  cardId: string
  reviewer: string
  credential: string
  decision: ReviewDecision
  notes: string
  confidenceScore: ConfidenceScore
  reviewedAt: string
}

export interface CardTags {
  speedRange: SpeedRange
  spaceConstraint: SpaceConstraint
  visibility: VisibilityLevel
  stress: StressLevel
}

export interface CardChange {
  version: string
  date: string
  summary: string
  author: string
}

export interface Card {
  id: string
  lessonId: string
  topicId: string
  /** Tên tình huống ngắn, tối đa 60 ký tự. */
  title: string
  /** Bối cảnh thực tế, 1–2 câu. */
  context: string
  /** Mục tiêu thao tác, 1 câu. */
  objective: string
  risk: Risk
  difficulty: Difficulty
  minutes: number
  tags: CardTags
  steps: CardStep[]
  /** Đúng 3 lỗi thường gặp theo chuẩn nội dung. */
  mistakes: readonly [string, string, string]
  recovery: string
  safety: string
  mnemonic: Mnemonic
  checklistId: ChecklistScope
  assetIds: string[]
  reviewStatus: ReviewStatus
  version: string
  updatedAt: string
  changelog: CardChange[]
}

export interface Lesson {
  id: string
  topicId: string
  title: string
  summary: string
  difficulty: Difficulty
  estMinutes: number
  isActive: boolean
  cards: Card[]
}

export interface Topic {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  sortOrder: number
  isActive: boolean
  lessons: Lesson[]
}

export interface ChecklistItem {
  id: string
  itemNo: number
  label: string
  criticalLevel: CriticalLevel
  hint?: string
}

export interface Checklist {
  id: ChecklistScope
  scope: ChecklistScope
  title: string
  description: string
  items: ChecklistItem[]
}

export interface DashboardLight {
  id: string
  icon: string
  name: string
  english: string
  severity: Severity
  description: string
  actions: string[]
  avoid: string
}

export interface ContentDisclaimer {
  short: string
  full: string
  legal: string
}

export interface ContentRelease {
  version: string
  date: string
  summary: string
  cardIds: string[]
}

export interface AssetManifest {
  contentVersion: string
  generator: string
  license: string
  totalSizeKb: number
  assets: CardAsset[]
}

/** Gói nội dung offline-first: toàn bộ dữ liệu app cần khi không có mạng. */
export interface ContentPack {
  version: string
  locale: 'vi-VN'
  generatedAt: string
  disclaimer: ContentDisclaimer
  topics: Topic[]
  checklists: Checklist[]
  lights: DashboardLight[]
  assets: CardAsset[]
  reviews: ExpertReview[]
  releases: ContentRelease[]
  offlineSizeKb: number
}

export type QualityGate = 'editorial' | 'technical' | 'expert' | 'safety'
export type IssueSeverity = 'error' | 'warning'

export interface ValidationIssue {
  gate: QualityGate
  severity: IssueSeverity
  entity: 'card' | 'step' | 'asset' | 'checklist' | 'review' | 'pack'
  id: string
  message: string
}
