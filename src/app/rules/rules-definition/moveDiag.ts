import {
  RULE_TYPE,
  BaseRules,
}               from '../baseRules';
import {
  SnackBarService,
}               from '../../services';

import { SnackBarType }   from '../../components/snackBar';

import {
  SceneViewer,
  ModelViewer,
}               from '../../threed-viewer';

export class MoveDiag extends BaseRules {
  constructor(scene: any, model: any, conf: any = {},
  private snackBarService: SnackBarService,) {
    super(scene, model, conf);

    this._id = 'MoveDiag';
    this._name = 'Move Diagonal';
    this._description = 'This is a rule to move in diagonal';
    this._ruleType = RULE_TYPE.mouvement;
  }

  get name(): string {
    return this._name;
  }

  public capture_rule(model: any): boolean {
    if (model.LinkModel.name === 'whitepawn') {
      this._refScene.capture[0] -= 1;
      if (this._refScene.capture[0] === 0)
        /// HERE
        alert('Black WIN');
    } else if (model.LinkModel.name === 'blackpawn') {
      this._refScene.capture[1] -= 1;
      if (this._refScene.capture[1] === 0)
        /// HERE
        alert('White WIN');
    }
    return true;
  }

  public run(args?: any): boolean {
    if (args === undefined || args.LinkModel.object.coord === undefined) {
      return false;
    }

    const mouvement = this._configuration.movement;
    const xOld = this._refObj.threeDModel._oldPosition[0];
    const yOld = this._refObj.threeDModel._oldPosition[1];
    const xNew = args.LinkModel.object.coord[0];
    const yNew = args.LinkModel.object.coord[1];
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
        this.capture_rule(this._refScene.grid[xOld + mouvement][yOld + mouvement]);
        this._refScene.deleteFromScene(this._refScene.grid[xOld + mouvement][yOld + mouvement]);
        this._refScene.grid[xOld + mouvement][yOld + mouvement] = null;
      } else if (xOld - mouvement - 1 === xNew && yOld - mouvement - 1 === yNew) {
        this.capture_rule(this._refScene.grid[xOld - mouvement][yOld - mouvement]);
        this._refScene.deleteFromScene(this._refScene.grid[xOld - mouvement][yOld - mouvement]);
        this._refScene.grid[xOld - mouvement][yOld - mouvement] = null;
      } else if (xOld - mouvement - 1 === xNew && yOld + mouvement + 1 === yNew) {
        this.capture_rule(this._refScene.grid[xOld - mouvement][yOld + mouvement]);
        this._refScene.deleteFromScene(this._refScene.grid[xOld - mouvement][yOld + mouvement]);
        this._refScene.grid[xOld - mouvement][yOld + mouvement] = null;
      } else if (xOld + mouvement + 1 === xNew && yOld - mouvement - 1 === yNew) {
        this.capture_rule(this._refScene.grid[xOld + mouvement][yOld - mouvement]);
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
