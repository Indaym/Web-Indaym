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


export class ChangeColor extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'ChangeColor';
    this._name = 'Change Color';
    this._description = `This is a rule to change color with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    this._refScene._selected.object.material.color.setHex(this._configuration.color);
    return true;
  }
}
