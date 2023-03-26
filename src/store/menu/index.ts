import { Menu } from '@/api/menu'
import storage from '@/utils/storage'
import mapRouters from '@/utils/mapRouters'

export const useMenu = defineStore('menu', () => {
  const router = useRouter()

  const menuList = ref<Menu[]>(storage.get('menuList') ?? [])
  const permissionList = ref<string[]>(storage.get('permissionList') ?? [])

  const initMenu = async (id: number) => {
    router.push('/')
    const menus = await getRoleMenu(id)
    // const menus = await getMenuList({ page: 1, limit: 500 })

    const routerList = await mapRouters.filterRouter(menus.data.menu!, 'menuId')

    router.getRoutes().forEach(r => {
      if (!r.meta.init) {
        router.removeRoute(r.name!)
      }
    })

    routerList.forEach(r => router.addRoute('Layout', r))

    const m = mapRouters.transformTreeData(menus.data.menu!, 'menuId')

    const permission = mapRouters.getPermission(m)

    menuList.value = m
    permissionList.value = permission
    storage.set('menuList', m)
    storage.set('permissionList', permissionList)
  }

  return {
    initMenu,
    menuList,
    permissionList
  }
})
