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

    public setGameId(gameId) {
        this.scenesUrl += '/' + gameId + '/scenes';
    }

    public getScenes() {
        this.scenes = [];
        this.http.get(this.scenesUrl)
            .flatMap((res) => res.json())
            .subscribe((data) => {this.scenes.push(data);});
        return this.scenes;
    }

    public postScene(name, meuh, callback) {
        this.http.post(this.scenesUrl, {'name': name})
            .map((res) => res.json())
            .subscribe((data) => callback(meuh, data));
    }
}
