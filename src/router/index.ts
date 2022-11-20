import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/whole',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/users/users.vue')
      },
      {
        path: '/whole',
        name: 'whole',
        component: () => import('@/views/whole/whole.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
