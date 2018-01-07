import {
  Component,
  Input,
  Output,
  EventEmitter,
}              from '@angular/core';
import {
  Router,
}              from '@angular/router';

import {
  UserService,
  GameService,
  SnackBarService,
}              from '../../../services';
import {
  SnackBarType,
}              from '@app/components/snackBar/enum.snack-bar';

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
    private router: Router,
    private gamesService: GameService,
    private user: UserService,
    private snackBar: SnackBarService,
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

  /**
   * allow a user to like this game
   */
  @Input() like = false;

  /**
   * allow this owner to publish:unpublish one of his game
   */
  @Input() publish = false;

  @Input() redirectPath: string;

  @Output() shouldUpdate = new EventEmitter();

  findCurrentGame = (gameId: string): any => this.games.find((item) => item.uuid === gameId);

  public getGamesList() {
    this.gamesService.getGames(
      {'limit': '10', 'offset': '1'},
      (datas) => this.games = datas,
    );
  }

  ownerCanEdit(game: any): boolean {
    if (this.edit) return this.user.user.uuid === game.owner;
    return false;
  }

  ownerCanDelete(game: any): boolean {
    if (this.delete) return this.user.user.uuid === game.owner;
    return false;
  }

  ownerCanTogglePublish(game: any): boolean {
    if (this.publish) return this.user.user.uuid === game.owner;
    return false;
  }

  deleteGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.gamesService.deleteGame(gameId,
      () => {
        this.snackBar.open(
          `Game ${currentGame.name} is deleted`,
          {},
          SnackBarType.SUCCESS,
        );
        this.needUpdate();
      },
      () => this.snackBar.open(
        `Can't delete ${currentGame.name}`,
        {},
        SnackBarType.ERROR,
      ),
    );
  }

  togglePublishGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.gamesService.updateGame(
      { published: !currentGame.published },
      gameId,
      () => {
        this.snackBar.open(
          `Game ${currentGame.name} is now ${currentGame.published ? 'publish' : 'unpublish'}`,
          {},
          SnackBarType.SUCCESS,
        );
        this.needUpdate();
      },
      () => this.snackBar.open(
        `Can't update ${currentGame.name}`,
        {},
        SnackBarType.ERROR,
      ),
    );
  }

  needUpdate(): void {
    this.shouldUpdate.emit();
  }

  redirectTo(): void {
    if (this.redirectPath)
      this.router.navigate([this.redirectPath]);
  }
}
