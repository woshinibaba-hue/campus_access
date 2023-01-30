import request from '@/server'

import type { Menu } from '@/api/menu'

export type TRole = {
  name: string
  intro: string
  menu: Menu[]
} & TBase

export function getRole(params: IPage) {
  return request.get<IPaging<TRole[]>>({
    url: '/role',
    params
  })
}
