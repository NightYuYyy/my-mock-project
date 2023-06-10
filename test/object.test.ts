import { describe, expect, it } from 'vitest'
import { Mock } from '../src'

const mock = new Mock()

describe('测试Mock.object()的进阶使用', () => {
  it('should 生成一个空数组', function () {
    const result = mock.object()
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({})
  })
  it('should 生成一个有name字段 且字段是字符串的对象', function () {
    const result = mock.object({ name: '@string' })
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({ name: expect.any(String) })
  })
  it('should 生成一个有name字段 且字段是"123"的对象', function () {
    const result = mock.object({ name: '123' })
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({ name: '123' })
  })
})
