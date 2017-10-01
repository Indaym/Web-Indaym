import {
  Component,
  Inject
}                       from '@angular/core';
import {
  MD_SNACK_BAR_DATA,
  MatSnackBarRef
}                       from '@angular/material';

import { SnackBarType } from './enum.snack-bar';

@Component({
  selector    : 'ia-snack-bar',
  templateUrl : './snack-bar.component.html',
  styleUrls   : [
    './snack-bar.component.css'
  ],
  providers : [],
})
export class SnackBarComponent {
  SnackBarType = SnackBarType;

  constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>, @Inject(MD_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

  public close() {
    this.snackBarRef.closeWithAction();
  }
}
