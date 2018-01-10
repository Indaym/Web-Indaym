import {
  Component,
  Inject,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

@Component({
  selector: 'ia-create-scene',
  templateUrl: './createSceneDialog.component.html',
  styleUrls: [
    './createSceneDialog.component.scss',
  ],
})
export class CreateSceneDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateSceneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public canDisplay(): boolean {
    return !this.data.isEdit;
  }

  buttonMsg(): string {
    return this.data.isEdit ? 'Edit' : 'Create';
  }
}
