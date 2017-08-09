//
// created by djavrell on Thu Jun 22 2017
//

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class TestRuleFalse extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'TestRuleFalse';
    this._description = `This is a test False rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;

  }

  public run(args?: any): boolean {
    console.log('False');
    return false;
  }
}
