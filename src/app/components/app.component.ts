import { Component }  from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector  : 'ia-app',
  template  : require('./app.component.html'),
  styles    : [
    require('./app.component.css'),
  ],
  providers : [],
})
export class AppComponent {
  constructor(private router: Router) {}
  
  forceLogin() {
    localStorage.setItem('jwt', 'foo');
  }

  forceLogout() {
    localStorage.removeItem('jwt');
    this.router.navigate['/login'];
  }
}
