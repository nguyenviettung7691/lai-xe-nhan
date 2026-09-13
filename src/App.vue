<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAppStore } from './stores/app'
import { THEME_LABEL } from './services/theme'
import SyncStatusBadge from './features/auth/SyncStatusBadge.vue'
import AuthModal from './features/auth/AuthModal.vue'

const store = useAppStore()
const route = useRoute()
const showAuthModal = ref(false)

const themeIcon = computed(() =>
  store.themePreference === 'system' ? '◑' : store.themePreference === 'dark' ? '☾' : '☼'
)

const themeLabel = computed(() => `Giao diện: ${THEME_LABEL[store.themePreference]}`)

const title = computed(() =>
  route.path === '/'
    ? 'Hôm nay lái nhàn hơn'
    : route.path.includes('lights')
    ? 'Đèn cảnh báo'
    : route.path.includes('checklist')
    ? 'Checklist an toàn'
    : route.path.includes('review')
    ? 'Ôn tập ngắt quãng'
    : route.path.includes('learning-path')
    ? 'Lộ trình học'
    : 'Kho bài học'
)
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">↗</span>
        <span>Lái Xe <b>Nhàn</b></span>
      </RouterLink>
      <div class="top-actions">
        <SyncStatusBadge
          :state="store.syncState"
          :is-online="store.isOnline"
          @click="showAuthModal = true"
        />
        <button
          class="icon-button"
          :title="themeLabel"
          :aria-label="`${themeLabel}. Chạm để đổi.`"
          @click="store.toggleTheme"
        >
          {{ themeIcon }}
        </button>
        <button
          class="icon-button"
          :class="{ active: store.isHighContrast }"
          :aria-pressed="store.isHighContrast"
          :title="store.isHighContrast ? 'Tắt tương phản cao' : 'Bật tương phản cao'"
          aria-label="Chế độ tương phản cao"
          @click="store.toggleContrast"
        >
          ◐
        </button>
      </div>
    </header>

    <main class="page">
      <div v-if="route.path !== '/'" class="page-heading">
        <p class="eyebrow">LÁI XE NHÀN</p>
        <h1>{{ title }}</h1>
      </div>
      <RouterView />
    </main>

    <nav class="bottom-nav" aria-label="Điều hướng chính">
      <RouterLink to="/" :class="{ active: route.path === '/' }">
        <span>⌂</span>Trang chủ
      </RouterLink>
      <RouterLink
        to="/topics"
        :class="{ active: route.path.startsWith('/topics') || route.path.startsWith('/lessons') }"
      >
        <span>▦</span>Chuyên đề
      </RouterLink>
      <RouterLink to="/checklist" :class="{ active: route.path === '/checklist' }">
        <span>✓</span>Checklist
      </RouterLink>
      <RouterLink to="/review" :class="{ active: route.path === '/review' }">
        <span>⟳</span>Ôn tập
        <sup v-if="store.dueReviewCards.length > 0" class="nav-badge">{{ store.dueReviewCards.length }}</sup>
      </RouterLink>
      <RouterLink to="/lights" :class="{ active: route.path === '/lights' }">
        <span>!</span>Đèn xe
      </RouterLink>
    </nav>

    <!-- Auth & Sync Management Dialog -->
    <AuthModal
      :show="showAuthModal"
      :sync-state="store.syncState"
      :is-online="store.isOnline"
      @close="showAuthModal = false"
      @synced="showAuthModal = false"
    />
  </div>
</template>

