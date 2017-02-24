import { Component }    from '@angular/core';

@Component({
  selector  : 'ia-gameslist',
  template  : require('./gameslist.component.html'),
  styles    : [
    require('./gameslist.component.css')
  ],
  providers : [],
})
export class GamesListComponent {
  public gameFunction() {
    document.getElementById('buttonGame');
    var my_text = prompt('Game Name: ');
    if (my_text)
      {
        // CARO
        // Ici tu dois stocker le nom du jeu qu'on vient de créer dans la DB
      }
    }

    public getGamesList() {
      // CARO
      // Ici tu dois recuperer la liste des jeux par utilisateur, la stocker et l'afficher
      }
}
