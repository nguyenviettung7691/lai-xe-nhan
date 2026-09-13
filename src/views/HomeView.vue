<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { publishedCards, topics } from '../content'
import { useAppStore } from '../stores/app'

const store = useAppStore()
const total = computed(() => publishedCards.length)
const firstCard = topics[0].lessons[0].cards[0]
const cardCount = (topic: (typeof topics)[number]) => topic.lessons.reduce((sum, lesson) => sum + lesson.cards.length, 0)
</script>

<template>
  <section class="hero">
    <div class="hero-copy"><p class="eyebrow">BÀI TẬP HÔM NAY</p><h1>Lái vững hơn,<br /><em>nhàn đầu hơn.</em></h1><p class="hero-text">Những kỹ năng thực tế được chia nhỏ để bạn học nhanh, nhớ lâu và xử lý bình tĩnh trên mọi cung đường.</p><RouterLink :to="`/lessons/${firstCard.id}`" class="button primary">Bắt đầu học <span>→</span></RouterLink></div>
    <div class="hero-art" aria-hidden="true"><div class="road"><span class="dash one" /><span class="dash two" /><span class="dash three" /></div><div class="car">↗</div><span class="spark">✦</span></div>
  </section>
  <section class="section-head"><div><p class="eyebrow">KHÁM PHÁ</p><h2>Học theo tình huống</h2></div><RouterLink to="/topics" class="text-link">Xem tất cả →</RouterLink></section>
  <div class="topic-grid compact"><RouterLink v-for="topic in topics" :key="topic.id" :to="`/topics/${topic.id}`" class="topic-card" :style="{ '--accent': topic.color }"><span class="topic-icon">{{ topic.icon }}</span><strong>{{ topic.title }}</strong><small>{{ cardCount(topic) }} bài học</small></RouterLink></div>
  <section class="quick-row"><RouterLink to="/checklist" class="quick-card"><span class="quick-icon green">✓</span><div><strong>Checklist trước khi lái</strong><small>Kiểm tra trong 20 giây</small></div><span>→</span></RouterLink><RouterLink to="/lights" class="quick-card"><span class="quick-icon red">!</span><div><strong>Đèn cảnh báo</strong><small>Tra cứu nhanh khi cần</small></div><span>→</span></RouterLink></section>
  <p class="progress-note">Bạn đã hoàn thành <b>{{ store.progress }}</b> / {{ total }} bài học · Nội dung đã sẵn sàng offline.</p>
</template>
