import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { GameService }  from '../../services/game.service';

export let comeFrom = '';

@Component({
  selector  : 'ia-play',
  templateUrl   : './play.component.html',
  styleUrls    : [
    './play.component.scss',
  ],
  providers : [ GameService, GameService ],
})
export class PlayComponent {
  public lsGames = [];

  constructor(private games: GameService, private router: Router) {
    this.getGamesList();
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames = datas);
  }

  public goToScenesPage(id) {

      comeFrom = 'Play';

      this.router.navigate(['/sceneslist'], { queryParams: { gameId: id, new: 0 } });
  }
}
