import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import {
  SnackBarComponent,
  SnackBarType
} from '../components/snackBar';

@Injectable()
export class SnackBarService {

  constructor(private mdSnackBar: MdSnackBar) {}

  public open(message, config, snackType?) {
    if (snackType !== undefined)
      config.data.snackType = snackType;
    config = { duration: 3000, ...config, data: { snackType: SnackBarType.NONE, ...config.data, message } };
    this.mdSnackBar.openFromComponent(SnackBarComponent, config);
  }
}
