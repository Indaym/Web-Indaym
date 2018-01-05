import {
  Component,
  Input,
}              from '@angular/core';

import {
  UserService,
  GameService,
}              from '../../../services';

@Component({
  selector: 'ia-game-list',
  templateUrl: './gameList.component.html',
  styleUrls: [
    './gameList.component.scss',
  ],
  providers: [
    GameService,
  ],
})
export class GameListComponent {

  constructor(
    private gamesService: GameService,
    private user: UserService,
  ) {}

  /**
   * list of games to display
   */
  @Input() games: Array<any>;

  /**
   * allow the owner to edit a game
   */
  @Input() edit = false;

  /**
   * allow the owner of the game to delete it
   */
  @Input() delete = false;

  /**
   * allow a user to add this game to his library
   */
  @Input() add = false;

  /**
   * allow a user to remove this game from is library
   */
  @Input() remove = false;

  public getGamesList() {
    this.gamesService.getGames(
      {'limit': '10', 'offset': '1'},
      (datas) => this.games = datas,
    );
  }

  ownerCanEdit(game: any) {
    if (this.edit) return this.user.user.uuid === game.owner;
    return false;
  }

  ownerCanDelete(game: any) {
    if (this.delete) return this.user.user.uuid === game.owner;
    return false;
  }
}
