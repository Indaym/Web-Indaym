import {
  Component,
  OnInit,
}                  from '@angular/core';
import { Router }  from '@angular/router';

import { AuthService } from '../../services';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
}                       from '@angular/forms';
import { ErrorMatcher } from './ErrorMatcher';

@Component({
  selector: 'ia-register',
  providers: [ AuthService ],
  templateUrl: './register.component.html',
  styleUrls: [
    // './login.component.css',
  ],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  registerForm: FormGroup;
  matcher: ErrorMatcher = new ErrorMatcher();

  success = false;
  hasError = false;
  pwdIsOk = true;
  error = '';
  username: string;
  password: string;
  confirmation_password: string;
  email: string;

  registerSuccess = (data) => {
    this.success = true;
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }

  registerFailure = (err) => {
    const body = err.json();
    this.error = body.code;
    this.hasError = true;
  }

  checkPassword(control: AbstractControl): { [key: string]: any } {
    const p1 = control.get('password').value;
    const p2 = control.get('confirm_password').value;
    if (p1 === p2) return null;
    return { nomatch: true };
  }

  ngOnInit() {
    this.auth.reset();
    this.registerForm = this.fb.group({
      'username': [ this.username, Validators.required ],
      'email': [ this.email, [ Validators.required, Validators.email ] ],
      'passwords': this.fb.group({
        'password': [ this.password, Validators.required ],
        'confirm_password': [ this.confirmation_password, Validators.required ],
      }, { validator: this.checkPassword }),
    });
  }

  register() {
    console.log(this.registerForm);
    this.hasError = false;
    if (this.password !== this.confirmation_password) {
      this.pwdIsOk = false;
      return;
    }

    this.auth.register(this.username, this.password, this.email, this.registerSuccess, this.registerFailure);
  }
}
