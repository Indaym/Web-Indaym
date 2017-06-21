/**
 * Created by Caro on 05/04/2017.
 */
import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DefaultService } from './default.service';

@Injectable()
export class SceneService  extends DefaultService {
  private scenesUrl = '';
  private scenes = [];

  constructor(private http: Http) {
    super();
    this.settedErrorMessage = 'URL for *Scenes* not setted';
  }

  public setGameId(gameId) {
    this.setted = true;
    this.scenesUrl = this.serverUrl +  'games/' + gameId + '/scenes/';
  }

  public getScenes() {
    if (!this.isSetted(true))
      return;
    this.scenes = [];
    this.http.get(this.scenesUrl)
      .flatMap((res) => res.json())
      .subscribe((data) => {this.scenes.push(data);});
    return this.scenes;
  }

  public getOneScene(id, callback) {
    if (!this.isSetted(true))
      return;
    this.http.get(this.scenesUrl + id)
      .map((res) => res.json())
      .subscribe(callback);
  }

  public postScene(name, meuh, callback) {
    if (!this.isSetted(true))
      return;
    this.http.post(this.scenesUrl, {'name': name})
      .map((res) => res.json())
      .subscribe((data) => callback(meuh, data));
  }
}
