import {NumberOptions} from '../types'

const floatNumber = (float: number) => {

  const digits = "123456789";
  let result = "";

  for (let i = 0; i < float - 1; i++) {
    result += digits[Math.floor(Math.random() * (digits.length - 1))];
  }

  result += digits[Math.floor(Math.random() * (digits.length - 1)) + 1];

  return parseFloat(result) / Math.pow(10, float);
}

const number = (options: NumberOptions) => {
  const {min = 0, max = 100, float = 0} = options
  if (min > max) {
    throw new Error('无效输入：min 不能大于 max');
  }
  const randomNumber = Math.random() * (max - min) + min
  // 计算最终的随机数
  return float === 0 ? Math.floor(randomNumber) : Math.floor(randomNumber) + floatNumber(float);
}

export default number
