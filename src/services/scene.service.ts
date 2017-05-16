/**
 * Created by Caro on 05/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SceneService {
  private initUrl = 'http://localhost:3000/games';
  private scenesUrl = '';
  private scenes = [];

  constructor(private http: Http) {
    this.scenesUrl = this.initUrl;
  }

  setGameId(gameId) {
    console.log("setting gameId to " + gameId);
    this.scenesUrl = this.initUrl +  "/" + gameId + "/scenes";
  }

  getScenes() {
    console.log("loading scenes");

    this.scenes = [];
    this.http.get(this.scenesUrl)
      .flatMap((res) => res.json())
      .subscribe(data => {this.scenes.push(data);});
    return this.scenes;
  }

  getOneScene(id, callback) {
    this.http.get(this.scenesUrl + '/' + id)
      .map((res) => res.json())
      .subscribe(callback);
  }

  postScene(name, meuh, callback) {
    console.log("posting scene : " + name);

    this.http.post(this.scenesUrl, {"name": name})
      .map((res) => res.json())
      .subscribe(data => callback(meuh, data));
  }
}
