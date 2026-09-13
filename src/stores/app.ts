import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { contentPack } from '../content'
import {
  saveContentPackToIDB,
  saveProgressToIDB,
  getProgressFromIDB,
  saveChecklistToIDB,
  getAllChecklistsFromIDB
} from '../services/offline-cache'
import { syncEngine, type SyncEngineState } from '../services/sync-engine'
import { analytics } from '../services/analytics'

const read = <T>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') as T
  } catch {
    return fallback
  }
}

export const useAppStore = defineStore('app', () => {
  const completed = ref<string[]>(read('lxn-completed', []))
  const checked = ref<Record<string, boolean>>(read('lxn-checklist', {}))
  const theme = ref<'dark' | 'light'>(read('lxn-theme', 'dark'))
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)
  const syncState = ref<SyncEngineState>(syncEngine.getState())
  const isInitialized = ref(false)

  const progress = computed(() => completed.value.length)

  // Initialize offline storage and sync engine
  const init = async () => {
    if (isInitialized.value) return

    // 1. Precache content pack into IndexedDB for offline capability
    void saveContentPackToIDB(contentPack)

    // 2. Load cached progress & checklist from IDB if present
    try {
      const idbProgress = await getProgressFromIDB()
      if (idbProgress && idbProgress.length > 0) {
        completed.value = Array.from(new Set([...completed.value, ...idbProgress]))
      }

      const idbChecklists = await getAllChecklistsFromIDB()
      if (Object.keys(idbChecklists).length > 0) {
        checked.value = { ...checked.value, ...idbChecklists }
      }
    } catch {
      // IndexedDB fallback
    }

    // 3. Listen to SyncEngine
    syncEngine.subscribe((state) => {
      syncState.value = state
    })

    syncEngine.startAutoSync()
    isInitialized.value = true
    analytics.track('app_loaded', { offline: !isOnline.value })
  }

  const toggleComplete = (id: string) => {
    const isNowCompleted = !completed.value.includes(id)
    completed.value = isNowCompleted
      ? [...completed.value, id]
      : completed.value.filter((item) => item !== id)

    void saveProgressToIDB('local', completed.value)
    void syncEngine.queueAction('progress_update', {
      completedCardIds: completed.value
    })

    if (isNowCompleted) {
      analytics.track('card_complete', { cardId: id })
    }
  }

  const toggleCheck = (id: string, scope = 'pre_drive') => {
    checked.value[id] = !checked.value[id]
    void saveChecklistToIDB(scope, checked.value)
    void syncEngine.queueAction('checklist_toggle', {
      scope,
      checkedItems: checked.value
    })
    analytics.track('checklist_item_checked', { itemId: id, checked: checked.value[id], scope })
  }

  const resetChecklist = (ids: string[], scope = 'pre_drive') => {
    ids.forEach((id) => delete checked.value[id])
    void saveChecklistToIDB(scope, checked.value)
    void syncEngine.queueAction('checklist_reset', {
      scope,
      checkedItems: checked.value
    })
    analytics.track('checklist_reset', { scope })
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(
    completed,
    (value) => localStorage.setItem('lxn-completed', JSON.stringify(value)),
    { deep: true }
  )

  watch(
    checked,
    (value) => localStorage.setItem('lxn-checklist', JSON.stringify(value)),
    { deep: true }
  )

  watch(
    theme,
    (value) => {
      localStorage.setItem('lxn-theme', JSON.stringify(value))
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = value
      }
    },
    { immediate: true }
  )

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      isOnline.value = true
    })
    window.addEventListener('offline', () => {
      isOnline.value = false
      analytics.track('offline_mode_used')
    })
  }

  // Trigger init
  void init()

  return {
    completed,
    checked,
    theme,
    isOnline,
    syncState,
    progress,
    isInitialized,
    init,
    toggleComplete,
    toggleCheck,
    resetChecklist,
    toggleTheme
  }
})

