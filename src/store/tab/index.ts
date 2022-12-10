import { RouteRecordRaw } from 'vue-router'

export const useTabs = defineStore('tabs', () => {
  const state = reactive<{
    tabsRouter: RouteRecordRaw[]
    activeIndex: number
  }>({
    tabsRouter: [],
    activeIndex: 0
  })

  return {
    state
  }
})
