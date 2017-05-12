/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input
}                                 from '@angular/core';

import {
  EditorViewer,
  ModelsLoader
}                                 from '../../../../threed-viewer';
import { GameControllerService }  from "../../../../../services/gameController.service";

@Component({
  selector  : 'ia-viewer',
  template  : require('./viewer.component.html'),
  styles    : [
    require('./viewer.component.css'),
  ]
})
export class ViewerComponent implements OnInit, OnDestroy {
  public scene: EditorViewer;
  private modelsLoader:ModelsLoader;
  private gameController;

  @Input() eventDispatcher;
  private objects = {
    "board3x3" : {
      name: 'board3x3',
      object: {
        type: 'board',
        dimension: [32.6, 2.0, 32.6],
      }
    },
    "board1x9" : {
      name: 'board1x9',
      object: {
        type: 'board',
        dimension: [77.8, 2.0, 12.2],
        texturesPaths: [
          'side.png', 'side.png',
          'pion_table.png', 'side.png',
          'side.png', 'side.png'
        ]
      }
    },
    "pawnWhite" : {
      name: 'whitepawn',
      object: {
        type: 'pawn',
        dimension: [3.5, 1.5, 3.5]
      }
    },
    "pawnBlack" : {
      name: 'blackpawn',
      object: {
        type: 'pawn',
        dimension: [3.5, 1.5, 3.5],
        texturesPaths: ['black.png']
      }
    }
  };

  constructor(private gameControllerService:GameControllerService) {
    this.gameController = gameControllerService.gameController;
  }

  saveScene() {

  // CARO Ici tu stockes la scene actuelle dans la DB
  // Faut que tu voies avec Nico comment et sous quelle forme les stocker, perso j'en ai pas la moindre idée
  }

  ngOnInit(): void {
    this.scene = new EditorViewer({
      width: 1500,
      height: 900
    });
    this.scene.defaultLoad('editorContainer');
    this.scene.domElement.addEventListener('mousedown', (event) => {
      this.scene.onMouseDown(event)
    }, false);
    this.scene.eventDispatcher = this.eventDispatcher;
    this.eventDispatcher.addEventListener('addObject', (obj:any) => {
      if (obj.name != undefined)
        this.gameController.addObject(this.objects[obj.name], true, "Both");
    });
    this.modelsLoader = new ModelsLoader(this.scene);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);
  }

  ngOnDestroy() {
  }

  addObject(args:any) {
    if (args.mouseEvent != undefined) {
      let coord = this.scene.setIntersection(args.mouseEvent);
      if (args.dragData != undefined) {
        let obj = this.objects[args.dragData];
        obj.object.position = coord.toArray();
        this.gameController.addObject(obj, true, "Both");
      }
    }
  }

  addSquareBoard(position:Vector3 = new Vector3(0,0,0)) {
    this.gameController.addObject({
      name: 'board3x3',
      object: {
        type: 'board',
        draggable: false,
        droppable: true,
        dimension: [32.6, 2.0, 32.6],
        position: position.toArray()
      }
    });
  }

  addLongBoard(position:Vector3 = new Vector3(0,0,0)) {
    this.gameController.addObject({
      name: 'board1x9',
      object: {
        type: 'board',
        draggable: false,
        droppable: true,
        dimension: [77.8, 2.0, 12.2],
        position: position.toArray(),
        texturesPaths: [
          'side.png', 'side.png',
          'pion_table.png', 'side.png',
          'side.png', 'side.png'
        ]
      }
    });
  }

  addBlackPion(position:Vector3 = new Vector3(0,0,0)) {
    this.gameController.addObject({
      name: 'blackpawn',
      object: {
        type: 'pawn',
        draggable: true,
        droppable: false,
        dimension: [3.5, 1.5, 3.5],
        position: position.toArray(),
        texturesPaths: [
          'black.png'
        ]
      }
    });
  }

  addWhitePion(position:Vector3 = new Vector3(0,0,0)) {
    this.gameController.addObject({
      name: 'whitepawn',
      object: {
        type: 'pawn',
        draggable: true,
        droppable: false,
        dimension: [3.5, 1.5, 3.5],
        position: position.toArray(),
        texturesPaths: [
          'white.png'
        ]
      }
    });
  }
}
