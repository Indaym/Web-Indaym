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
import { Component, ViewChild }    from '@angular/core';
import { ViewerComponent } from "./viewer/viewer.component";
import { EventDispatcher } from 'three';

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
  private childLeftSidebar : LeftSidebarComponent;
  private dispatcher: EventDispatcher;

  constructor(private dragulaService: DragulaService) {
    this.dispatcher = new EventDispatcher();

    if (dragulaService.find("first-bag") == null)
    {
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
  }

  private onDrag(args) {
    // rendre le bouton draggé invisible
    let [e, el] = args;
   }
  private onDrop(args) {
    // supprimer le boutton droppé
    let [e, el] = args;
    if (el == null) // ne jamais enlever cette ligne
      return;
    el.removeChild(e);
    //appeler la bonne fonction
    if (e.id == "board3x3")
      this.childLeftSidebar.addSquareBoard(SCENE);
    else if (e.id == "board1x9")
      this.childLeftSidebar.addLongBoard(SCENE);
    else if (e.id == "pawnWhite")
      this.childLeftSidebar.addWhitePion(SCENE);
    else if (e.id == "pawnBlack")
      this.childLeftSidebar.addBlackPion(SCENE);
  }
}
