import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { DefaultService } from './default.service';
import { User } from './UserConfig';

@Injectable()
export class AuthService extends DefaultService {
  private _isLogin: boolean;
  private token: string;
  private authUrl: (string) => string;
  private _user: User;

  constructor(private http: Http) {
    super();
    this.authUrl = this.composeUrl(this.composeUrl(this.server)('auth'));
    this.token = this.extractToken();
    this._isLogin = this.token ? true : false;
  }

  private extractToken(): string {
    const token = JSON.parse(localStorage.getItem('jwt'));
    if (typeof token !== 'string')
      return undefined;
    return token;
  }

  set user(user: User) {
    const userInfo = user || {};
    this._user = { ...this._user, ...userInfo };
  }

  get user(): User {
    return this._user;
  }

  getToken(): string {
    return this.extractToken();
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  isLogin() {
    return this._isLogin;
  }

  setLogin(token: string): void {
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
    const userInfo: User = { username, password, email };
    this.user = userInfo;

    const body = { 'username': username, 'password': password, 'email': email };
    return this.http.post(this.authUrl('login'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }

  logout() {
    const body = { 'data': { 'jwt': this.token } };

    return this.http.post(this.authUrl('logout'), body)
      .subscribe(
        (data) => {
          this._isLogin = false;
          this.token = null;
          localStorage.removeItem('jwt');
        },
        (err) => console.log(`nok ${err}`),
      );
  }

  register(username: string, password: string, email: string, success?, error?) {
    const userInfo: User = { username, password, email };
    this.user = userInfo;
    const body = {'data': { 'username': username, 'password': password, 'email': email }};

    return this.http.post(this.authUrl('register'), body)
      .map((res: Response) => res.json())
      .subscribe(success, error);
  }
}
