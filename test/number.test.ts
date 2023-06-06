import {describe, expect, it} from 'vitest';
import { Mock } from '../src';

const mock = new Mock();
describe('测试Mock.number()的进阶使用', () => {
    it('正常情况：Mock.number({min:5,max:20})应该为最小为5 最长为20的数字"', () => {
        const res = mock.number({min: 5, max: 20});
        expect(res).toBeGreaterThanOrEqual(5);
        expect(res).toBeLessThanOrEqual(20);
    });
    it('正常情况：Mock.number({min:5,max:5})应该为5的数字"', () => {
        const res = mock.number({min: 5, max: 5});
        expect(res).toBe(5);
    });
    it('应该生成一个随机数字', () => {
        const result = mock.number();
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(100);
    });
    it('应该生成一个小数点后有3位小数的浮点数', ()=>{
        const result = mock.number({float:3});
        expect(typeof result).toBe('number');
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(100);
        expect(result.toString().split('.')[1].length).toBe(3);
    })
});
