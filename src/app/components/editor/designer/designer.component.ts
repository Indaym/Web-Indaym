import { Component }            from '@angular/core';
import { EventDispatcher }      from 'three';
import { providers }        from 'ng2-dnd';

import { GridCreationService }  from '../../../../services';

@Component({
  selector  : 'ia-designer',
  templateUrl   : './designer.component.html',
  styleUrls    : [
    './designer.component.css',
  ],
  providers : [ providers, GridCreationService ],
})
export class DesignerComponent {
  private dispatcher: EventDispatcher;

  // TODO : try without private declaration
  constructor(private gridCreationService: GridCreationService) {
    this.dispatcher = new EventDispatcher();
  }
}
