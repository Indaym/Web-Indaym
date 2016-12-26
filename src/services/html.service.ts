/**
 * Created by nicolas on 17/12/16.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class HtmlService {
  keys(object: {}) {
    return Object.keys(object);
  }
}
