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

import { SnackBarType }   from '../../components/snackBar';

export class TriggerCaseText extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'TriggerCaseText';
    this._name = 'TriggerCaseText';
    this._description = `Trigger the text of a case`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    if (!this._refScene._hovered.conf.rules[0])
      return true;
    const config = {
      duration: 6000,
      data: {},
    };
    this.snackBar.open(
      '<h4><strong class="text-info">Case say : </strong>' + this._refScene._hovered.conf.rules[0].conf.caseText + '</h4>',
      config,
      SnackBarType.NONE,
    );
    return true;
  }
}
