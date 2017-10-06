import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { AuthService }  from '../../services';

@Component({
  selector: 'ia-auth-button',
  templateUrl: './authButtons.component.html',
  styleUrls: [],
})
export class AuthButtonsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private _isLoged: boolean;

  get isLoged() {
    return this.authService.isLogin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
