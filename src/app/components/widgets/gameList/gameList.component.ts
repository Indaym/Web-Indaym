import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
}              from '@angular/core';
import {
  Router,
}              from '@angular/router';

import {
  UserService,
  GameService,
  SnackBarService,
  StoreService,
  PlayService,
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
    StoreService,
    PlayService,
  ],
})
export class GameListComponent implements OnInit {

  constructor(
    private router: Router,
    private gamesService: GameService,
    private storeService: StoreService,
    private playService: PlayService,
    private user: UserService,
    private snackBar: SnackBarService,
  ) {}

  nbGames: number;
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

  @Input() provider: 'games' | 'store' | 'play' = 'games';

  @Input() redirectPath: string;

  @Output() shouldUpdate = new EventEmitter();
  @Output() changePage = new EventEmitter();

  private findCurrentGame = (gameId: string): any => this.games.find((item) => item.uuid === gameId);

  ngOnInit() {
    this.getGames();
    this.countGames();
  }

  public getGames(opt = {}): void {
    this[`${this.provider}Service`].getGames(
      {
        ...{'limit': '10', 'offset': '0'},
        ...opt,
      },
      (data) => this.games = data,
    );
  }

  public countGames() {
    this[`${this.provider}Service`].getNbGames(
      {},
      (datas) => this.nbGames = datas.nbGames,
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
        this.snackBar.openSuccess(`Game ${currentGame.name} is deleted`);
        this.needUpdate();
      },
      () => this.snackBar.openError(`Can't delete ${currentGame.name}`),
    );
  }

  togglePublishGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.gamesService.updateGame(
      { published: !currentGame.published },
      gameId,
      () => {
        this.snackBar.openSuccess(
          `Game ${currentGame.name} is now ${currentGame.published ? 'publish' : 'unpublish'}`,
        );
        this.needUpdate();
      },
      () => this.snackBar.openError(`Can't update ${currentGame.name}`),
    );
  }

  needUpdate(): void {
    this.getGames();
    this.countGames();
    this.shouldUpdate.emit();
  }

  redirectTo(gameId: string): void {
    if (this.redirectPath) {
      localStorage.setItem('gameID', gameId);
      this.router.navigate([this.redirectPath]);
    }
  }

  addGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.storeService.addGameToLibrary(gameId,
      () => {
        this.snackBar.openSuccess(`Game ${currentGame.name} is now in your library`);
        this.needUpdate();
      },
      () => this.snackBar.openError(`Can't add ${currentGame.name}`),
    );
  }

  removeGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.storeService.removeGameFromLibrary(gameId,
      () => {
        this.snackBar.openSuccess(`Game ${currentGame.name} is not anymore in your library`);
        this.needUpdate();
      },
      () => this.snackBar.openError(`Can't delete ${currentGame.name}`),
    );
  }

  handleEvent(event: any) {
    this.getGames({ 'offset': `${event.pageIndex}`});
    this.countGames();
    this.changePage.emit(event);
  }
}
