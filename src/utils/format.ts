import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

class Format {
  formatTime(date: string, format = 'YYYY-MM-DD') {
    dayjs.locale('zh-cn')

    return dayjs(date).format(format)
  }
}

export default new Format()
