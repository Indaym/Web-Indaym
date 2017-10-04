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
  error = '';

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.hasError = true;
    this.auth.login(this.username, this.password, this.email,
      (res) => this.error = res.statusText,
      (res) => {
        const data = JSON.parse(res);
        localStorage.setItem('jwt', data.token);
        this.router.navigate(['/home']);
    });
  }
}
