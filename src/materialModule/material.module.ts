import { NgModule } from '@angular/core';

import {
  MdSidenavModule,
  MdRadioModule,
  MdSnackBarModule,
}                   from '@angular/material';

const MODULE_LIST = [
  MdSidenavModule,
  MdRadioModule,
  MdSnackBarModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ]
})
export class MaterialModule {}
