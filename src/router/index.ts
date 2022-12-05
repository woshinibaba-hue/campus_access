import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/whole',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/range',
        name: 'range',
        component: () => import('@/views/range/range.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/users/users.vue')
      },
      {
        path: '/whole',
        name: 'whole',
        component: () => import('@/views/whole/whole.vue')
      },
      {
        path: '/entering',
        name: 'entering',
        component: () => import('@/views/health/entering/entering.vue')
      },
      {
        path: '/punch',
        name: 'punch',
        component: () => import('@/views/health/punch/punch.vue')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/404.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
