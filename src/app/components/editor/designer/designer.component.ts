import { Component }  from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { LeftSidebarComponent } from './sidebar/left-sidebar/left-sidebar.component';

import { AfterViewInit, ViewChild } from '@angular/core';
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

    dragulaService.setOptions('item-bag', {
      copy: true,
      accepts: function (el, target) {
        return target.classList.contains("gu-droppable");
      },
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
    let [e, el] = args;
    if (el == null)
      return;
    el.removeChild(e);
    if (["board3x3", "board1x9", "pawnWhite", "pawnBlack"].indexOf(e.id) !== -1)
      this.childLeftSidebar.addObject(e.id);
  }
}
