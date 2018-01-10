/**
 * Created by Nicolas le magnifique on 08/01/2017.
 */

import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { HttpClient }     from '@angular/common/http';

import { DefaultService } from './default.service';

@Injectable()
export class StoreService extends DefaultService {
  private storeUrl;

  constructor(private http: HttpClient) {
    super();
    this.storeUrl = this.serverUrl + 'store/';
  }

  public getGames(opt = {}, success?, error?) {
    this.http.get(this.storeUrl, {
      params: {
        ...{ 'orderBy': 'name', 'limit': '10', 'offset': '1' },
        ...opt,
      },
    })
      .subscribe(success, error);
  }

  public getNbGames(opt = {}, success?, error?) {
    this.http.get(this.storeUrl + 'count', opt)
      .subscribe(success, error);
  }

  public addGameToLibrary(gameId: string, success?, error?) {
    this.http.post(this.storeUrl + gameId, {})
      .subscribe(success, error);
  }

  public removeGameFromLibrary(gameId: string, success?, error?) {
    this.http.delete(this.storeUrl + gameId)
      .subscribe(success, error);
  }
}
