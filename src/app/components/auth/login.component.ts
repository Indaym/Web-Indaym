import {
  Component,
  OnInit,
  Inject,
}                       from '@angular/core';
import { Router }       from '@angular/router';

import {
  AuthService,
  TokenService,
}                       from '../../services';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
}                       from '@angular/forms';
import { ErrorMatcher } from './ErrorMatcher';

@Component({
  selector: 'ia-login',
  templateUrl: './login.component.html',
  styleUrls: [
    // './login.component.css',
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService,
    private fb: FormBuilder,
  ) {}

  loginForm: FormGroup;

  hasError = false;
  username: string;
  password: string;
  email: string;
  error: string;

  matcher: ErrorMatcher = new ErrorMatcher();

  private loginSuccess = (data) => {
    this.token.addToken('token', data.token || {});
    this.token.addToken('refreshToken', data.refreshToken || {});

    this.router.navigate(['/home']);
  }

  private loginFailure = (err) => {
    this.error = err.error.code;
    this.hasError = true;
    this.loginForm.setErrors({ 'error': 'nope'});
    console.log(this.loginForm);
  }

  ngOnInit() {
    this.auth.reset();
    this.loginForm = this.fb.group({
      'password': [this.password, [ Validators.required ]],
      'email': [this.email, [ Validators.required, Validators.email ]],
    });
  }

  login() {
    this.auth.login(this.loginForm.get('password').value, this.loginForm.get('email').value, this.loginSuccess, this.loginFailure);
  }
}
