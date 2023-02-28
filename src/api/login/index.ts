import request from '@/server'

import { IUser, IUserAndHealth, IRegister } from './type'

// 登录
export function userLogin(data: any) {
  return request.post<IUser>({
    url: '/user/login',
    data
  })
}

// 退出登录
export function userLogout(data: any) {
  return request.post({
    url: '/user/logout',
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

// 删除用户
export function deleteUserById(id: number) {
  return request.delete({
    url: `/user/${id}`
  })
}

// 编辑用户
export function updateUser(data: IRegister) {
  return request.patch({
    url: `/user/${data.id}`,
    data
  })
}
