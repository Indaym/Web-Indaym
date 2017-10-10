import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
} from '@angular/material';

const MODULE_LIST = [
  MatSidenavModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ],
})
export class MaterialModule {}
