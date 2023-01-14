import request from '@/server'

import { IUser, IUserAndHealth } from './type'

// 登录
export function userLogin(data: any) {
  return request.post<IUser>({
    url: '/user/login',
    data
  })
}

// 查询用户
export function getUserAll(params: IPage) {
  return request.get<IUserAndHealth[]>({
    url: '/user',
    params
  })
}
