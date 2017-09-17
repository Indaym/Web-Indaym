/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnInit,
}                         from '@angular/core';
import { Vector3 }        from 'three';
import { FileUploader }   from 'ng2-file-upload';

import { TextureService } from '../../../../../../services';
import { serverConfig }   from '../../../../../../../config/server.conf';

@Component({
  selector  : 'ia-right-sidebar',
  template  : require('./right-sidebar.component.html'),
  styles    : [
    require('./right-sidebar.component.css'),
    require('../sidebars.css'),
  ],
  providers : [ TextureService ],
})
export class RightSidebarComponent implements OnInit  {
  @Input() public end;
  @Input() public eventDispatcher;
  private urlImg;
  private warnMessage = '';
  private uploaded = false;
  private textures = [{name: "salut", uuid: "42"}, {name: "salutA", uuid: "43"}, {name: "salutB", uuid: "44"}];
  private vam = '';

  public uploader: FileUploader = new FileUploader({url: serverConfig.serverURL + 'textures/' });
  private minimumScale = new Vector3();
  private objectSelected = {
    position: new Vector3(),
    dimension: new Vector3(),
    rotation: new Vector3(),
  };

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

      this.textureService.getBlob(JSON.parse(response).uuid, (datas) => {
        localStorage.setItem(datas.uuid, datas.img);
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
    console.log(this.vam);
  };

  public refreshList() {
    this.textureService.getTextures((results) => {
      this.textures = results;
    });
  }

  private toggleMode() {
    this.end.mode = (this.end.mode === 'side') ? 'over' : 'side';
  }
}
