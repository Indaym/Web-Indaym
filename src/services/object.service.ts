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

    public getObjects() {
        this.http.get(this.objectsUrl)
            .flatMap((res) => res.json())
            .subscribe((data) => {this.objects.push(data);});
        return this.objects;
    }

    public setIds(gameId, sceneId) {
        this.objectsUrl += '/' + gameId + '/scenes/' + sceneId + '/objects';
    }

    public postSceneObjects(itemThreeJs) {
        this.http.post(this.objectsUrl, {itemThreeJs: itemThreeJs})
            .map((res) => res.json())
            .subscribe((data) => console.log(data));
    }
}
