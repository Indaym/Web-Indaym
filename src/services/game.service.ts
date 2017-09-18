/**
 * Created by Caro on 02/03/2017.
 */
import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';

import { DefaultService } from './default.service';

@Injectable()
export class GameService extends DefaultService {
  private gamesUrl;

  constructor(private http: Http) {
    super();
    this.gamesUrl = this.serverUrl + 'games/';
    this.setted = true;
    this.settedErrorMessage = 'URL for *Games* not setted';
  }

  public getGames(success?, error?) {
    this.http.get(this.gamesUrl)
      .flatMap((res) => res.json())
      .subscribe(success, error);
  }

  public getOneGame(id, success?, error?) {
    this.http.get(this.gamesUrl + id)
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public postGame(name, success?, error?) {
    this.http.post(this.gamesUrl, {'name': name})
      .map((res) => res.json())
      .subscribe(success, error);
  }

  public updateGame(obj, id, success?, error?) {
    this.http.put(this.gamesUrl + id, obj)
      .map((res) => res.json())
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
    .map((res) => res.json())
    .subscribe(success, error);
  }

  public postComment(comment, id, success?, error?) {
    console.log('postComment');
    console.log(comment);
    this.http.put(this.gamesUrl + id, {'comments': comment})
    .map((res) => res.json())
    .subscribe(success, error);
  }
}
