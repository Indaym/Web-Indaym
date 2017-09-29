/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit,
  ViewChild,
}                         from '@angular/core';
import {
  Vector3,
  Euler,
}                         from 'three';
import { FileUploader }   from 'ng2-file-upload';

import { TextureService } from '../../../../../services';
import { serverConfig }   from '../../../../../../../config/server.conf';

@Component({
  selector  : 'ia-right-sidebar',
  templateUrl   : './right-sidebar.component.html',
  styleUrls    : [
    './right-sidebar.component.css',
    '../sidebars.css',
  ],
  providers : [],
})
export class RightSidebarComponent implements OnInit  {
  @Input() public end;
  @Input() public eventDispatcher;
  public uploader: FileUploader = new FileUploader({url: serverConfig.serverURL + 'textures/' });

  private urlImg;
  private warnMessage = '';
  private uploaded = false;
  private textures = [];
  private imgSelected;
  private imgPreview = '';
  private minimumScale = new Vector3();
  private objectSelected = {
    position: new Vector3(),
    dimension: new Vector3(),
    rotation: new Euler(),
  };
  private controllerTypes = [
    'translate',
    'scale',
    'rotate'
  ];
  private modeController = 'translate';
  @ViewChild('selectedFile') private selectedFile;

  constructor(private textureService: TextureService) {
    this.textureService.getTextures((results) => {
      this.textures = results;
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.warnMessage = response;
      setTimeout(() => {
        this.warnMessage = '';
      }, 5000);
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.uploaded = true;
      setTimeout(() => {
        this.uploaded = false;
      }, 5000);

      this.uploader.clearQueue();
      this.selectedFile.nativeElement.value = '';

      this.refreshList();

      const res = JSON.parse(response);

      this.textureService.getBlob(res.uuid, (datas) => {
        localStorage.setItem(datas.uuid, datas.img);
        this.imgSelected = res.uuid;
        this.previewTexture();
      });
    };
  }

  public ngOnInit() {
    this.eventDispatcher.addEventListener('setMinimumScale', (e) => {
      if (e.minimumScale !== undefined)
        this.minimumScale = e.minimumScale;
    });
    this.eventDispatcher.addEventListener('updateObjectInputs', (e) => {
      if (e.position !== undefined)
        this.objectSelected.position = e.position;
      if (e.rotation !== undefined)
        this.objectSelected.rotation = e.rotation;
      if (e.dimension !== undefined)
        this.objectSelected.dimension = e.dimension;
    });
  }

  public updateValues(type) {
    if (Object.keys(this.objectSelected).indexOf(type) === -1)
      return;
    let obj = { type : 'updateObjectView' };
    obj[type] = this.objectSelected[type];
    this.eventDispatcher.dispatchEvent(obj);
  }

  /**
   * Upload image to server
   */
  public upload() {
    if (this.uploader.queue.length > 0)
      this.uploader.queue[0].upload();
  }

  /**
   * Apply texture to selected object
   */
  public applyTexture() {
    this.eventDispatcher.dispatchEvent({
      type: 'updateTexture',
      texture: this.imgSelected
    });
  }

  /**
   * When selected item change, automatic set preview item
   */
  public previewTexture() {
    this.textureService.getLocalTexture(this.imgSelected, (texture) => {
      if (texture !== undefined)
        this.imgPreview = texture;
    });
  }

  public refreshList() {
    this.textureService.getTextures((results) => {
      this.textures = results;
    });
  }

  public changeModeController() {
    this.eventDispatcher.dispatchEvent({
      type: 'updateController',
      modeController: this.modeController
    });
  }

  public deleteSelected() {
    this.eventDispatcher.dispatchEvent({
      type: 'deleteSelected'
    });
  }

  public savePositions() {
    this.eventDispatcher.dispatchEvent({
      type: 'savePositions'
    });
  }

  private toggleMode() {
    this.end.mode = (this.end.mode === 'side') ? 'over' : 'side';
  }
}
