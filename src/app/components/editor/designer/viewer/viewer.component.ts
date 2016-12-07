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

export var SCENE = null;

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
  public scene: SceneViewer;

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

    SCENE = this.scene;
  }
}
