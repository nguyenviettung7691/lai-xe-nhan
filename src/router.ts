import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import TopicsView from './views/TopicsView.vue'
import TopicView from './views/TopicView.vue'
import LessonView from './views/LessonView.vue'
import ChecklistView from './views/ChecklistView.vue'
import LightsView from './views/LightsView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/topics', component: TopicsView },
    { path: '/topics/:id', component: TopicView },
    { path: '/lessons/:id', component: LessonView },
    { path: '/checklist', component: ChecklistView },
    { path: '/lights', component: LightsView }
  ],
  scrollBehavior: () => ({ top: 0 })
})
