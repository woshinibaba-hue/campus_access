import request from '@/server'

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
