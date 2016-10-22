/**
 * Created by nicolas on 22/10/16.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ia-right-sidebar',
  template: require('./right-sidebar.component.html'),
  styles: [
    require('./right-sidebar.component.css'),
    require('../sidebars.css')

  ]
})
export class RightSidebarComponent {
  @Input() end;

  constructor() {
  }

  private toggleMode() {
    this.end.mode = (this.end.mode == 'side') ? 'over' : 'side';
//    this.end.mode = (this.end.mode == 'push' ? 'over' : (this.end.mode == 'over' ? 'side' : 'push'));
  }
}
