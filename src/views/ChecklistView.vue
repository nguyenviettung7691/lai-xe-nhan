<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checklists, disclaimer } from '../content'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const route = useRoute()
const router = useRouter()
const isChecklistId = (value: unknown): value is typeof checklists[number]['id'] =>
  typeof value === 'string' && checklists.some((checklist) => checklist.id === value)

const active = computed({
  get: () => (isChecklistId(route.query.scope) ? route.query.scope : checklists[0].id),
  set: (scope) => router.replace({ query: { ...route.query, scope } })
})

const doneCount = (id: string) => {
  const checklist = checklists.find((item) => item.id === id)
  return checklist ? checklist.items.filter((item) => store.checked[item.id]).length : 0
}
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
      </button>
    </div>

    <section
      v-for="checklist in checklists"
      v-show="active === checklist.id"
      :key="checklist.id"
      class="checklist-card"
    >
      <div class="checklist-top">
        <div>
          <p class="eyebrow">
            {{ checklist.scope === 'pre_drive' ? 'MỖI LẦN TRƯỚC KHI LÁI' : 'DÙNG KHI CẦN' }}
          </p>
          <h2>{{ checklist.title }}</h2>
        </div>
        <div class="completion">
          <b>{{ doneCount(checklist.id) }}</b>
          <span>/ {{ checklist.items.length }}</span>
        </div>
      </div>
      <p class="muted">{{ checklist.description }}</p>
      <div class="progress-track">
        <span :style="{ '--progress': `${doneCount(checklist.id) / checklist.items.length}` }" />
      </div>
      <label v-for="item in checklist.items" :key="item.id" class="check-row">
        <input
          type="checkbox"
          :checked="store.checked[item.id]"
          @change="store.toggleCheck(item.id, checklist.id)"
        />
        <span class="fake-check">✓</span>
        <span>
          {{ item.label }}
          <small v-if="item.criticalLevel === 'must'" class="must-tag">bắt buộc</small>
          <small v-if="item.hint" class="cue">{{ item.hint }}</small>
        </span>
      </label>
      <button
        class="text-button"
        @click="store.resetChecklist(checklist.items.map((item) => item.id), checklist.id)"
      >
        ↻ Đặt lại checklist
      </button>
    </section>

    <p class="content-meta muted">{{ disclaimer.short }}</p>
  </div>
</template>

