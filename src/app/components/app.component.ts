import { Component }  from '@angular/core';

@Component({
  selector  : 'ia-app',
  template  : require('./app.component.html'),
  styles    : [
    require('./app.component.css'),
  ],
  providers : [],
})
export class AppComponent {
  constructor() {
    // Marre des warn de threejs souvent inutiles
    console.warn = () => {};
    // Image in localStorage seems to slow browser
    // localStorage.clear();
  }
}
