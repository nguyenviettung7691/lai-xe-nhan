import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { checklists, contentPack } from '../content'
import {
  saveContentPackToIDB,
  saveProgressToIDB,
  getProgressFromIDB,
  saveChecklistToIDB,
  getChecklistFromIDB,
  saveChecklistSessionToIDB,
  getChecklistSessionsFromIDB,
  saveActiveChecklistToIDB,
  getActiveChecklistsFromIDB,
  deleteActiveChecklistFromIDB
} from '../services/offline-cache'
import { syncEngine, type SyncEngineState } from '../services/sync-engine'
import { analytics } from '../services/analytics'
import {
  appendSession,
  checklistProgress,
  createChecklistSession,
  hapticTick,
  latestSession
} from '../services/checklist'
import {
  applyTheme,
  isNightHours,
  nextThemePreference,
  resolveTheme,
  systemPrefersDark,
  watchSystemTheme
} from '../services/theme'
import { dueEntries, passedQuickCheck, scheduleNextReview } from '../services/spaced-repetition'
import type {
  ChecklistScope,
  ChecklistSession,
  ContrastPreference,
  DisplayMode,
  ExperienceLevel,
  ReviewScheduleEntry,
  ThemePreference
} from '../types'

const read = <T>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') as T
  } catch {
    return fallback
  }
}

/** Bản ghi theo dõi thời điểm bắt đầu một lượt checklist đang dở. */
type ActiveChecklist = Partial<Record<ChecklistScope, string>>

export const useAppStore = defineStore('app', () => {
  const completed = ref<string[]>(read('lxn-completed', []))
  const checked = ref<Record<string, boolean>>(read('lxn-checklist', {}))
  const checklistHistory = ref<ChecklistSession[]>(read('lxn-checklist-history', []))
  const activeChecklists = ref<ActiveChecklist>(read('lxn-checklist-active', {}))
  const themePreference = ref<ThemePreference>(read('lxn-theme-preference', 'system'))
  const contrast = ref<ContrastPreference>(read('lxn-contrast', 'normal'))
  const prefersDark = ref(systemPrefersDark())
  const reviewSchedule = ref<Record<string, ReviewScheduleEntry>>(read('lxn-review-schedule', {}))
  const displayMode = ref<DisplayMode>(read('lxn-display-mode', 'learn'))
  const experienceLevel = ref<ExperienceLevel | null>(read('lxn-experience-level', null))
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)
  const syncState = ref<SyncEngineState>(syncEngine.getState())
  const isInitialized = ref(false)

  /** Giao diện đang áp dụng sau khi hợp nhất lựa chọn người dùng và cài đặt hệ thống. */
  const theme = computed(() => resolveTheme(themePreference.value, prefersDark.value))
  const isHighContrast = computed(() => contrast.value === 'high')

  const progress = computed(() => completed.value.length)

  /** ID các thẻ có lần quick check gần nhất đạt (dùng để tính mức độ đạt bài học). */
  const passedCardIds = computed(() =>
    Object.values(reviewSchedule.value)
      .filter((entry) => entry.lastResult === 'pass')
      .map((entry) => entry.cardId)
  )

  /** Danh sách thẻ đến hạn ôn lại, sắp xếp theo hạn gần nhất trước. */
  const dueReviewCards = computed(() => dueEntries(reviewSchedule.value))

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

      const checklistStates = await Promise.all(
        checklists.map(async (checklist) => [checklist.id, await getChecklistFromIDB(checklist.id)] as const)
      )
      for (const [scope, state] of checklistStates) {
        if (state) checked.value = { ...checked.value, ...state }
      }

      const idbSessions = await getChecklistSessionsFromIDB()
      if (idbSessions.length > 0) {
        const byId = new Map(checklistHistory.value.map((session) => [session.id, session]))
        for (const session of idbSessions) byId.set(session.id, session)
        checklistHistory.value = Array.from(byId.values()).sort((a, b) =>
          b.completedAt.localeCompare(a.completedAt)
        )
      }

      const idbActive = await getActiveChecklistsFromIDB()
      activeChecklists.value = { ...activeChecklists.value, ...idbActive }
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
    if (theme.value === 'dark') {
      analytics.track('night_mode_enabled', {
        preference: themePreference.value,
        nightHours: isNightHours()
      })
    }
  }

  /**
   * IndexedDB và hàng đợi đồng bộ chỉ nhận dữ liệu thuần (structured clone),
   * nên luôn tách bản sao khỏi proxy phản ứng của Vue trước khi ghi.
   */
  const snapshotChecked = () => ({ ...checked.value })
  const snapshotCompleted = () => [...completed.value]

  const toggleComplete = (id: string) => {
    const isNowCompleted = !completed.value.includes(id)
    completed.value = isNowCompleted
      ? [...completed.value, id]
      : completed.value.filter((item) => item !== id)

    void saveProgressToIDB('local', snapshotCompleted())
    void syncEngine.queueAction('progress_update', {
      completedCardIds: snapshotCompleted()
    })

    if (isNowCompleted) {
      analytics.track('card_complete', { cardId: id })
    }
  }

  const findChecklist = (scope: ChecklistScope) =>
    checklists.find((checklist) => checklist.id === scope)

  /** Tiến độ hiện tại của một checklist: số mục xong, tỷ lệ và mục bắt buộc còn thiếu. */
  const progressOf = (scope: ChecklistScope) => {
    const checklist = findChecklist(scope)
    if (!checklist) return { done: 0, total: 0, ratio: 0, missingMust: [], isComplete: false }
    return checklistProgress(checklist, checked.value)
  }

  /** Lượt hoàn tất gần nhất của một checklist (dùng cho phần lịch sử). */
  const lastSessionOf = (scope: ChecklistScope) => latestSession(checklistHistory.value, scope)

  const startChecklistSession = (scope: ChecklistScope) => {
    if (activeChecklists.value[scope]) return
    const startedAt = new Date().toISOString()
    activeChecklists.value = { ...activeChecklists.value, [scope]: startedAt }
    void saveActiveChecklistToIDB(scope, startedAt)
    analytics.track('checklist_started', { scope })
  }

  const clearActiveChecklist = (scope: ChecklistScope) => {
    const next = { ...activeChecklists.value }
    delete next[scope]
    activeChecklists.value = next
    void deleteActiveChecklistFromIDB(scope)
  }

  /** Ghi nhận một lượt checklist hoàn tất: lưu offline, đẩy vào hàng đợi đồng bộ. */
  const completeChecklistSession = (scope: ChecklistScope) => {
    const summary = progressOf(scope)
    const startedAt = activeChecklists.value[scope] ?? new Date().toISOString()
    const session = createChecklistSession({
      scope,
      startedAt,
      completedItems: summary.done,
      totalItems: summary.total
    })

    checklistHistory.value = appendSession(checklistHistory.value, session)
    clearActiveChecklist(scope)

    void saveChecklistSessionToIDB(session)
    void syncEngine.queueAction('checklist_session', { ...session })
    analytics.track('checklist_completed', {
      scope,
      durationMs: session.durationMs,
      totalItems: session.totalItems
    })
    hapticTick([18, 60, 18])
    return session
  }

  const toggleCheck = (id: string, scope: ChecklistScope = 'pre_drive') => {
    startChecklistSession(scope)
    checked.value[id] = !checked.value[id]
    if (checked.value[id]) hapticTick()

    const scopeChecked = Object.fromEntries(
      checklists
        .find((checklist) => checklist.id === scope)
        ?.items.map((item) => [item.id, checked.value[item.id] === true]) ?? []
    )
    void saveChecklistToIDB(scope, scopeChecked)
    void syncEngine.queueAction('checklist_toggle', {
      scope,
      checkedItems: scopeChecked
    })
    analytics.track('checklist_item_checked', { itemId: id, checked: checked.value[id], scope })

    if (progressOf(scope).isComplete) {
      completeChecklistSession(scope)
    }
  }

  const resetChecklist = (ids: string[], scope: ChecklistScope = 'pre_drive') => {
    ids.forEach((id) => delete checked.value[id])
    clearActiveChecklist(scope)
    const scopeChecked = Object.fromEntries(ids.map((id) => [id, false]))
    void saveChecklistToIDB(scope, scopeChecked)
    void syncEngine.queueAction('checklist_reset', {
      scope,
      checkedItems: scopeChecked
    })
    analytics.track('checklist_reset', { scope })
  }

  const setThemePreference = (preference: ThemePreference) => {
    themePreference.value = preference
    analytics.track('theme_preference_changed', { preference, resolved: theme.value })
    if (theme.value === 'dark') {
      analytics.track('night_mode_enabled', { preference, nightHours: isNightHours() })
    }
  }

  /** Nút đổi giao diện: hệ thống → ban đêm → ban ngày. */
  const toggleTheme = () => setThemePreference(nextThemePreference(themePreference.value))

  const setContrast = (value: ContrastPreference) => {
    contrast.value = value
    analytics.track('high_contrast_toggled', { contrast: value })
  }

  const toggleContrast = () => setContrast(contrast.value === 'high' ? 'normal' : 'high')

  /** Ghi nhận kết quả quick check của một thẻ và đặt lịch ôn lại tiếp theo. */
  const recordQuickCheck = (cardId: string, correctCount: number, totalQuestions: number) => {
    const passed = passedQuickCheck(correctCount, totalQuestions)
    const entry = scheduleNextReview({ cardId, passed, previous: reviewSchedule.value[cardId] })
    reviewSchedule.value = { ...reviewSchedule.value, [cardId]: entry }
    analytics.track('quick_check_result', { cardId, correctCount, totalQuestions, passed })
    return entry
  }

  const setDisplayMode = (mode: DisplayMode) => {
    displayMode.value = mode
    analytics.track('display_mode_change', { mode })
  }

  const setExperienceLevel = (level: ExperienceLevel) => {
    experienceLevel.value = level
    analytics.track('experience_level_selected', { level })
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
    checklistHistory,
    (value) => localStorage.setItem('lxn-checklist-history', JSON.stringify(value)),
    { deep: true }
  )

  watch(
    activeChecklists,
    (value) => localStorage.setItem('lxn-checklist-active', JSON.stringify(value)),
    { deep: true }
  )

  watch(
    [theme, contrast],
    ([mode, level]) => {
      localStorage.setItem('lxn-theme', JSON.stringify(mode))
      localStorage.setItem('lxn-contrast', JSON.stringify(level))
      applyTheme(mode, level)
    },
    { immediate: true }
  )

  watch(
    themePreference,
    (value) => localStorage.setItem('lxn-theme-preference', JSON.stringify(value))
  )

  watch(
    reviewSchedule,
    (value) => localStorage.setItem('lxn-review-schedule', JSON.stringify(value)),
    { deep: true }
  )

  watch(
    displayMode,
    (value) => localStorage.setItem('lxn-display-mode', JSON.stringify(value))
  )

  watch(
    experienceLevel,
    (value) => localStorage.setItem('lxn-experience-level', JSON.stringify(value))
  )

  if (typeof window !== 'undefined') {
    watchSystemTheme((dark) => {
      prefersDark.value = dark
    })

    window.addEventListener('online', () => {
      isOnline.value = true
      void analytics.flush()
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
    checklistHistory,
    activeChecklists,
    theme,
    themePreference,
    contrast,
    isHighContrast,
    reviewSchedule,
    displayMode,
    experienceLevel,
    isOnline,
    syncState,
    progress,
    passedCardIds,
    dueReviewCards,
    isInitialized,
    init,
    toggleComplete,
    toggleCheck,
    resetChecklist,
    progressOf,
    lastSessionOf,
    startChecklistSession,
    completeChecklistSession,
    toggleTheme,
    setThemePreference,
    setContrast,
    toggleContrast,
    recordQuickCheck,
    setDisplayMode,
    setExperienceLevel
  }
})
