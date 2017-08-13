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

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../../../../../rules/';

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
    this.selectRules(objId);

    document.getElementById("previousRules").innerText = "";
    if (this.objs !== undefined && this.objs !== null) {
      for (let obj of this.objs) // objets
      {
        if (obj.uuid === objId && obj.rules !== undefined && obj.rules !== null) // selected obj
        {
          let arr = Object.values(obj.rules);

          console.log(obj.rules); // test
          for (let r of arr)
          {
            // rules already on the selected object:
            if (r.name != "rule")
            {
              console.log(r.name);
              document.getElementById("previousRules").innerText += r.name + '\n';
            }
          }
        }
      }

    }
  }
}
