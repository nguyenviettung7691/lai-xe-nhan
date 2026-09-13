export type Risk = 'low' | 'medium' | 'high'
export type Severity = 'info' | 'warn' | 'critical'

export interface Step {
  id: string
  text: string
}

export interface Lesson {
  id: string
  topicId: string
  title: string
  summary: string
  mnemonic: string
  difficulty: number
  minutes: number
  risk: Risk
  steps: Step[]
  mistakes: string[]
  recovery: string
  safety: string
}

export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
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
