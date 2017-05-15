import { Component }    from '@angular/core';

import { GameService }  from "../../../services/game.service";

import {
  ActivatedRoute,
  Router
}                       from '@angular/router';
import { Subscription } from "rxjs/Rx";

@Component({
  selector  : 'ia-rategame',
  template  : require('./rategame.component.html'),
  styles    : [
    require('./rategame.component.css')
  ],
    providers : [GameService],
})

export class RateGameComponent {
  constructor(private games: GameService, private route: ActivatedRoute) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getGame(queryParam)
    );
  }

  item;
  gameId;
  subscription: Subscription;

  public getGame(queryParam) {
    this.gameId = queryParam['gameId'];

    this.games.getOneGame(this.gameId, (data) => {
      this.item = data;

      });
  }
}
