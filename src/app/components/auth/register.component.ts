import {
  Component,
  OnInit,
}                  from '@angular/core';
import { Router }  from '@angular/router';

import { AuthService } from '../../services';

@Component({
  selector: 'ia-register',
  providers: [ AuthService ],
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

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

  ngOnInit() {
    this.auth.reset();
  }

  register() {
    this.hasError = false;
    if (this.password !== this.confirmation_password) {
      this.pwdIsOk = false;
      return;
    }

    this.auth.register(this.username, this.password, this.email, this.registerSuccess, this.registerFailure);
  }
}
