import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/view/Home/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/view/About/about.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
