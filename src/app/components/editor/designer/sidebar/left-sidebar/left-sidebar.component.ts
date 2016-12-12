/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input
}                   from '@angular/core';

@Component({
  selector  : 'ia-left-sidebar',
  template  : require('./left-sidebar.component.html'),
  styles    : [
    require('./left-sidebar.component.css'),
    require('../../../../../../assets/css/dragula.min.css'),
    require('../sidebars.css')
  ]
})
export class LeftSidebarComponent {
  @Input() start;
  @Input() eventDispatcher;

  constructor() {
  }

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
  }

  public addObject(name:string) {
    this.eventDispatcher.dispatchEvent({type:"addObject", name:name});
  }
}
