export type MockData = string | number | boolean | Date | any[] | Record<string, any> | RegExp;
export type MockDataMethodsType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';

export interface MockOptions {
  min?: number;
  max?: number;
  length?: number;
  template?: MockData;
  float?: number;
}
