<script setup lang="ts">
import { useTTS } from './useTTS'
import type { TTSSpeed } from '../../services/speech'

const props = defineProps<{
  title?: string
  subtitle?: string
  scriptText: string
}>()

const { ttsState, speakText, pause, resume, stop, setRate } = useTTS()

const speeds: TTSSpeed[] = [0.9, 1.0, 1.1]

const togglePlay = () => {
  if (ttsState.value.isPlaying) {
    if (ttsState.value.isPaused) {
      resume()
    } else {
      pause()
    }
  } else {
    speakText(props.scriptText)
  }
}
</script>

<template>
  <div v-if="ttsState.supported" class="tts-player" role="region" aria-label="Bộ đọc âm thanh bài học">
    <div class="tts-info">
      <div class="tts-title-row">
        <span class="tts-icon" aria-hidden="true">🔊</span>
        <div>
          <strong>{{ title || 'Nghe hướng dẫn' }}</strong>
          <small class="muted-block">{{ subtitle || 'Tập trung lái xe, không cần nhìn màn hình' }}</small>
        </div>
      </div>

      <div class="tts-speed-group" role="radiogroup" aria-label="Tốc độ đọc">
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

    <div class="tts-actions">
      <button
        class="tts-main-btn"
        :class="{ playing: ttsState.isPlaying && !ttsState.isPaused }"
        :aria-label="ttsState.isPlaying ? (ttsState.isPaused ? 'Tiếp tục đọc' : 'Tạm dừng') : 'Đọc toàn bộ bài học'"
        @click="togglePlay"
      >
        <span v-if="!ttsState.isPlaying">▶ Đọc to</span>
        <span v-else-if="ttsState.isPaused">▶ Tiếp tục</span>
        <span v-else>❚❚ Tạm dừng</span>
      </button>

      <button
        v-if="ttsState.isPlaying"
        class="tts-stop-btn"
        aria-label="Dừng phát âm thanh"
        @click="stop"
      >
        ■ Dừng
      </button>
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
  min-width: 38px;
  min-height: 32px;
  border-radius: var(--radius-full, 9999px);
  border: none;
  background: transparent;
  color: var(--text-muted, #6ee7b7);
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: 600;
  cursor: pointer;
}

.speed-button.active {
  background: var(--accent-primary, #10b981);
  color: #0e1715;
}

.tts-actions {
  display: flex;
  gap: 0.5rem;
}

.tts-main-btn {
  flex: 1;
  min-height: var(--min-tap-target, 44px);
  border-radius: var(--radius-md, 10px);
  background: var(--accent-primary, #10b981);
  color: #0e1715;
  font-weight: 700;
  font-size: var(--font-size-base, 1rem);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.tts-main-btn.playing {
  background: var(--status-warn, #f59e0b);
  color: #0e1715;
}

.tts-stop-btn {
  min-width: 80px;
  min-height: var(--min-tap-target, 44px);
  border-radius: var(--radius-md, 10px);
  background: var(--bg-surface, #14211e);
  color: var(--text-primary, #f0fdf4);
  font-weight: 600;
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  cursor: pointer;
}
</style>
