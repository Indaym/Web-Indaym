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
  show;




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
      stock.push(new test(tmpStock[cnt].name, "app/components/editor/designer/sidebar/left-sidebar/tmp/" + tmpStock[cnt].name + ".png"));
      cnt += 1;
    }
    return (stock);
  }

  /*
    // code a caro ou nico que j'ai laissé au merge mais qui a des erreurs (y'avait rien d'autre au merge j'ai tout laissé, juste commenté):
    public getObjectsList(queryParam) {
    this.gameId = queryParam['gameId'];
    this.sceneId = queryParam['sceneId'];
    this.objects.setIds(this.gameId, this.sceneId);
    this.lsObjects = this.objects.getObjects();
  }
    */

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
  }

  public addObject(name: string) {
    this.eventDispatcher.dispatchEvent({ type: "addObject", name: name });
  }
}

class test {
  name;
  icon;
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
}
