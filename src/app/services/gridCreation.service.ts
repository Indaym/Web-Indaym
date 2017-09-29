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

  public assignToGridModel(model, datas) {
    model.object.caseX = datas.horizontal;
    model.object.caseY = datas.vertical;
    model.object.caseWidth = datas.width;
    model.object.caseHeight = datas.height;
    model.object['color'] = datas.color;
    model.object['alternate'] = datas.alternate;
    model.object['textureEven'] = datas.textureEven;
    if (datas.alternate)
      model.object['textureOdd'] = datas.textureOdd;
    return model;
  }
}
