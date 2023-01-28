export default {
  path: '/punch',
  name: 'punch',
  meta: {
    name: '每日健康打卡'
  },
  component: () => import('@/views/appear/punch/punch.vue')
}
