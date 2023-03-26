export default {
  path: '/health',
  name: 'health',
  meta: {
    name: '健康登记'
  },
  component: () => import('@/views/My/health/health.vue')
}
