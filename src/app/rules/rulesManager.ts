// 
// created by djavrell on Fri Jun 02 2017 
// 

import { OnInit }           from '@angular/core';
import { EventDispatcher }  from 'three';
import { PlayerViewer }     from '../threed-viewer';
import { BaseRules }        from './baseRules';

export class RuleManager implements OnInit {
  private _distpatcher: EventDispatcher;
  private _scene: PlayerViewer;
  private _rules: Array<BaseRules> = [];

  constructor() {
    this._distpatcher = new EventDispatcher();
  }

  public ngOnInit() {
    this._distpatcher.addEventListener('callRules', (obj: any) => {});
  }

  public registerRule(rule: BaseRules) {
    this._rules.push(rule);
  }

  public getRuleId(id): Array<BaseRules> {
    return this._rules.filter((rule) => rule.id === id);
  }

  set scene(scene: PlayerViewer) {
    this._scene = scene;
  }
}
