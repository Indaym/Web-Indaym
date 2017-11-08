import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import {
  SnackBarComponent,
  SnackBarType,
}                     from '../components/snackBar';

@Injectable()
export class SnackBarService {

  constructor(private mdSnackBar: MatSnackBar) {}

  public open(message, config, snackType?) {
    config.data = config.data || {};
    if (snackType !== undefined)
      config.data.snackType = snackType;
    config = { duration: 3000, ...config, data: { snackType: SnackBarType.NONE, ...config.data, message } };
    this.mdSnackBar.openFromComponent(SnackBarComponent, config);
  }
}
