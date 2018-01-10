/**
 * Created by Nicolas le magnifique on 08/01/2017.
 */

import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { HttpClient }     from '@angular/common/http';

import { DefaultService } from './default.service';

@Injectable()
export class PlayService extends DefaultService {
  private playUrl;

  constructor(private http: HttpClient) {
    super();
    this.playUrl = this.serverUrl + 'games/play/';
  }

  public getGames(opt = {}, success?, error?) {
    this.http.get(this.playUrl, {
      params: {
        ...{ 'orderBy': 'name', 'limit': '10', 'offset': '1' },
        ...opt,
      },
    })
      .subscribe(success, error);
  }

  public getNbGames(opt = {}, success?, error?) {
    this.http.get(this.playUrl + 'count', opt)
      .subscribe(success, error);
  }
}
