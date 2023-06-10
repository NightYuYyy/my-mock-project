import { methodsTypeMap } from '../const'
import { ObjectOptions, TemplateType } from '../types'
import { Mock } from '../index'

const objectToObject = (template: TemplateType, mock: Mock): any => {
  if (Array.isArray(template)) {
    const method = methodsTypeMap[template[0] as string]
    if (typeof template[0] !== 'string' || typeof template[1] !==
      'object' ||
      Array.isArray(template[1]) ||
      !method) {
      throw new Error('Invalid template: 参数类型不匹配')
    }
    return mock[method](template[1])
  }
  return mock.object(template as ObjectOptions)
}
export {
  objectToObject
}
