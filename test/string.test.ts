import {afterEach, describe, expect, it, vi} from 'vitest'
import {Mock} from '../src'

const mock = new Mock()
describe('测试Mock.string()的进阶使用', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('生成一个长度最小为5 最长为20的字符串"', () => {
    expect(mock.string({min: 5, max: 20}).length).toBeGreaterThanOrEqual(5)
    expect(mock.string({min: 5, max: 20}).length).toBeLessThanOrEqual(20)
    vi.spyOn(Math, 'random').mockReturnValue(1)
    expect(mock.string({min: 5, max: 20}).length).toBe(20)
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(mock.string({min: 5, max: 20}).length).toBe(5)

  })
  it('生成一个长度为5的字符串"', () => {
    expect(mock.string({min: 5, max: 5}).length).toBe(5)
    vi.spyOn(Math, 'random').mockReturnValue(1)
    expect(mock.string({min: 5, max: 5}).length).toBe(5)
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(mock.string({min: 5, max: 5}).length).toBe(5)
  })
  it('生成符合指定模板的字符串', () => {
    expect(mock.string({template: /[a-z]{3}/})).toMatch(/^[a-z]{3}$/)
    expect(mock.string({template: /\d/})).toMatch(/^\d+$/)
    expect(mock.string({template: /\d{3}-\d{4}-\d{4}/})).toMatch(/^\d{3}-\d{4}-\d{4}$/)
    expect(mock.string({template: /^[GCDZTSPKXLY1-9]\d{1,4}$/})).toMatch(/^[GCDZTSPKXLY1-9]\d{1,4}$/)
  })
  it('模板是字符串，应该直接返回该字符串', () => {
    const result = mock.string({template: 'abc'})
    expect(result).toBe('abc')
  })
  it('生成符合指定模板和非 ASCII 字符的字符串', () => {
    expect(mock.string({template: /[\u4e00-\u9fa5]{2,5}/})).toMatch(/^[\u4e00-\u9fa5]+$/)
  })
  it('使用预设置模版，生成符合指定正则表达式的字符串', () => {
    expect(mock.string({template: '#email'})).toMatch(/^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i)
    expect(mock.string({template: '#mobile'})).toMatch(/^1[3456789]\d{9}$/)
  })

  it('添加一个模板，然后生成符合该模板的字符串', () => {
    mock.addTemplate('#cname', /^(?:[\u4e00-\u9fa5·]{2,16})$/)
    const result = mock.string({template: '#cname'})
    expect(result).toMatch(/^(?:[\u4e00-\u9fa5·]{2,16})$/)
  })
  it('添加一个不符合模板名的模板，应该报错', function () {
    const res = () => {
      mock.addTemplate('test', 'abc')
    }
    expect(res).toThrowError('模板名test不符合规范')
  })
  it('添加已经存在的模板，应该报错', function () {
    const res = () => {
      mock.addTemplate('#email', 'abc')
    }
    expect(res).toThrowError('模板#email已存在')
  })
  it('min值大于max值的时候， 应该报错"', () => {
    const res = () => {
      mock.string({min: 100, max: 0})
    }
    expect(res).toThrowError('无效的输入：min 不能大于 max')
  })
})
