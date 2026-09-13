import { analytics } from './analytics'

export type TTSSpeed = 0.9 | 1.0 | 1.1
export type TTSMode = 'idle' | 'single' | 'sequence'

/** Một bước đọc: nhãn ngắn để hiển thị và câu đọc đầy đủ. */
export interface TTSStep {
  id: string
  label: string
  text: string
}

export interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  currentText: string
  rate: TTSSpeed
  supported: boolean
  mode: TTSMode
  steps: TTSStep[]
  /** Vị trí bước đang đọc trong chuỗi, -1 khi không ở chế độ đọc từng bước. */
  currentStepIndex: number
  /** Mã lỗi gần nhất của Web Speech API; khác null thì nên chuyển sang chữ to. */
  error: string | null
}

type TTSListener = (state: TTSState) => void

/** Khoảng nghỉ giữa hai bước để người nghe kịp xử lý (mục 4.3). */
export const STEP_GAP_MS = 700

export interface SpeakSequenceOptions {
  rate?: TTSSpeed
  startIndex?: number
  /** Nhãn nguồn phát (ví dụ mã thẻ học) để gắn vào sự kiện đo đạc. */
  source?: string
}

class SpeechService {
  private utterance: SpeechSynthesisUtterance | null = null
  private rate: TTSSpeed = 1.0
  private listeners: Set<TTSListener> = new Set()
  private gapTimer: ReturnType<typeof setTimeout> | null = null
  private source = ''
  private state: TTSState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
    rate: 1.0,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    mode: 'idle',
    steps: [],
    currentStepIndex: -1,
    error: null
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener)
    listener(this.getState())
    return () => this.listeners.delete(listener)
  }

  public getState(): TTSState {
    return { ...this.state, steps: [...this.state.steps] }
  }

  private notify() {
    this.state.rate = this.rate
    this.state.supported = this.isSupported()
    for (const listener of this.listeners) {
      listener(this.getState())
    }
  }

  private clearGapTimer() {
    if (this.gapTimer !== null) {
      clearTimeout(this.gapTimer)
      this.gapTimer = null
    }
  }

  public setRate(newRate: TTSSpeed) {
    this.rate = newRate
    this.notify()
    analytics.track('tts_speed_change', { rate: newRate })
    if (this.state.isPlaying && !this.state.isPaused) {
      // Đọc lại phần đang phát với tốc độ mới.
      if (this.state.mode === 'sequence') {
        this.playStepAt(this.state.currentStepIndex)
      } else if (this.state.currentText) {
        this.speak(this.state.currentText, newRate)
      }
    }
  }

  public getRate(): TTSSpeed {
    return this.rate
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  /** Đọc một đoạn văn bản liền mạch (toàn bộ thẻ học hoặc một bước lẻ). */
  public speak(text: string, rate = this.rate): boolean {
    if (!this.isSupported() || !text) return false
    this.clearGapTimer()
    this.state.mode = 'single'
    this.state.steps = []
    this.state.currentStepIndex = -1
    const started = this.speakChunk(text, rate)
    if (started) {
      analytics.track('tts_started', { mode: 'single', textLength: text.length, rate })
    }
    return started
  }

  /** Đọc lần lượt từng bước, có khoảng nghỉ ngắn giữa các bước. */
  public speakSequence(steps: TTSStep[], options: SpeakSequenceOptions = {}): boolean {
    if (!this.isSupported() || steps.length === 0) return false
    const { rate = this.rate, startIndex = 0, source = '' } = options
    this.clearGapTimer()
    this.rate = rate
    this.source = source
    this.state.mode = 'sequence'
    this.state.steps = [...steps]
    analytics.track('tts_started', { mode: 'sequence', stepCount: steps.length, rate, source })
    return this.playStepAt(Math.min(Math.max(startIndex, 0), steps.length - 1))
  }

  /** Bước kế tiếp; hết chuỗi thì kết thúc phiên đọc. */
  public next(): boolean {
    if (this.state.mode !== 'sequence') return false
    const target = this.state.currentStepIndex + 1
    if (target >= this.state.steps.length) {
      this.finishSequence()
      return false
    }
    analytics.track('tts_step_skipped', {
      direction: 'next',
      fromStep: this.state.currentStepIndex + 1,
      source: this.source
    })
    return this.playStepAt(target)
  }

  /** Quay lại bước trước; đang ở bước đầu thì đọc lại chính bước đó. */
  public previous(): boolean {
    if (this.state.mode !== 'sequence') return false
    const target = Math.max(0, this.state.currentStepIndex - 1)
    analytics.track('tts_step_skipped', {
      direction: 'previous',
      fromStep: this.state.currentStepIndex + 1,
      source: this.source
    })
    return this.playStepAt(target)
  }

  public pause() {
    if (!this.isSupported() || !this.state.isPlaying) return
    this.clearGapTimer()
    window.speechSynthesis.pause()
    this.state.isPaused = true
    this.notify()
    analytics.track('tts_paused', { mode: this.state.mode })
  }

  public resume() {
    if (!this.isSupported() || !this.state.isPaused) return
    window.speechSynthesis.resume()
    this.state.isPaused = false
    this.notify()
    analytics.track('tts_resumed', { mode: this.state.mode })
  }

  public stop() {
    this.clearGapTimer()
    const wasPlaying = this.state.isPlaying
    const mode = this.state.mode
    if (this.isSupported()) {
      window.speechSynthesis.cancel()
    }
    this.resetPlayback()
    this.notify()
    if (wasPlaying) {
      analytics.track('tts_stop', { reason: 'user_cancelled', mode })
    }
  }

  private resetPlayback() {
    this.state.isPlaying = false
    this.state.isPaused = false
    this.state.currentText = ''
    this.state.mode = 'idle'
    this.state.steps = []
    this.state.currentStepIndex = -1
  }

  private playStepAt(index: number): boolean {
    const step = this.state.steps[index]
    if (!step) return false
    this.clearGapTimer()
    this.state.currentStepIndex = index
    return this.speakChunk(step.text, this.rate)
  }

  private finishSequence() {
    const stepCount = this.state.steps.length
    const source = this.source
    this.resetPlayback()
    this.notify()
    analytics.track('tts_completed', { mode: 'sequence', stepCount, source })
  }

  /** Phát một đoạn qua Web Speech API và nối tiếp chuỗi khi đọc xong. */
  private speakChunk(text: string, rate: TTSSpeed): boolean {
    if (!this.isSupported() || !text) return false

    window.speechSynthesis.cancel()

    this.utterance = new SpeechSynthesisUtterance(text)
    this.utterance.lang = 'vi-VN'
    this.utterance.rate = rate
    this.rate = rate

    this.state.isPlaying = true
    this.state.isPaused = false
    this.state.currentText = text
    this.state.error = null
    this.notify()

    this.utterance.onend = () => {
      if (this.state.mode === 'sequence') {
        const nextIndex = this.state.currentStepIndex + 1
        if (nextIndex < this.state.steps.length) {
          this.gapTimer = setTimeout(() => {
            this.gapTimer = null
            this.playStepAt(nextIndex)
          }, STEP_GAP_MS)
          return
        }
        this.finishSequence()
        return
      }

      const length = this.state.currentText.length
      this.resetPlayback()
      this.notify()
      analytics.track('tts_completed', { mode: 'single', textLength: length })
    }

    this.utterance.onerror = (event) => {
      const reason = (event as SpeechSynthesisErrorEvent).error ?? 'unknown'
      // Máy không có giọng đọc phù hợp: dừng phát và để giao diện chuyển sang chữ to.
      console.warn('[TTS] Lỗi phát âm thanh:', reason)
      this.clearGapTimer()
      this.resetPlayback()
      this.state.error = reason
      this.notify()
    }

    window.speechSynthesis.speak(this.utterance)
    return true
  }
}

export const speechService = new SpeechService()

// Backward compatible helper functions
export const speak = (text: string, rate?: number) =>
  speechService.speak(text, (rate as TTSSpeed) || speechService.getRate())

export const stopSpeaking = () => speechService.stop()
