import {
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  ConnectionBackend,
  Headers,
}                                     from '@angular/http';
import { Observable }                 from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

import { InterceptorConfig }          from './InterceptorConfig';
import { InterceptorConfigOptional }  from './InterceptorConfigOptional';

export abstract class HttpAuthInterceptor extends Http {

  private origRequest: Request;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private config: InterceptorConfig) {
    super(backend, defaultOptions);
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
      if (options == null) {
          options = new RequestOptions();
      }
      if (options.headers == null) {
          options.headers = new Headers();
      }
      options.headers.append('Content-Type', 'application/json');
      return options;
  }

  protected requestWithToken(req: Request, token: any): Observable<Response> {
    this.origRequest = req;
    if (!this.config.noTokenError && !token) {
      return Observable.throw(new Error('No authorization token given'));
    } else {
      req.headers.set(this.config.headerName, token);
    }

    return super.request(req);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      return this.get(url, options);
    }
    const req: Request = url as Request;
    const token: Promise<string> = this.getToken();
    return Observable.fromPromise(token).mergeMap((jwtToken: string) => this.requestWithToken(req, jwtToken));
  }

  get(url: string, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    if (noIntercept) {
      return super.get(url, options);
    }
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    if (noIntercept) {
      return super.post(url, body, options);
    }
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    if (noIntercept) {
      return super.put(url, body, options);
    }
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    if (noIntercept) {
      return super.delete(url, options);
    }
    return this.intercept(super.delete(url, options));
  }

  protected intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401) {
        console.log('Unauthorised need to refresh token');
        const orig = this.origRequest;
        return this.refreshToken().mergeMap((res) => {
          if (res) {
            const data = res.json();
            if (data.access_token) {
              return Observable.fromPromise(this.saveToken(data.access_token));
            } else {
              return Observable.create('');
            }
          }
        }).mergeMap((token) => {
          return this.requestWithToken(orig, token);
        });
      } else {
          return Observable.throw(err);
      }
    });
  }

  protected abstract getToken(): Promise<string>;

  protected abstract saveToken(token: string): Promise<string>;

  protected abstract refreshToken(): Observable<Response>;
}
