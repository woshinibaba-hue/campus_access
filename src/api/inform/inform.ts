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

export function getInformAll(params: IPage) {
  return request.get<IPaging<TInform[]>>({
    url: '/inform',
    params
  })
}

export function issueInform(data: OmitBase<TInform>) {
  return request.post({
    url: '/inform',
    data
  })
}

export function deleteById(id: number) {
  return request.delete({
    url: `/inform/${id}`
  })
}

export function updateIssue(data: TInform) {
  return request.patch({
    url: `/inform/${data.id}`,
    data
  })
}
