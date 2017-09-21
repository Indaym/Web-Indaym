import { Component }            from '@angular/core';
import { EventDispatcher }      from 'three';
import { DND_PROVIDERS }        from 'ng2-dnd';

import { GridCreationService }  from '../../../../services';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css'),
  ],
  providers : [ DND_PROVIDERS, GridCreationService ],
})
export class DesignerComponent {
  private dispatcher: EventDispatcher;

  // TODO : try without private declaration
  constructor(private gridCreationService: GridCreationService) {
    this.dispatcher = new EventDispatcher();
  }
}
