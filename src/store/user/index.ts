import { IUser } from '@/api/login/type'
import storage from '@/utils/storage'

export const useUser = defineStore('user', () => {
  const user = ref<IUser | null>(storage.get('user'))

  const router = useRouter()

  const menu = useMenu()
  const { state } = storeToRefs(useTabs())

  const login = async (data: any) => {
    const res = await userLogin(data)

    menu.initMenu(res.data.rolesId)

    user.value = res.data
    storage.set('user', res.data)
    ElNotification({
      message: '登录成功',
      type: 'success'
    })
  }

  const logout = async () => {
    await userLogout(user.value)
    user.value = null
    state.value.activeIndex = 0
    state.value.tabsRouter = []
    storage.remove('user')
    storage.remove('menuList')
    storage.remove('permissionList')
    router.push('/login')
  }

  return {
    user,
    login,
    logout
  }
})
