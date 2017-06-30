import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class MoveForward extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'MoveForward';
    this._name = 'Move Forward';
    this._description = `this is a rules for moving Forward`;
    this._ruleType = RULE_TYPE.default;
  }



  public run(): boolean {
    if (!this._refScene._hovered._mesh.LinkModel.object.coord) {
      return false;
    }
    if (this._refScene._hovered._mesh.LinkModel.object.empty == true) {
      this._refScene._hovered._mesh.LinkModel.object.empty = false;
      return true;
    }
    return false;
  }
}
