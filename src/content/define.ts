import type { Card, CardChange, CardStep, CardTags, ChecklistScope, CueType, Difficulty, ReviewStatus, RhythmStyle, Risk } from '../types'

interface StepInput {
  instruction: string
  cueType: CueType
  cueText: string
  speedHint?: string
  steeringHint?: string
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
  reviewStatus: input.reviewStatus,
  version: input.version,
  updatedAt: input.updatedAt,
  changelog: input.changelog
})
