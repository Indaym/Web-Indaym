/**
 * Created by nicolas on 14/04/17.
 */

import { Injectable }         from '@angular/core';
import { MatDialog}           from '@angular/material';

import { GridPopupComponent } from '../components/editor/designer/grid-popup/grid-popup.component';

@Injectable()
export class GridCreationService {

  constructor(private dialog: MatDialog) {}

  public open(cb) {
    const dialogRef = this.dialog.open(GridPopupComponent, {
      width: '600px',
      data: {
        color: '#373737',
        width: 8.2,
        height: 8.2,
        horizontal: 1,
        vertical: 1,
        textureEven: '',
        textureOdd: '',
        alternate: false,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined)
        cb(res);
    });
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
