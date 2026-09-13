import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/topics', component: () => import('./views/TopicsView.vue') },
    { path: '/topics/:id', component: () => import('./views/TopicView.vue') },
    { path: '/lessons/:id', component: () => import('./views/LessonView.vue') },
    { path: '/checklist', component: () => import('./views/ChecklistView.vue') },
    { path: '/lights', component: () => import('./views/LightsView.vue') }
  ],
  scrollBehavior: () => ({ top: 0 })
})

