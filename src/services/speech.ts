let utterance: SpeechSynthesisUtterance | null = null
export const speak = (text: string, rate = 1) => {
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'vi-VN'
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
  return true
}
export const stopSpeaking = () => window.speechSynthesis?.cancel()
