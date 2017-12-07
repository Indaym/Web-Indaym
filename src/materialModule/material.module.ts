import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatRadioModule,
  MatSnackBarModule,
  MatGridListModule,
}                   from '@angular/material';

const MODULE_LIST = [
  MatSidenavModule,
  MatRadioModule,
  MatSnackBarModule,
  MatGridListModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ],
})
export class MaterialModule {}
