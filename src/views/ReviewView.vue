<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getCardById } from '../content'
import { useAppStore } from '../stores/app'
import type { Card, ReviewScheduleEntry } from '../types'

const store = useAppStore()

interface DueItem {
  entry: ReviewScheduleEntry
  card: Card
}

const dueCards = computed<DueItem[]>(() => {
  const items: DueItem[] = []
  for (const entry of store.dueReviewCards) {
    const card = getCardById(entry.cardId)
    if (card) items.push({ entry, card })
  }
  return items
})

const formatDue = (iso: string) => new Date(iso).toLocaleDateString('vi-VN')
</script>

<template>
  <div class="review-view">
    <p v-if="dueCards.length === 0" class="empty">
      Chưa có thẻ nào đến hạn ôn lại. Hãy học và làm tự kiểm để hệ thống lên lịch cho bạn.
    </p>

    <div v-else class="lesson-list">
      <RouterLink
        v-for="{ entry, card } in dueCards"
        :key="entry.cardId"
        :to="`/lessons/${card.id}`"
        class="lesson-row"
      >
        <span class="lesson-index">{{ entry.stage }}</span>
        <div>
          <h2>{{ card.title }}</h2>
          <p>Đến hạn: {{ formatDue(entry.dueAt) }}</p>
          <small>{{ entry.lastResult === 'fail' ? 'Lần trước chưa đạt — nên ôn lại sớm' : 'Ôn để giữ chu kỳ ghi nhớ' }}</small>
        </div>
        <span class="lesson-state">→</span>
      </RouterLink>
    </div>
  </div>
</template>
