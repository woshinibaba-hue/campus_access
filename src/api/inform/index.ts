import request from '@/server'

export type TInform = {
  id: number
  title: string
  content: string
  createAt: string
}

// 查询今日通知
export function getToDay() {
  return request.get<TInform[]>({
    url: '/inform/today'
  })
}

export function getInformAll() {
  return request.get<IDataRes<TInform[]>>({
    url: '/inform',
    params: {
      page: 1,
      limit: 1000
    }
  })
}
