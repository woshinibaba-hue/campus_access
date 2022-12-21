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
        meta: {
          name: '首页'
        },
        component: () => import('@/views/home/home.vue')
      },
      {
        path: '/range',
        name: 'range',
        meta: {
          name: '打卡范围'
        },
        component: () => import('@/views/system/range/range.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          name: '用户管理'
        },
        component: () => import('@/views/system/users/users.vue')
      },
      {
        path: '/whole',
        name: 'whole',
        meta: {
          name: '全国疫情消息'
        },
        component: () => import('@/views/whole/whole.vue')
      },
      {
        path: '/entering',
        name: 'entering',
        meta: {
          name: '健康信息录入'
        },
        component: () => import('@/views/health/entering/entering.vue')
      },
      {
        path: '/punch',
        name: 'punch',
        meta: {
          name: '每日健康打卡'
        },
        component: () => import('@/views/appear/punch/punch.vue')
      },
      {
        path: '/inform',
        name: 'inform',
        meta: {
          name: '校园疫情通知'
        },
        component: () => import('@/views/appear/inform/inform.vue')
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
