/**
 * Created by nicolas on 14/04/17.
 */

import {
  Component,
  OnInit,
  OnDestroy,
}                                 from '@angular/core';
import { EventDispatcher }        from 'three';

import { GameControllerService }  from '../../../../services/gameController.service';
import {
  PlayerViewer,
  ModelsLoader,
}                                 from '../../../threed-viewer';

@Component({
  selector  : 'ia-preview',
  template  : require('./preview.component.html'),
  styles    : [
    require('./preview.component.css'),
  ],
  providers : [],
})
export class PreviewComponent implements OnInit, OnDestroy {
  private gameController;
  private scene: PlayerViewer;
  private modelsLoader: ModelsLoader;

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = gameControllerService.gameController;
  }

  public ngOnInit(): void {
    const dom = document.getElementById('previewContainer');
    this.scene = new PlayerViewer({
      width: () => window.innerWidth,
      height: () => window.innerHeight - dom.offsetTop - 5,
    });
    this.scene.defaultLoad('previewContainer');
    this.scene.domElement.addEventListener('mousedown', (event) => this.scene.onMouseDown(event), false);
    this.scene.domElement.addEventListener('mousemove', (event) => this.scene.onMouseMove(event), false);
    this.scene.domElement.addEventListener('mouseup',   (event) => this.scene.onMouseUp(event), false);

    this.scene.eventDispatcher = new EventDispatcher();
    this.modelsLoader = new ModelsLoader(this.scene);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);
  }

  public ngOnDestroy() {}
}