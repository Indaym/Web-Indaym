/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit,
}                               from '@angular/core';

import {
  GameControllerService,
  GridCreationService,
}                               from '../../../../../services';
import { buttonsDefault }       from '../../../../../models';
import { OverridePanelClosing } from '../overridePanelClosing';

@Component({
  selector  : 'ia-left-sidebar',
  providers : [],
  templateUrl   : './left-sidebar.component.html',
  styleUrls    : [
    '../sidebars.scss',
    './left-sidebar.component.scss',
  ],
})
export class LeftSidebarComponent extends OverridePanelClosing implements OnInit {
  @Input() public start;
  @Input() public eventDispatcher;
  public items = {
    boards: {
      'board': 'Board',
      'case': 'Case',
      'grid': 'Grid',
    },
    pawns: {
      'pawnWhite': 'White Pawn',
      'pawnBlack': 'Black Pawn',
    },
    cards: {},
    dices: {},
  };

  private gameController;

  constructor(
    private gameControllerService: GameControllerService,
    private gridCreationService: GridCreationService,
  ) {
    super();
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
