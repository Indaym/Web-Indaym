import { Injectable }     from '@angular/core';
import {
  Http,
  Headers,
  Response,
}                         from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { DefaultService } from './default.service';
import { CryptoService }  from '../../cryptoModule/services';
import { UserService }    from './user.service';
import { User }           from './UserConfig';

@Injectable()
export class AuthService extends DefaultService {
  private _isLogin: boolean;
  private  authUrl: (string) => string;

  constructor(
    private http: Http,
    private crypto: CryptoService,
    private user: UserService,
  ) {
    super();
    this.authUrl = this.composeUrl(this.composeUrl(this.server)('auth'));
    this._isLogin = this.user.token ? true : false;
  }

  setToken(token: string): void {
    this.user.token = JSON.parse(token);
  }

  isLogin() {
    return this._isLogin;
  }

  setLogin(token: string): void {
    this._isLogin = true;
    this.setToken(token);
  }

  reset(): void {
    this._isLogin = false;
    this.user.deleteToken();
  }

  login(username: string, password: string, email: string, success?, error?) {
    this.user.user = { username, password, email };

    const body = { 'username': username, 'password': password, 'email': email };
    return this.http.post(this.authUrl('login'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }

  logout() {
    return this.http.post(this.authUrl('logout'), {}, {
      headers: new Headers({'Authorization': 'JWT ' + this.user.token}),
    })
      .subscribe(
        (data) => {
          this._isLogin = false;
          this.user.deleteToken();
        },
        (err) => console.log(`nok ${err}`),
      );
  }

  register(username: string, password: string, email: string, success?, error?) {
    this.user.user = { username, password, email };
    const body = {'data': { 'username': username, 'password': password, 'email': email }};

    return this.http.post(this.authUrl('register'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }
}
