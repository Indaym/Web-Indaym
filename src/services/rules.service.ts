/**
 * Created by Caro on 10/06/2017.
 */

import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import {
  RULES_DEF,
  BaseRules,
}                     from '../app/rules';

/**
 * store all rules we have in the app
 * give an instance for a given rules
 */
@Injectable()
export class RulesServices {
  private rules;

  constructor() {
    this.rules = RULES_DEF;
  }

  public getRulesById(id: string) {
    return this.rules.find((rule) => rule.id === id);
  }

  public newRules(id: string, conf: any = {}) {
    const rule = this.getRulesById(id);

    return new rule(conf);
  }
}

@Injectable()
export class ObjectService {
  private initUrl = 'http://localhost:3000/games';
  private ruleUrl = 'http://localhost:3000/rules';
  private objectUrl = '';

  constructor(private http: Http) {
    this.objectUrl = this.initUrl;
  }

  public setIds(gameId, sceneId, objId) {
    this.objectUrl = this.initUrl + '/' + gameId + '/scenes/' + sceneId + '/objects/' + objId;
  }

  public getAllRules(callback) {
    this.http.get(this.ruleUrl)
    .map((res) => res.json())
    .subscribe(callback);
  }

  public getObjectRules(callback) {
    this.http.get(this.initUrl)
    .map((res) => res.json())
    .subscribe(callback);
  }

  public postRuleToObject(obj) {
    obj.object = JSON.stringify(obj.object);
    this.http.post(this.objectUrl, obj)
    .map((res) => res.json())
    .subscribe((data) => console.log(data));
  }
}
