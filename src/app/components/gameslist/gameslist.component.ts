import {
  Component,
  OnInit,
}                       from '@angular/core';
import {
  Router,
  ActivatedRoute,
}                       from '@angular/router';

import {
  GameService,
  SnackBarService,
}                       from '../../services';

import { SnackBarType } from '../snackBar';

@Component({
  selector  : 'ia-gameslist',
  templateUrl   : './gameslist.component.html',
  styleUrls    : [
    './gameslist.component.scss',
  ],
  providers : [ GameService ],
})

export class GamesListComponent implements OnInit {
  public lsGames = [];

  constructor(
    private games: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
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
    const myText = prompt('Game Name: ');
    if (myText) {
      const myDescription = prompt('Game Description: ');
      this.games.postGame(myText, (id) => {
        this.games.postDescription(myDescription, id.uuid);
        this.goToScenesPage(id.uuid, 1);
      });
    }
  }

  public getGamesList() {
    this.games.getGames((datas) => this.lsGames = datas);
  }
}
