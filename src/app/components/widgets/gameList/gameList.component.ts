import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
}              from '@angular/core';
import {
  Router,
}              from '@angular/router';

import {
  MatDialog,
}              from '@angular/material';

import {
  UserService,
  GameService,
  SnackBarService,
  StoreService,
  PlayService,
}              from '../../../services';

import {
  OrderType,
  glyphs,
}                                 from '../../../pipes/order-by/order-type.enum';

import {
  SnackBarType,
}              from '@app/components/snackBar/enum.snack-bar';

import {
  CreateGameDialogComponent,
}              from '../createGameDialog/createGameDialog.component';

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
    private dialog: MatDialog,
  ) {}

  public offset = 0;
  public nbGames: number;
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

  public filter = '';
  public order = OrderType.DEFAULT;
  @ViewChild('glyph') private glyph;

  private findCurrentGame = (gameId: string): any => this.games.find((item) => item.uuid === gameId);

  private success = (msg: string) => {
    this.snackBar.openSuccess(msg);
    this.needUpdate();
  }

  ngOnInit() {
    this.getGames();
    this.countGames();
  }

  public getGames(opt = {}): void {
    this[`${this.provider}Service`].getGames(
      {
        ...{'limit': '1000', 'offset': this.offset.toString()},
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
      () => this.success(`Game ${currentGame.name} is deleted`),
      () => this.snackBar.openError(`Can't delete ${currentGame.name}`),
    );
  }

  togglePublishGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.gamesService.updateGame(
      { published: !currentGame.published },
      gameId,
      () => this.success(`Game ${currentGame.name} is now ${currentGame.published ? 'publish' : 'unpublish'}`),
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
      () => this.success(`Game ${currentGame.name} is now in your library`),
      () => this.snackBar.openError(`Can't add ${currentGame.name}`),
    );
  }

  removeGame(gameId: string): void {
    const currentGame = this.findCurrentGame(gameId);

    this.storeService.removeGameFromLibrary(gameId,
      () => this.success(`Game ${currentGame.name} is not anymore in your library`),
      () => this.snackBar.openError(`Can't delete ${currentGame.name}`),
    );
  }

  editGame(gameId: string) {
    const currentGame = this.findCurrentGame(gameId);

    const dialogRef = this.dialog.open(CreateGameDialogComponent, {
      data: {
        gameName: currentGame.name,
        gameDescription: currentGame.description,
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined)
        return;

      this.gamesService.updateGame(
        {'name': result.gameName, 'description': result.gameDescription },
        gameId,
        () => this.success(`${currentGame.name} successfully updated`),
        () => this.snackBar.openError(`Can't update ${currentGame.name}`),
      );
    });
  }

  handleEvent(event: any) {
    this.offset = event.pageIndex;
    // this.getGames({ 'offset': `${event.pageIndex}`});
    // this.countGames();
    this.changePage.emit(event);
  }

  switchOrder() {
    this.order = (this.order === OrderType.DESC) ? OrderType.DEFAULT : this.order + 1;
    this.glyph.nativeElement.className = glyphs[this.order];
  }
}
