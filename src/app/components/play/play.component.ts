import { Component }  from '@angular/core';

import { GameService }  from "../../../services/game.service";

@Component({
  selector  : 'ia-play',
  template  : require('./play.component.html'),
  styles    : [
    require('./play.component.css')
  ],
providers : [GameService],
})

export class PlayComponent {
  constructor(private games: GameService) {
    this.getGamesList();
  }

  lsGames;

  public getGamesList() {
    this.lsGames = this.games.getGames();
  }
}
