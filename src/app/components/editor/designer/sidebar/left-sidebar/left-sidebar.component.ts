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
  GridCreationService,
}                         from '../../../../../services';
import { buttonsDefault } from '../../../../../models';

@Component({
  selector  : 'ia-left-sidebar',
  providers : [ HtmlService ],
  templateUrl   : './left-sidebar.component.html',
  styleUrls    : [
    './left-sidebar.component.css',
    '../sidebars.css',
  ],
})
export class LeftSidebarComponent implements OnInit {
  @Input() public start;
  @Input() public eventDispatcher;
  public items = {
    boards: {
      'board': 'Add Board',
      'case': 'Case',
      'grid': 'Grid',
    },
    pawns: {
      'pawnWhite': 'Add White Pawn',
      'pawnBlack': 'Add Black Pawn',
    },
  };

  private gameController;

  constructor(
    public html: HtmlService,
    private gameControllerService: GameControllerService,
    private gridCreationService: GridCreationService,
  ) {
    this.gameController = this.gameControllerService.gameController;
  }

  public ngOnInit() {}

  public addObject(name: string) {
    if (name !== undefined && buttonsDefault[name] !== undefined) {
      const model = Object.assign({}, buttonsDefault[name]);
      const cb = (datas) => {
        if (name === 'grid')
          this.gridCreationService.assignToGridModel(model, datas);
        this.gameController.addObject(model, true, 'Both');
      };
      if (name === 'grid')
        this.gridCreationService.open(cb);
      else
        cb({});
    }
  }

  private toggleMode() {
    this.start.mode = (this.start.mode === 'side') ? 'over' : 'side';
  }
}
