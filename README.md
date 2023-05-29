## 简介

Mock 是一个用于生成随机数据的 JavaScript 库，可以用于测试、模拟和演示等场景。它支持生成各种类型的数据，包括字符串、数字、布尔值、日期、数组和对象等。

## 使用

### 生成随机字符串

```typescript
import {Mock} from 'src/index.ts';

const str = Mock.string({min: 5, max: 10}); // 生成一个长度在 5 到 10 之间的随机字符串
console.log(str); // 输出类似于 "aBcDeFgHiJ" 的字符串
```

### 生成随机数字

```typescript
import {Mock} from 'src/index.ts';

const num = Mock.number({min: 0, max: 100}); // 生成一个在 0 到 100 之间的随机数字
console.log(num); // 输出类似于 42 的数字
```

### 生成随机布尔值

```typescript
import {Mock} from 'src/index.ts';

const bool = Mock.boolean(); // 生成一个随机的布尔值
console.log(bool); // 输出 true 或 false
```

### 生成随机日期

```typescript
import {Mock} from 'src/index.ts';

const date = Mock.date(); // 生成一个随机的日期
console.log(date); // 输出类似于 "Sat May 28 2022 22:47:23 GMT+0800 (中国标准时间)" 的日期对象
```

### 生成随机数组

```typescript
import {Mock} from 'src/index.ts';

const arr = Mock.array({length: 5, template: 'string'}); // 生成一个包含 5 个随机字符串的数组
console.log(arr); // 输出类似于 ["aBcDeFgHiJ", "KlMnOpQrSt", "uVwXyZ1234", "56789abcdE", "fGhIjKlMnO"] 的数组
```

### 生成随机对象

```typescript
import {Mock} from 'src/index.ts';

const obj = Mock.object({template: {name: 'string', age: 'number'}}); // 生成一个包含 name 和 age 属性的对象
console.log(obj); // 输出类似于 {name: "aBcDeFgHiJ", age: 42} 的对象 对象属性需要指定类型
```

### 生成自定义数据

```typescript
import {Mock} from 'src/index.ts';

const phone = Mock.custom('phone'); // 生成一个随机的电话号码
console.log(phone); // 输出类似于 "+86 13812345678" 的字符串

const id = Mock.custom('id'); // 生成一个随机的身份证号码
console.log(id); // 输出类似于 "610102198001010001" 的字符串

const idcard = Mock.custom('idcard'); // 生成一个随机的身份证号码
console.log(idcard); // 输出类似于 "610102198001010001" 的字符串
```

### 生成任意类型的数据

```typescript
import {Mock} from 'src/index.ts';

const any = Mock.any(); // 生成一个随机的任意类型的数据
console.log(any); // 输出字符串、数字、布尔值、日期等任意类型的数据 any不包含对象和数组，会陷入死循环
```

### 生成指定类型的数据

```typescript
import {Mock} from 'src/index.ts';

const str = Mock.mock('string'); // 生成一个随机字符串
console.log(str); // 输出类似于 "aBcDeFgHiJ" 的字符串

const num = Mock.mock('number'); // 生成一个随机数字
console.log(num); // 输出类似于 42 的数字

const bool = Mock.mock('boolean'); // 生成一个随机布尔值
console.log(bool); // 输出 true 或 false

const date = Mock.mock('date'); // 生成一个随机日期
console.log(date); // 输出类似于 "Sat May 28 2022 22:47:23 GMT+0800 (中国标准时间)" 的日期对象

const arr = Mock.mock('array'); // 生成一个随机数组
console.log(arr); // 输出类似于 ["aBcDeFgHiJ", 42, true, "Sat May 28 2022 22:47:23 GMT+0800 (中国标准时间)", [1, 2, 3],{name: "John", age :30}]的数组

const obj = Mock.mock('object'); // 生成一个随机对象
console.log(obj); // 输出类似于 {name: "aBcDeFgHiJ", age: 42, married: true} 的对象
```

## API

**Mock.string(options?: MockOptions): string**

生成一个随机字符串。

**参数**

* options：可选，生成字符串的选项。
* min：可选，生成字符串的最小长度，默认为 0。
* max：可选，生成字符串的最大长度，默认为 10。

**返回值**

* 返回一个随机字符串。

**Mock.number(options?: MockOptions): number**

生成一个随机数字。

**参数**

* options：可选，生成数字的选项。
* min：可选，生成数字的最小值，默认为 0。
* max：可选，生成数字的最大值，默认为 100。

**返回值**

* 返回一个随机数字。

**Mock.boolean(): boolean**

生成一个随机布尔值。

**返回值**

* 返回一个随机布尔值。

**Mock.date(): Date**

生成一个随机日期。

**返回值**

* 返回一个随机日期对象。

**Mock.array(options?: MockOptions): any[]**

生成一个随机数组。

**参数**

* options：可选，生成数组的选项。
* length：可选，生成数组的长度，默认为 10。
* template：可选，生成数组元素的模板，可以是任意类型的数据。

**返回值**

返回一个随机数组。

**Mock.object(options?: MockOptions): Record<string, any>**

生成一个随机对象。

**参数**

* options：可选，生成对象的选项。
* template：可选，生成对象属性的模板，必须是一个对象。

**返回值**

返回一个随机对象。

**Mock.custom(type: string, options?: MockOptions): any**

生成一个自定义类型的数据。

**参数**

* type：必填，自定义类型的名称，可以是 phone、id 或其他自定义类型。
* options：可选，生成数据的选项。

**返回值**

返回一个自定义类型的数据。

**Mock.mock(template: MockData): any**

生成一个指定类型的数据。

**参数**

* template：必填，生成数据的模板，可以是字符串、数字、布尔值、日期、数组或对象等任意类型的数据。

**返回值**

返回一个指定类型的数据。

**Mock.any(): any**

生成一个随机类型的数据。

**返回值**

返回一个随机类型的数据。

**自定义类型**

Mock 支持自定义类型，可以通过 Mock.custom() 方法来定义自己的类型。例如，可以定义一个 email 类型：

```typescript
Mock.custom('email', {template: 'string@string.com'});
```

这个实现会生成一个类似于邮箱地址的字符串，其中包含用户名、域名和后缀。可以通过 Mock.mock() 方法来生成随机的邮箱地址：

```typescript
const email = Mock.mock('email');
console.log(email); // 输出类似于 "abc123@xyz.com" 的字符串
```

### 模板语法

Mock 支持模板语法，可以通过 {} 包裹变量名来引用其他属性的值。例如，可以定义一个包含姓名和邮箱的对象：

```typescript
const obj = {
    name: Mock.string({min: 5, max: 10}),
    email: '{name}@example.com'
};
```

这个实现会生成一个随机的字符串作为姓名，然后将它作为邮箱地址的用户名。可以通过 Mock.mock() 方法来生成随机的对象：

```typescript
const user = Mock.mock(obj);
console.log(user); // 输出类似于 {name: "aBcDeFgHiJ", email: "aBcDeFgHiJ@example.com"} 的对象
```

## 注意事项

* Mock 库只是一个模拟数据生成工具，生成的数据并不是真实有效的，不能用于生产环境。
* Mock 库生成的数据是随机的，不能保证每次生成的数据都相同。
* Mock 库的性能可能会受到数据量和复杂度的影响，需要谨慎使用。
