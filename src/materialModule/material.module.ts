import { NgModule } from '@angular/core';

import {
  MdSidenavModule,
} from '@angular/material';

const MODULE_LIST = [
  MdSidenavModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ],
})
export class MaterialModule {}
