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

import {
  SnackBarService,
}                           from '../../services';

export class TestRuleTrue extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'TestRuleTrue';
    this._name = 'Test Rule True';
    this._description = `This is a test True rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    console.log('True');
    return true;
  }
}
