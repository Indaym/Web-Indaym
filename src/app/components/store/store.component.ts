import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { GameService }  from '../../services/game.service';

@Component({
  selector  : 'ia-store',
  templateUrl   : './store.component.html',
  styleUrls    : [
    './store.component.css',
  ],
  providers : [ GameService ],
})
export class StoreComponent {
  public games = [];

  constructor(private gamesService: GameService, private router: Router) {
    this.getGamesList();
  }

  public getGamesList() {
    this.gamesService.getGames(
      {'limit': '10', 'offset': '1'},
      (datas) => this.games = datas,
    );
  }

  public goToRateGame(id, isNew) {
    this.router.navigate(['/rategame'], { queryParams: { gameId: id, new: isNew } });
  }
}
