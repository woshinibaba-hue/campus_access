import type { IDataResult } from '@/server/request/type'

/**
 *
 * @param fn 请求函数
 * @returns isLoading loading状态 data 请求数据
 */

export default function <T = unknown>(
  fn: (params?: any) => Promise<IDataResult<T>>,
  options?: {
    after?: (data: T) => void
    pages?: IPage
    otherParams?: Record<string, any> // 其他参数
  }
) {
  const isLoading = ref(true)
  const data = ref<T>()

  const pages = reactive(
    options?.pages ?? {
      limit: 10,
      page: 1
    }
  )

  const getData = async (otherParams: Record<string, any> = {}) => {
    return fn({ ...pages, ...otherParams }).then(res => {
      isLoading.value = false
      options?.after?.(res.data)
      data.value = res.data
    })
  }

  const refresh = useDebounceFn(getData, 300)

  watch(
    () => pages,
    () => {
      getData()
    },
    {
      deep: true,
      immediate: true
    }
  )

  return {
    isLoading,
    data,
    refresh,
    pages
  }
}
