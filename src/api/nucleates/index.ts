import request from '@/server'

import type { IUser } from '@/api/login/type'

export type TNucleate = {
  url: string
  user: IUser
} & TBase

export function getUserNucleate(params: IPage) {
  return request.get<IPaging<TNucleate[]>>({
    url: '/nucleate/user',
    params
  })
}
