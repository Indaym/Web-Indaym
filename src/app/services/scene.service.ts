/**
 * Created by Caro on 05/04/2017.
 */
import { Injectable }      from '@angular/core';
import { Http }            from '@angular/http';
import { HttpClient }      from '@angular/common/http';

import { DefaultService }  from './default.service';
import {
  map,
  mergeMap,
}                          from 'rxjs/operators';

@Injectable()
export class SceneService  extends DefaultService {
  private scenesUrl = '';

  constructor(private http: HttpClient) {
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
      .subscribe(success, error);
  }

  public getOneScene(id, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.get(this.scenesUrl + id)
      .subscribe(success, error);
  }

  public postScene(name, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.post(this.scenesUrl, {'name': name})
      .subscribe(success, error);
  }

  public updateScene(obj, id, success?, error?) {
    if (!this.isSetted(true)) {
      return;
    }
    this.http.put(this.scenesUrl + id, obj)
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
