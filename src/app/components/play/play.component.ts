import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { PlayService }  from '../../services';

export let comeFrom = '';

@Component({
  selector  : 'ia-play',
  templateUrl   : './play.component.html',
  styleUrls    : [
    './play.component.scss',
  ],
  providers : [ PlayService ],
})
export class PlayComponent {
  public lsGames = [];

  constructor(private games: PlayService, private router: Router) {}

  public goToScenesPage(id) {

      comeFrom = 'Play';

      this.router.navigate(['/sceneslist'], { queryParams: { gameId: id, new: 0 } });
  }
}
