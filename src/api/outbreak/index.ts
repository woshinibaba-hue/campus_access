import request from '@/server'

export function getOutbreak() {
  return request.get<any>({
    url: '/outbreak'
  })
}
