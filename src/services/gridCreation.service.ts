/**
 * Created by nicolas on 14/04/17.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class GridCreationService {
  private _gridPopup;

  constructor() {}

  set gridPopup(cbopen) {
    this._gridPopup = cbopen;
  }

  public open(cb) {
    this._gridPopup(cb);
  }
}
