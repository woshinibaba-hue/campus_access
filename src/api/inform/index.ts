import request from '@/server'

export type TInform = TBase & {
  title: string
  content: string
}

// 查询今日通知
export function getToDay() {
  return request.get<TInform[]>({
    url: '/inform/today'
  })
}

export function getInformAll() {
  return request.get<IPaging<TInform[]>>({
    url: '/inform',
    params: {
      page: 1,
      limit: 1000
    }
  })
}

export function issueInform(data: OmitBase<TInform>) {
  return request.post({
    url: '/inform',
    data
  })
}
