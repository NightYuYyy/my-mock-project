import {describe, expect, it} from 'vitest'
import {Mock} from '../src'

const mock = new Mock()
describe('测试mock.date()的进阶使用', () => {
  it('返回一个随机日期"', () => {
    const date = mock.date()
    expect(date).toBeInstanceOf(Date)
  })
  it('返回一个随机时间戳', () => {
    const date = mock.date({type: 'timestamp'})
    expect(date).toBeTypeOf('number')
  })
  it('传入数据格式有误时，返回一个报错', () => {
    expect(() => mock.date({type: 'other'})).toThrow('无效类型：type必须是timestamp 或 format')
  })
  it('template传入标准的时间格式化字符串时，应该返回一个随机日期字符串', () => {
    expect(mock.date({template: 'yyyy-MM-dd'})).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(mock.date({template: 'yyyy-MM-dd HH:mm:ss'})).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    expect(mock.date({template: 'yy-MM-dd HH:mm:ss'})).toMatch(/^\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })
  it('template 传入多余字符 返回只会替换标准字符，多余字符会照常返回', () => {
    expect(mock.date({template: 'aa-cc-yyyy HH:mm:ss'})).toMatch(/^aa-cc-\d{4} \d{2}:\d{2}:\d{2}$/)
    expect(mock.date({template: '返回的是yyyy年MM月dd日'})).toMatch(/^返回的是\d{4}年\d{2}月\d{2}日$/)
  })
  it('传入五个y只会替换前四个，第五个由于匹配不到会原样返回)', function () {
    const date = mock.date({template: 'yyyyy-aa'})
    expect(date).toMatch(/^\d{4}y-a{2}$/)
  });
  it('传入六个y前四个被匹配后 后两个又会被匹配)', function () {
    const date = mock.date({template: 'yyyyyy-aa'})
    expect(date).toMatch(/^\d{6}-a{2}$/)
  });
})
