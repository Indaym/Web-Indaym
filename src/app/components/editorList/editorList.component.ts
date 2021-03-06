import {
  Component,
  OnInit,
}                       from '@angular/core';
import {
  Router,
  ActivatedRoute,
}                       from '@angular/router';
import {
  MatDialog,
}                       from '@angular/material';

import {
  GameService,
  SnackBarService,
  SceneService,
  UserService,
}                       from '../../services';

import { SnackBarType } from '../snackBar';

import {
  CreateGameDialogComponent,
}                       from '../widgets/createGameDialog/createGameDialog.component';

@Component({
  selector  : 'ia-gameslist',
  templateUrl   : './editorList.component.html',
  styleUrls    : [
    './editorList.component.scss',
  ],
  providers : [
    GameService,
    SceneService,
  ],
})

export class EditorListComponent implements OnInit {
  public lsGames = [];

  public gameName: string;
  public gameDescription: string;
  public sceneName: string;

  constructor(
    private user: UserService,
    private games: GameService,
    private scene: SceneService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((q) => {
      if (q.error === 'true')
        this.snackBarService.open('Informations about the game are missing', {}, SnackBarType.ERROR);
    });
  }

  public goToScenesPage(id, isNew = 0) {
    localStorage.setItem('gameID', id);
    this.router.navigate(['/sceneslist'], { queryParams: { new: isNew } });
  }

  public gameFunction() {
    const dialogRef = this.dialog.open(CreateGameDialogComponent, {
      data: {
        gameName: this.gameName,
        gameDescription: this.gameDescription,
        sceneName: this.sceneName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined || result.gameName === undefined || result.gameName.length === 0)
        return;

      if (result.sceneName === undefined || result.sceneName.length === 0)
        result.sceneName = 'Default';
      this.games.postGame(result.gameName, (gameId) => {
        console.log(gameId);
        localStorage.setItem('gameID', gameId.uuid);

        this.games.postDescription(result.gameDescription || '', gameId.uuid);
        this.scene.setGameId(gameId.uuid);
        this.scene.postScene(result.sceneName, (sceneId) => {
          localStorage.setItem('sceneID', sceneId.uuid);

          this.router.navigate(['/editor/designer']);
        });
      });
    });
  }
}
