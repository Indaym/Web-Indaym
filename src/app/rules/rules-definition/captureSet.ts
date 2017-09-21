import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

export class CaptureSet extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'CaptureSet';
    this._name = 'Capture Set';
    this._description = `Set the capture rule`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    var White_Capture = 1;
    var Black_Capture = 1;
    if (this._refScene.capture[0] === -1 && this._refScene.capture[1] === -1) {
      this._refScene.capture[0] = White_Capture;
      this._refScene.capture[1] = Black_Capture;
    }
    return true;
  }
}
