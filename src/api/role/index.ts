import request from '@/server'

import type { Menu } from '@/api/menu'

export type TRole = {
  name: string
  intro: string
  menu?: Menu[]
  menuList?: number[]
} & TBase

export function getRole(params: IPage) {
  return request.get<IPaging<TRole[]>>({
    url: '/role',
    params
  })
}

export function createRole(data: TRole) {
  return request.post({
    url: '/role',
    data
  })
}

export function updateRole(data: Partial<TRole>) {
  return request.patch({
    url: `/role/${data.id}`,
    data
  })
}

export function deleteRole(id: number) {
  return request.delete({
    url: `/role/${id}`
  })
}

export function getRoleMenu(id: number) {
  return request.get<TRole>({
    url: `/role/${id}`
  })
}
