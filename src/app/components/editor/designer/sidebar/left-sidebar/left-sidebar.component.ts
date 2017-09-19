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
  providers : [ HtmlService ],
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
      'board10x10': 'Add Board 10x10',
      'case': 'Case',
      'grid': 'Grid',
      'grid10x10': 'Grid 10x10',
    },
    pawns: {
      'pawnWhite': 'Add White Pawn',
      'pawnBlack': 'Add Black Pawn',
    },
  };

  private gameController;
  private objects;
  private show;
  private readonly icons = ['board3x3', 'board1x9', 'blackpawn', 'whitepawn'];

  constructor(public html: HtmlService, private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
  }

  public ngOnInit() {
    this.objects = this.gameController.getObjects();
    this.show = this.setIcons();
  }

  public addObject(name: string) {
    if (name !== undefined)
      this.gameController.addObject(buttonsDefault[name], true, 'Both');
  }

  private setIcons() {
    let obj;
    let stock = [];

    this.objects = this.gameController.getObjects();
    for (let elem of this.objects) {
      obj = { name: elem.name };
      if (this.icons.indexOf(elem.name) >= 0)
        obj['icon'] = '/assets/icons/' + elem.name + '.png';
      stock.push(obj);
    }
    return stock;
  }

  private toggleMode() {
    this.start.mode = (this.start.mode === 'side') ? 'over' : 'side';
  }
}
