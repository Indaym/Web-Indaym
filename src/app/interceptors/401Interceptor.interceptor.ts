import {
  Injectable,
  Injector,
}                          from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
}                           from '@angular/common/http';

import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import {
  TokenService,
  UserService,
}                           from '../services';
import { serverConfig }      from '../../../config/server.conf';
import { Response }         from '../models';

@Injectable()
export class Http401Interceptor implements HttpInterceptor {

  constructor(
    private token: TokenService,
    private user: UserService,
    private injector: Injector,
  ) {}

  private handleError = (res) => {
    this.token.deleteToken('token');
    this.token.deleteToken('refreshToken');
    this.user.deleteUser();
    return Observable.throw(res);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const http = this.injector.get(HttpClient);

    return next.handle(req)
      .catch((res) => {
        if (res.status === 403) return this.handleError(res);

        if (res.status === 401) {
          http.get(`${serverConfig.server}/auth/refresh`, {
            headers: new HttpHeaders().set('refreshToken', this.token.getToken('refreshToken')),
          }).subscribe(
            (data: Response) => {
              this.token.addToken('token', data.token);
              this.token.addToken('refreshToken', data.refreshToken);

              const newRequest = req.clone({
                setHeaders: { Authorization: this.token.getToken('token') },
              });
              return next.handle(newRequest);
            },
            (error) => this.handleError(res),
          );
        }
        return Observable.of(res);
      });
  }
}
