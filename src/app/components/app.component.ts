import { Component }        from '@angular/core';
import { Router }           from '@angular/router';

import { SnackBarService }  from '../services';

@Component({
  selector  : 'ia-app',
  templateUrl  : './app.component.html',
  styleUrls    : [
    './app.component.css',
  ],
  providers : [SnackBarService],
})
export class AppComponent {
  constructor(private router: Router) {
    // Marre des warn de threejs souvent inutiles
    console.warn = () => {};
    // Image in localStorage seems to slow browser
    // localStorage.clear();
  }
}
