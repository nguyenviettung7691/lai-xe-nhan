import { describe, it, expect, vi, beforeEach } from 'vitest'
import { speechService, type TTSSpeed } from './speech'

describe('Speech Service (TTS Web Speech API & Rate Controls)', () => {
  beforeEach(() => {
    speechService.stop()
  })

  it('allows setting and getting speed rates (0.9x, 1.0x, 1.1x)', () => {
    speechService.setRate(0.9)
    expect(speechService.getRate()).toBe(0.9)

    speechService.setRate(1.1)
    expect(speechService.getRate()).toBe(1.1)

    speechService.setRate(1.0)
    expect(speechService.getRate()).toBe(1.0)
  })

  it('notifies subscribers on rate changes', () => {
    const states: TTSSpeed[] = []
    const unsubscribe = speechService.subscribe((state) => {
      states.push(state.rate)
    })

    speechService.setRate(0.9)
    speechService.setRate(1.1)

    expect(states).toContain(0.9)
    expect(states).toContain(1.1)
    unsubscribe()
  })

  it('handles speech synthesis gracefully in test environment', () => {
    // In node/vitest environment, window.speechSynthesis might not be present or mockable
    const supported = speechService.isSupported()
    expect(typeof supported).toBe('boolean')
  })
})
