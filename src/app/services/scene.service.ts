/**
 * Created by Caro on 05/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DefaultService } from './default.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SceneService  extends DefaultService {
  private scenesUrl = '';

  constructor(private http: Http) {
    super();
    this.settedErrorMessage = 'URL for *Scenes* not setted';
  }

  public setGameId(gameId) {
    this.setted = true;
    this.scenesUrl = this.serverUrl +  'games/' + gameId + '/scenes/';
  }

  public getScenes(success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.get(this.scenesUrl)
      .mergeMap((res) => res.json())
      .subscribe(success, error);
  }

  public getOneScene(id, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.get(this.scenesUrl + id)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public postScene(name, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.post(this.scenesUrl, {'name': name})
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public updateScene(obj, id, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.put(this.scenesUrl + id, obj)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public deleteScene(id, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.delete(this.scenesUrl + id)
      .subscribe(success, error);
  }
}