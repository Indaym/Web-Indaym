import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class ChangeColor extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'ChangeColor';
    this._name = 'Change Color';
    this._description = `this is a rules for changing color with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }



  public run(): boolean {
    console.log(this._refObj);
    return true;
  }
}
