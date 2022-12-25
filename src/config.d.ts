/**
 * 公用组件config类型以及全局公用类型
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
  field?: string
  align?: 'left' | 'center' | 'right'
  format?: string
  isShow?: boolean
  isFixed?: boolean | 'right' | 'left'
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
  isAdd?: boolean
  size?: 'small' | 'large' | 'default'
}

/**
 * 分页器类型
 *
 * layout 参考自element-plus
 */
type TPagination = {
  total?: number
  small?: boolean
  pageSizes?: number[]
  layout?: string
  page?: number
  limit?: number
}

// 后端返回数据类型(分页查询类型)
type IPaging<T> = {
  data: T
  total: number
  isMove: boolean
}

/**
 * 基础类型
 */
type TBase = {
  id: number
  createAt: string
  updateAt: string
}
