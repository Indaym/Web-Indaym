/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  Input
}                   from '@angular/core';
import { Vector3 }  from 'three';

import {
  SceneViewer,
  BoardModelViewer,
  PionModelViewer
}                   from '../../../../threed-viewer';

@Component({
  selector  : 'ia-viewer',
  template  : require('./viewer.component.html'),
  styles    : [
    require('./viewer.component.css'),
  ]
})
export class ViewerComponent implements OnInit {
  public scene: SceneViewer;
  @Input() eventDispatcher;
  private objects = {
    "board3x3" : (args:any) => this.addSquareBoard(args),
    "board1x9" : (args:any) => this.addLongBoard(args),
    "pawnWhite" : (args:any) => this.addWhitePion(args),
    "pawnBlack" : (args:any) => this.addBlackPion(args)
  };

  ngOnInit(): void {
    this.scene = new SceneViewer({
      width: 1500,
      height: 900
    });
    this.scene.container = 'editorContainer';
    this.scene.cameraPosition = new Vector3(0, 50.0, 0);
    this.scene.cameraTarget = new Vector3(0, 0, 0);
    this.scene.render();
    this.scene.animate();
    this.scene.domElement.addEventListener('mousedown', (event) => {
      this.scene.onMouseDown(event)
    }, false);

    this.scene.eventDispatcher = this.eventDispatcher;
    this.eventDispatcher.addEventListener('addObject', (obj:any) => {
      if (obj.name != undefined)
        this.objects[obj.name]();
    });
  }

  addObject(args:any) {
    if (args.mouseEvent != undefined) {
      let coord = this.scene.setIntersection(args.mouseEvent);
      if (args.dragData != undefined) {
        this.objects[args.dragData](coord);
      }
    }
  }

  addSquareBoard(position:Vector3 = new Vector3(0,0,0)) {
    const board = new BoardModelViewer({
      dimension: [32.6, 2.0, 32.6],
    });
    board.position.copy(position);
    board.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }

  addLongBoard(position:Vector3 = new Vector3(0,0,0)) {
    const board = new BoardModelViewer({
      dimension: [77.8, 2.0, 12.2],
    });
    board.position.copy(position);
    board.texturesPaths[2] = 'pion_table.png';
    board.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }

  addBlackPion(position:Vector3 = new Vector3(0,0,0)) {
    const pion = new PionModelViewer({
      dimension: [3.5, 3.5, 1.5],
    });
    pion.position.copy(position);
    pion.texturesPaths[0] = 'black.png';
    pion.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }

  addWhitePion(position:Vector3 = new Vector3(0,0,0)) {
    const pion = new PionModelViewer({
      dimension: [3.5, 3.5, 1.5],
    });
    pion.position.copy(position);
    pion.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }
}
