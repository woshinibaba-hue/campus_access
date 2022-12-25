import type { IDataResult } from '@/server/request/type'

/**
 *
 * @param fn 请求函数
 * @returns isLoading loading状态 data 请求数据
 */

export default function <T = unknown>(
  fn: (params?: Record<string, any>) => Promise<IDataResult<T>>,
  options?: {
    after?: (data: T) => void
  }
) {
  const isLoading = ref(true)
  const data = ref<T>()

  const pages = reactive({
    limit: 1,
    page: 1
  })

  const getData = () =>
    fn(pages).then((res) => {
      isLoading.value = false
      options?.after?.(res.data)
      data.value = res.data
    })

  const refresh = () => getData()

  // 利用watch监听参数变化，之后重新请求数据
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
