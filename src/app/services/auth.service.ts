import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { DefaultService } from './default.service';

@Injectable()
export class AuthService extends DefaultService {
  private _isLogin: boolean;
  private token: string;
  private authUrl: (string) => string;

  constructor(private http: Http) {
    super();
    this.authUrl = this.composeUrl(this.composeUrl(this.server)('auth'));
    this.token = this.extractToken();
    this._isLogin = this.token ? true : false;
  }

  private extractToken() {
    const token = JSON.parse(localStorage.getItem('jwt'));
    if (typeof token !== 'string')
      return undefined;
    return token;
  }

  isLogin() {
    return this._isLogin;
  }

  setLogin(token: string) {
    localStorage.setItem('jwt', token);
    this._isLogin = true;
    this.token = this.extractToken();
  }

  reset(): void {
    this._isLogin = false;
    this.token = null;
    localStorage.removeItem('jwt');
  }

  login(username: string, password: string, email: string, success?, error?) {
    const body = { 'username': username, 'password': password, 'email': email };
    return this.http.post(this.authUrl('login'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }

  logout() {
    const body = { 'data': { 'jwt': this.token } };

    // TODO: move into the promise
    this._isLogin = false;
    this.token = null;
    localStorage.removeItem('jwt');

    return this.http.post(this.authUrl('logout'), body)
      .subscribe(
        (data) => console.log(`ok: ${data}`),
        (err) => console.log(`nok ${err}`),
      );
  }

  register(username: string, password: string, email: string, success?, error?) {
    const body = {'data': { 'username': username, 'password': password, 'email': email }};

    return this.http.post(this.authUrl('register'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }
}
