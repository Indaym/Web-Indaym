/**
 * Created by nicolas on 14/04/17.
 */

import { Injectable } from "@angular/core";

import { gameObjectsController } from '../models/gameObjectsController';

@Injectable()
export class GameControllerService {
  private _gameController: gameObjectsController;

  constructor() {
    this._gameController = new gameObjectsController();
  }

  get gameController() {
    return this._gameController;
  }
}
