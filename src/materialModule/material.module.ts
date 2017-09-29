import { NgModule } from '@angular/core';

import {
  MdSidenavModule,
  MdRadioModule
} from '@angular/material';

const MODULE_LIST = [
  MdSidenavModule,
  MdRadioModule
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ]
})
export class MaterialModule {}
