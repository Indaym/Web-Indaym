import {
  Component,
  OnDestroy,
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                       from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import {
  HtmlService,
  SceneService,
}                       from '../../../services';

@Component({
  selector  : 'ia-sceneslist',
  template  : require('./sceneslist.component.html'),
  styles    : [
    require('./sceneslist.component.css'),
  ],
  providers : [ HtmlService, SceneService ],
})
export class ScenesListComponent implements OnDestroy {
  public lsScenes;
  public gameId;
  public isNew;
  public subscription: Subscription;

  constructor(public html: HtmlService, private scenes: SceneService, private route: ActivatedRoute, private router: Router) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getScenesList(queryParam)
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getScenesList(queryParam) {
    this.gameId = queryParam.gameId;
    this.isNew = queryParam.new;

    this.scenes.setGameId(this.gameId);
    if (this.isNew == 1) {
      this.scenes.postScene('Default', this, this.redirect);
    }
    this.lsScenes = this.scenes.getScenes();
  }

  public goToScenePage(id) {
    this.router.navigate(['/editor/designer'], { queryParams: { gameId: this.gameId, sceneId: id } });
  }

  public redirect(meuh, id) {
    meuh.goToScenePage(id.uuid);
  }

  public addScene() {
    let meuh = this;
    let myText = prompt('Scene Name: ');
    if (myText) {
      this.scenes.postScene(myText, meuh, this.redirect);
    }
  }

}
