import { Menu } from '@/api/menu'
import storage from '@/utils/storage'
import mapRouters from '@/utils/mapRouters'

export const useMenu = defineStore('menu', () => {
  const menuList = ref<Menu[]>(storage.get('menuList') ?? [])
  const router = useRouter()
  router.push('/')

  const initMenu = async () => {
    const menus = await getMenuList({ page: 1, limit: 500 })

    const routers = import.meta.glob('@/router/routers/*.ts')
    const routerList: any[] = []

    for (const r in routers) {
      const res: any = await routers[r]()
      routerList.push(res.default)
      router.addRoute('Layout', res.default)
    }

    const m = mapRouters.transformTreeData(menus.data.data)

    menuList.value = m
    storage.set('menuList', m)
  }

  return {
    initMenu,
    menuList
  }
})
