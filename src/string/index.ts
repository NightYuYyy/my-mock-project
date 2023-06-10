import {MockOptions} from '../types'
import such from 'suchjs'

const generateString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength))
  }
  return result
}

const string = (
  options: MockOptions,
  templateMapKey: Record<string, RegExp | string>): string => {
  const {min = 1, max = 10, template} = options
  if (min > max) {
    throw new Error('无效的输入：min 不能大于 max')
  }
  if (template === undefined) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min
    return generateString(length)
  }
  if (template instanceof RegExp || typeof template === 'string') {
    return such.as(`:regexp:${templateMapKey[template as string] || new RegExp(template)}`)
  }
  throw new Error('无效的模板：template必须是字符串或正则表达式')
}
export default string
