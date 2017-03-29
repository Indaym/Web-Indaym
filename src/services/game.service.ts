/**
 * Created by Caro on 02/03/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GameService {
    private gamesUrl = 'http://localhost:3000/games';
    private games = [];

    constructor(private http: Http) { }

    getGame(id) {
        console.log("loading game");

        this.games = [];
        var urlId = this.gamesUrl + "/" + id;

        this.http.get(urlId)
            .flatMap((res) => res.json())
            .subscribe(data => {this.games.push(data);});
        return this.games;
    }

    getGames() {
        console.log("loading games");

        this.games = [];
        this.http.get(this.gamesUrl)
            .flatMap((res) => res.json())
            .subscribe(data => {this.games.push(data);});
        return this.games;
    }

    postGame(name) {
        console.log("posting game : " + name);

        this.games = [];
        this.http.post(this.gamesUrl, {"name": name})
            .map((res) => res.json())
            .subscribe(data => this.games.push(data));
        return this.games;
    }
}
