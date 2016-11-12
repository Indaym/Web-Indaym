/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit
}                   from '@angular/core';
import { Vector3 }  from 'three';

import {
  SceneViewer,
  BoardModelViewer,
  PionModelViewer
}                   from '../../../../threed-viewer';

//<select #kk="ngModel" [(ngModel)]="kind" (ngModelChange)="onKindSelected()">
//<option *ngFor="#p of kinds" [value]="p">{{p}}</option>
//</select>
//{{ kk.valid }}

@Component({
  selector: 'ia-viewer',
  template: require('./viewer.component.html'),
  styles: [
    require('./viewer.component.css'),
  ]
})
export class ViewerComponent implements OnInit {
  private scene: SceneViewer;

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
  }

  addSquareBoard() {
    const board = new BoardModelViewer({
      dimension: [32.6, 2.0, 32.6]
    });
    board.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }

  addLongBoard() {
    const board = new BoardModelViewer({
      dimension: [77.8, 2.0, 12.2],
    });
    board.texturesPaths[2] = 'pion_table.png';
    board.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });

  }

  addBlackPion() {
    const pion = new PionModelViewer({
      dimension: [3.5, 3.5, 1.5]
    });
    pion.texturesPaths[0] = 'black.png';
    pion.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
  }

  addWhitePion() {
    const pion = new PionModelViewer({
      dimension: [3.5, 3.5, 1.5]
    });
    pion.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });

  }
}
