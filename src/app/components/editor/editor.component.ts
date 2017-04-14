import { Component }              from '@angular/core';

import { GameControllerService }  from '../../../services/gameController.service';

@Component({
  selector  : 'ia-editor',
  template  : require('./editor.component.html'),
  styles    : [
    require('./editor.component.css')
  ],
  providers : [GameControllerService],
})
export class EditorComponent {
  constructor(private gameControllerService:GameControllerService) {
  }
}
