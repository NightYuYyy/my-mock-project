type MockData = string | number | boolean | Date | any[] | Record<string, any>;
type MockDataMethosType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
const MockDataMethos = ['string', 'number', 'boolean', 'date', 'array', 'object'];

interface MockOptions {
    min?: number;
    max?: number;
    length?: number;
    template?: MockData;
}

export class Mock {
    static string(options?: MockOptions & { template?: RegExp | string }): string {
        const {min = 1, max = 10, template} = options || {};
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (typeof template === 'string') {
            return template;
        } else if (template instanceof RegExp) {
            const pattern = template.source;
            if (/^[a-z]+$/i.test(pattern)) {
                characters = 'abcdefghijklmnopqrstuvwxyz';
            } else if (/^[A-Z]+$/i.test(pattern)) {
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            } else if (/^\d+$/i.test(pattern)) {
                characters = '0123456789';
            } else if (/^[a-z\d]+$/i.test(pattern)) {
                characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            } else if (/^[A-Z\d]+$/i.test(pattern)) {
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            } else {
                const set = new Set();
                for (let i = 0; i < 0xFFFF; i++) {
                    const character = String.fromCharCode(i);
                    if (character.match(template)) {
                        set.add(character);
                    }
                }
                characters = Array.from(set).join('');
            }
        }
        const length = Math.floor(Math.random() * (max - min + 1)) + min;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


    static number(options?: MockOptions): number {
        const {min = 0, max = 100} = options || {};
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static boolean(): boolean {
        return Math.random() < 0.5;
    }

    static date(): Date {
        return new Date(Math.floor(Math.random() * Date.now()));
    }

    static array(options?: MockOptions): any[] {
        const {length = 10, template} = options || {};
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(template ? this.mock(template) : this.any());
        }
        return result;
    }

    static object(options?: MockOptions): Record<string, any> {
        const {template} = options || {};
        const result: Record<string, any> = {};
        if (template !== undefined) {
            if (typeof template !== 'object' || Array.isArray(template)) {
                throw new Error('Invalid template: must be an object');
            }
            const obj = template as Record<string, any>;
            for (const key in obj) {
                result[key] = this.mock(obj[key]);
            }
        } else {
            const length = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < length; i++) {
                result[this.string()] = this.any();
            }
        }
        return result;
    }

    static custom(type: string, options?: MockOptions): any {
        switch (type) {
            case 'phone':
                return `+86 ${this.string({length: 11, template: /\d/})}`;
            case 'id':
                return `${this.string({length: 6, template: /\d/})}${this.date().getTime()}`;
            case 'idcard':
                const province = [
                    '11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65'
                ];
                const city = [
                    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82'
                ];
                const area = [
                    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'
                ];
                const provinceCode = province[Math.floor(Math.random() * province.length)];
                const cityCode = city[Math.floor(Math.random() * city.length)];
                const areaCode = area[Math.floor(Math.random() * area.length)];
                const year = Math.floor(Math.random() * 100) + 1900;
                const month = Math.floor(Math.random() * 12) + 1;
                const day = Math.floor(Math.random() * 28) + 1;
                const birth = new Date(year, month - 1, day);
                const sequence = this.string({length: 3, template: /\d/});
                const code = `${provinceCode}${cityCode}${areaCode}${birth.getFullYear()}${('0' + (birth.getMonth() + 1)).slice(-2)}${('0' + birth.getDate()).slice(-2)}${sequence}`;
                const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                let sum = 0;
                for (let i = 0; i < weights.length; i++) {
                    sum += parseInt(code.charAt(i)) * weights[i];
                }
                const checkCode = checkCodes[sum % 11];
                return `${code}${checkCode}`;
            default:
                return null;
        }
    }

    static mock(template: MockData): any {
        if (Array.isArray(template)) {
            return this.array({template});
        } else if (typeof template === 'object' && template !== null) {
            return this.object({template});
        } else if (typeof template === 'string') {
            if (MockDataMethos.includes(template)) {
                return this[template as MockDataMethosType]();
            } else if (['id', 'idcard', 'phone'].includes(template)) {
                return this.custom(template);
            } else {
                return this.string({template});
            }
        } else if (typeof template === 'number') {
            return this.number({template});
        } else {
            return this.boolean();
        }
    }

    static any(): any {
        const types = ['string', 'number', 'boolean', 'date'];
        const type = types[Math.floor(Math.random() * types.length)];
        return this.mock(type);
    }
}
