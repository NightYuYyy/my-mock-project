import { describe, expect, it } from 'vitest'
import { Mock } from '../src'

const mock = new Mock()

describe('测试Mock.array()的进阶使用', () => {
  it('should 生成一个长度为20的数组', () => {
    const arr = mock.array({ length: 20 })
    expect(arr.length).toBe(20)
  })
  it('should 生成一个长度为20的数组，元素为数组', () => {
    const arr = mock.array({ length: 20, template: '@array' })
    expect(arr.length).toBe(20)
    expect(Array.isArray(arr[0])).toBe(true)
  })
  it('should 生成一个长度为20的数组，元素为对象', () => {
    const arr = mock.array({ length: 20, template: { name: '@string' } })
    expect(arr.length).toBe(20)
    expect(typeof arr[0]).toBe('object')
  })
  it('should 生成一个长度为20的数组，元素为对象，且对象的name属性为字符串', () => {
    const arr = mock.array({template:{name:['@string',{min:20,max:30}]}});
    expect(arr.length).toBe(10)
    expect(typeof arr[0]).toBe('object')
    expect(typeof arr[0].name).toBe('string')
    expect(arr[0].name.length).toBeGreaterThanOrEqual(20)
    expect(arr[0].name.length).toBeLessThanOrEqual(30)
  })
})
