import { Component }        from '@angular/core';
import { EventDispatcher }  from 'three';

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
