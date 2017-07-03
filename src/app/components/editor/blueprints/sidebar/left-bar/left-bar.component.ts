/**
 * Created by Caro on 10/06/2017.
 */

import {
    Component,
    Input, OnInit
} from '@angular/core';

import {
    HtmlService,
    GameControllerService,
} from "../../../../../../services";

@Component({
  selector  : 'ia-left-bar',
  providers : [HtmlService],
  template  : require('./left-bar.component.html'),
  styles    : [
    require('./left-bar.component.css'),
    require('../../../designer/sidebar/sidebars.css')
  ]
})
export class LeftBarComponent implements OnInit{
  @Input() menu;
  @Input() eventDispatcher;
  @Input() selectRules;
  @Input() objs;

  private gameController;

  constructor(public html: HtmlService, private gameControllerService:GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
  }

  ngOnInit() {}

  private toggleMode() {
    this.menu.mode = (this.menu.mode == 'side') ? 'over' : 'side';
  }

  private loadRules(objId) {
    console.log("hello nico" + objId);
    this.selectRules(objId);
  }
}