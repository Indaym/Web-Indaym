/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input
}                       from '@angular/core';
import { HtmlService } from "../../../../../../services/html.service";

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
  @Input() eventDispatcher;
  items = {
    boards: {
      "board3x3": "Add Board 3x3",
      "board1x9": "Add Board 1x9",
    },
    pawns: {
      "pawnWhite": "Add White Pawn",
      "pawnBlack": "Add Black Pawn",
    }
  };

  constructor(public html: HtmlService) {}

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
  }

  public addObject(name:string) {
    this.eventDispatcher.dispatchEvent({type:"addObject", name:name});
  }
}



