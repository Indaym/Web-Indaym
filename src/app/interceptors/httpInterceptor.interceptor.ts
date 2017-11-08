import { Injectable }   from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
  XHRBackend,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Http,
  Headers,
}                       from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/merge';

import {
  UserService,
  TokenService,
}                       from '../services';
import { DefaultService } from '../services/default.service';
// import { AuthService }  from '../services/auth.service';
import { serverConfig } from '../../../config/server.conf';

@Injectable()
export class HttpAuthInterceptor extends Http {
  private orig: Request;
  private headerName = 'Authorization';

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private user: UserService,
    private token: TokenService,
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (!options)
      options = new RequestOptions();
    if (!options.headers) options.headers = new Headers();
    options.headers.append('Authorization', `JWT ${this.token.getToken('token')}`);

    if (typeof url === 'string') {
      return this.get(url, options);
    }
    this.orig = url as Request;

    return super.request(url, options).catch(this.catchErrors());
  }

  private requestWithToken(req: Request): Observable<Response> {
    req.headers.set(this.headerName, 'JWT ' + this.token.getToken('token'));
    return super.request(req);
  }

  private catchErrors() {
    return (err: any, caught: Observable<Response>): Observable<Response> => {
      if (err.status === 401) {
        const orig = this.orig;

        return this.refreshToken()
          .mergeMap((res) => {
            if (res) {
              const data = res.json();
              if (data.token) this.token.addToken('token', data.token || {});
              if (data.refreshToken) this.token.addToken('refreshToken', data.refreshToken || {});
              return this.requestWithToken(orig);
            }
            return Observable.throw(err);
          });
      }
      return Observable.throw(err);
    };
  }

  private refreshToken(): Observable<Response> {
    const opt = new RequestOptions();
    opt.headers = new Headers();
    opt.headers.set('refreshToken', this.token.getToken('refreshToken'));
    return super
      .get(`${serverConfig.server}/auth/refresh`, opt);
  }
}
