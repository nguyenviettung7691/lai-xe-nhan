<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  findLights,
  LIGHT_COLOR_LABEL,
  SEVERITY_LABEL,
  SEVERITY_SHORT_LABEL
} from '../content'
import { analytics } from '../services/analytics'
import type { DashboardLight, LightColor, Severity } from '../types'

const query = ref('')
const severity = ref<Severity | 'all'>('all')
const color = ref<LightColor | 'all'>('all')
const selected = ref<DashboardLight | null>(null)
const dialog = ref<HTMLElement | null>(null)
const previouslyFocused = ref<HTMLElement | null>(null)

const severityFilters: { value: Severity | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'critical', label: 'Khẩn cấp' },
  { value: 'warn', label: 'Cảnh báo' },
  { value: 'info', label: 'Theo dõi' }
]

const colorFilters: { value: LightColor | 'all'; label: string }[] = [
  { value: 'all', label: 'Mọi màu' },
  { value: 'red', label: 'Đỏ' },
  { value: 'amber', label: 'Vàng' },
  { value: 'green', label: 'Xanh' }
]

const filtered = computed(() =>
  findLights({ query: query.value, severity: severity.value, color: color.value })
)

let searchTimer: ReturnType<typeof setTimeout> | null = null

// Gom nhiều lần gõ thành một sự kiện để không làm nhiễu số liệu tra cứu.
watch(query, (value) => {
  if (searchTimer) clearTimeout(searchTimer)
  const keyword = value.trim()
  if (!keyword) return
  searchTimer = setTimeout(() => {
    analytics.track('light_search_used', { keyword, results: filtered.value.length })
  }, 600)
})

const openLight = (light: DashboardLight) => {
  previouslyFocused.value = document.activeElement instanceof HTMLElement ? document.activeElement : null
  selected.value = light
  analytics.track('light_detail_viewed', {
    lightId: light.id,
    severity: light.severity,
    color: light.color,
    fromSearch: query.value.trim().length > 0
  })
}

watch(selected, async (light) => {
  if (light) {
    await nextTick()
    dialog.value?.focus()
  }
})

const acknowledge = () => {
  if (selected.value) {
    analytics.track('light_action_acknowledged', { lightId: selected.value.id })
  }
  selected.value = null
  previouslyFocused.value?.focus()
  previouslyFocused.value = null
}

const setSeverity = (value: Severity | 'all') => {
  severity.value = value
  analytics.track('light_search_used', { filter: 'severity', value, results: filtered.value.length })
}

const setColor = (value: LightColor | 'all') => {
  color.value = value
  analytics.track('light_search_used', { filter: 'color', value, results: filtered.value.length })
}
</script>

<template>
  <div class="lights-view">
    <p class="muted">Chạm vào biểu tượng đang sáng trên táp-lô để biết ngay việc cần làm.</p>

    <input
      v-model="query"
      class="search"
      type="search"
      aria-label="Tìm đèn cảnh báo theo từ khóa"
      placeholder="⌕  Tìm đèn: phanh, động cơ, ắc quy..."
    />

    <div class="filters" role="group" aria-label="Lọc theo mức độ">
      <button
        v-for="item in severityFilters"
        :key="item.value"
        :class="{ selected: severity === item.value }"
        :aria-pressed="severity === item.value"
        @click="setSeverity(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="filters" role="group" aria-label="Lọc theo màu đèn">
      <button
        v-for="item in colorFilters"
        :key="item.value"
        :class="{ selected: color === item.value }"
        :aria-pressed="color === item.value"
        @click="setColor(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <p class="result-count muted" aria-live="polite">{{ filtered.length }} đèn phù hợp</p>

    <div class="light-grid">
      <button
        v-for="light in filtered"
        :key="light.id"
        class="light-card"
        @click="openLight(light)"
      >
        <span class="light-symbol" :class="[light.severity, `color-${light.color}`]" aria-hidden="true">
          {{ light.icon }}
        </span>
        <strong>{{ light.name }}</strong>
        <small>{{ light.english }}</small>
        <span class="severity-label" :class="light.severity">
          {{ SEVERITY_SHORT_LABEL[light.severity] }} · {{ LIGHT_COLOR_LABEL[light.color] }}
        </span>
      </button>
    </div>

    <p v-if="filtered.length === 0" class="empty">
      Không tìm thấy đèn phù hợp. Thử từ khóa ngắn hơn như “phanh”, “lốp”, “dầu”.
    </p>

    <div v-if="selected" class="modal-backdrop" @click.self="acknowledge" @keydown.esc="acknowledge">
      <article
        ref="dialog"
        class="light-detail"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :aria-label="selected.name"
      >
        <button class="close" aria-label="Đóng" @click="acknowledge">×</button>
        <span class="light-symbol large" :class="[selected.severity, `color-${selected.color}`]" aria-hidden="true">
          {{ selected.icon }}
        </span>
        <p class="eyebrow">{{ selected.english.toUpperCase() }}</p>
        <h2>{{ selected.name }}</h2>
        <p class="severity-banner" :class="selected.severity">
          {{ SEVERITY_LABEL[selected.severity] }} · {{ LIGHT_COLOR_LABEL[selected.color] }}
        </p>

        <h3>Việc cần làm ngay</h3>
        <ol>
          <li v-for="action in selected.actions" :key="action">{{ action }}</li>
        </ol>

        <p class="light-desc">{{ selected.description }}</p>

        <div class="safety">
          <strong>Không nên</strong>
          <p>{{ selected.avoid }}</p>
        </div>

        <div class="call-help">
          <strong>Khi nào gọi cứu hộ / vào gara</strong>
          <p>{{ selected.callHelp }}</p>
        </div>

        <button class="button primary full" @click="acknowledge">Đã hiểu, đóng</button>
      </article>
    </div>
  </div>
</template>

<style scoped>
.result-count {
  font-size: 12px;
  margin: 0 0 12px;
}

.severity-banner {
  display: inline-block;
  margin: 0 0 14px;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  background: var(--status-warn-bg, rgba(245, 158, 11, 0.15));
  color: var(--status-warn-border, #fbbf24);
}

.severity-banner.critical {
  background: var(--status-critical-bg, rgba(239, 68, 68, 0.15));
  color: var(--status-critical-border, #f87171);
}

.severity-banner.info {
  background: var(--status-info-bg, rgba(59, 130, 246, 0.15));
  color: var(--status-info-border, #60a5fa);
}

.light-desc {
  margin-top: 16px;
}

.call-help {
  margin-top: 12px;
  padding: 14px;
  border-radius: 13px;
  border: 1px solid var(--line);
}

.call-help strong {
  font-size: 13px;
}

.call-help p {
  margin: 7px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted);
}

.light-detail .button.full {
  margin-top: 18px;
}
</style>
