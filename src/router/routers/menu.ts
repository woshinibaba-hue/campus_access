export default {
  path: '/menu',
  name: 'menu',
  meta: {
    name: '菜单管理'
  },
  component: () => import('@/views/system/menu/menu.vue')
}
