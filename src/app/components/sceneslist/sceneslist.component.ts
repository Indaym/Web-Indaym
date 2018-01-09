import {
  Component,
  OnDestroy,
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                       from '@angular/router';
import { MatDialog }    from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { comeFrom }     from '../../components/play';

import { SceneService } from '../../services';

import {
  CreateSceneDialogComponent,
}                       from '../widgets/createSceneDialog/createSceneDialog.component';

@Component({
  selector  : 'ia-sceneslist',
  templateUrl   : './sceneslist.component.html',
  styleUrls    : [
    './sceneslist.component.scss',
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
  private redirect;
  private sceneName;

  constructor(private scenes: SceneService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
    route.data.subscribe((val) => this.redirect = val.redirect);
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
    this.router.navigate([this.redirect]);
  }

  public addScene() {
    const dialogRef = this.dialog.open(CreateSceneDialogComponent, {
      data: {
        sceneName: this.sceneName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined)
        return;

      if (result.sceneName !== undefined && result.sceneName.length > 0)
        this.scenes.postScene(result.sceneName, (datas) => this.goToScenePage(datas.uuid));
    });
  }
}
