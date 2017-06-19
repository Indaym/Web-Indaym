import {
  Component,
  OnDestroy,
  OnInit,
}                         from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';

import {
  ObjectService,
  SceneService,
  GameService,
  GameControllerService,
}                         from '../../../services';

@Component({
  selector  : 'ia-editor',
  template  : require('./editor.component.html'),
  styles    : [
    require('./editor.component.css'),
  ],
  providers : [GameService, SceneService, ObjectService, GameControllerService],
})
export class EditorComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  private gameController;

  constructor(
    private gameControllerService: GameControllerService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private sceneService: SceneService,
    private objectService: ObjectService
    ) {
    this.gameController = gameControllerService.gameController;
//    this.gameController.fillObjectsController();
  }

  public ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        if (queryParam.gameId !== undefined && queryParam.sceneId !== undefined)
          this.initObjectsList(queryParam.gameId, queryParam.sceneId);
      }
    );
    this.gameController.subscribe('addObjectToService', (obj) => {
      let pushObject = Object.keys(obj.datas).reduce((result, key) => {
        if (key !== 'threeDModel' && key !== 'LinkModel')
          result[key] = obj.datas[key];
        return result;
      }, {});
      this.objectService.postSceneObject(pushObject, obj.success, obj.error);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initObjectsList(gameId, sceneId) {
    this.gameController.setGameId(gameId);
    this.gameController.setSceneId(sceneId);
    this.gameService.getOneGame(gameId, (data) => {
      this.gameController.setGame(data, false);
      // this.sceneService.setGameId(queryParam['gameId']);
      // this.sceneService.getScenes((dat) => {
      //   this.gameController.setScenes(dat, false);
      // });
    });
    this.objectService.setIds(gameId, sceneId);
    this.objectService.getObjects((datas) => {
      datas.forEach((elem) => {
        elem.object = JSON.parse(elem.object);
      });
      this.gameController.addGroupObjects(datas);
    });
  }
}
