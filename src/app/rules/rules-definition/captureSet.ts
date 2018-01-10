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


export class CaptureSet extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'CaptureSet';
    this._name = 'Capture Set';
    this._description = `Set the capture rule`;
    this._ruleType = RULE_TYPE.default;
  }

  public run(args?: any): boolean {
    const White_Capture = 1;
    const Black_Capture = 1;
    if (this._refScene.capture[0] === -1 && this._refScene.capture[1] === -1) {
      this._refScene.capture[0] = White_Capture;
      this._refScene.capture[1] = Black_Capture;
    }
    return true;
  }
}
