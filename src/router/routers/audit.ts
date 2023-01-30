export default {
  path: '/audit',
  name: 'audit',
  meta: {
    name: '请假审核'
  },
  component: () => import('@/views/system/audit/audit.vue')
}
