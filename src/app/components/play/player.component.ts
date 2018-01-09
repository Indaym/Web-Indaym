import { Component }    from '@angular/core';

import {
  GameControllerService,
  TextureService,
  ObjectService,
  GameService,
  SceneService,
}                       from '../../services';

@Component({
  selector  : 'ia-player',
  template   : '<ia-preview></ia-preview>',
  providers : [ GameControllerService, TextureService, ObjectService, GameService, SceneService ],
})
export class PlayerComponent {
  private gameController;

  constructor(
    gameControllerService: GameControllerService,
    private gameService: GameService,
    private objectService: ObjectService,
    private sceneService: SceneService,
  ) {
    this.gameController = gameControllerService.gameController;
    this.initObjectsList();
  }

  private initObjectsList() {
    const gameId = localStorage.getItem('gameID');
    const sceneId = localStorage.getItem('sceneID');

    this.gameController.gameId = gameId;
    this.gameController.sceneId = sceneId;
    this.gameService.getOneGame(gameId, (data) => {
      this.gameController.setGame(data, false);
      this.sceneService.setGameId(gameId);
      this.sceneService.getScenes((dat) => {
        this.gameController.setScenes(dat, false);
      });
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
