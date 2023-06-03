import {Mock} from "./src";

const mock = new Mock();
console.log(mock.string()) // 生成一个随机字符串 类似：'aBcDeFgHiJkLmNoPqRsTuVwXyZ'
console.log(mock.string({min:10,max:20})) // 生成长度为10-20的随机字符串 类似：'aBcDeFgHiJkLmNoPqRsTuVwXyZ'
console.log(mock.string({template:'#email'})) // 生成一个随机邮箱 类似：'aaa@bbb.com'


console.log(mock.number()) // 生成一个随机整数
console.log(mock.number({min:10,max:20})) // 生成一个10-20的随机整数
console.log(mock.number({min:10,max:20,float:2})) // 生成一个10-20的随机浮点数，小数点后保留2位

console.log(mock.boolean()) // 生成一个随机布尔值

console.log(mock.date()) // 生成一个随机日期 例如：2020-01-01T00:00:00.000Z
console.log(mock.date({type:'timestamp'})) // 生成一个随机时间戳 例如：1580515200000
console.log(mock.date({type:'format',template:'YYYY-MM-DD HH:mm:ss'})) // 生成一个随机日期 例如：2020-01-01 00:00:00
