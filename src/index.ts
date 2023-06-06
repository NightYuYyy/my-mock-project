import { MockData, MockOptions } from './types'
// import { methodsTypeKey } from './const';
import string from './string'
import number from './number'
import date from './date'
import array from './array'
import object from './object'

export class Mock {

  templateMapKey: Record<string, RegExp | string> = {
    '#email': /^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i,
    '#phone': /^1[3-9]\d{9}$/,
    '#id_card':/(^\d{15}$)|(^\d{17}([0-9]|X)$)/
  }

  string (options?: MockOptions): string {
    return string(options || {}, this.templateMapKey)
  }

  number (options?: MockOptions): number {
    return number(options || {})
  }

  boolean (): boolean {
    return Math.random() < 0.5
  }

  date (options?: MockOptions & { type?: string }): Date | number | string {
    return date(options||{})
  }

  array (options?: MockOptions): any[] {
   return  array(options || {}, this)
  }

  object (template?: Record<string, any>): Record<string, any> {
    return object(template || {}, this)
  }

  mock (template: MockData): any {
    if (Array.isArray(template)) {
      return this.array({ ...template })
    } else if (typeof template === 'object' && template !== null) {
      return this.object({ template })
    } else if (typeof template === 'string') {
      // if (MockDataMethods.includes( template )) {
      //   return this[template as MockDataMethodsType]();
      // } else if (['id', 'idcard', 'phone'].includes( template )) {
      //   return this.custom( template );
      // } else {
      //   return this.string( { template } );
      // }
    } else if (typeof template === 'number') {
      return this.number({ template })
    } else {
      return this.boolean()
    }
  }

  any (): any {
    const types = ['string', 'number', 'boolean', 'date']
    const type = types[Math.floor(Math.random() * types.length)]
    return this.mock(type)
  }
}
