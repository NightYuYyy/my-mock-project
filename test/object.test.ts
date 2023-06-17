import {describe, expect, it} from 'vitest'
import {Mock} from '../src'

const mock = new Mock()

describe('测试Mock.object()的进阶使用', () => {
  it('生成一个空数组', function () {
    const result = mock.object()
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({})
  })
  it('生成一个有name字段 且字段是字符串的对象', () => {
    const result = mock.object({name: '@string'})
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({name: expect.any(String)})
  })
  it('生成一个有name字段 且字段是"123"的对象', () => {
    const result = mock.object({name: '123'})
    expect(typeof result).toBe('object')
    expect(result).toMatchObject({name: '123'})
  })
  it('生成一个较为复杂的对象', () => {
    mock.addTemplate('#class', /语文|数学|英语|高等数学|web前端/)
    const result = mock.object({
      name: ['@string', {template: /^(?:[\u4e00-\u9fa5·]{2,16})$/}],
      age: ['@number', {min: 0, max: 90}],
      id: '#id_card',
      mobile: '#mobile',
      email: '#email',
      classes: {
        Mandatory: ['@array', {length: 1000, template: ['@string', {template: '#class'}]}],
        Elective: ['@array', {length: 1000, template: ['@string', {template: '#class'}]}],
      }
    })
    expect(result.name).toMatch(/^(?:[\u4e00-\u9fa5·]{2,16})$/);
    expect(result.age).toBeGreaterThanOrEqual(0);
    expect(result.age).toBeLessThanOrEqual(90);
    expect(result.id).toMatch(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/);
    expect(result.mobile).toMatch(/^1[3-9]\d{9}$/);
    expect(result.email).toMatch(/^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i);
    expect(result.classes.Mandatory.length).toBe(1000);
    expect(result.classes.Elective.length).toBe(1000);
    expect(result.classes.Mandatory.every((item: string) => ['语文', '数学', '英语', '高等数学', 'web前端'].includes(item))).toBeTruthy();
    expect(result.classes.Elective.every((item: string) => ['语文', '数学', '英语', '高等数学', 'web前端'].includes(item))).toBeTruthy();
  })
})
