import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const read = <T>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) ?? '') as T } catch { return fallback }
}

export const useAppStore = defineStore('app', () => {
  const completed = ref<string[]>(read('lxn-completed', []))
  const checked = ref<Record<string, boolean>>(read('lxn-checklist', {}))
  const theme = ref<'dark' | 'light'>(read('lxn-theme', 'dark'))
  const isOnline = ref(navigator.onLine)
  const progress = computed(() => completed.value.length)

  const toggleComplete = (id: string) => {
    completed.value = completed.value.includes(id) ? completed.value.filter(item => item !== id) : [...completed.value, id]
  }
  const toggleCheck = (id: string) => { checked.value[id] = !checked.value[id] }
  const resetChecklist = (ids: string[]) => { ids.forEach(id => delete checked.value[id]) }
  const toggleTheme = () => { theme.value = theme.value === 'dark' ? 'light' : 'dark' }

  watch(completed, value => localStorage.setItem('lxn-completed', JSON.stringify(value)), { deep: true })
  watch(checked, value => localStorage.setItem('lxn-checklist', JSON.stringify(value)), { deep: true })
  watch(theme, value => {
    localStorage.setItem('lxn-theme', JSON.stringify(value))
    document.documentElement.dataset.theme = value
  }, { immediate: true })
  window.addEventListener('online', () => { isOnline.value = true })
  window.addEventListener('offline', () => { isOnline.value = false })

  return { completed, checked, theme, isOnline, progress, toggleComplete, toggleCheck, resetChecklist, toggleTheme }
})
