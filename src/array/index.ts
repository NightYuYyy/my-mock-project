import { MockDataMethodsType, MockOptions } from '../types'
import { Mock } from '../index'
import { methodsTypeKey } from '../const'
const array = (options:MockOptions,mock:Mock):any[] => {
  const { length = 10, template } = options
  const result = []
  if(template === undefined){
    for (let i = 0; i < length; i++) {
      result.push(mock.string())
    }
    return result;
  }
  if (typeof template === 'string') {
    if(methodsTypeKey.includes(template)){
      const method = template.replace('@','')
      for (let i = 0; i < length; i++) {
        result.push(mock[method as MockDataMethodsType]())
      }
      return result;
    }
    for (let i = 0; i < length; i++) {
      result.push(mock.string({ template }))
    }
    return result;
  }
  if (typeof template === 'object' && !Array.isArray(template)) {
    for (let i = 0; i < length; i++) {
      result.push(mock.object(template))
    }
    return result;
  }
  if (Array.isArray(template)) {
    if(template.length !== 2){
      throw new Error('Invalid template: 必须有两个元素')
    }
    if(methodsTypeKey.includes(template[0])&&typeof template[1] === 'object' && !Array.isArray(template[1])){
      const method:MockDataMethodsType = template[0].replace('@','')
      for (let i = 0; i < length; i++) {
        result.push(mock[method]({ template: template[1] }))
      }
      return result;
    }
  throw new Error('Invalid template: 参数类型不匹配')
  }
  for (let i = 0; i < length; i++) {
    result.push(mock.string())
  }
  return result;
}

export default array
