import { analytics } from './analytics'

export type TTSSpeed = 0.9 | 1.0 | 1.1

export interface TTSState {
  isPlaying: boolean
  isPaused: boolean
  currentText: string
  rate: TTSSpeed
  supported: boolean
}

type TTSListener = (state: TTSState) => void

class SpeechService {
  private utterance: SpeechSynthesisUtterance | null = null
  private rate: TTSSpeed = 1.0
  private listeners: Set<TTSListener> = new Set()
  private state: TTSState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
    rate: 1.0,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  constructor() {
    // Initial check
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener)
    listener(this.getState())
    return () => this.listeners.delete(listener)
  }

  public getState(): TTSState {
    return { ...this.state }
  }

  private notify() {
    this.state.rate = this.rate
    for (const listener of this.listeners) {
      listener(this.getState())
    }
  }

  public setRate(newRate: TTSSpeed) {
    this.rate = newRate
    this.notify()
    analytics.track('tts_speed_change', { rate: newRate })
    if (this.state.isPlaying && !this.state.isPaused && this.state.currentText) {
      // Re-speak with new speed
      const text = this.state.currentText
      this.speak(text, newRate)
    }
  }

  public getRate(): TTSSpeed {
    return this.rate
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  public speak(text: string, rate = this.rate): boolean {
    if (!this.isSupported()) return false

    window.speechSynthesis.cancel()

    this.utterance = new SpeechSynthesisUtterance(text)
    this.utterance.lang = 'vi-VN'
    this.utterance.rate = rate
    this.rate = rate

    this.state.isPlaying = true
    this.state.isPaused = false
    this.state.currentText = text
    this.notify()

    this.utterance.onend = () => {
      this.state.isPlaying = false
      this.state.isPaused = false
      this.state.currentText = ''
      this.notify()
      analytics.track('tts_stop', { reason: 'ended' })
    }

    this.utterance.onerror = (e) => {
      console.warn('[TTS] Lỗi phát âm thanh:', e)
      this.state.isPlaying = false
      this.state.isPaused = false
      this.notify()
    }

    window.speechSynthesis.speak(this.utterance)
    analytics.track('tts_play', { textLength: text.length, rate })
    return true
  }

  public pause() {
    if (!this.isSupported()) return
    window.speechSynthesis.pause()
    this.state.isPaused = true
    this.notify()
  }

  public resume() {
    if (!this.isSupported()) return
    window.speechSynthesis.resume()
    this.state.isPaused = false
    this.notify()
  }

  public stop() {
    if (!this.isSupported()) return
    window.speechSynthesis.cancel()
    this.state.isPlaying = false
    this.state.isPaused = false
    this.state.currentText = ''
    this.notify()
    analytics.track('tts_stop', { reason: 'user_cancelled' })
  }
}

export const speechService = new SpeechService()

// Backward compatible helper functions
export const speak = (text: string, rate?: number) =>
  speechService.speak(text, (rate as TTSSpeed) || speechService.getRate())

export const stopSpeaking = () => speechService.stop()

