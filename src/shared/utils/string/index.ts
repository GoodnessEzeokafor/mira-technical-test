import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class StringUtilsService {
  /**
   * @method isEmpty
   * @param {String | Number | Object} value
   * @returns {Boolean} true & false
   * @description this value is Empty Check
   */
  public isEmpty(value: string | number | object): boolean {
    if (value === null || value === '' || typeof value === 'undefined') {
      return true;
    }
    if (typeof value === 'object' && !Object.keys(value).length) {
      return true;
    }
    return false;
  }

  /**
   * @method isValidUuid
   * @param {string} value
   * @returns {boolean} true if the value is a valid UUID, false otherwise
   * @description Checks if the provided string is a valid UUID
   */
  public isValidUuid(value: string): boolean {
    const regexExp =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regexExp.test(value);
  }

  /**
   * @method isNotEmpty
   * @param {String | Number | Object} value
   * @returns {Boolean} true & false
   * @description this value is not Empty Check
   */
  public isNotEmpty(value: string | number | object): boolean {
    return !this.isEmpty(value);
  }

  toTitleCase(str) {
    if (!str) return str;
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  randomNumbers(length: number) {
    const power10minus1 = 10 ** (length - 1);
    const power10 = 10 ** length;
    let rand = Math.floor(
      power10minus1 + Math.random() * (power10 - power10minus1 - 1),
    );
    if (String(rand).slice(0, 1) === '0') {
      rand = Math.floor(Math.random() * 899999 + 100000);
    }
    return rand;
  }

  generateRef(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  generateTxReference() {
    return `${this.generateRef(10).toUpperCase()}`;
  }

  cleanArray(arr = [], key: string) {
    if (arr.length <= 0) {
      return 0;
    }
    return arr[0][key] || 0;
  }
  slugifyChar(char: string) {
    return slugify(char, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
  }

  getRandomItemFromArray(array: string[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  maskEmail(email: string) {
    // Replace everything before @ with asterisks
    return email.replace(/^[^@]+/, (match) => '*'.repeat(match.length));
  }

}
