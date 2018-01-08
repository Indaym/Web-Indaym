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

export class DicePawn extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'DicePawn';
    this._name = 'Dice Pawn';
    this._description = `Trigger the Dice an a Pawn`;
    this._ruleType = RULE_TYPE.default;
    this._priority = "HIGH";
  }

  public run(args?: any): boolean {
    console.log(Math.floor(Math.random() * this._configuration.dice) + 1  );
    return true;
  }
}
