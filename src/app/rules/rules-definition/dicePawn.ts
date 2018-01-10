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

export class DicePawn extends BaseRules {
  constructor(
    scene: SceneViewer, model: ModelViewer, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'DicePawn';
    this._name = 'Dice Pawn';
    this._description = `Trigger the Dice an a Pawn`;
    this._ruleType = RULE_TYPE.default;
    this._priority = "HIGH";
  }

  public run(args?: any): boolean {
    const config = {
      duration: 6000,
      data: {},
    };
    this.snackBar.open(
      '<h4><strong class="text-info">Dice (1-' + this._configuration.dice + ') Result : </strong>' + (Math.floor(Math.random() * this._configuration.dice) + 1 + '</h4>'),
      config,
      SnackBarType.NONE,
    );
    return true;
  }
}
