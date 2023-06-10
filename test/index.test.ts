import { describe, expect, it } from 'vitest';
import { Mock } from '../src';

const mock = new Mock();
describe('测试Mock数据基本使用', () => {
  it('Mock.string()应该为字符串"', () => {
    expect(mock.string()).toBeTypeOf('string');
  });
  it('Mock.number()应该为布尔值"', () => {
    expect(mock.number()).toBeTypeOf('number');
  });
  it('Mock.boolean()应该为布尔值"', () => {
    expect(mock.boolean()).toBeTypeOf('boolean');
  });
  it('Mock.date() 返回一个 Date 对象', () => {
    const date = mock.date();
    expect(date).toBeInstanceOf(Date);
  });
  it('Mock.array() 返回一个数组', () => {
    const arr = mock.array();
    expect(Array.isArray(arr)).toBe(true);
  });
  it('Mock.object() 返回一个对象', () => {
    const obj = mock.object({name: '张三'});
    expect(typeof obj).toBe('object');
  });
});
