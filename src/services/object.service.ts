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

  public getObjects(callback) {
    this.http.get(this.objectsUrl)
      .map((res) => res.json())
      .subscribe(callback);
  }

  public setIds(gameId, sceneId) {
    this.objectsUrl = this.initUrl + '/' + gameId + '/scenes/' + sceneId + '/objects';
  }

  public postSceneObject(obj) {
    obj.object = JSON.stringify(obj.object);
    this.http.post(this.objectsUrl, obj)
      .map((res) => res.json())
      .subscribe((data) => console.log(data));
  }

  public updateObject(obj, id, success = (datas) => {}, error = (err) => {}) {
    obj.object = JSON.stringify(obj.object);
    this.http.put(this.objectsUrl + '/' + id, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }
}
