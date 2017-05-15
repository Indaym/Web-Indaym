/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input, OnInit
} from '@angular/core';

import {
  HtmlService,
  GameControllerService
} from "../../../../../../services";

@Component({
  selector  : 'ia-left-sidebar',
  providers : [HtmlService],
  template  : require('./left-sidebar.component.html'),
  styles    : [
    require('./left-sidebar.component.css'),
    require('../sidebars.css')
  ]
})

export class LeftSidebarComponent implements OnInit{
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
  private gameController;
  private objects;
  private show;

  constructor(public html: HtmlService, private gameControllerService:GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
    this.objects = this.gameController.getObjects();
  }

  ngOnInit() {
    this.show = this.setIcons();
  }

  private setIcons() {
    var obj;
    var tmp;
    var stock = [];

    var cnt = 0;
    var tmpStock = this.gameController.getObjects();

    while (cnt < tmpStock.length) {
      stock.push({
        name: tmpStock[cnt].name, 
        icon: "app/components/editor/designer/sidebar/left-sidebar/tmp/" + tmpStock[cnt].name + ".png"
      });
      cnt += 1;
    }
    return (stock);
  }

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
  }

  public addObject(name: string) {
    this.eventDispatcher.dispatchEvent({ type: "addObject", name: name });
  }
}
