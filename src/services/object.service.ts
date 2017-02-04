/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ObjectService {
    private objectsUrl = 'http://localhost:3000/library';
    private objects = [];

    constructor(private http: Http) { }

    getObjects() {
        console.log("loading objects");

        this.http.get(this.objectsUrl)
            .flatMap((res) => res.json())
            .subscribe(data => {this.objects.push(data);});
        return this.objects;
    }
}