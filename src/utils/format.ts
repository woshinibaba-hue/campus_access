import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

class Format {
  formatTime(date: string, format = 'YYYY-MM-DD') {
    dayjs.locale('zh-cn')

    return dayjs(date).format(format)
  }

  formatUrl(url: string) {
    if (import.meta.env.VITE_ENV === 'development') {
      url = 'http://localhost:3000' + url
    } else {
      url = 'https://www.yimiciji.top/api' + url
    }

    return url
  }
}

export default new Format()
