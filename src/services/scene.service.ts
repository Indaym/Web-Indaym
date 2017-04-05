/**
 * Created by Caro on 05/04/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SceneService {
    private scenesUrl = 'http://localhost:3000/games';
    private scenes = [];

    constructor(private http: Http) { }

    setGameId(gameId) {
        console.log("setting gameId to " + gameId);
        this.scenesUrl += "/" + gameId + "/scenes";
    }

    getScenes() {
        console.log("loading scenes");

        this.scenes = [];
        this.http.get(this.scenesUrl)
            .flatMap((res) => res.json())
            .subscribe(data => {this.scenes.push(data);});
        return this.scenes;
    }

    postScene(name, meuh, callback) {
        console.log("posting scene : " + name);

        this.http.post(this.scenesUrl, {"name": name})
            .map((res) => res.json())
            .subscribe(data => callback(meuh, data));
    }
}