import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import StartScreenView from '@/views/StartScreenView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartScreenView,
    },
    {
      path: '/story',
      name: 'story',
      component: () => import('../views/StoryView.vue'),
    },
  ],
})

export default router
