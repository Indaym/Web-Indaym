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
  constructor(private router: Router) {
    // Marre des warn de threejs souvent inutiles
    console.warn = () => {};
    // Image in localStorage seems to slow browser
    // localStorage.clear();
  }
  
  forceLogin() {
    localStorage.setItem('jwt', 'foo');
  }

  forceLogout() {
    localStorage.removeItem('jwt');
    this.router.navigate['/login'];
  }
}
