import { Component }    from '@angular/core';

import { HtmlService }  from "../../../services/html.service";
import {GameService} from "../../../services/game.service";
import { ActivatedRoute, Router } from '@angular/router';

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

  public goToScenesPage(id) {
    this.router.navigate(['/sceneslist'], { queryParams: { uuid: id } });
  }

  public redirect(meuh, id) {
    meuh.goToScenesPage(id.uuid);
  }

  public gameFunction() {
    var meuh = this;
    var my_text = prompt('Game Name: ');
    if (my_text) {
        this.games.postGame(my_text, meuh, this.redirect);
      }
  }

  public getGamesList() {
    this.lsGames = this.games.getGames();
  }
}
