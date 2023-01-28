import type { Menu } from './../../api/menu/index'
import { IUser } from '@/api/login/type'
import storage from '@/utils/storage'
import mapRouters from '@/utils/mapRouters'

export const useUser = defineStore('user', () => {
  const user = ref<IUser | null>(storage.get('user'))
  const menuList = ref<Menu[]>(storage.get('menuList') ?? [])

  const router = useRouter()

  const login = async (data: any) => {
    const res = await userLogin(data)

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

    user.value = res.data
    storage.set('user', res.data)
    router.push('/')
    ElNotification({
      message: '登录成功',
      type: 'success'
    })
  }

  const logout = () => {
    user.value = null
    menuList.value = []
    storage.remove('user')
    storage.remove('menuList')
    router.push('/login')
  }

  return {
    user,
    login,
    logout,
    menuList
  }
})
