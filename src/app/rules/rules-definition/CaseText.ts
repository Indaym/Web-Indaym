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


export class CaseText extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'CaseText';
    this._name = 'Case Text';
    this._description = `Add a text to a Case`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    console.log(this._refScene);
    console.log('Case');
    return true;
  }
}
