import { MockDataMethodsType } from '../types'
import { Mock } from '../index'
import { methodsTypeKey } from '../const'

const object = (
  template: Record<string, any>, mock: Mock): Record<string, any> => {
  const result: Record<string, any> = {}
  if (Object.keys(template).length === 0) {
    return {}
  }
  for (const key in template) {
    if (typeof template[key] === 'string') {
      if (methodsTypeKey.includes(template[key])) {
        const method: MockDataMethodsType = template[key].replace('@', '')
        result[key] = mock[method]()
      } else {
        result[key] = mock.string({ template: template[key] })
      }
    }
    if (typeof template[key] === 'object') {
      if (Array.isArray(template[key])) {
        if (template[key].length !== 2) {
          throw new Error('Invalid template: 必须有两个元素')
        }
        const method: string = template[key][0]
        const options = template[key][1]
        if (methodsTypeKey.includes(method)) {

          if (typeof options === 'object') {
            if (!Array.isArray(options)) {
              result[key] = mock[method.replace('@',
                '') as MockDataMethodsType](options)
            } else {
              result[key] = mock.object(options)
            }
          } else {
            result[key] = mock[method]({ template: options })
          }
        } else {
          throw new Error('Invalid template: 参数类型不匹配')
        }

      } else {
        result[key] = mock.object(template[key])
      }
    }
  }
  return result
}

export default object
