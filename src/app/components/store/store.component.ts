import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import {
  GameService,
  StoreService,
}  from '../../services';

@Component({
  selector  : 'ia-store',
  templateUrl   : './store.component.html',
  styleUrls    : [
    './store.component.scss',
  ],
  providers : [
    GameService,
    StoreService,
  ],
})
export class StoreComponent {
  public games = [];

  constructor(
    private gamesService: GameService,
    private storeService: StoreService,
    private router: Router,
  ) {}

  public goToRateGame(id, isNew) {
    this.router.navigate(['/rategame'], { queryParams: { gameId: id, new: isNew } });
  }
}
