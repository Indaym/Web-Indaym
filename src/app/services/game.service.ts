/**
 * Created by Caro on 02/03/2017.
 */
import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { HttpClient }     from '@angular/common/http';

import { DefaultService } from './default.service';
import {
  mergeMap,
  map,
}                         from 'rxjs/operators';

@Injectable()
export class GameService extends DefaultService {
  private gamesUrl;

  constructor(private http: HttpClient) {
    super();
    this.gamesUrl = this.serverUrl + 'games/';
    this.setted = true;
    this.settedErrorMessage = 'URL for *Games* not setted';
  }

  public getGames(opt = {}, success?, error?) {
    this.http.get(this.gamesUrl, {
      params: {
        ...{ 'orderBy': 'name', 'limit': '10', 'offset': '1' },
        ...opt,
      },
    })
      .subscribe(success, error);
  }

  public getOneGame(id, success?, error?) {
    this.http.get(this.gamesUrl + id)
      .subscribe(success, error);
  }

  public getNbGames(opt = {}, success?, error?) {
    this.http.get(this.gamesUrl + 'count', opt)
      .subscribe(success, error);
  }

  public postGame(name, success?, error?) {
    this.http.post(this.gamesUrl, {'name': name})
      .subscribe(success, error);
  }

  public addGameToLibrary(gameId: string, success?, error?) {
    this.http.post(this.gamesUrl + 'store', { 'gameId': gameId })
      .subscribe(success, error);
  }

  public DeleteGameFromLibrary(gameId: string, success?, error?) {
    // this.http.delete(this.gamesUrl + 'store', { 'gameId': gameId })
    //   .subscribe(success, error);
  }

  public updateGame(obj, id, success?, error?) {
    this.http.put(this.gamesUrl + id, obj)
      .subscribe(success, error);
  }

  public deleteGame(id, success?, error?) {
    this.http.delete(this.gamesUrl + id)
      .subscribe(success, error);
  }

  public updateRating(averageRate, id, success?, error?) {
    console.log('updateRating');
    console.log(averageRate);
    this.http.put(this.gamesUrl + id, {'rate': averageRate})
      .subscribe(success, error);
  }

  public postComment(comment, id, success?, error?) {
    console.log('postComment');
    console.log(comment);
    this.http.put(this.gamesUrl + id, {'comments': comment})
      .subscribe(success, error);
  }

  public postDescription(description, id, success?, error?) {
    this.http.put(this.gamesUrl + id, {'description': JSON.stringify(description)})
      .subscribe(success, error);
  }
}
