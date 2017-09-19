import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private http: Http) {
    this.token = JSON.parse(localStorage.getItem('jwt')) || undefined;
  }

  login(username: string, password: string, email: string, error?, success?) {
    return this.http.post('http://localhost:3000/auth/login', { 'username': username, 'password': password, 'email': email })
      .flatMap(res => res.json())
      .subscribe(success, error);
  }

  logout() {
    this.token = null;
    localStorage.removeItem('jwt');
  }
}
