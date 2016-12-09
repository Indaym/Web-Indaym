import { Component, ViewChild }    from '@angular/core';
import { ViewerComponent } from "./viewer/viewer.component";
import { EventDispatcher } from 'three';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css')
  ],
  providers : []
})
export class DesignerComponent {
  private dispatcher: EventDispatcher;

  constructor() {
    this.dispatcher = new EventDispatcher();
  }
}
