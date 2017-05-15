import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { HtmlService }  from "../../../services/html.service";
import { GameService }  from "../../../services/game.service";

@Component({
  selector  : 'ia-gameslist',
  template  : require('./gameslist.component.html'),
  styles    : [
    require('./gameslist.component.css')
  ],
  providers : [HtmlService, GameService],
})

export class GamesListComponent {

  constructor(public html: HtmlService, private games: GameService, private router: Router) {
    this.getGamesList();
  }

  lsGames;

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
    var meuh = this;
    var my_text = prompt('Game Name: ');
    if (my_text) {
        this.games.postGame(my_text, meuh, this.redirectDefaultScene);
      }
  }

  public getGamesList() {
    this.lsGames = this.games.getGames();
  }
}
