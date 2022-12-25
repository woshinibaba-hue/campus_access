import type { IDataResult } from '@/server/request/type'

/**
 *
 * @param fn 请求函数
 * @returns isLoading loading状态 data 请求数据
 */
type P = Record<string, any>

export default function <T = unknown>(
  fn: (params?: P) => Promise<IDataResult<T>>,
  options?: {
    params?: P
    after?: (data: T) => void
  }
) {
  const isLoading = ref(true)
  const data = ref<T>()

  fn(options?.params).then((res) => {
    isLoading.value = false
    options?.after?.(res.data)
    data.value = res.data
  })

  return {
    isLoading,
    data
  }
}
