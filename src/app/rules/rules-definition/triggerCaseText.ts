//
// created by djavrell on Thu Jun 22 2017
//

import {
  RULE_TYPE,
  BaseRules,
}                 from '../baseRules';

import {
  SceneViewer,
  ModelViewer,
}                 from '../../threed-viewer';

export class TriggerCaseText extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'TriggerCaseText';
    this._name = 'TriggerCaseText';
    this._description = `Trigger the text of a case`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    console.log("Case say : ", this._refScene._hovered.conf.rules[0].conf.caseText);
    return true;
  }
}
