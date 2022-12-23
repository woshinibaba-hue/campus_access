/**
 * 公用组件config类型以及全局共用类型
 */

/**
 * table column类型
 */
type TableColum<P = any> = {
  prop?: keyof P
  label: string
  width?: number
  isTooltip?: boolean
  slotName?: string
  align?: 'left' | 'center' | 'right'
  format?: string
  isShow?: boolean
}

/**
 * table 配置选项类型声明
 */
type TableConfig<P extends object> = {
  columns: TableColum<P>[]
  stripe?: boolean
  showHeader?: boolean
  height?: number | string
  isSelect?: boolean
  isPaging?: boolean
  pagination?: TPagination
  isShowIndex?: boolean
  isHeader?: boolean
}

// 分页器类型
type TPagination = {
  total: number
  small?: boolean
  pageSizes?: number[]
  layout?: string
}

// 后端返回数据类型(分页查询类型)
type IPaging<T> = {
  data: T
  total: number
  isMove: boolean
}
