import {
  Component,
  ViewChild,
  Inject,
} from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

import {
  TextureService,
} from '../../../../services/texture.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'ia-grid-popup',
  templateUrl : './grid-popup.component.html',
  styleUrls: ['./grid-popup.component.scss'],
  providers: [TextureService],
})
export class GridPopupComponent {
  public groupForm: FormGroup;
  public textures = [];

  public previewEven = '';
  public previewOdd = '';

  constructor(
    private textureService: TextureService,
    private dialogRef: MatDialogRef<GridPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.textureService.getTextures((datas) => { this.textures = datas; });
    this.groupForm = this.fb.group({
      color: [data.color],
      width: [data.width, [Validators.required, Validators.min(1), Validators.max(20)]],
      height: [data.height, [Validators.required, Validators.min(1), Validators.max(20)]],
      horizontal: [data.horizontal, [Validators.required, Validators.min(1), Validators.max(40)]],
      vertical: [data.vertical, [Validators.required, Validators.min(1), Validators.max(40)]],
      textureEven: [data.textureEven, Validators.required],
      textureOdd: [data.textureOdd],
      alternate: [data.alternate],
    });
    this.groupForm.controls.textureEven.valueChanges.subscribe((value) => this.changePreview(value, (val) => this.previewEven = val));
    this.groupForm.controls.textureOdd.valueChanges.subscribe((value) => this.changePreview(value, (val) => this.previewOdd = val));

    this.groupForm.controls.alternate.valueChanges.subscribe((value) => {
      if (value === true)
        this.groupForm.controls.textureOdd.setValidators(Validators.required);
      else
        this.groupForm.controls.textureOdd.setValidators(null);
      this.groupForm.controls.textureOdd.updateValueAndValidity();
    });
  }

  private changePreview(text, cb) {
    this.textureService.getLocalTexture(text, (texture) => {
      if (texture !== undefined)
        cb(texture);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
