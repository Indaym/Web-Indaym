

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class ChangeTurn extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'ChangeTurn';
    this._name = 'Change Turn rules';
    this._description = `In this rule you can set the number of player and the number of time they can play`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    console.log(this._refObj);
    if (this._refObj.threeDModel.oldPosition[0] === -1 && this._refObj.threeDModel.oldPosition[1] === -1)
      return true;
    if ((this._refScene.player === 0 || this._refScene.player === 1) && this._refObj.name === "whitepawn")
      this._refScene.player += 1;
    else if ((this._refScene.player === 2 || this._refScene.player === 3) && this._refObj.name === "blackpawn")
    {
      this._refScene.player += 1;
      if (this._refScene.player === 4)
        this._refScene.player = 0;
    }
    else
    {
      console.log("ERROR : on changeTurn");
      console.log(this._refScene.player);
      console.log(this._refObj.name)
      return false;
    }
    console.log("Ok");
    console.log(this._refScene.player);
    console.log(this._refObj.name)
    return true;
  }
}
