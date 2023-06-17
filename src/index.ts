import {
  ArrayOptions,
  DateOptions,
  NumberOptions,
  ObjectOptions,
  StringOptions,
} from './types'
import string from './string'
import number from './number'
import date from './date'
import array from './array'
import object from './object'

export class Mock {

  templateMapKey: Record<string, RegExp | string> = {
    '#email': /^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i,
    '#mobile': /^1[3-9]\d{9}$/,
    '#id_card':/(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  }

  string (options?: StringOptions): string {
    return string(options || {}, this.templateMapKey)
  }

  number (options?: NumberOptions): number {
    return number(options || {})
  }

  boolean (_options?:any): boolean {
    return Math.random() < 0.5
  }

  date (options?: DateOptions ): Date | number | string {
    return date(options||{})
  }

  array (options?: ArrayOptions): any[] {
   return  array(options || {}, this)
  }

  object (template?: ObjectOptions): Record<string, any> {
    return object(template || {}, this)
  }

  addTemplate (key: string, value: string | RegExp): void {
    // 判断是否有该模板
    if (this.templateMapKey[key]) {
      throw new Error(`模板${key}已存在`)
    }
    // 判断模板名是否符合规范
    if (!/^#\w+$/.test(key)) {
      throw new Error(`模板名${key}不符合规范`)
    }
    this.templateMapKey[key] = value
  }
}
