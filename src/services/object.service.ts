/**
 * Created by Caro on 08/01/2017.
 */

import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';

import { DefaultService } from './default.service';

@Injectable()
export class ObjectService extends DefaultService {
  private objectsUrl = '';

  constructor(private http: Http) {
    super();
    this.settedErrorMessage = 'URL for *Objects* not setted';
  }

  public setIds(gameId, sceneId) {
    this.setted = true;
    this.objectsUrl = this.serverUrl + 'games/' + gameId + '/scenes/' + sceneId + '/objects/';
  }

  public getObjects(success = (datas) => {}, error = (err) => {}) {
    if (!this.isSetted(true))
      return;
    this.http.get(this.objectsUrl)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public getOneObject(id, success = (datas) => {}, error = (err) => {}) {
    if (!this.isSetted(true))
      return;
    this.http.get(this.objectsUrl + id)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public postSceneObject(obj, success = (id) => {}, error = (err) => {}) {
    if (!this.isSetted(true))
      return;
    obj.object = JSON.stringify(obj.object);
    this.http.post(this.objectsUrl, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public updateObject(obj, id, success = (datas) => {}, error = (err) => {}) {
    if (!this.isSetted(true))
      return;
    obj.object = JSON.stringify(obj.object);
    this.http.put(this.objectsUrl + id, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public deleteObject(id, success = (datas) => {}, error = (err) => {}) {
    if (!this.isSetted(true))
      return;
    this.http.delete(this.objectsUrl + id)
      .subscribe(success, error);
  }
}
