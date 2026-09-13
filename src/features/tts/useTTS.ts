import { ref, onMounted, onUnmounted } from 'vue'
import {
  speechService,
  type SpeakSequenceOptions,
  type TTSSpeed,
  type TTSState,
  type TTSStep
} from '../../services/speech'

export function useTTS() {
  const ttsState = ref<TTSState>(speechService.getState())

  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    unsubscribe = speechService.subscribe((state) => {
      ttsState.value = state
    })
  })

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
    speechService.stop()
  })

  const speakText = (text: string, rate?: TTSSpeed) => speechService.speak(text, rate)
  const speakSteps = (steps: TTSStep[], options?: SpeakSequenceOptions) =>
    speechService.speakSequence(steps, options)
  const nextStep = () => speechService.next()
  const previousStep = () => speechService.previous()
  const pause = () => speechService.pause()
  const resume = () => speechService.resume()
  const stop = () => speechService.stop()
  const setRate = (rate: TTSSpeed) => speechService.setRate(rate)

  return {
    ttsState,
    speakText,
    speakSteps,
    nextStep,
    previousStep,
    pause,
    resume,
    stop,
    setRate
  }
}
