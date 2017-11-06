import { Injectable }     from '@angular/core';

import { TokenService }   from './tokenStore.service';
import { User }           from './UserConfig';

@Injectable()
export class UserService {
  private _user: User;
  private _userBodyRequest: string;

  private extractToken(name): string {
    const token = JSON.parse(localStorage.getItem(name));
    if (token && typeof token !== 'string')
      return '';
    return token;
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
}
