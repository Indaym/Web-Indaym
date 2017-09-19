import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services';

@Component({
  selector: 'ia-login',
  providers: [ AuthService ],
  templateUrl: require('./login.component.html'),
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  loading = false;
  username: string;
  password: string;
  email: string;
  error = '';

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.loading = true;
    this.auth.login(this.username, this.password, this.email)
      .subscribe((result) => {
        if (result === true)
          this.router.navigate['/login'];
        this.error = 'Username, email or passowrd are incorrect';
        this.loading = false;
      });
  }
}