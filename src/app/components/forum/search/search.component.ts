import { Component }    from '@angular/core';

@Component({
  selector: 'forum-search',
  template: `
  <!--<form action="/formum/" method="GET" class="discussion-filter">!-->
    <select name="game" class="discussion-game-filter center">
      <option value selected>Tous les jeux</option>
      <option value="Tic-Tac-Toe">Tic-Tac-Toe</option>
    </select>
    <select name="theme" class="discussion-theme-filter center">
      <option value selected>Tous les thèmes</option>
      <option value="aide">Aide</option>
      <option value="discussion">Discussion</option>
      <option value="avis">Avis</option>
      <option value="idée">Idées d'amélioration</option>
      <option value="recherche">Recherche de joueurs</option>
    </select>
    <select name="tri" class="discussion-tri-filter center">
      <option value selected>Les plus récents</option>
      <option value="more-like">Les plus aimées</option>
      <option value="commentaire">Les plus commentées</option>
      <option value="less-like">Les moins aimées</option>
    </select>
    <input type="submit" class="discussion-submit center" value="filtrer">
  `
})

export class SearchComponent {
}
