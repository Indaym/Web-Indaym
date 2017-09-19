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

  login(username: string, password: string, email: string): Observable<boolean> {
    return this.http.post(
      'http://localhost:3000/auth/login',
      JSON.stringify({ username, password, email })
    ).map((response: Response) => {
      let token = response.json().jwt;
      if (token) {
        this.token = token;
        localStorage.setItem('jwt', JSON.stringify({username, token}));
        return true;
      }
      return false;
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('jwt');
  }
}
