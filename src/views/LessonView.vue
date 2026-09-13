<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  disclaimer,
  getCardAssets,
  getCardById,
  getChecklist,
  getReview,
  getTopicById,
  publishedCards
} from '../content'
import { useAppStore } from '../stores/app'
import { speak, speechService } from '../services/speech'
import type { TTSStep } from '../services/speech'
import { analytics } from '../services/analytics'
import TTSPlayer from '../features/tts/TTSPlayer.vue'
import QuickCheckPanel from '../features/learning-cards/QuickCheckPanel.vue'
import type { DisplayMode } from '../types'

const store = useAppStore()
const route = useRoute()
const card = computed(() => getCardById(String(route.params.id)))
const topic = computed(() => (card.value ? getTopicById(card.value.topicId) : undefined))
const assets = computed(() => (card.value ? getCardAssets(card.value.id) : []))
const mainAsset = computed(() => assets.value.find((item) => item.role === 'main'))
const variantAsset = computed(() => assets.value.find((item) => item.role === 'variant'))
const checklist = computed(() => (card.value ? getChecklist(card.value.checklistId) : undefined))
const review = computed(() => (card.value ? getReview(card.value.id) : undefined))
const riskLabel = computed(() =>
  card.value?.risk === 'high' ? 'Cần chú ý' : card.value?.risk === 'medium' ? 'Thực hành' : 'Cơ bản'
)

const displayModes: { value: DisplayMode; label: string }[] = [
  { value: 'learn', label: 'Học kỹ' },
  { value: 'quick', label: 'Ôn nhanh' },
  { value: 'handsfree', label: 'Rảnh tay' }
]
const setMode = (mode: DisplayMode) => store.setDisplayMode(mode)

// Find next card for prefetching
const currentIndex = computed(() =>
  publishedCards.findIndex((c) => c.id === card.value?.id)
)
const nextCard = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < publishedCards.length - 1
    ? publishedCards[currentIndex.value + 1]
    : null
)

// Prefetch next card assets
watch(
  nextCard,
  (next) => {
    if (next && typeof window !== 'undefined') {
      const nextAssets = getCardAssets(next.id)
      for (const asset of nextAssets) {
        const img = new Image()
        img.src = asset.url
      }
    }
  },
  { immediate: true }
)

const fullScript = computed(() => {
  if (!card.value) return ''
  return [
    `Khẩu quyết: ${card.value.mnemonic.text}`,
    ...card.value.steps.map((step) => `Bước ${step.stepNo}: ${step.instruction}`),
    `An toàn: ${card.value.safety}`
  ].join('. ')
})

/** Kịch bản đọc từng bước: mỗi bước bắt đầu bằng "Bước n" kèm mốc canh. */
const ttsSteps = computed<TTSStep[]>(() => {
  if (!card.value) return []
  return [
    {
      id: `${card.value.id}-mnemonic`,
      label: 'Khẩu quyết',
      text: `Khẩu quyết: ${card.value.mnemonic.text}`
    },
    ...card.value.steps.map((step) => ({
      id: step.id,
      label: `Bước ${step.stepNo}`,
      text: `Bước ${step.stepNo}: ${step.instruction}. Mốc canh: ${step.cueText}`
    })),
    {
      id: `${card.value.id}-safety`,
      label: 'An toàn',
      text: `An toàn: ${card.value.safety}`
    }
  ]
})

const trackView = () => {
  if (card.value) {
    analytics.track('card_view', {
      cardId: card.value.id,
      topicId: card.value.topicId,
      risk: card.value.risk
    })
  }
}

/** Chế độ rảnh tay: tự đọc lần lượt từng bước khi mở thẻ. */
const autoPlayHandsfree = () => {
  if (store.displayMode !== 'handsfree' || ttsSteps.value.length === 0) return
  speechService.speakSequence(ttsSteps.value, { source: card.value?.id })
}

onMounted(() => {
  trackView()
  autoPlayHandsfree()
})

watch(
  () => card.value?.id,
  () => {
    trackView()
    autoPlayHandsfree()
  }
)

const complete = () => {
  if (card.value) store.toggleComplete(card.value.id)
}
</script>

<template>
  <div v-if="card" class="lesson-detail">
    <RouterLink :to="`/topics/${card.topicId}`" class="back-link">
      ← Quay lại {{ topic?.title ?? 'chuyên đề' }}
    </RouterLink>

    <div class="lesson-meta">
      <span class="risk" :class="card.risk">{{ riskLabel }}</span>
      <span>{{ card.minutes }} phút</span>
      <span>Độ khó {{ card.difficulty }}/5</span>
      <span v-if="review" class="review-chip" :title="review.notes">✓ Đã thẩm định</span>
    </div>

    <div class="mode-toggle" role="radiogroup" aria-label="Chế độ hiển thị bài học">
      <button
        v-for="mode in displayModes"
        :key="mode.value"
        role="radio"
        :aria-checked="store.displayMode === mode.value"
        class="mode-btn"
        :class="{ active: store.displayMode === mode.value }"
        @click="setMode(mode.value)"
      >
        {{ mode.label }}
      </button>
    </div>

    <h1>{{ card.title }}</h1>
    <p class="lead">{{ card.context }}</p>
    <p class="objective"><b>Mục tiêu:</b> {{ card.objective }}</p>
    <div class="mnemonic">
      <span>NHỚ NHANH</span>
      <strong>“{{ card.mnemonic.text }}”</strong>
    </div>

    <figure v-if="mainAsset" class="card-figure">
      <img
        :src="mainAsset.url"
        :alt="mainAsset.alt"
        :width="mainAsset.width"
        :height="mainAsset.height"
        decoding="async"
      />
      <figcaption>{{ mainAsset.caption }}</figcaption>
    </figure>

    <!-- Bộ đọc: cả bài, từng bước, tốc độ 0.9x / 1.0x / 1.1x và chế độ chữ to -->
    <TTSPlayer
      title="Nghe hướng dẫn bài học"
      subtitle="Chế độ rảnh tay khi đang vần vô-lăng"
      :script-text="fullScript"
      :steps="ttsSteps"
      :driving-mode="store.displayMode === 'handsfree'"
      :source="card.id"
    />

    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">LÀM THEO TỪNG BƯỚC</p>
          <h2>Quy trình thực hiện</h2>
        </div>
      </div>
      <ol class="steps">
        <li v-for="step in card.steps" :key="step.id">
          <span>{{ step.stepNo }}</span>
          <div class="step-body">
            <p>{{ step.instruction }}</p>
            <small class="cue">Mốc canh: {{ step.cueText }}</small>
            <small v-if="step.speedHint" class="cue">Tốc độ: {{ step.speedHint }}</small>
            <small v-if="step.steeringHint" class="cue">Vô-lăng: {{ step.steeringHint }}</small>
          </div>
          <button
            class="step-speak"
            :aria-label="`Đọc bước ${step.stepNo}`"
            @click="speak(`Bước ${step.stepNo}: ${step.instruction}`)"
          >
            🔊
          </button>
        </li>
      </ol>
    </section>

    <figure v-if="variantAsset && store.displayMode !== 'quick'" class="card-figure">
      <img
        :src="variantAsset.url"
        :alt="variantAsset.alt"
        :width="variantAsset.width"
        :height="variantAsset.height"
        loading="lazy"
        decoding="async"
      />
      <figcaption>{{ variantAsset.caption }}</figcaption>
    </figure>

    <div v-if="store.displayMode !== 'quick'" class="info-grid">
      <div class="info-box warning">
        <span>!</span>
        <div>
          <strong>Lỗi hay gặp</strong>
          <ul>
            <li v-for="mistake in card.mistakes" :key="mistake">{{ mistake }}</li>
          </ul>
        </div>
      </div>
      <div class="info-box recovery">
        <span>↻</span>
        <div>
          <strong>Nếu lỡ sai</strong>
          <p>{{ card.recovery }}</p>
        </div>
      </div>
    </div>

    <div class="safety">
      <strong>Ưu tiên an toàn</strong>
      <p>{{ card.safety }}</p>
    </div>

    <QuickCheckPanel :key="card.id" :card="card" />

    <RouterLink
      v-if="checklist"
      :to="{ path: '/checklist', query: { scope: checklist.id } }"
      class="checklist-link"
    >
      ✓ Checklist liên quan: {{ checklist.title }} →
    </RouterLink>

    <button class="button primary full" @click="complete">
      {{ store.completed.includes(card.id) ? '✓ Đã nắm bài này' : 'Đánh dấu đã nắm' }}
    </button>

    <!-- Quick navigation to next card -->
    <RouterLink
      v-if="nextCard"
      :to="`/lessons/${nextCard.id}`"
      class="button secondary full next-card-btn"
    >
      Bài tiếp theo: {{ nextCard.title }} →
    </RouterLink>

    <footer class="content-meta">
      <p>Phiên bản {{ card.version }} · cập nhật {{ card.updatedAt }}</p>
      <p v-if="review">
        Thẩm định: {{ review.reviewer }} — {{ review.credential }} · độ tin cậy {{ review.confidenceScore }}/5 ({{ review.reviewedAt }})
      </p>
      <p class="muted">{{ disclaimer.short }}</p>
    </footer>
  </div>
  <div v-else class="empty">Không tìm thấy bài học.</div>
</template>

<style scoped>
.mode-toggle {
  display: flex;
  gap: 0.35rem;
  margin: 0.75rem 0;
  flex-wrap: wrap;
}

.mode-btn {
  min-height: var(--min-tap-target, 44px);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--border-medium, rgba(255, 255, 255, 0.16));
  background: var(--bg-surface, #14211e);
  color: var(--text-primary, #f0fdf4);
  font-weight: 600;
  cursor: pointer;
}

.mode-btn.active {
  background: var(--accent-primary, #10b981);
  color: var(--accent-ink, #0e1715);
  border-color: var(--accent-primary, #10b981);
}

.next-card-btn {
  margin-top: 0.75rem;
  text-decoration: none;
  text-align: center;
}
</style>

