import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { HtmlService }  from "../../../services/html.service";
import { GameService }  from "../../../services/game.service";

@Component({
  selector  : 'ia-store',
  template  : require('./store.component.html'),
  styles    : [
    require('./store.component.css')
  ],
    providers : [GameService],
})

export class StoreComponent {
  constructor(public html: HtmlService, private games: GameService, private router: Router) {
    this.getGamesList();
  }

  lsGames;

  public getGamesList() {
    this.lsGames = this.games.getGames();
  }

  public goToRateGame(id, isNew) {
    this.router.navigate(['/rategame'], { queryParams: { gameId: id, new: isNew } });
  }
}
