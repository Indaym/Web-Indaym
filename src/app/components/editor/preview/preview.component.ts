/**
 * Created by nicolas on 14/04/17.
 */

import {
  Component,
  OnInit,
  OnDestroy
}                                 from '@angular/core';
import { EventDispatcher }        from 'three';

import { GameControllerService }  from '../../../../services/gameController.service';
import { PlayerViewer }           from '../../../threed-viewer'

@Component({
  selector  : 'ia-preview',
  template  : require('./preview.component.html'),
  styles    : [
    require('./preview.component.css')
  ],
  providers : [],
})
export class PreviewComponent implements OnInit, OnDestroy {
  private gameController;
  private scene:PlayerViewer;

  constructor(private gameControllerService:GameControllerService) {
    this.gameController = gameControllerService.gameController;
  }

  ngOnInit(): void {
    this.scene = new PlayerViewer({
      width: 1500,
      height: 900
    });
    this.scene.defaultLoad('previewContainer');
    this.scene.eventDispatcher = new EventDispatcher();
    // this.scene.domElement.addEventListener('mousedown', (event) => {
    //   this.scene.onMouseDown(event)
    // }, false);
  }

  ngOnDestroy() {

  }
}
