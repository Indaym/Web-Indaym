/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit
}                   from '@angular/core';

import { Vector3 }  from 'three';

@Component({
  selector  : 'ia-right-sidebar',
  template  : require('./right-sidebar.component.html'),
  styles    : [
    require('./right-sidebar.component.css'),
    require('../sidebars.css')
  ]
})
export class RightSidebarComponent implements OnInit  {
  @Input() end;
  @Input() eventDispatcher;
  private objectSelected = {
    position: new Vector3(0, 0, 0),
    dimension: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0)
  };

  constructor() {
  }

  ngOnInit() {
    this.eventDispatcher.addEventListener("updateObjectInputs", (e) => {
      if (e.position !== undefined)
        this.objectSelected.position = e.position;
      if (e.rotation !== undefined)
        this.objectSelected.rotation = e.rotation;
      if (e.dimension !== undefined)
        this.objectSelected.dimension = e.dimension;
    });
  }

  private toggleMode() {
    this.end.mode = (this.end.mode == 'side') ? 'over' : 'side';
  }

  public changePosition() {
    this.eventDispatcher.dispatchEvent({type:"updateObjectView", position: this.objectSelected.position});
  }

  public changeRotation() {
    this.eventDispatcher.dispatchEvent({type:"updateObjectView", rotation: this.objectSelected.rotation});
  }

  public changeDimension() {
    this.eventDispatcher.dispatchEvent({type:"updateObjectView", dimension: this.objectSelected.dimension});
  }

}
