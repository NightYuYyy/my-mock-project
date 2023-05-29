import {describe, expect, it} from 'vitest';
import {Mock} from '../src';

describe('测试Mock数据基本使用', () => {
    it('正常情况：Mock.string()应该为字符串"', () => {
        expect(Mock.string()).toBeTypeOf("string");
    });
    it('正常情况：Mock.number()应该为布尔值"', () => {
            expect(Mock.number()).toBeTypeOf("number")
        }
    );
    it('正常情况：Mock.boolean()应该为布尔值"', () => {
            expect(Mock.boolean()).toBeTypeOf("boolean")
        }
    );
    it('正常情况：Mock.date() 返回一个 Date 对象', () => {
        const date = Mock.date();
        expect(date).toBeInstanceOf(Date);
    });
    it('正常情况：Mock.array() 返回一个数组', () => {
        const arr = Mock.array();
        expect(Array.isArray(arr)).toBe(true);
    });
    it('正常情况：Mock.object() 返回一个对象', () => {
        const obj = Mock.object();
        expect(typeof obj).toBe('object');
    });
});

