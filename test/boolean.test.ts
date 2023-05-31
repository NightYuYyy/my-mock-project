import {describe, expect, it} from 'vitest';
import {Mock} from '../src';

describe('测试Mock.boolean()的进阶使用', () => {
    it('测试template为true', () => {
        expect(Mock.boolean({template: true})).toBe(true);
    });
    it('测试template为false', () => {
        expect(Mock.boolean({template: false})).toBe(false);
    });
});
