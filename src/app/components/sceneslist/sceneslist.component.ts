import {
  Component,
  OnDestroy
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router
}                       from '@angular/router';
import { Subscription } from "rxjs/Rx";

import {
  HtmlService,
  SceneService
}                       from "../../../services";

@Component({
  selector  : 'ia-sceneslist',
  template  : require('./sceneslist.component.html'),
  styles    : [
    require('./sceneslist.component.css')
  ],
  providers : [HtmlService, SceneService],
})
export class ScenesListComponent implements OnDestroy {

  constructor(public html: HtmlService, private scenes: SceneService, private route: ActivatedRoute, private router: Router) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getScenesList(queryParam)
    );
  }

  lsScenes;
  gameId;
  isNew;
  subscription: Subscription;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getScenesList(queryParam) {
    this.gameId = queryParam['gameId'];
    this.isNew = queryParam['new'];

    if (this.isNew == 1) {
      this.scenes.postScene('Default', this, this.redirect);
    }
    this.scenes.setGameId(this.gameId);
    this.lsScenes = this.scenes.getScenes();
  }

  public goToScenePage(id) {
    this.router.navigate(['/editor/designer'], { queryParams: { gameId: this.gameId, sceneId: id } });
  }

  public redirect(meuh, id) {
    meuh.goToScenePage(id.uuid);
  }

  public addScene() {
    var meuh = this;
    var my_text = prompt('Scene Name: ');
    if (my_text) {
      this.scenes.postScene(my_text, meuh, this.redirect);
    }
  }

}
