/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable } from '@angular/core';
import { DATAS } from './dataObjects.ts';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObjectService {
    private objectsUrl = 'http://localhost:3000/library';
    //private objectsUrl = 'localhost:3000/library';

    constructor(private http: Http) { }

    getObjects() {
        console.log("loading objects");
        this.http.get(this.objectsUrl).toPromise().then((response) => { console.log(response.json()); });
        //console.log(this.http.get(this.objectsUrl).toPromise().then((response => response.json())));
        //return this.http.get(this.objectsUrl);
        return DATAS;
    }
}