import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/topics', component: () => import('./views/TopicsView.vue') },
    { path: '/topics/:id', component: () => import('./views/TopicView.vue') },
    { path: '/lessons/:id', component: () => import('./views/LessonView.vue') },
    { path: '/checklist', component: () => import('./views/ChecklistView.vue') },
    { path: '/lights', component: () => import('./views/LightsView.vue') },
    { path: '/review', component: () => import('./views/ReviewView.vue') },
    { path: '/learning-path', component: () => import('./views/LearningPathView.vue') }
  ],
  scrollBehavior: () => ({ top: 0 })
})
