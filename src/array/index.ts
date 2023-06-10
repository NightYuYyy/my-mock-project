import {MockDataMethodsType, MockOptions} from '../types'
import {Mock} from '../index'
import {methodsTypeMap} from '../const'

const stringToArray = (options: MockOptions, mock: Mock): any[] => {
  const {template,length=10} = options
  const result: any[] = []

  for (let i = 0; i < length; i++) {
    result.push(mock[methodsTypeMap[template as string]]())
  }
  return result
}

const objectToArray = (options: MockOptions, mock: Mock): any[] => {
  const {template, length = 10} = options
  const result: any[] = [];
  if(Array.isArray(template)) {
    if (template.length !== 2) {
      throw new Error('Invalid template: template为数组必须有两个元素')
    }
    if(typeof template[0] !== 'string' || typeof template[1] !== 'object' || Array.isArray(template[1])) {
      throw new Error('Invalid template: 参数类型不匹配')
    }
    for (let i = 0; i < length; i++) {
      result.push(mock[methodsTypeMap[template[0]]](template[1]))
    }
  }
  for (let i = 0; i < length; i++) {
    result.push(mock.object(template))
  }
  return result
}

const undefinedToArray = (options: MockOptions, mock: Mock): any[] => {
  const {length = 10} = options
  const result: any[] = []
  for (let i = 0; i < length; i++) {
    result.push(mock.string())
  }
  return result
}

const arrayMap: Record<string, (options: MockOptions, mock: Mock) => any[]> = {
  string: stringToArray ,
  object: objectToArray,
  undefined: undefinedToArray,
}

const array = (options: MockOptions, mock: Mock): any[] => {
  const {template} = options
  if (!arrayMap[typeof template]) {
    throw new Error('Invalid template: 参数类型不匹配')
  }
  return arrayMap[typeof template](options, mock)
}
if (typeof template !== 'number') {
  if (typeof template === 'string') {
    if (methodsTypeKey.includes(template)) {
      const method = template.replace('@', '')
      for (let i = 0; i < length; i++) {
        result.push(mock[method as MockDataMethodsType]())
      }
      return result;
    }
    for (let i = 0; i < length; i++) {
      result.push(mock.string({template}))
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
    if (template.length !== 2) {
      throw new Error('Invalid template: 必须有两个元素')
    }
    if (methodsTypeKey.includes(template[0]) && typeof template[1] === 'object' && !Array.isArray(template[1])) {
      const method: MockDataMethodsType = template[0].replace('@', '')
      for (let i = 0; i < length; i++) {
        result.push(mock[method](template[1]))
      }
      return result;
    }
    throw new Error('Invalid template: 参数类型不匹配')
  }

}

export default array
