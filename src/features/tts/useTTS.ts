import { ref, onMounted, onUnmounted } from 'vue'
import { speechService, type TTSSpeed, type TTSState } from '../../services/speech'

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
  })

  const speakText = (text: string, rate?: TTSSpeed) => speechService.speak(text, rate)
  const pause = () => speechService.pause()
  const resume = () => speechService.resume()
  const stop = () => speechService.stop()
  const setRate = (rate: TTSSpeed) => speechService.setRate(rate)

  return {
    ttsState,
    speakText,
    pause,
    resume,
    stop,
    setRate
  }
}
