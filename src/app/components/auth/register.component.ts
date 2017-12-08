import {
  Component,
  OnInit,
}                         from '@angular/core';
import { Router }         from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
}                         from '@angular/forms';

import { AuthService }    from '../../services';

import { AuthValidator }  from './AuthValidators';
import { ErrorMatcher }   from './ErrorMatcher';
import { setTimeout } from 'timers';

@Component({
  selector: 'ia-register',
  providers: [ AuthService ],
  templateUrl: './register.component.html',
  styleUrls: [
    './auth.css',
  ],
})
export class RegisterComponent implements OnInit {
  private authValidator: AuthValidator = new AuthValidator();

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  registerForm: FormGroup;

  username: string;
  password: string;
  confirmation_password: string;
  email: string;

  matcher: ErrorMatcher = new ErrorMatcher();

  submitted = false;
  success = false;
  hasError = false;
  pwdIsOk = true;
  errors: Array<string>;
  error: string;

  registerSuccess = (data) => {
    this.submitted = false;
    this.success = true;
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }

  registerFailure = (err) => {
    if (typeof err.error === 'string') this.error = err.error;
    if (typeof err.error === 'object') this.errors = err.error.message;
    this.hasError = true;
    this.submitted = false;
  }

  ngOnInit() {
    this.submitted = false;
    this.auth.reset();
    this.registerForm = this.fb.group({
      'username': [ this.username, Validators.required ],
      'email': [ this.email, [ Validators.required, Validators.email ] ],
      'passwords': this.fb.group({
        'password': [ this.password, Validators.required ],
        'confirm_password': [ this.confirmation_password, Validators.required ],
      }, { validator: this.authValidator.checkPassword }),
    });
  }

  register() {
    this.submitted = true;
    this.auth.register(
      this.registerForm.get('username').value,
      this.registerForm.get('passwords').get('password').value,
      this.registerForm.get('email').value,
      this.registerSuccess,
      this.registerFailure,
    );
  }
}
