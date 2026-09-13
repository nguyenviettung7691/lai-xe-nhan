import type { Card, CardChange, CardStep, CardTags, ChecklistScope, CueType, Difficulty, QuickCheckQuestion, ReviewStatus, RhythmStyle, Risk } from '../types'

interface StepInput {
  instruction: string
  cueType: CueType
  cueText: string
  speedHint?: string
  steeringHint?: string
}

export interface QuickCheckInput {
  prompt: string
  options: string[]
  correctIndex: number
  isStopCondition?: boolean
}

export interface CardInput {
  id: string
  lessonId: string
  topicId: string
  title: string
  context: string
  objective: string
  risk: Risk
  difficulty: Difficulty
  minutes: number
  tags: CardTags
  steps: StepInput[]
  mistakes: readonly [string, string, string]
  recovery: string
  safety: string
  mnemonic: { text: string; rhythm: RhythmStyle }
  checklistId: ChecklistScope
  /** Đúng 3 câu tự kiểm; thẻ rủi ro cao nên có ít nhất một câu điều kiện dừng. */
  quickCheck: readonly [QuickCheckInput, QuickCheckInput, QuickCheckInput]
  reviewStatus: ReviewStatus
  version: string
  updatedAt: string
  changelog: CardChange[]
}

const toStep = (cardId: string) => (step: StepInput, index: number): CardStep => ({
  id: `${cardId}-s${index + 1}`,
  stepNo: index + 1,
  instruction: step.instruction,
  cueType: step.cueType,
  cueText: step.cueText,
  ...(step.speedHint ? { speedHint: step.speedHint } : {}),
  ...(step.steeringHint ? { steeringHint: step.steeringHint } : {})
})

const toQuickCheck = (cardId: string) => (question: QuickCheckInput, index: number): QuickCheckQuestion => ({
  id: `${cardId}-qc${index + 1}`,
  cardId,
  questionNo: index + 1,
  prompt: question.prompt,
  options: question.options,
  correctIndex: question.correctIndex,
  ...(question.isStopCondition ? { isStopCondition: true } : {})
})

/** Chuẩn hóa một thẻ học: sinh id bước, id khẩu quyết và id asset theo quy ước chung. */
export const defineCard = (input: CardInput): Card => ({
  id: input.id,
  lessonId: input.lessonId,
  topicId: input.topicId,
  title: input.title,
  context: input.context,
  objective: input.objective,
  risk: input.risk,
  difficulty: input.difficulty,
  minutes: input.minutes,
  tags: input.tags,
  steps: input.steps.map(toStep(input.id)),
  mistakes: input.mistakes,
  recovery: input.recovery,
  safety: input.safety,
  mnemonic: { id: `${input.id}-mn`, cardId: input.id, text: input.mnemonic.text, rhythm: input.mnemonic.rhythm },
  checklistId: input.checklistId,
  assetIds: [`${input.id}-main`, `${input.id}-var`],
  quickCheck: input.quickCheck.map(toQuickCheck(input.id)) as unknown as Card['quickCheck'],
  reviewStatus: input.reviewStatus,
  version: input.version,
  updatedAt: input.updatedAt,
  changelog: input.changelog
})
