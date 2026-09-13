import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { speechService, STEP_GAP_MS, type TTSSpeed, type TTSStep } from './speech'
import { analytics } from './analytics'

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

class MockUtterance {
  public lang = ''
  public rate = 1
  public onend: (() => void) | null = null
  public onerror: ((event: unknown) => void) | null = null
  constructor(public text: string) {}
}

describe('Chế độ đọc từng bước (sequence, prev/next, khoảng nghỉ)', () => {
  const spoken: MockUtterance[] = []
  const synth = {
    speak: vi.fn((utterance: MockUtterance) => {
      spoken.push(utterance)
    }),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn()
  }

  const steps: TTSStep[] = [
    { id: 's1', label: 'Bước 1', text: 'Bước 1: Chuyển về số R.' },
    { id: 's2', label: 'Bước 2', text: 'Bước 2: Nhìn gương trái.' },
    { id: 's3', label: 'Bước 3', text: 'Bước 3: Trả lái từ từ.' }
  ]

  const lastUtterance = () => spoken[spoken.length - 1]
  const eventTypes = () => analytics.getEvents().map((event) => event.type)

  beforeEach(() => {
    vi.useFakeTimers()
    spoken.length = 0
    synth.speak.mockClear()
    synth.cancel.mockClear()
    synth.pause.mockClear()
    synth.resume.mockClear()
    vi.stubGlobal('window', { speechSynthesis: synth })
    vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance)
    analytics.reset()
  })

  afterEach(() => {
    speechService.stop()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('đọc bước đầu tiên và ghi nhận sự kiện bắt đầu', () => {
    expect(speechService.speakSequence(steps, { source: 'parking-start' })).toBe(true)

    const state = speechService.getState()
    expect(state.mode).toBe('sequence')
    expect(state.currentStepIndex).toBe(0)
    expect(state.isPlaying).toBe(true)
    expect(lastUtterance().text).toContain('Bước 1')
    expect(lastUtterance().lang).toBe('vi-VN')
    expect(eventTypes()).toContain('tts_started')
  })

  it('nghỉ ngắn giữa các bước rồi tự đọc bước kế tiếp', () => {
    speechService.speakSequence(steps)
    lastUtterance().onend?.()

    // Chưa hết khoảng nghỉ thì chưa đọc bước sau.
    expect(spoken).toHaveLength(1)
    vi.advanceTimersByTime(STEP_GAP_MS)

    expect(spoken).toHaveLength(2)
    expect(speechService.getState().currentStepIndex).toBe(1)
  })

  it('chuyển bước tới/lui theo thao tác người dùng', () => {
    speechService.speakSequence(steps)

    speechService.next()
    expect(speechService.getState().currentStepIndex).toBe(1)
    expect(lastUtterance().text).toContain('Bước 2')

    speechService.previous()
    expect(speechService.getState().currentStepIndex).toBe(0)
    expect(eventTypes().filter((type) => type === 'tts_step_skipped')).toHaveLength(2)
  })

  it('kết thúc chuỗi khi đọc hết bước cuối', () => {
    speechService.speakSequence(steps)
    speechService.next()
    speechService.next()
    expect(speechService.getState().currentStepIndex).toBe(2)

    lastUtterance().onend?.()
    vi.advanceTimersByTime(STEP_GAP_MS)

    const state = speechService.getState()
    expect(state.isPlaying).toBe(false)
    expect(state.mode).toBe('idle')
    expect(eventTypes()).toContain('tts_completed')
  })

  it('tạm dừng, tiếp tục và dừng hẳn', () => {
    speechService.speakSequence(steps)

    speechService.pause()
    expect(synth.pause).toHaveBeenCalled()
    expect(speechService.getState().isPaused).toBe(true)

    speechService.resume()
    expect(synth.resume).toHaveBeenCalled()
    expect(speechService.getState().isPaused).toBe(false)

    speechService.stop()
    expect(synth.cancel).toHaveBeenCalled()
    expect(speechService.getState().isPlaying).toBe(false)
    expect(eventTypes()).toContain('tts_stop')
  })

  it('đọc nguyên bài và báo hoàn tất khi hết văn bản', () => {
    expect(speechService.speak('Khẩu quyết: tiến bám lưng, lùi bám bụng.')).toBe(true)
    expect(speechService.getState().mode).toBe('single')

    lastUtterance().onend?.()
    expect(speechService.getState().isPlaying).toBe(false)
    expect(eventTypes()).toContain('tts_completed')
  })
})
