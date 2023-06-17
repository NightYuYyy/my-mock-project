import { ObjectOptions, TemplateType } from '../types'
import { Mock } from '../index'
import { methodsTypeMap } from '../const'
import { objectBuildForObjectType } from '../common'

const stringToObject = (template: TemplateType, mock: Mock): any => {
  const method = methodsTypeMap[template as string]
  return method ? mock[method]() : mock.string({ template: template as string })
}

const objectTemplateMap: Record<string, (
  template: TemplateType, mock: Mock) => any> = {
  string: stringToObject,
  object: objectBuildForObjectType,
}
const object = (
  template: ObjectOptions,
  mock: Mock): Record<string, any> => {
  const result: Record<string, any> = {}
  if (Object.keys(template).length === 0) {
    return {}
  }
  for (const key in template) {
    result[key] = objectTemplateMap[typeof template[key]](template[key], mock)
  }
  return result
}

export default object
