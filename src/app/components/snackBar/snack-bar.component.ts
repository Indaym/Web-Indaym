import {
  Component,
  Inject,
}                       from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
}                       from '@angular/material';

import { SnackBarType } from './enum.snack-bar';

@Component({
  selector    : 'ia-snack-bar',
  templateUrl : './snack-bar.component.html',
  styleUrls   : [
    './snack-bar.component.css',
  ],
  providers : [],
})
export class SnackBarComponent {
  SnackBarType = SnackBarType;

  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  public close() {
    this.snackBarRef.closeWithAction();
  }
}
