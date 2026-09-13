<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { topics } from '../content'

const cardCount = (topic: (typeof topics)[number]) => topic.lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0)
</script>

<template>
  <div class="topics-page">
    <RouterLink to="/learning-path" class="text-link learning-path-link">🧭 Chọn lộ trình học theo kinh nghiệm →</RouterLink>
    <div class="topic-grid">
      <RouterLink v-for="(topic, index) in topics" :key="topic.id" :to="`/topics/${topic.id}`" class="topic-card large" :style="{ '--accent': topic.color }">
        <span class="topic-number">0{{ index + 1 }}</span>
        <span class="topic-icon">{{ topic.icon }}</span>
        <h2>{{ topic.title }}</h2>
        <p>{{ topic.description }}</p>
        <small>{{ cardCount(topic) }} bài học · 3–5 phút/bài</small>
        <span class="card-arrow">↗</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.learning-path-link {
  display: inline-block;
  margin-bottom: 16px;
}
</style>

