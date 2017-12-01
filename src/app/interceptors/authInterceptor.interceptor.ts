import { Injectable }     from '@angular/core';

import {
  HttpHeaders,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
}                           from '@angular/common/http';

import {Observable }        from 'rxjs/observable';

import {TokenService }      from '../services';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private headerName = 'Authorization';
  private orig: HttpRequest<any>;

  constructor(
    private token: TokenService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken('token');
    const authreq = req.clone({
      setHeaders: { Authorization: `JWT ${token}` },
    });

    return next.handle(authreq);
  }
}
