/**
 * Created by Caro on 10/06/2017.
 */

import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObjectService {
    private initUrl = 'http://localhost:3000/games';
    private ruleUrl = 'http://localhost:3000/rules';
    private objectUrl = '';

    constructor(private http: Http) {
        this.objectUrl = this.initUrl;
    }

    setIds(gameId, sceneId, objId) {
        this.objectUrl = this.initUrl + "/" + gameId + "/scenes/" + sceneId + "/objects/" + objId;
    }

    getAllRules(callback) {
        this.http.get(this.ruleUrl)
            .map((res) => res.json())
            .subscribe(callback);
    }

    getObjectRules(callback) {
        this.http.get(this.initUrl)
            .map((res) => res.json())
            .subscribe(callback);
    }

    postRuleToObject(obj) {
        obj.object = JSON.stringify(obj.object);
        this.http.post(this.objectUrl, obj)
            .map((res) => res.json())
            .subscribe(data => console.log(data));
    }
}