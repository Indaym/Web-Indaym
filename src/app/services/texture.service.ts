/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { HttpClient }      from '@angular/common/http';

import { DefaultService }  from './default.service';

import { map }             from 'rxjs/operators';

@Injectable()
export class TextureService extends DefaultService {
  private textureUrl = '';

  constructor(private http: HttpClient) {
    super();
    this.textureUrl = this.serverUrl + 'textures/';
    this.setted = true;
  }

  /**
   * Get the list of textures from database
   */
  public getTextures(success = (datas) => {}, error = (err) => {}) {
    this.http.get(this.textureUrl)
      .subscribe(success, error);
  }

  /**
   * Get one texture from database
   */
  public getOneTexture(id, success = (datas) => {}, error = (err) => {}) {
    this.http.get(this.textureUrl + id)
      .subscribe(success, error);
  }

  /**
   * Get the texture saved in localStorage, if not exist load from Back and save in LocalStorage
   */
  public getLocalTexture(id, success) {
    if (id === undefined || id === null) {
      success(undefined);
      return;
    }
    if (id in localStorage) {
      success(localStorage.getItem(id));
    } else {
      this.getBlob(id, (datas) => {
        localStorage.setItem(datas.uuid, datas.img);
        success(datas.img);
      });
    }
  }

  /**
   * Get the name with the uuid
   */
  public getName(textures, uuid, success) {
    if (textures === undefined) {
      this.getTextures((results) => {
        const elem = results.find((element) => element.uuid === uuid);
        success((elem === undefined) ? undefined : elem.name);
      });
    } else {
      const elem = textures.find((element) => element.uuid === uuid);
      success((elem === undefined) ? undefined : elem.name);
    }
  }

  /**
   * Get the uuid with the name
   */
  public getUuid(textures, name, success) {
    if (textures === undefined) {
      this.getTextures((results) => {
        const elem = results.find((element) => element.name === name);
        success((elem === undefined) ? undefined : elem.uuid);
      });
    } else {
      const elem = textures.find((element) => element.name === name);
      success((elem === undefined) ? undefined : elem.uuid);
    }
  }

  public updateTexture(id, obj, success = (datas) => {}, error = (err) => {}) {
    this.http.put(this.textureUrl + id, obj)
      .subscribe(success, error);
  }

  /**
   * Transform buffer into a blob
   */
  public getBlob(uuid, success, error = (err) => {}) {
    if (uuid === undefined || uuid === null) {
      return;
    }
    this.getOneTexture(uuid, (datas) => {
      if (datas === undefined || datas.image === undefined || datas.image.data === undefined)
        return;
      const blob = new Blob([new Uint8Array(datas.image.data)], {type: datas.format });
      const res = {
        name: datas.name,
        uuid: datas.uuid,
      };

      const reader = new FileReader();
      reader.onload = (evt) => {
        const result = (evt.target as any).result;
        res['img'] = result;
      };
      reader.onloadend = () => {
        success(res);
      };
      reader.onerror = error;

      reader.readAsDataURL(blob);
    });
  }
}
