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

/** Một câu tự kiểm (quick check) gắn với thẻ học — dùng để ôn nhanh và xếp lịch lặp lại. */
export interface QuickCheckQuestion {
  id: string
  cardId: string
  questionNo: number
  prompt: string
  /** 2–4 phương án, chỉ một đáp án đúng. */
  options: string[]
  correctIndex: number
  /** Câu hỏi về điều kiện dừng bắt buộc — mọi thẻ rủi ro cao phải có ít nhất một câu loại này. */
  isStopCondition?: boolean
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
  /** Đúng 3 câu tự kiểm theo chuẩn nội dung. */
  quickCheck: readonly [QuickCheckQuestion, QuickCheckQuestion, QuickCheckQuestion]
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

/** Ba mức năng lực để gợi ý thứ tự học theo lộ trình (mục 7 kế hoạch chuyên đề). */
export type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced'

export interface LearningPath {
  level: ExperienceLevel
  title: string
  summary: string
  goal: string
  /** Thứ tự chuyên đề khuyến nghị cho mức năng lực này. */
  topicOrder: string[]
}

/** Giai đoạn lặp lại ngắt quãng: 0 → 1 ngày, 1 → 3 ngày, 2 → 7 ngày, 3 → 14 ngày. */
export type ReviewStage = 0 | 1 | 2 | 3

export interface ReviewScheduleEntry {
  cardId: string
  stage: ReviewStage
  dueAt: string
  lastResult: 'pass' | 'fail' | null
  updatedAt: string
}

export type DisplayMode = 'learn' | 'quick' | 'handsfree'

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

/** Màu đèn trên táp-lô: đỏ (dừng sớm), vàng (cảnh báo), xanh (thông báo). */
export type LightColor = 'red' | 'amber' | 'green'

export interface DashboardLight {
  id: string
  icon: string
  name: string
  english: string
  color: LightColor
  severity: Severity
  description: string
  /** Từ khóa tiếng Việt không dấu/có dấu để tra cứu nhanh ("phanh", "ac quy"…). */
  keywords: string[]
  /** Đúng 3 bước xử lý tức thời, ưu tiên hành động trước giải thích. */
  actions: readonly [string, string, string]
  avoid: string
  /** Khi nào cần gọi cứu hộ hoặc vào gara. */
  callHelp: string
}

/** Một lượt sử dụng checklist, dùng cho lịch sử và đồng bộ (mục 3.4). */
export interface ChecklistSession {
  id: string
  scope: ChecklistScope
  startedAt: string
  completedAt: string
  /** Thời gian hoàn tất toàn bộ checklist, tính bằng mili giây. */
  durationMs: number
  completedItems: number
  totalItems: number
}

/** Nguồn quyết định giao diện sáng/tối: theo hệ thống hoặc do người dùng ép. */
export type ThemePreference = 'system' | 'dark' | 'light'
export type ThemeMode = 'dark' | 'light'
export type ContrastPreference = 'normal' | 'high'

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
