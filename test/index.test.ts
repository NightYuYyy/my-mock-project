import { describe, expect, it } from 'vitest';
import { Mock } from '../src';

const mock = new Mock();
describe('测试Mock数据基本使用', () => {
  it('正常情况：Mock.string()应该为字符串"', () => {
    expect(mock.string()).toBeTypeOf('string');
  });
  it('正常情况：Mock.number()应该为布尔值"', () => {
    expect(mock.number()).toBeTypeOf('number');
  });
  it('正常情况：Mock.boolean()应该为布尔值"', () => {
    expect(mock.boolean()).toBeTypeOf('boolean');
  });
  it('正常情况：Mock.date() 返回一个 Date 对象', () => {
    const date = mock.date();
    expect(date).toBeInstanceOf(Date);
  });
  it('正常情况：Mock.array() 返回一个数组', () => {
    const arr = mock.array();
    expect(Array.isArray(arr)).toBe(true);
  });
  it('正常情况：Mock.object() 返回一个对象', () => {
    const obj = mock.object({name: '张三'});
    expect(typeof obj).toBe('object');
  });
});
