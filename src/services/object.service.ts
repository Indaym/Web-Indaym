/**
 * Created by Caro on 08/01/2017.
 */
import { Injectable } from '@angular/core';
import { DATAS } from './baka.ts';

@Injectable()
export class ObjectService {
    getObjects() {
        //faire l'appel à l'API ici, lol
        console.log("pouet");
        return DATAS;
    }
}