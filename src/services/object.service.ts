/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObjectService {
  private initUrl = 'http://localhost:3000/games';
  private objectsUrl = '';

  constructor(private http: Http) {
    this.objectsUrl = this.initUrl;
  }

  public setIds(gameId, sceneId) {
    this.objectsUrl = this.initUrl + '/' + gameId + '/scenes/' + sceneId + '/objects';
  }

  public getObjects(success = (datas) => {}, error = (err) => {}) {
    this.http.get(this.objectsUrl)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public getOneObject(id, success = (datas) => {}, error = (err) => {}) {
    this.http.get(this.objectsUrl + '/' + id)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public postSceneObject(obj, success = (id) => {}, error = (err) => {}) {
    obj.object = JSON.stringify(obj.object);
    this.http.post(this.objectsUrl, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public updateObject(obj, id, success = (datas) => {}, error = (err) => {}) {
    obj.object = JSON.stringify(obj.object);
    this.http.put(this.objectsUrl + '/' + id, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public deleteObject(id, success = (datas) => {}, error = (err) => {}) {
    this.http.delete(this.objectsUrl + '/' + id)
      .subscribe(success, error);
  }
}
