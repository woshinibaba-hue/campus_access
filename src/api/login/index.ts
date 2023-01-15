import request from '@/server'

import { IUser, IUserAndHealth, IRegister } from './type'

// 登录
export function userLogin(data: any) {
  return request.post<IUser>({
    url: '/user/login',
    data
  })
}

// 查询用户
export function getUserAll(params: IPage) {
  return request.get<IPaging<IUserAndHealth[]>>({
    url: '/user',
    params
  })
}

// 注册用户
export function register(data: IRegister) {
  return request.post<IUser>({
    url: '/user/register',
    data
  })
}
