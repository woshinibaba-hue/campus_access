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

export function getMenuList(params: Partial<IPage & Menu>) {
  return request.get<IPaging<Menu[]>>({
    url: '/menu',
    params
  })
}

export function createMenu(data: Menu) {
  return request.post({
    url: '/menu',
    data
  })
}

export function deleteMenu(id: number) {
  return request.delete({
    url: `/menu/${id}`
  })
}

export const editMenuById = (data: Menu) => {
  return request.patch({
    url: `/menu/${data.id}`,
    data
  })
}
