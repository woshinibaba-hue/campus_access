import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
