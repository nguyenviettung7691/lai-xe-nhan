<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAppStore } from './stores/app'

const store = useAppStore()
const route = useRoute()
const title = computed(() => route.path === '/' ? 'Hôm nay lái nhàn hơn' : route.path.includes('lights') ? 'Đèn cảnh báo' : route.path.includes('checklist') ? 'Checklist an toàn' : 'Kho bài học')
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink to="/" class="brand"><span class="brand-mark">↗</span><span>Lái Xe <b>Nhàn</b></span></RouterLink>
      <div class="top-actions">
        <span class="status" :class="{ offline: !store.isOnline }"><i />{{ store.isOnline ? 'Đang online' : 'Ngoại tuyến' }}</span>
        <button class="icon-button" :aria-label="store.theme === 'dark' ? 'Chuyển sang sáng' : 'Chuyển sang tối'" @click="store.toggleTheme">{{ store.theme === 'dark' ? '☼' : '☾' }}</button>
      </div>
    </header>
    <main class="page">
      <div v-if="route.path !== '/'" class="page-heading"><p class="eyebrow">LÁI XE NHÀN</p><h1>{{ title }}</h1></div>
      <RouterView />
    </main>
    <nav class="bottom-nav" aria-label="Điều hướng chính">
      <RouterLink to="/" :class="{ active: route.path === '/' }"><span>⌂</span>Trang chủ</RouterLink>
      <RouterLink to="/topics" :class="{ active: route.path.startsWith('/topics') || route.path.startsWith('/lessons') }"><span>▦</span>Chuyên đề</RouterLink>
      <RouterLink to="/checklist" :class="{ active: route.path === '/checklist' }"><span>✓</span>Checklist</RouterLink>
      <RouterLink to="/lights" :class="{ active: route.path === '/lights' }"><span>!</span>Đèn xe</RouterLink>
    </nav>
  </div>
</template>
