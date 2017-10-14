import {
  Component,
  OnDestroy,
  OnInit,
}                         from '@angular/core';
import {
  ActivatedRoute,
  Router,
}                         from '@angular/router';
import { Subscription }   from 'rxjs';

import {
  ObjectService,
  SceneService,
  GameService,
  GameControllerService,
  TextureService,
}                         from '../../services';

@Component({
  selector  : 'ia-editor',
  templateUrl   : './editor.component.html',
  styleUrls    : [
    './editor.component.css',
  ],
  providers : [ GameService, SceneService, ObjectService, GameControllerService, TextureService ],
})
export class EditorComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  private gameController;

  constructor(
    private gameControllerService: GameControllerService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private sceneService: SceneService,
    private objectService: ObjectService,
    private textureService: TextureService,
    private router: Router,
    ) {
      this.gameController = gameControllerService.gameController;
    // this.gameController.fillObjectsController();
  }

  public ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((q) => {
      const gameID = localStorage.getItem('gameID');
      const sceneID = localStorage.getItem('sceneID');

      if (gameID === null || sceneID === null) {
        this.router.navigate(['/gameslist'], { queryParams: { error: true }});
      } else {
        this.initObjectsList(gameID, sceneID);
      }
    });

    this.gameController.subscribe('addObjectToService', (obj) => {
      const pushObject = Object.keys(obj.datas).reduce((result, key) => {
        if (key !== 'threeDModel' && key !== 'LinkModel') {
          result[key] = obj.datas[key];
      }
        return result;
      }, {});
      this.objectService.postSceneObject(pushObject, (id) => {
        this.objectService.getOneObject(id.uuid, (ret) => {
          ret.object = JSON.parse(ret.object);
          obj.success(ret);
        });
      }, obj.error);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initObjectsList(gameId, sceneId) {
    this.gameController.gameId = gameId;
    this.gameController.sceneId = sceneId;
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
