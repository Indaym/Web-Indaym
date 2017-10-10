import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { DefaultService } from './default.service';

@Injectable()
export class AuthService extends DefaultService {
  private token: string;
  private authUrl: (string) => string;

  constructor(private http: Http) {
    super();
    this.authUrl = this.composeUrl(this.composeUrl(this.server)('auth'));
    this.token = JSON.parse(localStorage.getItem('jwt')) || undefined;
  }

  login(username: string, password: string, email: string, error?, success?) {
    return this.http.post(this.authUrl('login'), { 'username': username, 'password': password, 'email': email })
      .mergeMap((res) => res.json())
      .subscribe(success, error);
  }

  register(username: string, password: string, email: string, error?, success?) {
    const body = {'data': { 'username': username, 'password': password, 'email': email }};

    return this.http.post(this.authUrl('register'), body)
      .mergeMap((res) => res.json())
      .subscribe(success, error);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('jwt');
  }
}
