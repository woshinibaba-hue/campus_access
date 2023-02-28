import request from '@/server'

import type { IUser } from '../login/type'

export function getOutsideList() {
  return request.get({
    url: '/outside'
  })
}
