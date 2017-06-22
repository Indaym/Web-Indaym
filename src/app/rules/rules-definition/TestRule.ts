//
// created by djavrell on Thu Jun 22 2017
//

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE
}                 from '../';

export class TestRule extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'TestRule';
    this._description = `this is a test rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(): boolean {
    return true;
  }
}