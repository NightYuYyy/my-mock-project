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
        console.log(Mock.array({
            template: {
                age: 'number',
                sex: 'boolean',
                birthday: 'date',
                address:'string',
                hobby: 'array',
                name: 'string'
            }
        }))
        expect(typeof obj).toBe('object');
    });
});

describe('测试Mock.string()的进阶使用', () => {
    it('正常情况：Mock.string({min:5,max:20})应该为长度最小为5 最长为20的字符串"', () => {
        const res = Mock.string({min: 5, max: 20});
        expect(res.length).toBeGreaterThanOrEqual(5);
        expect(res.length).toBeLessThanOrEqual(20);
    });
    it('正常情况：Mock.string({min:5,max:5})应该为长度为5的字符串"', () => {
        const res = Mock.string({min: 5, max: 5})
        expect(res.length).toBe(5);
    });
})
