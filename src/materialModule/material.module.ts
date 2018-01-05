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
  MatGridListModule,
  MatIconModule,
  MatPaginatorModule,
  MatDialogModule,
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
  MatGridListModule,
  MatIconModule,
  MatPaginatorModule,
  MatDialogModule,
];

@NgModule({
  imports: [ MODULE_LIST ],
  exports: [ MODULE_LIST ],
})
export class MaterialModule {}
