import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  addToken(name: string, token: string): void {
    localStorage.setItem(name, JSON.stringify(token));
  }

  getToken(token: string): string {
    return JSON.parse(localStorage.getItem(token));
  }

  deleteToken(name: string): void {
    localStorage.removeItem(name);
  }
}
