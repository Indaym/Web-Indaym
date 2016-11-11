import { Component }  from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
  SceneViewer,
  BoardModelViewer,
  PionModelViewer
}                     from '../../../threed-viewer';

import { LeftSidebarComponent } from './sidebar/left-sidebar/left-sidebar.component';

import { AfterViewInit, ViewChild } from '@angular/core';

import { SCENE }      from './viewer/viewer.component';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css')
  ],
  providers : []
})
export class DesignerComponent {
  @ViewChild(LeftSidebarComponent)
  private var0 : LeftSidebarComponent;

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('first-bag', {
      copy: true,
      accepts: function (el, target) {
        return target !== document.getElementById('first-bag')
      },
    });
    dragulaService.drag.subscribe((value) => {
     console.log(`drag: ${value[0]}`);
     this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  private onDrag(args) {
    // rendre le bouton draggé invisible
    let [e, el] = args;

   }
  private onDrop(args) {
    // supprimer le boutton droppé
    let [e, el] = args;
    el.removeChild(e);
    //appeler la bonne fonction
    if (e.id == "board3x3")
      this.var0.addSquareBoard();
    else if (e.id == "board1x9")
      this.var0.addLongBoard();
    else if (e.id == "pawnWhite")
      this.var0.addWhitePion();
    else if (e.id == "pawnBlack")
      this.var0.addBlackPion();
  }
}
