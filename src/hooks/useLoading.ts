import type { IDataResult } from '@/server/request/type'

/**
 *
 * @param fn 请求函数
 * @returns isLoading loading状态 data 请求数据
 */
export default function <T = unknown>(fn: () => Promise<IDataResult<T>>) {
  const isLoading = ref(true)
  const data = ref<T>()

  fn().then((res) => {
    isLoading.value = false
    data.value = res.data
  })

  return {
    isLoading,
    data
  }
}
