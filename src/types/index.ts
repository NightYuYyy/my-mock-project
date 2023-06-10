export type MockData =
  string
  | number
  | boolean
  | Date
  | any[]
  | Record<string, any>
  | RegExp;

export type MockDataMethodsType =
  'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'array'
  | 'object';

export interface NumberOptions {
  min?: number;
  max?: number;
  float?: number;
}

export interface StringOptions {
  min?: number;
  max?: number;
  template?: string | RegExp;
}

export interface DateOptions {
  type?: string;
  template?: string;
}

export interface ObjectOptions {
  [key: string]: string |
    [string, DateOptions | StringOptions | NumberOptions] |
    ObjectOptions;
}

export type TemplateType =
  string
  | ObjectOptions
  | [string, DateOptions | StringOptions | NumberOptions];

export interface ArrayOptions {
  length?: number;
  template?: TemplateType;
}
