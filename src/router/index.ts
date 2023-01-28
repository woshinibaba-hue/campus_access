import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          name: '首页'
        },
        component: () => import('@/views/home/home.vue')
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
