export default {
  path: '/user',
  name: 'user',
  meta: {
    name: '用户管理'
  },
  component: () => import('@/views/system/users/users.vue')
}
