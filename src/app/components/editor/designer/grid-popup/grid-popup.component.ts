import {
  Component,
  ViewChild,
} from '@angular/core';

import {
  TextureService,
  GridCreationService,
} from '../../../../../services/';

@Component({
  selector: 'ia-grid-popup',
  template: require('./grid-popup.component.html'),
  styles: [require('./grid-popup.component.css')],
  providers: [],
})
export class GridPopupComponent {
  private width = 8.2;
  private height = 8.2;
  private horizontal = 1;
  private vertical = 1;
  private textureEven = '';
  private textureOdd = '';
  private alternate = false;
  private color = '#ffffff';
  private currentCB;
  private textures = [];
  @ViewChild('myModal') private modal;

  constructor(private textureService: TextureService, private gridCreationService: GridCreationService) {
    this.gridCreationService.gridPopup = (cb) => {
      this.currentCB = cb;
      this.modal.open();
    };
  }

  private resetDatas() {
    this.width = 8.2;
    this.height = 8.2;
    this.horizontal = 1;
    this.vertical = 1;
    this.color = '#ffffff';
    this.textureEven = '';
    this.textureOdd = '';
    this.alternate = false;
    this.currentCB = undefined;
  }

  private onOpen() {
    this.textureService.getTextures((datas) => { this.textures = datas; });
  }

  private onClose() {
    this.resetDatas();
  }

  private onSubmit() {
    this.currentCB({
      width: this.width,
      height: this.height,
      horizontal: this.horizontal,
      vertical: this.vertical,
      color: this.color,
      alternate: this.alternate,
      textureEven: this.textureEven,
      textureOdd: this.textureOdd,
    });
    this.resetDatas();
    this.modal.close();
  }
}
