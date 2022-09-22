import * as AES from 'crypto-js/aes';
import * as sha1 from 'crypto-js/sha1';
import * as EncUtf8 from 'crypto-js/enc-utf8';

import { environment } from '@env/environment';

export class StorageHelper {
  static clear(): void {
    return localStorage.clear();
  }

  static getItem(key: string): string | null {
    const value = localStorage.getItem(this.getKey(key));
    return value ? AES.decrypt(value, environment.HASH_SALT).toString(EncUtf8) : value;
  }

  static getKey(rawKey: string): string {
    return sha1(environment.HASH_SALT + rawKey).toString();
  }

  static getObject(key: string): object | null {
    const value = localStorage.getItem(this.getKey(key));
    return value ? JSON.parse(AES.decrypt(value, environment.HASH_SALT).toString(EncUtf8)) : value;
  }

  static key(index: number): string | null {
    return localStorage.key(index);
  }

  static removeItem(key: string): void {
    return localStorage.removeItem(this.getKey(key));
  }

  static setItem(key: string, value: string | undefined): void {
    if (!value) {
      return;
    }
    return localStorage.setItem(this.getKey(key), AES.encrypt(value, environment.HASH_SALT).toString());
  }

  static setObject(key: string, objectValue: object) {
    const value = JSON.stringify(objectValue);
    return this.setItem(key, value);
  }
}
