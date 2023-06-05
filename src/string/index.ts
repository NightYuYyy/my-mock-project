import { MockOptions } from '../types';
import such from 'suchjs';

const string = ( options: MockOptions, templateMapKey: Record<string, RegExp | string> ): string => {
  const { min = 1, max = 10, template } = options;
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  if (template !== undefined) {
    if (typeof template === 'string') {
      if (templateMapKey[template]) {
        return such.as( `:regexp:${ templateMapKey[template] }` );
      } else {
        return template;
      }
    } else if (template instanceof RegExp) {
      return such.as( `:regexp:${ template }` );
    } else {
      throw new Error( 'Invalid template: must be a string or a RegExp' );
    }
  } else {
    const length = Math.floor( Math.random() * (max - min + 1) ) + min;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt( Math.floor( Math.random() * characters.length ) );
    }
    return result;
  }
};
export default string;
