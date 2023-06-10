import { DateOptions } from '../types'

const getFullYear = (date: Date): string => date.getFullYear().toString()

const getYear = (date: Date): string => getFullYear(date).slice(-2);
const getDate = (date: Date): string => date.getDate().toString().padStart(2, '0')

const getHours = (date: Date): string => date.getHours().toString().padStart(2, '0')

const formatDateMap: Record<string, (date: Date) => string> = {
  'YYYY': getFullYear,
  'yyyy': getFullYear,
  'YY': getYear,
  'yy': getYear,
  'MM': (date: Date): string => (date.getMonth() + 1).toString().padStart(2, '0'),
  'DD': getDate,
  'dd': getDate,
  'HH': getHours,
  'hh': getHours,
  'mm': (date: Date): string => date.getMinutes().toString().padStart(2, '0'),
  'ss': (date: Date): string => date.getSeconds().toString().padStart(2, '0'),
}

const formatDate = (date: Date, template: string): string => {
  return template.replace(/(YYYY|yyyy|YY|yy|MM|DD|dd|HH|hh|mm|ss)/g,
    (match) => {
      return formatDateMap[match](date)
    })
}


const typeMap: Record<string, (date: Date, template?: string | undefined) => Date | number | string> = {
  timestamp: (date: Date): number => {
    return date.getTime()
  },
  format: (date: Date, template: string | undefined): Date | string => {
    if (!template) {
      return date
    }
    return formatDate(date, template)
  },
}
// 传入type = 'timestamp' 返回随机时间的时间戳 优先级比较高
// 传入template 返回随机时间的格式化字符串
// 传入其他 返回随机时间的Date对象
const date = (options: DateOptions ): Date | number | string => {
  const {type = 'format', template} = options
  if (['timestamp', 'format'].indexOf(type) === -1) {
    throw new Error('Invalid type: must be a timestamp or format')
  }
  const date = new Date(Math.floor(Math.random() * Date.now()))
  return typeMap[type](date, template as string | undefined)
}
export default date
