//
// created by djavrell on Thu Jun 22 2017
//


import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE
}                 from '../';

export class SecondRule extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'rule2';
    this._description = `this is a test2 rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(): boolean {
    return true;
  }
}