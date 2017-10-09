import {
  RequestOptions,
  ConnectionBackend,
}                       from '@angular/http';
import { HttpAuth }     from './HttpAuth.interceptor';
import { AuthService }  from '../services';

export function getHttpAuth(backend: ConnectionBackend, defaultOptions: RequestOptions, authService: AuthService) {
  return new HttpAuth(backend, defaultOptions, authService);
}
