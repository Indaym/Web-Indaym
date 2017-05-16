import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';
import { DND_PROVIDERS }          from 'ng2-dnd';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css'),
  ],
  providers : [ DND_PROVIDERS ],
})
export class DesignerComponent {
  private dispatcher: EventDispatcher;

  constructor() {
    this.dispatcher = new EventDispatcher();
  }
}
