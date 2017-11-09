import {
  Component,
  OnInit,
}                       from '@angular/core';
import { Router }       from '@angular/router';
import {
  Http,
  Headers,
  Response,
}                       from '@angular/http';

import {
  AuthService,
  TokenService,
}  from '../../services';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService,
  ) {}

  hasError = false;
  username: string;
  password: string;
  email: string;
  error: string;

  private loginSuccess = (data) => {
    this.token.addToken('token', data.token || {});
    this.token.addToken('refreshToken', data.refreshToken || {});

    this.auth.setlogin(true);
    this.router.navigate(['/home']);
  }

  private loginFailure = (err) => {
    const data = err.json();
    this.error = data.code;
    this.hasError = true;
  }

  ngOnInit() {
    this.auth.reset();
  }

  login() {
    this.auth.login(this.username, this.password, this.email, this.loginSuccess, this.loginFailure);
  }
}
