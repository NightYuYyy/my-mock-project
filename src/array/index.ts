import { ArrayOptions, TemplateType } from '../types'
import { Mock } from '../index'
import { methodsTypeMap } from '../const'
import { objectBuildForObjectType } from '../common'

const arrayBuildForStringType = (options: ArrayOptions, mock: Mock): any[] => {
  const { template, length = 10 } = options
  const result: any[] = []

  for (let i = 0; i < length; i++) {
    result.push(mock[methodsTypeMap[template as string]]())
  }
  return result
}

const arrayBuildForObjectType = (options: ArrayOptions, mock: Mock): any[] => {
  const { template, length = 10 } = options
  const result: any[] = []
  for (let i = 0; i < length; i++) {
    result.push(objectBuildForObjectType(template as TemplateType, mock))
  }
  return result
}

const arrayBuildForUndefined = (options: ArrayOptions, mock: Mock): any[] => {
  const { length = 10 } = options
  const result: any[] = []
  for (let i = 0; i < length; i++) {
    result.push(mock.string())
  }
  return result
}

const typeMethodsMap: Record<string, (options: ArrayOptions, mock: Mock) => any[]> = {
  string: arrayBuildForStringType,
  object: arrayBuildForObjectType,
  undefined: arrayBuildForUndefined,
}

const array = (options: ArrayOptions, mock: Mock): any[] => {
  const { template } = options
  return typeMethodsMap[typeof template](options, mock)
}
export default array
