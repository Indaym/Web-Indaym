import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { AuthService }  from '../../services';

@Component({
  selector: 'ia-auth-button',
  templateUrl: './authButtons.component.html',
  styleUrls: [
    '../app.component.scss',
  ],
})
export class AuthButtonsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private _isLogged: boolean;

  get isLogged() {
    return this.authService.isLogin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
