import { ArrayOptions, TemplateType } from '../types'
import { Mock } from '../index'
import { methodsTypeMap } from '../const'
import { objectToObject } from '../common'

const stringToArray = (options: ArrayOptions, mock: Mock): any[] => {
  const { template, length = 10 } = options
  const result: any[] = []

  for (let i = 0; i < length; i++) {
    result.push(mock[methodsTypeMap[template as string]]())
  }
  return result
}

const objectToArray = (options: ArrayOptions, mock: Mock): any[] => {
  const { template, length = 10 } = options
  const result: any[] = []
  for (let i = 0; i < length; i++) {
    result.push(objectToObject(template as TemplateType, mock))
  }
  return result
}

const undefinedToArray = (options: ArrayOptions, mock: Mock): any[] => {
  const { length = 10 } = options
  const result: any[] = []
  for (let i = 0; i < length; i++) {
    result.push(mock.string())
  }
  return result
}

const arrayMap: Record<string, (options: ArrayOptions, mock: Mock) => any[]> = {
  string: stringToArray,
  object: objectToArray,
  undefined: undefinedToArray,
}

const array = (options: ArrayOptions, mock: Mock): any[] => {
  const { template } = options
  return arrayMap[typeof template](options, mock)
}
export default array
