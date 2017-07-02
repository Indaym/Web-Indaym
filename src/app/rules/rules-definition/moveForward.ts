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

  public run(args?: any): boolean {
    if (args === undefined || args.LinkModel.object.coord === undefined) {
      return false;
    }
    let xOld = this._refObj.threeDModel._oldPosition[0];
    let yOld = this._refObj.threeDModel._oldPosition[1];
    let xNew = args.LinkModel.object.coord[0];
    let yNew = args.LinkModel.object.coord[1];
    if (xOld === -1 && yOld === -1) {
      this._refObj.threeDModel._oldPosition[0] = xNew;
      this._refObj.threeDModel._oldPosition[1] = yNew;
      return true;
    }
    if ((this._configuration.movement)
      && ((xOld === xNew + this._configuration.movement && yOld === yNew)
      || (xOld === xNew - this._configuration.movement && yOld === yNew)
      || (xOld === xNew && yOld === yNew + this._configuration.movement)
      || (xOld === xNew && yOld === yNew - this._configuration.movement))) {
      this._refObj.threeDModel._oldPosition[0] = xNew;
      this._refObj.threeDModel._oldPosition[1] = yNew;
      return true;
    }
    console.log('false');
    return false;
  }
}
