/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit,
}                         from '@angular/core';

import {
  HtmlService,
  GameControllerService,
}                         from '../../../../../../services';
import { buttonsDefault } from '../../../../../../models';

@Component({
  selector  : 'ia-left-sidebar',
  providers : [HtmlService],
  template  : require('./left-sidebar.component.html'),
  styles    : [
    require('./left-sidebar.component.css'),
    require('../sidebars.css'),
  ],
})
export class LeftSidebarComponent implements OnInit {
  @Input() public start;
  public items = {
    boards: {
      'board3x3': 'Add Board 3x3',
      'board1x9': 'Add Board 1x9',
      'case': 'Case',
    },
    pawns: {
      'pawnWhite': 'Add White Pawn',
      'pawnBlack': 'Add Black Pawn',
    },
  };
  private gameController;

  constructor(public html: HtmlService, private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
  }

  public ngOnInit() {}

  public addObject(name: string) {
    if (name !== undefined)
      this.gameController.addObject(buttonsDefault[name], true, 'Both');
  }

  private toggleMode() {
    this.start.mode = (this.start.mode === 'side') ? 'over' : 'side';
  }
}
