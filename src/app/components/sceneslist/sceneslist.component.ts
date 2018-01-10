import {
  Component,
  OnDestroy,
}                       from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                       from '@angular/router';
import {
  MatDialog,
}                       from '@angular/material';

import { Subscription } from 'rxjs/Rx';

import { comeFrom }     from '../../components/play';
import {
  CreateSceneDialogComponent,
}                       from '../widgets/createSceneDialog/createSceneDialog.component';

import {
  SceneService,
  SnackBarService,
} from '../../services';

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
  private canCreate = false;
  private sceneName: string;

  constructor(
    private scenes: SceneService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
  ) {
    route.data.subscribe((val) => {
      this.redirect = val.redirect;
      this.canCreate = val.create;
    });
    this.subscription = route.queryParams.subscribe(
      // (queryParam: any) => this.getScenesList(queryParam),
      (queryParam: any) => this.getScenesList(),
    );
  }

  private success = (msg: string) => {
    this.snackBar.openSuccess(msg);
    this.needUpdate();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // public getScenesList(queryParam) {
  public getScenesList() {
    this.gameId = localStorage.getItem('gameID');
    // this.isNew = parseInt(queryParam.new, 10);

    this.scenes.setGameId(this.gameId);
    this.scenes.getScenes((datas) => this.lsScenes = datas);
    // if (this.isNew === 1)
    //   this.scenes.postScene('Default', (datas) => this.goToScenePage(datas.uuid));
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

  needUpdate() {
    this.getScenesList();
  }

  public editScene(scene: any) {
    const dialogRef = this.dialog.open(CreateSceneDialogComponent, {
      data: {
        sceneName: scene.name,
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined || result.sceneName === undefined || result.sceneName.length === 0)
        return;

      this.scenes.updateScene(
        {'name': result.sceneName},
        scene.uuid,
        () => this.success(`${scene.name} successfully renamed in ${result.sceneName}`),
        () => this.snackBar.openError(`Can't update ${scene.name}`));
      });
  }

  public deleteScene(scene: any) {
    this.scenes.deleteScene(
      scene.uuid,
      () => this.success(`${scene.name} successfully deleted`),
      () => this.snackBar.openError(`Can't delete ${scene.name}`));
  }

  public canDisplay(): boolean {
    return this.router.url === '/sceneslist';
  }
}
