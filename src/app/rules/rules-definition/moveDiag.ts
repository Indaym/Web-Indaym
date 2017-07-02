import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class MoveDiag extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'MoveDiag';
    this._name = 'Move Diagonal';
    this._description = `this is a rules for moving in diagonal`;
    this._ruleType = RULE_TYPE.default;
  }



  public run(): boolean {
    if (!this._refScene._hovered._mesh.LinkModel.object.coord) {
      return false;
    }
    let xOld = this._refObj.threeDModel._oldPosition[0];
    let yOld = this._refObj.threeDModel._oldPosition[1];
    let xNew = this._refScene._hovered._mesh.LinkModel.object.coord[0];
    let yNew = this._refScene._hovered._mesh.LinkModel.object.coord[1];
      if (xOld === -1 && yOld === -1) {
          this._refObj.threeDModel._oldPosition[0] = xNew;
          this._refObj.threeDModel._oldPosition[1] = yNew;
          return true;
      }
      if ((this._configuration.movement)
      &&  ((xOld === xNew + this._configuration.movement && yOld === yNew + this._configuration.movement)
      || (xOld === xNew - this._configuration.movement && yOld === yNew - this._configuration.movement)
      || (xOld === xNew - this._configuration.movement && yOld === yNew + this._configuration.movement)
      || (xOld === xNew + this._configuration.movement && yOld === yNew - this._configuration.movement))) {
        this._refObj.threeDModel._oldPosition[0] = xNew;
        this._refObj.threeDModel._oldPosition[1] = yNew;
        return true;
      }
    return false;
  }
}
