import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { HtmlService }  from '../../../services/html.service';
import { GameService }  from '../../../services/game.service';

@Component({
  selector  : 'ia-gameslist',
  template  : require('./gameslist.component.html'),
  styles    : [
    require('./gameslist.component.css'),
  ],
  providers : [ HtmlService, GameService ],
})

export class GamesListComponent {
  public lsGames;

  constructor(public html: HtmlService, private games: GameService, private router: Router) {
    this.getGamesList();
  }

  public goToScenesPage(id, isNew) {
    this.router.navigate(['/sceneslist'], { queryParams: { gameId: id, new: isNew } });
  }

  public redirect(meuh, id) {
    meuh.goToScenesPage(id.uuid, 0); // existing game
  }

  public redirectDefaultScene(meuh, id) {
    meuh.goToScenesPage(id.uuid, 1); // new gameca
  }

  public gameFunction() {
    let meuh = this;
    let myText = prompt('Game Name: ');
    if (myText) {
      this.games.postGame(myText, meuh, this.redirectDefaultScene);
    }
  }

  public getGamesList() {
    this.lsGames = this.games.getGames();
  }
}
