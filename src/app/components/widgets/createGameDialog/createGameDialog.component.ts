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
    './createGameDialog.component.css',
  ],
})
export class CreateGameDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
