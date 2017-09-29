import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector  : 'ia-app',
  templateUrl  : './app.component.html',
  styleUrls    : [
    './app.component.css',
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
    localStorage.setItem('jwt', JSON.stringify('foo'));
  }

  forceLogout() {
    localStorage.removeItem('jwt');
    this.router.navigate['/login'];
  }
}
