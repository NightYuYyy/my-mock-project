import { MockOptions } from '../types'

const formatDate = (date: Date, template: string): string => {
  return template.replace(/(YYYY|yyyy|YY|yy|MM|DD|dd|HH|hh|mm|ss)/g,
    (match) => {
      switch (match) {
        case 'YYYY':
        case  'yyyy':
          return date.toLocaleDateString().split('/')[0]
        case 'YY':
        case  'yy':
          return date.toLocaleDateString().split('/')[0].slice(-2)
        case 'MM':
          return date.toLocaleDateString().split('/')[1].padStart(2, '0')
        case 'DD':
        case 'dd':
          return date.toLocaleDateString().split('/')[2].padStart(2, '0')
        case 'HH':
        case 'hh':
          return date.toLocaleTimeString().split(':')[0].padStart(2, '0')
        case 'mm':
          return date.toLocaleTimeString().split(':')[1].padStart(2, '0')
        case 'ss':
          return date.toLocaleTimeString().split(':')[2].padStart(2, '0')
        default:
          return match
      }
    })
}

// 传入type = 'timestamp' 返回随机时间的时间戳 优先级比较高
// 传入template 返回随机时间的格式化字符串
// 传入其他 返回随机时间的Date对象
const date = (options: MockOptions & {
  type?: string
}): Date | number | string => {
  const { type = 'format', template } = options
  if (['timestamp', 'format'].indexOf(type) === -1) {
    throw new Error('Invalid type: must be a timestamp or format')
  }
  if (type === 'timestamp') {
    // 返回随机时间的时间戳
    return new Date(Math.floor(Math.random() * Date.now())).getTime()
  } else if (typeof template === 'string') {
    // 错误处理
    if (!/^(YYYY|yyyy|YY|yy|MM|DD|dd|HH|hh|mm|ss|[-:/. ])+$/.test(template)) {
      throw new Error('Invalid template: must be a date template')
    }
    return formatDate(new Date(Math.floor(Math.random() * Date.now())),
      template)
  }
  return new Date(Math.floor(Math.random() * Date.now()))
}
export default date
