/**
 * Created by nicolas on 14/04/17.
 */

import {
  Component,
  OnInit,
  OnDestroy,
}                           from '@angular/core';
import { EventDispatcher }  from 'three';

import {
  GameControllerService,
  TextureService,
}                           from '../../../services';
import { RulesInterface }   from './rulesInterface';
import {
  PlayerViewer,
  ModelsLoader,
}                           from '../../../threed-viewer';

@Component({
  selector  : 'ia-preview',
  templateUrl   : './preview.component.html',
  styleUrls    : [
    './preview.component.css',
  ],
  providers : [],
})
export class PreviewComponent implements OnInit, OnDestroy {
  private gameController;
  private scene: PlayerViewer;
  private modelsLoader: ModelsLoader;
  private rulesInterface: RulesInterface;

  constructor(private gameControllerService: GameControllerService, private textureService: TextureService) {
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
    this.modelsLoader = new ModelsLoader(this.scene, this.textureService);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);
  }

  public ngOnDestroy() {}

/**
 * Auto recreate Dames game
 */
  private regeneratePawns(gridPosition) {
    const obj = {
      name: 'pawn',
      object: {
        type: 'pawn',
        draggable: true,
        droppable: false,
        dimension: [3.5, 1.5, 3.5],
        position: [0, gridPosition.y + 0.75, 0],
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
          obj.object.position[0] = gridPosition.x + x * 8.2 + 4.1 - 41;
          obj.object.position[2] = gridPosition.z + z * 8.2 + 4.1 - 41;
          this.gameController.addObject(obj, true, 'Both');
        }
      }
    }
  }
}
