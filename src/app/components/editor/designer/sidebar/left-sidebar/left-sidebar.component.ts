/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input
}                   from '@angular/core';

import { Vector3 }  from 'three';

import {
  SceneViewer,
  BoardModelViewer,
  PionModelViewer
}                   from '../../../../../threed-viewer';

import { ViewerComponent } from '../../viewer/viewer.component';

import { SCENE } from '../../viewer/viewer.component';

@Component({
  selector  : 'ia-left-sidebar',
  template  : require('./left-sidebar.component.html'),
  styles    : [
    require('./left-sidebar.component.css'),
    require('../sidebars.css')
  ]
})
export class LeftSidebarComponent {
  @Input() start;

  private scene = null;

  constructor() {
  }

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
    // this.start.mode = (this.start.mode == 'push' ? 'over' : (this.start.mode == 'over' ? 'side' : 'push'));
  }

    addSquareBoard() {
      if (this.scene == null && SCENE != null)
         this.scene = SCENE;
      const board = new BoardModelViewer({
        dimension: [32.6, 2.0, 32.6]
      });
      board.init((mesh) => {
        this.scene.addInScene(mesh);
        this.scene.render();
      });
    }

    addLongBoard() {
      if (this.scene == null && SCENE != null)
         this.scene = SCENE;
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
      if (this.scene == null && SCENE != null)
         this.scene = SCENE;
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
      if (this.scene == null && SCENE != null)
         this.scene = SCENE;
      const pion = new PionModelViewer({
        dimension: [3.5, 3.5, 1.5]
      });
      pion.init((mesh) => {
        this.scene.addInScene(mesh);
        this.scene.render();
      });
  }
}
