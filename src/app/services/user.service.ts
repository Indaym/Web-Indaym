import { Injectable }     from '@angular/core';

import { DefaultService } from './default.service';
import { User }           from './UserConfig';

@Injectable()
export class UserService extends DefaultService {
  private _refreshUrl: string;
  private _user: User;
  private _userBodyRequest: string;

  constructor() {
    super();
    this.token = this.extractToken();
    this._refreshUrl = this.composeUrl(this.composeUrl(this.server)('auth'))('login');
  }

  private extractToken(): string {
    const token = JSON.parse(localStorage.getItem('jwt'));
    if (token && typeof token !== 'string')
      return '';
    return token;
  }

  get refreshUrl(): string {
    return this._refreshUrl;
  }

  set user(user: User) {
    const userInfo = user || {};
    this._user = { ...this._user, ...userInfo };
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  get user(): User {
    if (!this._user) {
      this._user = JSON.parse(localStorage.getItem('user'));
    }
    return this._user;
  }

  set token(token: string) {
    localStorage.setItem('jwt', JSON.stringify(token || {}));
  }

  get token(): string {
    return this.extractToken();
  }

  get userBodyRequest() {
    return {
      'username': this.user.username,
      'password': this.user.password,
      'email': this.user.email,
    };
  }

  deleteToken(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.token = null;
  }
}
