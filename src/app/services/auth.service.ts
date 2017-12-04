import { Injectable }     from '@angular/core';
import {
  Http,
  Headers,
  Response,
}                         from '@angular/http';

import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
}                         from '@angular/common/http';

import { Observable }     from 'rxjs/observable';
import {
  mergeMap,
  map,
}                         from 'rxjs/operators';

import { DefaultService } from './default.service';
import { CryptoService }  from '../../cryptoModule/services';
import { UserService }    from './user.service';
import { TokenService }   from './tokenStore.service';
import { User }           from './UserConfig';

type token = 'token' | 'refreshToken';

@Injectable()
export class AuthService extends DefaultService {
  private _refreshUrl: string;
  private  authUrl: (string) => string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private user: UserService,
  ) {
    super();

    const joining = this.joiner('/');
    const apiUrl = joining(this.server);
    const authUrl = apiUrl('auth');
    this.authUrl = joining(authUrl);

    this._refreshUrl = this.composeUrl(this.composeUrl(this.server)('auth'))('refresh');
  }

  get refreshUrl(): string {
    return this._refreshUrl;
  }

  isLogin() {
    return this.tokenService.getToken('token') ? true : false;
  }

  reset(): void {
    this.tokenService.deleteToken('token');
    this.tokenService.deleteToken('refreshToken');
  }

  login(password: string, email: string, success?, error?) {
    this.user.user = { password, email };

    const body = { 'data': { 'password': password, 'email': email } };
    return this.http.post(this.authUrl('login'), body)
      .subscribe(success, error);
  }

  logout() {
    return this.http.post(this.authUrl('logout'), {}, {
      headers: new HttpHeaders({'Authorization': 'JWT ' + this.tokenService.getToken('token') }),
    })
      .subscribe(
        (data) => {
          this.reset();
        },
        (err) => console.log(`nok ${err}`),
      );
  }

  register(username: string, password: string, email: string, success?, error?) {
    this.user.user = { username, password, email };
    const body = {'data': { 'username': username, 'password': password, 'email': email }};

    return this.http.post(this.authUrl('register'), body)
      .subscribe(success, error);
  }

  refresh(success, error) {
    const headers = {
      headers: new HttpHeaders().set('Authorization', this.tokenService.getToken('refreshToken')),
    };
    return this.http.get(this._refreshUrl, headers)
      .subscribe(success, error);
  }
}
