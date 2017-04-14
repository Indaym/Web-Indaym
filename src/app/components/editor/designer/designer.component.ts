import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';
import { DND_PROVIDERS }          from "ng2-dnd";

import { GameControllerService }  from '../../../../services/gameController.service';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css')
  ],
  providers : [ DND_PROVIDERS ],
})
export class DesignerComponent {
  private dispatcher: EventDispatcher;
  public gameController;

  constructor(private gameControllerService:GameControllerService) {
    this.dispatcher = new EventDispatcher();
    this.gameController = gameControllerService.gameController;
  }
}
