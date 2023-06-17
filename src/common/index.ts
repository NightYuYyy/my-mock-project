import {methodsTypeMap} from '../const'
import {ObjectOptions, TemplateType} from '../types'
import {Mock} from '../index'

const objectBuildForObjectType = (template: TemplateType, mock: Mock): any => {
  if (Array.isArray(template)) {
    const method = methodsTypeMap[template[0] as string]
    const methodTemplate = template[1];
    if (typeof template[0] !== 'string' || typeof methodTemplate !==
      'object' ||
      Array.isArray(methodTemplate) ||
      !method) {
      throw new Error('Invalid template: 参数类型不匹配')
    }
    return mock[method](methodTemplate)
  }
  return mock.object(template as ObjectOptions)
}
export {
  objectBuildForObjectType
}
