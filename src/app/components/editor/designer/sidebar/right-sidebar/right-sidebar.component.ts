/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit,
}                   from '@angular/core';

import { Vector3 }  from 'three';

@Component({
  selector  : 'ia-right-sidebar',
  template  : require('./right-sidebar.component.html'),
  styles    : [
    require('./right-sidebar.component.css'),
    require('../sidebars.css'),
  ],
})
export class RightSidebarComponent implements OnInit  {
  @Input() public end;
  @Input() public eventDispatcher;
  private minimumScale = new Vector3();
  private objectSelected = {
    position: new Vector3(),
    dimension: new Vector3(),
    rotation: new Vector3(),
  };

  constructor() {
  }

  public ngOnInit() {
    this.eventDispatcher.addEventListener('setMinimumScale', (e) => {
      if (e.minimumScale !== undefined)
        this.minimumScale = e.minimumScale;
    });
    this.eventDispatcher.addEventListener('updateObjectInputs', (e) => {
      if (e.position !== undefined)
        this.objectSelected.position = e.position;
      if (e.rotation !== undefined)
        this.objectSelected.rotation = e.rotation;
      if (e.dimension !== undefined)
        this.objectSelected.dimension = e.dimension;
    });
  }

  public updateValues(type) {
    if (Object.keys(this.objectSelected).indexOf(type) === -1)
      return;
    let obj = { type : 'updateObjectView' };
    obj[type] = this.objectSelected[type];
    this.eventDispatcher.dispatchEvent(obj);
  }

  private toggleMode() {
    this.end.mode = (this.end.mode === 'side') ? 'over' : 'side';
  }
}
