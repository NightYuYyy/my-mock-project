import {afterEach, describe, expect, it, vi} from 'vitest';
import {Mock} from '../src';

const mock = new Mock();
describe('测试mock.number()的进阶使用', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('返回一个最小为5 最长为20的数字"', () => {
    expect(mock.number({min: 5, max: 20})).toBeGreaterThanOrEqual(5);
    expect(mock.number({min: 5, max: 20})).toBeLessThanOrEqual(20);
    vi.spyOn(Math, 'random').mockReturnValue(1);
    expect(mock.number({min: 5, max: 20})).toBe(20);
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(mock.number({min: 5, max: 20})).toBe(5);
  });
  it('返回一个固定为5的数字"', () => {
    expect(mock.number({min: 5, max: 5})).toBe(5);
    vi.spyOn(Math, 'random').mockReturnValue(1);
    expect(mock.number({min: 5, max: 5})).toBe(5);
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(mock.number({min: 5, max: 5})).toBe(5);
  });
  it('设置float=3 应该生成一个小数点后有3位小数的浮点数', () => {
    expect(typeof mock.number({float: 3})).toBe('number');
    expect(mock.number({float: 3}).toString().split('.')[1].length).toBe(3);
    vi.spyOn(Math, 'random').mockReturnValue(1);
    expect(mock.number({float: 3}).toString().split('.')[1].length).toBe(3);
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(mock.number({float: 3}).toString().split('.')[1].length).toBe(3);
  });
  it('最小值大于最大值 应该报错', () => {
    const result = () => mock.number({min: 100, max: 0});
    expect(result).toThrowError('无效输入：min 不能大于 max');
  });
})
