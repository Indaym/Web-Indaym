/**
 * Created by Caro on 10/06/2017.
 */

import {
    Component,
    Input,
    OnInit,
}                           from '@angular/core';

import {
    HtmlService,
    GameControllerService,
}                           from '../../../../../services';

import {
  BaseRules,
  RULE_TYPE,
}                           from '../../../../../rules/';

export {
  SceneViewer,
  ModelViewer,
}                           from '../../../../../threed-viewer';

@Component({
  selector  : 'ia-left-bar',
  providers : [HtmlService],
  templateUrl   : './left-bar.component.html',
  styleUrls    : [
    './left-bar.component.css',
    '../../../designer/sidebar/sidebars.css',
  ],
})
export class LeftBarComponent implements OnInit {
  @Input() menu;
  @Input() eventDispatcher;
  @Input() selectRules;
  @Input() objs;

  private gameController;

  constructor(public html: HtmlService, private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
  }

  ngOnInit() {}

  private toggleMode() {
    this.menu.mode = (this.menu.mode === 'side') ? 'over' : 'side';
  }

  private loadRules(objId) {
    this.selectRules(objId);
    document.getElementById('previousContainer')
      .innerHTML = '<div>Rules currently applied to this item: </div><div id="previousRules"></div>';
    document.getElementById('rulesContainer').innerText = '';
    if (this.objs !== undefined && this.objs !== null) {
      for (const obj of this.objs) { // Objects
        if (obj.uuid === objId && obj.rules !== undefined && obj.rules !== null) { // selected obj
          const arr = Object.values(obj.rules);

          console.log(obj.rules); // test
          for (const r of arr) {
            // rules already on the selected object:
            /* if (r.name != "rule")
            { */

              console.log(r.name);
              document.getElementById('previousContainer').innerText += r.id + '\n';
            /* } */
          }
        }
      }

    }
  }
}
