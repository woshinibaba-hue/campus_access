import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/whole',
    meta: {
      init: true
    },
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          name: '首页',
          init: true
        },
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/404',
        name: '404',
        meta: {
          init: true
        },
        component: () => import('@/views/404/404.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      init: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      init: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
