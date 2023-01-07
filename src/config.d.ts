/**
 * 公用组件config类型以及全局公用类型
 */

/**
 * 将泛型T转换为 T 或者 T数组类型
 */
type Arrayable<T> = T | T[]

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
  isLoading?: boolean
}

/**
 * form 配置选项类型
 */

type Type = 'input' | 'password' | 'select' | 'textarea'

type TFromItem<K = any> = {
  field: keyof OmitBase<K>
  type: Type
  lable: string
  placeholder?: string
  options?: { label: string; value: string | number }[]
  isHide?: boolean
  isDisabled?: boolean
  rows?: number
}

type FormConfig<K = any> = {
  columns: TFromItem<K>[]
  rules?: Partial<
    Record<keyof OmitBase<K>, Arrayable<import('element-plus').FormItemRule>>
  >
  labelWidth?: string
  submitText?: string
  clearText?: string
  isAction?: boolean
  actionplace?: 'center' | 'start' | 'end'
}

/**
 * dialog 配置类型
 */

type DialogType = {
  form?: FormConfig
  closeText?: string
  submitText?: string
  title?: string
  width?: string
  isFooter?: boolean
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

type IPage = {
  page: number
  limit: number
}

/**
 * 基础类型
 */
type TBase = {
  id: number
  createAt: string
  updateAt: string
}

/**
 * 剔除基础类型
 */
type OmitBase<T> = Partial<Omit<T, keyof TBase>>

type ReturnTypeNotPromist<F extends Function> = any
