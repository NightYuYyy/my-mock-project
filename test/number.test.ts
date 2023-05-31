import {describe, expect, it} from 'vitest';
import {Mock} from '../src';

describe('测试Mock.number()的进阶使用', () => {
    it('正常情况：Mock.number({min:5,max:20})应该为最小为5 最长为20的数字"', () => {
        const res = Mock.number({min: 5, max: 20});
        expect(res).toBeGreaterThanOrEqual(5);
        expect(res).toBeLessThanOrEqual(20);
    });
    it('正常情况：Mock.number({min:5,max:5})应该为5的数字"', () => {
        const res = Mock.number({min: 5, max: 5});
        expect(res).toBe(5);
    });
});
