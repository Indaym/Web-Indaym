import {
  Response,
  RequestOptions,
  ConnectionBackend,
}                                 from '@angular/http';
import { Observable }             from 'rxjs/Observable';

import { HttpAuthInterceptor }    from './HttpAuthInterceptor.interceptor';
import { InterceptorConfig }       from './InterceptorConfig';

import { AuthService }            from '../services';

export class HttpAuth extends HttpAuthInterceptor {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private authService: AuthService) {
    super(backend, defaultOptions, new InterceptorConfig({ noTokenError: true }));
  }

  protected getToken(): Promise<string> {
    return new Promise(() => this.authService.getToken());
  }

  protected saveToken(token: string): Promise<string> {
    return new Promise(() => this.authService.setToken(token));
  }

  protected refreshToken(): Observable<Response> {
    const user = this.authService.user;
    return super.post('http://www.data.com/api/authenticate', {
      ...user,
    }, null, true);
  }
}
