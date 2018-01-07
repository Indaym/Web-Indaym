import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatRadioModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatOptionModule,
}                   from '@angular/material';

const MODULE_LIST = [
  MatSidenavModule,
  MatRadioModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatOptionModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ],
})
export class MaterialModule {}
