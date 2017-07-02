//
// created by djavrell on Thu Jun 22 2017
//

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class TestRuleTrue extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'TestRuleTrue';
    this._name = 'Test rule true';
    this._description = `this is a test rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    console.log('True');
    return true;
  }
}
