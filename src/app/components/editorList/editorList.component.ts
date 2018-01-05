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
}                       from '../../services';

import { SnackBarType } from '../snackBar';

import {
  CreateGameDialogComponent,
}                       from '../widgets/createGameDialog/createGameDialog.component';

@Component({
  selector  : 'ia-gameslist',
  templateUrl   : './editorList.component.html',
  styleUrls    : [
    './editorList.component.css',
  ],
  providers : [ GameService ],
})

export class EditorListComponent implements OnInit {
  public lsGames = [];

  public gameName: string;
  public gameDescription: string;
  public sceneName: string;

  constructor(
    private games: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) {
    this.getGamesList();
  }

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
      height: '500px',
      width: '300px',
      data: {
        gameName: this.gameName,
        gameDescription: this.gameDescription,
        sceneName: this.sceneName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
    // const myText = prompt('Game Name: ');
    // if (myText) {
    //   const myDescription = prompt('Game Description: ');
    //   this.games.postGame(myText, (id) => {
    //     this.games.postDescription(myDescription, id.uuid);
    //     this.goToScenesPage(id.uuid, 1);
    //   });
    // }
  }

  public getGamesList() {
    this.games.getGames(
      {'limit': '10', 'offset': '1'},
      (datas) => this.lsGames = datas,
    );
  }
}
