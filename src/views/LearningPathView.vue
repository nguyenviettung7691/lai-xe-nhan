<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getTopicById, learningPaths } from '../content'
import { useAppStore } from '../stores/app'
import type { ExperienceLevel } from '../types'

const store = useAppStore()

const selectLevel = (level: ExperienceLevel) => store.setExperienceLevel(level)

const pathTopics = (topicOrder: string[]) =>
  topicOrder.map((id) => getTopicById(id)).filter((topic): topic is NonNullable<typeof topic> => Boolean(topic))

const activeLevel = computed(() => store.experienceLevel)
</script>

<template>
  <div class="learning-path-view">
    <div class="path-list">
      <article
        v-for="path in learningPaths"
        :key="path.level"
        class="path-card"
        :class="{ active: activeLevel === path.level }"
      >
        <div class="section-head">
          <div>
            <p class="eyebrow">{{ path.title }}</p>
            <h2>{{ path.goal }}</h2>
          </div>
          <button
            type="button"
            class="button"
            :class="activeLevel === path.level ? 'primary' : 'secondary'"
            @click="selectLevel(path.level)"
          >
            {{ activeLevel === path.level ? '✓ Đang theo' : 'Chọn lộ trình này' }}
          </button>
        </div>
        <p class="muted">{{ path.summary }}</p>
        <ol class="path-topics">
          <li v-for="(topic, index) in pathTopics(path.topicOrder)" :key="topic.id">
            <RouterLink :to="`/topics/${topic.id}`">
              <span class="lesson-index">0{{ index + 1 }}</span>
              <span>{{ topic.title }}</span>
            </RouterLink>
          </li>
        </ol>
      </article>
    </div>
  </div>
</template>

<style scoped>
.path-list {
  display: grid;
  gap: 1rem;
}

.path-card {
  background: var(--surface, #14211e);
  border-radius: 20px;
  padding: 22px;
  border: 1px solid transparent;
}

.path-card.active {
  border-color: var(--accent, #10b981);
}

.path-topics {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.path-topics a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.8rem;
  border-radius: 12px;
  background: var(--surface-2, #1b2c28);
}
</style>
