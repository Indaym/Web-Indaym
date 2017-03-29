import { Component }    from '@angular/core';

import { HtmlService }  from "../../../services/html.service";
import {GameService} from "../../../services/game.service";

@Component({
  selector  : 'ia-gameslist',
  template  : require('./gameslist.component.html'),
  styles    : [
    require('./gameslist.component.css')
  ],
  providers : [HtmlService, GameService],
})
export class GamesListComponent {

  constructor(public html: HtmlService, private games: GameService) {
    console.log("alloooooo");
    this.getGamesList();
  }

  lsGames;

  public gameFunction() {
    document.getElementById('buttonGame');
    var my_text = prompt('Game Name: ');
    if (my_text)
      {
        var id = this.games.postGame(my_text);
        console.log(id);
        // CARO
        // Ici tu dois stocker le nom du jeu qu'on vient de créer dans la DB
      }
    }

    public getGamesList() {
      this.lsGames = this.games.getGames();
      console.log("hello world");
      console.log(this.lsGames);
      // CARO
      // Ici tu dois recuperer la liste des jeux par utilisateur, la stocker et l'afficher
      }
}
