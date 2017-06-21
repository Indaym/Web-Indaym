import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { HtmlService }  from '../../../services/html.service';
import { GameService }  from '../../../services/game.service';

@Component({
  selector  : 'ia-store',
  template  : require('./store.component.html'),
  styles    : [
    require('./store.component.css'),
  ],
  providers : [GameService],
})
export class StoreComponent {
  public lsGames = [];

  constructor(public html: HtmlService, private games: GameService, private router: Router) {
    this.getGamesList();
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames.push(datas));
  }

  public goToRateGame(id, isNew) {
    this.router.navigate(['/rategame'], { queryParams: { gameId: id, new: isNew } });
  }
}
