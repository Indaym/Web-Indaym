/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObjectService {
    private objectsUrl = 'http://localhost:3000/games';
    private objects = [];

    constructor(private http: Http) { }

    getObjects(cow, callback) {
        console.log("loading objects");

        this.http.get(this.objectsUrl)
            .flatMap((res) => res.json())
            .subscribe(data => callback(cow, data));
    }

    setIds(gameId, sceneId) {
        this.objectsUrl += "/" + gameId + "/scenes/" + sceneId + "/objects";
    }

    postSceneObject(itemThreeJs) {
        console.log("posting scene object : ");

        this.http.post(this.objectsUrl, {itemThreeJs: itemThreeJs})
            .map((res) => res.json())
            .subscribe(data => console.log(data));
    }
}