import { describe, expect, it } from 'vitest'
import { Mock } from '../src'

const mock = new Mock()
describe('测试Mock.date()的进阶使用', () => {
  it('正常情况：Mock.date()应该返回一个随机日期"', () => {
    const date = mock.date()
    expect(date).toBeInstanceOf(Date)
  })
  it('should Mock.data({type:"timestamp"}) 应该返回一个随机时间戳', () => {
    const date = mock.date({ type: 'timestamp' })
    expect(date).toBeTypeOf('number')
  })
  it('should Mock.data({template:"yyyy-MM-dd"}) 应该返回一个随机日期字符串',
    () => {
      const date = mock.date({ template: 'yyyy-MM-dd' })
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  it('should Mock.data({template:"yyyy-MM-dd HH:mm:ss"}) 应该返回一个随机日期时间字符串',()=> {
    const date = mock.date({ template: 'yyyy-MM-dd HH:mm:ss' })
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    expect(date).toBeTypeOf('string')
  })
})
