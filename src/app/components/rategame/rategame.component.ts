import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Rx';

import { GameService }    from '../../../services/game.service';

@Component({
  selector  : 'ia-rategame',
  template  : require('./rategame.component.html'),
  styles    : [
    require('./rategame.component.css'),
  ],
  providers : [ GameService ],
})
export class RateGameComponent {
  public item;
  public gameId;
  public subscription: Subscription;

  constructor(private games: GameService, private route: ActivatedRoute) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getGame(queryParam)
    );
  }

  public getGame(queryParam) {
    this.gameId = queryParam['gameId'];

    this.games.getOneGame(this.gameId, (data) => {
      this.item = data;
    });
  }
}
