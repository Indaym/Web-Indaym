import { Injectable }   from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
}                       from '@angular/router';
import { Observable }   from 'rxjs';

import { AuthService }  from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLogin)
      return true;
    this.router.navigate(['/login']);
    return false;
  }
}
