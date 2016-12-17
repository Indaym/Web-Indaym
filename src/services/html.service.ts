import { Injectable } from "@angular/core";
/**
 * Created by nicolas on 17/12/16.
 */

@Injectable()
export class HtmlService {
  keys(object: {}) {
    return Object.keys(object);
  }
}