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

@Component({
  selector: 'ia-grid-popup',
  templateUrl : './grid-popup.component.html',
  styleUrls: ['./grid-popup.component.scss'],
  providers: [TextureService],
})
export class GridPopupComponent {
  private textures = [];
  private previewEven = '';
  private previewOdd = '';

  constructor(
    private textureService: TextureService,
    private dialogRef: MatDialogRef<GridPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.textureService.getTextures((datas) => { this.textures = datas; });
  }

  private onChangePreviewEven() {
    this.textureService.getLocalTexture(this.data.textureEven, (texture) => {
      if (texture !== undefined)
        this.previewEven = texture;
    });
  }

  private onChangePreviewOdd() {
    this.textureService.getLocalTexture(this.data.textureOdd, (texture) => {
      if (texture !== undefined)
        this.previewOdd = texture;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
