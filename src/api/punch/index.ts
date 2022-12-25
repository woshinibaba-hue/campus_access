import request from '@/server'

import type { IUser } from '../login/type'

export type IPunch = TBase & {
  isNowAcid: number
  isFeve: number
  isOut: number
  address: string
  longitude: string
  latitude: string
  heat: number
  other: string
  user: IUser
}

export function savePath(location: string) {
  return request.patch({
    url: '/punch/location',
    data: {
      location
    }
  })
}

export function getPath() {
  return request.get<any>({
    url: '/punch/location'
  })
}

export function getUserPunchAll(params?: Record<string, any>) {
  return request.get<IPaging<IPunch[]>>({
    url: '/punch/user',
    params
  })
}
