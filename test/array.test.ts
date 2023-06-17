import { describe, expect, it } from 'vitest'
import { Mock } from '../src'

const mock = new Mock()

describe('mock.array()的进阶使用', () => {
  it('生成一个长度为20的数组', () => {
    const arr = mock.array({ length: 20 })
    expect(arr.length).toBe(20)
  })
  it('生成一个长度为20的数组，元素为布尔值', () => {
    const arr = mock.array({ length: 20, template: '@boolean' })
    expect(arr.length).toBe(20)
    expect(typeof arr[0]).toBe('boolean')
  })
  it('生成一个数组，元素为数字', () => {
    const arr = mock.array({ template: '@number' })
    expect(Array.isArray(arr)).toBe(true)
    expect(typeof arr[0]).toBe('number')
  })
  it('生成一个数组，元素为时间戳', () => {
    const arr = mock.array({ template: ['@date', { type: 'timestamp' }] })
    expect(Array.isArray(arr)).toBe(true)
    expect(typeof arr[0]).toBe('number')
  })
  it('生成一个长度为20的数组，元素为数组', () => {
    const arr = mock.array({ length: 20, template: '@array' })
    expect(arr.length).toBe(20)
    expect(Array.isArray(arr[0])).toBe(true)
  })

  it('生成一个长度为20的数组，元素为对象，且对象的name属性为字符串', () => {
      const arr = mock.array({ template: { name: ['@string', { min: 20, max: 30 }] } })
      expect(arr.length).toBe(10)
      expect(typeof arr[0]).toBe('object')
      expect(typeof arr[0].name).toBe('string')
      expect(arr[0].name.length).toBeGreaterThanOrEqual(20)
      expect(arr[0].name.length).toBeLessThanOrEqual(30)
    })
  it('传入的模版不正确，返回一个报错', () => {
    const arr = () => {
      mock.array({ template: { name: ['@test', { min: 20, max: 30 }] } })
    }
    expect(arr).toThrowError('Invalid template: 参数类型不匹配')
  })
  it('生成一个的数组，template中name 的格式不正确', () => {
    const arr = () => {
      mock.array({ template: { name: ['@string', { min: 40, max: 30 }] } })
    }
    expect(arr).toThrowError('无效的输入：min 不能大于 max')
  })
  it('生成一个十万条数据的数组，元素为name字段，值为string，class字段，值为数组，数组元素类型为string', function () {
    const arr = mock.array({
      length: 100000,
      template: {
        name: '@string',
        class: ['@array', { length: 5, template: '@string' }]
      }
    })
    expect(arr.length).toBe(100000)
    expect(typeof arr[0]).toBe('object')
    expect(typeof arr[0].name).toBe('string')
    expect(arr[0].class.length).toBe(5)
    expect(typeof arr[0].class[0]).toBe('string')
  });

})
