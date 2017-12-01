import {
  Component,
  OnDestroy,
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                       from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { comeFrom }     from '../../components/play';

import { SceneService } from '../../services';

@Component({
  selector  : 'ia-sceneslist',
  templateUrl   : './sceneslist.component.html',
  styleUrls    : [
    './sceneslist.component.css',
  ],
  providers : [
    SceneService,
  ],
})
export class ScenesListComponent implements OnDestroy {
  public lsScenes = [];
  public gameId;
  public isNew;
  public subscription: Subscription;

  constructor(private scenes: SceneService, private route: ActivatedRoute, private router: Router) {
    this.subscription = route.queryParams.subscribe(
      (queryParam: any) => this.getScenesList(queryParam),
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
    this.gameId = localStorage.getItem('gameID');
    this.isNew = parseInt(queryParam.new, 10);

    this.scenes.setGameId(this.gameId);
    this.scenes.getScenes((datas) => this.lsScenes = datas);
    if (this.isNew === 1)
      this.scenes.postScene('Default', (datas) => this.goToScenePage(datas.uuid));
  }

  public goToScenePage(id) {
    localStorage.setItem('sceneID', id);
    this.router.navigate(['/editor/designer']);
  }

  public addScene() {
    const myText = prompt('Scene Name: ');
    if (myText)
      this.scenes.postScene(myText, (datas) => this.goToScenePage(datas.uuid));
  }
}
