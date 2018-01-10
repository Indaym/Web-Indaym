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

export class MoveDiag extends BaseRules {
  constructor(scene: any, model: any, conf: any = {}, private snackBar: SnackBarService) {
    super(scene, model, conf, snackBar);

    this._id = 'MoveDiag';
    this._name = 'Move Diagonal';
    this._description = `This is a rule to move in diagonal`;
    this._ruleType = RULE_TYPE.default;
  }

  public capture_rule(model: any): boolean {
    if (model.LinkModel.name === 'whitepawn') {
      this._refScene.capture[0] -= 1;
      if (this._refScene.capture[0] === 0)
        /// HERE
        console.log('Black WIN');
    } else if (model.LinkModel.name === 'blackpawn') {
      this._refScene.capture[1] -= 1;
      if (this._refScene.capture[1] === 0)
        /// HERE
        console.log('White WIN');
    }
    return true;
  }

  public ChangeTurn() {
      if (this._refScene.player === 2)
        this._refScene.player = 1;
      else {
        this._refScene.player += 1;
      }
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
      //this.ChangeTurn();
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
      this.ChangeTurn();
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
      this.ChangeTurn();
      return true;
    }
    return false;
  }
}
