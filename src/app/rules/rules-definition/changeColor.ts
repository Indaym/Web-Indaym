import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class ChangeColor extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'ChangeColor';
    this._name = 'Change Color';
    this._description = `this is a rules for changing color with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }



  public run(): boolean {
    this._refScene._selected.object.material.color.setHex(this._configuration.color);
    return true;
  }
}
