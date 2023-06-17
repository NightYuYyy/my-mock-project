import {NumberOptions} from '../types'

const number = (options: NumberOptions) => {
  const {min = 0, max = 100, float = 0} = options
  if (min > max) {
    throw new Error('无效输入：min 不能大于 max');
  }
  const randomNumber = Math.random() * (max - min) + min
  const randomDecimal = ((Math.random() * 8 + 1) / Math.pow(10, float)).toFixed(float);
  // 计算最终的随机数
  return float === 0 ? Math.floor(randomNumber) : Math.floor(randomNumber) + Number(randomDecimal)
}

export default number
