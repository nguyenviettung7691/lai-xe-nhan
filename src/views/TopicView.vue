<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getLessonMastery, topics } from '../content'
import { useAppStore } from '../stores/app'

const route = useRoute()
const store = useAppStore()
const topic = computed(() => topics.find(item => item.id === route.params.id))
const riskLabel = (risk: string) => (risk === 'high' ? 'Cần chú ý' : risk === 'medium' ? 'Thực hành' : 'Cơ bản')
const mastery = (lessonId: string) => {
  const lesson = topic.value?.lessons.find(item => item.id === lessonId)
  if (!lesson) return { achieved: false, completedRatio: 0, quickCheckRatio: 0 }
  return getLessonMastery(lesson, store.completed, store.passedCardIds)
}
</script>

<template>
  <div v-if="topic" class="topic-detail">
    <div class="topic-intro" :style="{ '--accent': topic.color }"><span class="topic-icon">{{ topic.icon }}</span><p>{{ topic.description }}</p></div>
    <section v-for="lesson in topic.lessons" :key="lesson.id" class="lesson-group">
      <div class="section-head">
        <div><p class="eyebrow">{{ lesson.cards.length }} THẺ · {{ lesson.estMinutes }} PHÚT</p><h2>{{ lesson.title }}</h2></div>
        <span v-if="mastery(lesson.id).achieved" class="mastery-badge" title="Đã hoàn thành ≥80% thẻ và ≥70% tự kiểm">🏅 Đạt module</span>
      </div>
      <p class="muted">{{ lesson.summary }}</p>
      <div class="lesson-list">
        <RouterLink v-for="(card, index) in lesson.cards" :key="card.id" :to="`/lessons/${card.id}`" class="lesson-row">
          <span class="lesson-index">0{{ index + 1 }}</span>
          <div>
            <h2>{{ card.title }}</h2>
            <p>{{ card.objective }}</p>
            <small><span class="risk" :class="card.risk">{{ riskLabel(card.risk) }}</span> · {{ card.minutes }} phút · {{ card.steps.length }} bước</small>
          </div>
          <span class="lesson-state">{{ store.completed.includes(card.id) ? '✓' : '→' }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
  <div v-else class="empty">Không tìm thấy chuyên đề.</div>
</template>

<style scoped>
.mastery-badge {
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: 700;
  color: var(--status-success, #22c55e);
  white-space: nowrap;
}
</style>

