import {
  RULE_TYPE,
  BaseRules,
}               from '../baseRules';

import {
  SceneViewer,
  ModelViewer,
}               from '../../threed-viewer';

import {
  SnackBarService,
}                           from '../../services';


export class ChangeTurn extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'ChangeTurn';
    this._name = 'Change Turn rules';
    this._description = `In this rule you can set the number of player and the number of time they can play`;
    this._ruleType = RULE_TYPE.default;
    this._priority = "HIGH";
  }

  public run(args?: any): boolean {
    if (this._refObj.threeDModel.oldPosition[0] === -1 && this._refObj.threeDModel.oldPosition[1] === -1)
      return true;
    if (([0, 2].includes(this._refScene.player) && this._refObj.object.team !== 0) ||
    ([1].includes(this._refScene.player) && this._refObj.object.team !== 1))
      return false;
    return true;
  }
}
