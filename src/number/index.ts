import { MockOptions } from '../types'

const number = (options: MockOptions) => {
  const { min = 0, max = 100, float = 0 } = options
  if (min > max) {
    throw new Error('Invalid input: min cannot be greater than max');
  }
  const randomNumber = Math.random() * (max - min) + min
  const factor = Math.pow(10, float)
  const roundedNumber = Math.round(randomNumber * factor) / factor
  const formattedNumber = roundedNumber.toFixed(float)
  return parseFloat(formattedNumber)
}

export default number
