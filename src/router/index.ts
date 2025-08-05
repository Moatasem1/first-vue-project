import Tasks from '@/components/tasks.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '', redirect: '/tasks' },
  { path: '/tasks', component: Tasks },
  { path: '/:pathMatch(.*)*', redirect: '/tasks' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
