import { Component }    from '@angular/core';

import { GameService }  from '../../../services/game.service';

@Component({
  selector  : 'ia-play',
  template  : require('./play.component.html'),
  styles    : [
    require('./play.component.css'),
  ],
  providers : [ GameService ],
})
export class PlayComponent {
  public lsGames = [];

  constructor(private games: GameService) {
    this.getGamesList();
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames.push(datas));
  }

  public goToScenesPage(id) {
  }
}
