<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useTTS } from './useTTS'
import { analytics } from '../../services/analytics'
import type { TTSSpeed, TTSStep } from '../../services/speech'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    scriptText: string
    steps?: TTSStep[]
    /** Chế độ đang lái: nút to hơn, ẩn bớt nội dung phụ. */
    drivingMode?: boolean
    source?: string
  }>(),
  { title: '', subtitle: '', steps: () => [], drivingMode: false, source: '' }
)

const {
  ttsState,
  speakText,
  speakSteps,
  nextStep,
  previousStep,
  pause,
  resume,
  stop,
  setRate
} = useTTS()

const speeds: TTSSpeed[] = [0.9, 1.0, 1.1]
const showLargeText = ref(false)

const isSequence = computed(() => ttsState.value.mode === 'sequence')
const isPlaying = computed(() => ttsState.value.isPlaying)
const isPaused = computed(() => ttsState.value.isPaused)
const hasSteps = computed(() => props.steps.length > 0)
const currentStep = computed(() =>
  isSequence.value ? ttsState.value.steps[ttsState.value.currentStepIndex] : undefined
)
const stepPosition = computed(() =>
  isSequence.value ? `${ttsState.value.currentStepIndex + 1}/${ttsState.value.steps.length}` : ''
)

const togglePlay = () => {
  if (isPlaying.value) {
    if (isPaused.value) resume()
    else pause()
    return
  }
  speakText(props.scriptText)
}

const playSteps = () => {
  if (isPlaying.value) stop()
  speakSteps(props.steps, { source: props.source })
}

const toggleLargeText = () => {
  showLargeText.value = !showLargeText.value
  if (showLargeText.value) {
    analytics.track('tts_fallback_shown', { reason: 'user_choice', source: props.source })
  }
}

onMounted(() => {
  if (!ttsState.value.supported) {
    showLargeText.value = true
    analytics.track('tts_fallback_shown', { reason: 'unsupported', source: props.source })
  }
})

// Máy không đọc được tiếng Việt: tự chuyển sang chế độ chữ to thay vì im lặng.
watch(
  () => ttsState.value.error,
  (error) => {
    if (!error) return
    if (!showLargeText.value) {
      showLargeText.value = true
      analytics.track('tts_fallback_shown', { reason: error, source: props.source })
    }
  }
)
</script>

<template>
  <div
    class="tts-player"
    :class="{ driving: drivingMode }"
    role="region"
    aria-label="Bộ đọc hướng dẫn bài học"
  >
    <div class="tts-info">
      <div class="tts-title-row">
        <span class="tts-icon" aria-hidden="true">🔊</span>
        <div>
          <strong>{{ title || 'Nghe hướng dẫn' }}</strong>
          <small v-if="!drivingMode" class="muted-block">
            {{ subtitle || 'Tập trung lái xe, không cần nhìn màn hình' }}
          </small>
        </div>
      </div>

      <div v-if="ttsState.supported" class="tts-speed-group" role="radiogroup" aria-label="Tốc độ đọc">
        <button
          v-for="s in speeds"
          :key="s"
          role="radio"
          :aria-checked="ttsState.rate === s"
          class="speed-button"
          :class="{ active: ttsState.rate === s }"
          @click="setRate(s)"
        >
          {{ s }}x
        </button>
      </div>
    </div>

    <p v-if="currentStep" class="tts-step-now" aria-live="polite">
      <b>{{ currentStep.label }}</b> · bước {{ stepPosition }}
    </p>

    <template v-if="ttsState.supported">
      <div class="tts-actions">
        <button
          class="tts-main-btn"
          :class="{ playing: isPlaying && !isPaused }"
          :aria-label="isPlaying ? (isPaused ? 'Tiếp tục đọc' : 'Tạm dừng') : 'Đọc toàn bộ bài học'"
          @click="togglePlay"
        >
          <span v-if="!isPlaying">▶ Đọc cả bài</span>
          <span v-else-if="isPaused">▶ Tiếp tục</span>
          <span v-else>❚❚ Tạm dừng</span>
        </button>

        <button
          v-if="hasSteps"
          class="tts-secondary-btn"
          aria-label="Đọc lần lượt từng bước"
          @click="playSteps"
        >
          ☰ Từng bước
        </button>

        <button
          v-if="isPlaying"
          class="tts-secondary-btn"
          aria-label="Dừng phát âm thanh"
          @click="stop"
        >
          ■ Dừng
        </button>
      </div>

      <div v-if="hasSteps" class="tts-step-nav">
        <button
          class="tts-step-btn"
          :disabled="!isSequence"
          aria-label="Bước trước"
          @click="previousStep"
        >
          ⏮ Bước trước
        </button>
        <button
          class="tts-step-btn"
          :disabled="!isSequence"
          aria-label="Bước sau"
          @click="nextStep"
        >
          Bước sau ⏭
        </button>
      </div>

      <button class="tts-text-toggle" @click="toggleLargeText">
        {{ showLargeText ? 'Ẩn chữ to' : 'Aa Chế độ chữ to' }}
      </button>
    </template>

    <p v-else class="tts-fallback-note">
      Thiết bị chưa hỗ trợ giọng đọc tiếng Việt — dùng chế độ chữ to bên dưới.
    </p>

    <p v-if="ttsState.supported && ttsState.error" class="tts-fallback-note">
      Không phát được giọng đọc trên thiết bị này — đã bật chế độ chữ to.
    </p>

    <div v-if="showLargeText" class="tts-large-text">
      <p v-if="!hasSteps">{{ scriptText }}</p>
      <ol v-else>
        <li v-for="step in steps" :key="step.id">{{ step.text }}</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.tts-player {
  background: var(--bg-surface-elevated, #1b2c28);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  border-radius: var(--radius-lg, 16px);
  padding: 1rem;
  margin: 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tts-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tts-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tts-icon {
  font-size: 1.25rem;
}

.muted-block {
  display: block;
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--text-muted, #6ee7b7);
}

.tts-speed-group {
  display: flex;
  background: var(--bg-primary, #0e1715);
  border-radius: var(--radius-full, 9999px);
  padding: 2px;
  gap: 2px;
}

.speed-button {
  min-width: 44px;
  min-height: 36px;
  border-radius: var(--radius-full, 9999px);
  border: none;
  background: transparent;
  color: var(--text-muted, #6ee7b7);
  font-size: var(--font-size-sm, 0.875rem);
  font-weight: 600;
  cursor: pointer;
}

.speed-button.active {
  background: var(--accent-primary, #10b981);
  color: var(--accent-ink, #0e1715);
}

.tts-step-now {
  margin: 0;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--text-secondary, #a7f3d0);
}

.tts-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tts-main-btn {
  flex: 1 1 160px;
  min-height: var(--min-tap-target, 44px);
  border-radius: var(--radius-md, 10px);
  background: var(--accent-primary, #10b981);
  color: var(--accent-ink, #0e1715);
  font-weight: 700;
  font-size: var(--font-size-base, 1rem);
  border: none;
  cursor: pointer;
}

.tts-main-btn.playing {
  background: var(--status-warn, #f59e0b);
}

.tts-secondary-btn,
.tts-step-btn {
  min-height: var(--min-tap-target, 44px);
  min-width: 96px;
  padding: 0 0.9rem;
  border-radius: var(--radius-md, 10px);
  background: var(--bg-surface, #14211e);
  color: var(--text-primary, #f0fdf4);
  font-weight: 600;
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  cursor: pointer;
}

.tts-step-nav {
  display: flex;
  gap: 0.5rem;
}

.tts-step-btn {
  flex: 1;
}

.tts-step-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.tts-text-toggle {
  align-self: flex-start;
  min-height: 36px;
  border: none;
  background: none;
  color: var(--text-muted, #6ee7b7);
  font-size: var(--font-size-sm, 0.875rem);
  cursor: pointer;
}

.tts-fallback-note {
  margin: 0;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--text-secondary, #a7f3d0);
}

.tts-large-text {
  border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  padding-top: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.7;
}

.tts-large-text ol {
  margin: 0;
  padding-left: 1.4rem;
}

.tts-large-text li {
  margin-bottom: 0.6rem;
}

.driving .tts-main-btn,
.driving .tts-secondary-btn,
.driving .tts-step-btn {
  min-height: 60px;
  font-size: var(--font-size-lg, 1.125rem);
}

.driving .tts-step-now {
  font-size: var(--font-size-lg, 1.125rem);
}
</style>
