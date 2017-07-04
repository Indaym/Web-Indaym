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

  public run(args?: any): boolean {
    if (args === undefined || args.LinkModel.object.coord === undefined) {
      return false;
    }

    let mouvement = this._configuration.movement;
    let xOld = this._refObj.threeDModel._oldPosition[0];
    let yOld = this._refObj.threeDModel._oldPosition[1];
    let xNew = args.LinkModel.object.coord[0];
    let yNew = args.LinkModel.object.coord[1];
    if (xOld === -1 && yOld === -1
      && this._refScene.grid[xNew][yNew] === null) {
      this._refObj.threeDModel._oldPosition[0] = xNew;
      this._refObj.threeDModel._oldPosition[1] = yNew;
      this._refScene.grid[xNew][yNew] = this._refScene._selected.object;
      return true;
    }
    if ((mouvement)
      && (this._refScene.grid[xNew][yNew] === null)
      && ((xOld === xNew + mouvement && yOld === yNew + mouvement)
        || (xOld === xNew - mouvement && yOld === yNew - mouvement)
        || (xOld === xNew - mouvement && yOld === yNew + mouvement)
        || (xOld === xNew + mouvement && yOld === yNew - mouvement))) {
      this._refObj.threeDModel._oldPosition[0] = xNew;
      this._refObj.threeDModel._oldPosition[1] = yNew;
      this._refScene.grid[xNew][yNew] = this._refScene._selected.object;
      this._refScene.grid[xOld][yOld] = null;
      return true;
    }
    if ((mouvement)
      && (this._refScene.grid[xNew][yNew] === null)
      && ((xOld === xNew + mouvement + 1 && yOld === yNew + mouvement + 1
        && this._refScene.grid[xNew + mouvement][yNew + mouvement] !== null)
        || (xOld === xNew - mouvement - 1 && yOld === yNew - mouvement - 1
          && this._refScene.grid[xNew - mouvement][yNew - mouvement] !== null)
        || (xOld === xNew - mouvement - 1 && yOld === yNew + mouvement + 1
          && this._refScene.grid[xNew - mouvement][yNew + mouvement] !== null)
        || (xOld === xNew + mouvement + 1 && yOld === yNew - mouvement - 1
          && this._refScene.grid[xNew + mouvement][yNew - mouvement] !== null))) {
      if (xOld + mouvement + 1 === xNew && yOld + mouvement + 1 === yNew) {
        this._refScene.deleteFromScene(this._refScene.grid[xOld + mouvement][yOld + mouvement]);
        this._refScene.grid[xOld + mouvement][yOld + mouvement] = null;
      }
      else if (xOld - mouvement - 1 === xNew && yOld - mouvement - 1 === yNew) {
        this._refScene.deleteFromScene(this._refScene.grid[xOld - mouvement][yOld - mouvement]);
        this._refScene.grid[xOld - mouvement][yOld - mouvement] = null;
      }
      else if (xOld - mouvement - 1 === xNew && yOld + mouvement + 1 === yNew) {
        this._refScene.deleteFromScene(this._refScene.grid[xOld - mouvement][yOld + mouvement]);
        this._refScene.grid[xOld - mouvement][yOld + mouvement] = null;
      }
      else if (xOld + mouvement + 1 === xNew && yOld - mouvement - 1 === yNew) {
        this._refScene.deleteFromScene(this._refScene.grid[xOld + mouvement][yOld - mouvement]);
        this._refScene.grid[xOld + mouvement][yOld - mouvement] = null;
      }
      this._refObj.threeDModel._oldPosition[0] = xNew;
      this._refObj.threeDModel._oldPosition[1] = yNew;
      this._refScene.grid[xNew][yNew] = this._refScene._selected.object;
      this._refScene.grid[xOld][yOld] = null;
      return true;
    }
    return false;
  }
}
