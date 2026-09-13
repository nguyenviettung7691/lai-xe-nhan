import { describe, expect, it } from 'vitest'
import { dashboardLights, topics } from './content'

describe('offline content pack', () => {
  it('contains the four core topics and usable lessons', () => {
    expect(topics).toHaveLength(4)
    expect(topics.every(topic => topic.lessons.length > 0)).toBe(true)
    expect(topics.flatMap(topic => topic.lessons).every(lesson => lesson.steps.length >= 3)).toBe(true)
  })

  it('contains safety actions for dashboard warnings', () => {
    expect(dashboardLights.length).toBeGreaterThanOrEqual(6)
    expect(dashboardLights.every(light => light.actions.length >= 2 && light.avoid.length > 0)).toBe(true)
  })
})
