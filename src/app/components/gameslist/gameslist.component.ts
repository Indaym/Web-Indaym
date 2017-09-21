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
  public lsGames = [];

  constructor(public html: HtmlService, private games: GameService, private router: Router) {
    this.getGamesList();
  }

  public goToScenesPage(id, isNew = 0) {
    this.router.navigate(['/sceneslist'], { queryParams: { gameId: id, new: isNew } });
  }

  public gameFunction() {
    let myText = prompt('Game Name: ');
    if (myText) {
      let myDescription = prompt('Game Description: ');
        this.games.postGame(myText, (id) => {
          this.games.postDescription(myDescription, id.uuid);
          this.goToScenesPage(id.uuid, 1)
        });
    }
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames.push(datas) );
  }
}
