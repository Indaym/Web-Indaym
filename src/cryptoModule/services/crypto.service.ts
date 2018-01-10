import { Injectable } from '@angular/core';

import {
  HmacSHA256,
  SHA256,
  enc,
  WordArray,
}                     from 'crypto-js';

@Injectable()
export class CryptoService {
  private _salt: string;
  private _secret: string;

  constructor() {}

  set salt(salt: string) {
    this._salt = salt;
  }

  set secret(secret: string) {
    this._secret = secret;
  }

  private Hmac256(secret: string): (string) => WordArray {
    return (digest: string) => HmacSHA256(digest, secret);
  }

  private sha256Encoding(message: string): WordArray {
    return SHA256(message);
  }

  private hexEncoding(digest: WordArray): string {
    return enc.Hex.stringify(digest);
  }

  private salting(salt: string): (message: WordArray) => string {
    return (message: WordArray) => `${message}${salt}`;
  }

  digest(password: string): string {
    const hmac = this.Hmac256(this._secret);
    const slater = this.salting(this._salt);
    const hash = hmac(slater(hmac(password)));
    return this.hexEncoding(hash);
  }
}
