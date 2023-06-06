import { MockData, MockOptions } from './types'
// import { methodsTypeKey } from './const';
import string from './string'
import number from './number'
import date from './date'

export class Mock {

  templateMapKey: Record<string, RegExp | string> = {
    '#email': /^[a-z\d]+([-_.][a-z\d]+)*@([a-z\d]+[-.])+[a-z]{2,5}$/i,
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
    const { length = 10, template } = options || {}
    const result = []
    for (let i = 0; i < length; i++) {
      result.push(template ? this.mock(template) : this.any())
    }
    return result
  }

  object (template?: MockData): Record<string, any> {
    const result: Record<string, any> = {}
    if (template !== undefined) {
      if (typeof template !== 'object' || Array.isArray(template)) {
        throw new Error('Invalid template: must be an object')
      }
      const obj = template as Record<string, any>
      for (const key in obj) {
        result[key] = this.mock(obj[key])
      }
    } else {
      const length = Math.floor(Math.random() * 10) + 1
      for (let i = 0; i < length; i++) {
        result[this.string()] = this.any()
      }
    }
    return result
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
