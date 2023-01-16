import request from '@/server'

export type Menu = {
  name: string
  url: string | null
  icon?: string
  parentId?: number
  type: number
  permission?: string
  parent: Menu | null
} & TBase

export function getMenuList(params: IPage) {
  return request.get<IPaging<Menu[]>>({
    url: '/menu',
    params
  })
}
