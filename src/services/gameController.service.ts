/**
 * Created by nicolas on 14/04/17.
 */

import { Injectable }             from '@angular/core';

import { GameObjectsController }  from '../models/gameObjectsController';

@Injectable()
export class GameControllerService {
  private _gameController: GameObjectsController;

  constructor() {
    this._gameController = new GameObjectsController();
  }

  get gameController() {
    return this._gameController;
  }
}
