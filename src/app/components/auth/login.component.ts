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

  private loginSuccess = (data) => {
    this.token.addToken('token', data.token || {});
    this.token.addToken('refreshToken', data.refreshToken || {});

    this.router.navigate(['/home']);
  }

  private loginFailure = (err) => {
    const data = err.json();
    this.error = data.code;
    this.hasError = true;
  }

  ngOnInit() {
    this.auth.reset();
    this.loginForm = this.fb.group({
      'password': [this.password, [ Validators.required ]],
      'email': [this.email, [ Validators.required, Validators.email ]],
    });
    console.log(this.loginForm);
  }

  login() {
    this.auth.login(this.loginForm.get('login').value , this.password, this.email, this.loginSuccess, this.loginFailure);
  }
}
