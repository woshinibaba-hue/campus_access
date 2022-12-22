/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs'

// table 配置选项类型声明
type TableConfig = {
  columns: {
    prop: string
    label: string
    width?: number
    isTooltip?: boolean
    slotName?: string
    align?: 'left' | 'center' | 'right'
    format?: string
  }[]
  stripe?: boolean
  showHeader?: boolean
  height?: number | string
  isSelect?: boolean
  isPaging?: boolean
  pagination?: TPagination
}

// 分页器类型
type TPagination = {
  total: number
  small?: boolean
  pageSizes?: number[]
  layout?: string
}

// 后端返回数据类型(分页查询)
type IDataRes<T> = {
  data: T
  total: number
  isMove: boolean
}
