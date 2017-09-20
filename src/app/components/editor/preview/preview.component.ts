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
import { RulesInterface }         from '.';
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
  private rulesInterface: RulesInterface;

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = gameControllerService.gameController;
    this.rulesInterface = new RulesInterface();
  }

  public ngOnInit(): void {
    const dom = document.getElementById('previewContainer');
    this.scene = new PlayerViewer({
      width: () => window.innerWidth,
      height: () => window.innerHeight - dom.offsetTop - 5,
    }, this.rulesInterface);

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

/**
 * Auto recreate Dames game
 */
  private regenerateAll() {
    // Add board
    this.gameController.addObject({
      name: 'board10x10',
      object: {
        type: 'board',
        draggable: false,
        droppable: true,
        dimension: [90,2,90],
        texturesPaths: ['side.png','side.png','board10.png','side.png','side.png','side.png'],
        position: [0,0,0],
      },
    }, true, 'Both');

    // Add Grid
    this.gameController.addObject({
      name: 'grid',
      object: {
        type: 'grid',
        draggable: false,
        droppable: false,
        position: [0,1.01,0],
        caseX: 10,
        caseY: 10,
        caseWidth: 8,
        caseHeight: 8,
        gap: 0.2,
      },
    }, true, 'Both');
    const obj = {
      name: 'pawn',
      object: {
        type: 'pawn',
        draggable: true,
        droppable: false,
        dimension: [3.5, 1.5, 3.5],
        position: [0, 1.75, 0],
        texturesPaths: ['black.png'],
        rules: [
          {id: 'MoveDiag', conf: { movement: 1 }},
        ],
      },
    };
    for (let z = 0; z < 10; z++) {
      for (let x = 0; x < 10; x++) {
        if (z > 5)
          obj.object.texturesPaths = ['white.png'];
        if (x % 2 + z % 2 === 1 && z !== 4 && z !== 5) {
          obj.object.position[0] = x * 8.2 + 4.1 - 41;
          obj.object.position[2] = z * 8.2 + 4.1 - 41;
          this.gameController.addObject(obj, true, 'Both');
        }
      }
    }
  }
}
