import request from '@/server'

import { IUser } from './type'

// 登录
export function userLogin(data: any) {
  return request.post<IUser>({
    url: '/user/login',
    data
  })
}
