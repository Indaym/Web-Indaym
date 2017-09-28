import {
  Component,
  OnDestroy,
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                       from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { comeFrom } from '../../components/play';

import {
  HtmlService,
  SceneService,
}                       from '../../../services';

@Component({
  selector  : 'ia-sceneslist',
  templateUrl   : './sceneslist.component.html',
  styleUrls    : [
    './sceneslist.component.css',
  ],
  providers : [ HtmlService, SceneService ],
})
export class ScenesListComponent implements OnDestroy {
  public lsScenes = [];
  public gameId;
  public isNew;
  public subscription: Subscription;

  constructor(public html: HtmlService, private scenes: SceneService, private route: ActivatedRoute, private router: Router) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getScenesList(queryParam)
    );
  }

/*
  public ngOnInit() {
    if (comeFrom == "Play")
      document.getElementById("toHideIfPlay").innerHTML = "";
  }
  */

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getScenesList(queryParam) {
    this.gameId = queryParam.gameId;
    this.isNew = parseInt(queryParam.new);

    this.scenes.setGameId(this.gameId);
    this.scenes.getScenes((datas) => this.lsScenes.push(datas));
    if (this.isNew === 1)
      this.scenes.postScene('Default', (datas) => this.goToScenePage(datas.uuid));
  }

  public goToScenePage(id) {
    this.router.navigate(['/editor/designer'], { queryParams: { gameId: this.gameId, sceneId: id } });
  }

  public addScene() {
    let myText = prompt('Scene Name: ');
    if (myText)
      this.scenes.postScene(myText, (datas) => this.goToScenePage(datas.uuid));
  }
}
