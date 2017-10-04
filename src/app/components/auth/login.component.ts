import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from '../../services';

@Component({
  selector: 'ia-login',
  providers: [ AuthService ],
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  hasError = false;
  username: string;
  password: string;
  email: string;
  error = 'plop';

  loginSuccess = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data.token || {}));
    this.router.navigate(['/home']);
  }

  loginFailure = (err) => {
    const data = err.json();
    this.error = data.code;
    this.hasError = true;
  }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.auth.login(this.username, this.password, this.email, this.loginSuccess, this.loginFailure);
  }
}
