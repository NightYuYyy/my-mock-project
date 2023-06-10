import { StringOptions } from '../types'
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
  options: StringOptions,
  templateMapKey: Record<string, RegExp | string>): string => {
  const { min = 1, max = 10, template } = options
  if (min > max) {
    throw new Error('无效的输入：min 不能大于 max')
  }
  if (template === undefined) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min
    return generateString(length)
  }
  return such.as(
    `:regexp:${new RegExp(templateMapKey[template as string] || template)}`)
}
export default string
