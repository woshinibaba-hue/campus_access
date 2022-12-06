import { userLogin } from '@/api/login'
import { IUser } from '@/api/login/type'
import storage from '@/utils/storage'

export const useUser = defineStore('user', () => {
  const user = ref<IUser | null>(storage.get('user'))

  const router = useRouter()

  const login = async (data: any) => {
    const res = await userLogin(data)
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
    storage.remove('user')
    router.push('/login')
  }

  return {
    user,
    login,
    logout
  }
})
