<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checklists, disclaimer } from '../content'
import { useAppStore } from '../stores/app'
import { formatDuration } from '../services/checklist'
import type { ChecklistScope } from '../types'

const store = useAppStore()
const route = useRoute()
const router = useRouter()

const isChecklistId = (value: unknown): value is ChecklistScope =>
  typeof value === 'string' && checklists.some((checklist) => checklist.id === value)

const active = computed({
  get: () => (isChecklistId(route.query.scope) ? route.query.scope : checklists[0].id),
  set: (scope) => router.replace({ query: { ...route.query, scope } })
})

const activeChecklist = computed(
  () => checklists.find((checklist) => checklist.id === active.value) ?? checklists[0]
)
const summary = computed(() => store.progressOf(activeChecklist.value.id))
const lastSession = computed(() => store.lastSessionOf(activeChecklist.value.id))
const history = computed(() =>
  store.checklistHistory.filter((session) => session.scope === activeChecklist.value.id).slice(0, 5)
)

const scopeLabel = (scope: ChecklistScope) =>
  scope === 'pre_drive'
    ? 'MỖI LẦN TRƯỚC KHI LÁI'
    : scope === 'post_park'
    ? 'TRƯỚC KHI RỜI XE'
    : 'DÙNG KHI CẦN'

const doneCount = (id: ChecklistScope) => store.progressOf(id).done

const formatMoment = (iso: string) =>
  new Date(iso).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit'
  })

const reset = () =>
  store.resetChecklist(
    activeChecklist.value.items.map((item) => item.id),
    activeChecklist.value.id
  )
</script>

<template>
  <div class="checklist-view">
    <div class="filters" role="tablist" aria-label="Chọn checklist">
      <button
        v-for="checklist in checklists"
        :key="checklist.id"
        role="tab"
        :aria-selected="active === checklist.id"
        :class="{ selected: active === checklist.id }"
        @click="active = checklist.id"
      >
        {{ checklist.title }}
        <b v-if="doneCount(checklist.id) > 0">{{ doneCount(checklist.id) }}</b>
      </button>
    </div>

    <section class="checklist-card">
      <div class="checklist-top">
        <div>
          <p class="eyebrow">{{ scopeLabel(activeChecklist.scope) }}</p>
          <h2>{{ activeChecklist.title }}</h2>
        </div>
        <div class="completion">
          <b>{{ summary.done }}</b>
          <span>/ {{ summary.total }}</span>
        </div>
      </div>
      <p class="muted">{{ activeChecklist.description }}</p>

      <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="summary.done"
        aria-valuemin="0"
        :aria-valuemax="summary.total"
        :aria-label="`${summary.done} trên ${summary.total} mục hoàn tất`"
      >
        <span :style="{ '--progress': `${summary.ratio}` }" />
      </div>
      <p class="progress-caption" aria-live="polite">
        <template v-if="summary.isComplete">✓ Hoàn tất {{ summary.total }}/{{ summary.total }} mục — sẵn sàng lăn bánh.</template>
        <template v-else>{{ summary.done }}/{{ summary.total }} mục hoàn tất<span v-if="summary.missingMust.length"> · còn {{ summary.missingMust.length }} mục bắt buộc</span></template>
      </p>

      <label v-for="item in activeChecklist.items" :key="item.id" class="check-row">
        <input
          type="checkbox"
          :checked="store.checked[item.id]"
          @change="store.toggleCheck(item.id, activeChecklist.id)"
        />
        <span class="fake-check">✓</span>
        <span>
          {{ item.label }}
          <small v-if="item.criticalLevel === 'must'" class="must-tag">bắt buộc</small>
          <small v-if="item.hint" class="cue">{{ item.hint }}</small>
        </span>
      </label>

      <div class="checklist-actions">
        <button class="text-button" @click="reset">↻ Đặt lại checklist</button>
        <span class="offline-hint muted">
          {{ store.isOnline ? 'Đã lưu trên máy · sẽ đồng bộ khi đăng nhập' : 'Đang offline · đã lưu trên máy' }}
        </span>
      </div>
    </section>

    <section class="checklist-card history-card">
      <h3>Lịch sử hoàn tất</h3>
      <p v-if="lastSession" class="muted">
        Gần nhất: {{ formatMoment(lastSession.completedAt) }} · {{ formatDuration(lastSession.durationMs) }}
      </p>
      <p v-else class="muted">Chưa có lượt nào hoàn tất. Tick đủ các mục để lưu lại thói quen.</p>
      <ul v-if="history.length" class="history-list">
        <li v-for="session in history" :key="session.id">
          <span>{{ formatMoment(session.completedAt) }}</span>
          <b>{{ session.completedItems }}/{{ session.totalItems }}</b>
          <small>{{ formatDuration(session.durationMs) }}</small>
        </li>
      </ul>
    </section>

    <p class="content-meta muted">{{ disclaimer.short }}</p>
  </div>
</template>

<style scoped>
.progress-caption {
  margin: 10px 0 4px;
  font-size: 13px;
  color: var(--muted);
}

.checklist-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.offline-hint {
  font-size: 11px;
}

.filters button b {
  margin-left: 6px;
  font-size: 11px;
}

.history-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.history-list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.history-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--surface-2);
  font-size: 13px;
}

.history-list b {
  margin-left: auto;
  color: var(--accent);
}

.history-list small {
  color: var(--muted);
  font-size: 12px;
}
</style>
