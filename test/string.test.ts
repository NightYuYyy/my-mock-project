import { describe, expect, it } from 'vitest';
import { Mock } from '../src';

const mock = new Mock();
describe( '测试Mock.string()的进阶使用', () => {
  it( '正常情况：Mock.string({min:5,max:20})应该为长度最小为5 最长为20的字符串"', () => {
    const res = mock.string( { min: 5, max: 20 } );
    expect( res.length ).toBeGreaterThanOrEqual( 5 );
    expect( res.length ).toBeLessThanOrEqual( 20 );
  } );
  it( '正常情况：Mock.string({min:5,max:5})应该为长度为5的字符串"', () => {
    const res = mock.string( { min: 5, max: 5 } );
    expect( res.length ).toBe( 5 );
  } );
  it( '应该生成一个随机字符串', () => {
    const result = mock.string();
    expect( typeof result ).toBe( 'string' );
    expect( result.length ).toBeGreaterThanOrEqual( 1 );
    expect( result.length ).toBeLessThanOrEqual( 10 );
  } );

  it( '应该生成指定长度的字符串', () => {
    const result = mock.string( { min: 5, max: 5 } );
    expect( typeof result ).toBe( 'string' );
    expect( result.length ).toBe( 5 );
  } );

  it( '应该生成符合指定模板的字符串', () => {
    const result = mock.string( { template: /\d/ } );
    expect( typeof result ).toBe( 'string' );
    expect( result ).toMatch( /^\d+$/ );
  } );

  it( '应该生成符合指定模板和长度的字符串', () => {
    const result = mock.string( { template: /[a-z]{3}/ } );
    expect( typeof result ).toBe( 'string' );
    expect( result ).toMatch( /^[a-z]{3}$/ );
  } );

  it( '如果模板是字符串，应该直接返回该字符串', () => {
    const result = mock.string( { template: 'abc' } );
    expect( typeof result ).toBe( 'string' );
    expect( result ).toBe( 'abc' );
  } );

  it( '应该生成符合指定模板和非 ASCII 字符的字符串', () => {
    const result = mock.string( { template: /[\u4e00-\u9fa5]{2,5}/ } );
    expect( typeof result ).toBe( 'string' );
    expect( result ).toMatch( /^[\u4e00-\u9fa5]+$/ );
  } );
  it( '生成一个邮箱', ()=> {
    const result = mock.string( { template: '#email' } );
    expect( typeof result ).toBe( 'string' );
    expect( result ).toMatch( /^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i );

  } );
} );
