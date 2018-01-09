import {
  Component,
  Inject,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

@Component({
  selector: 'ia-create-game',
  templateUrl: './createGameDialog.component.html',
  styleUrls: [
    './createGameDialog.component.scss',
  ],
})
export class CreateGameDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  canDisplay(): boolean {
    return !this.data.isEdit;
  }

  buttonMsg() {
    return this.data.isEdit ? 'Edit' : 'Creat';
  }
}
