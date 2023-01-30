import request from '@/server'
import type { IUserAndHealth } from '@/api/login/type'

export type TAsking = {
  address: string
  isLeaveCchool: number
  isAudit: number
  startDate: string
  endDate: string
  reason: string
  isScanCode: number
  user: IUserAndHealth
} & TBase

export function getAskingAll(params: IPage) {
  return request.get<IPaging<TAsking[]>>({
    url: '/asking',
    params
  })
}

export function createAsking(data: TAsking) {
  return request.post({
    url: '/asking',
    data
  })
}

export function auditAsking(id: number, data: Record<string, any>) {
  return request.post({
    url: `/asking/audit/${id}`,
    data
  })
}

export function getAskingList(params: IPage) {
  return request.get<IPaging<TAsking[]>>({
    url: '/asking/audit',
    params
  })
}
