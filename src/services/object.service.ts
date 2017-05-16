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
    console.log(this.objectsUrl);
    this.http.get(this.objectsUrl)
      .map((res) => res.json())
      .subscribe(callback);
  }

  public setIds(gameId, sceneId) {
    this.objectsUrl = this.initUrl + '/' + gameId + '/scenes/' + sceneId + '/objects';
  }

  public postSceneObject(obj) {
    console.log('posting scene object : ');
    obj.object = JSON.stringify(obj.object);
    this.http.post(this.objectsUrl, obj)
      .map((res) => res.json())
      .subscribe((data) => console.log(data));
  }
}
