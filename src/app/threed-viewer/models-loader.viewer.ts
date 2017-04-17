/**
 * Created by nicolas on 14/04/17.
 */

import {
  BoardModelViewer,
  PionModelViewer
} from '.'

export class ModelsLoader {
  private types = {
    'board': BoardModelViewer,
    'pawn': PionModelViewer
  };

  constructor(private scene) {
  }

  loadModels(models) {
    models.forEach((element) => {
      this.loadOneModel(element);
    })
  }

  loadOneModel(model) {
    model.object = JSON.parse(model.object);
    let modelViewer = this.types[model.object.type];

    if (modelViewer !== undefined) {
      model.threeDModel = new modelViewer({
        dimension: model.object.dimension,
        position: model.object.position
      });
      if (model.object.texturesPaths != undefined)
        model.threeDModel.texturesPaths = model.object.texturesPaths;
      model.threeDModel.init((mesh) => {
        this.scene.addInScene(mesh);
        this.scene.render();
      });
    }
  }

  deleteModels(models) {
  }

  deleteOneModel(model) {
  }

  initEvents(gameController) {
    gameController.subscribe('addObject', (event) => this.loadOneModel(event.datas));
    gameController.subscribe('addGroupObjects', (event) => this.loadModels(event.datas));
    gameController.subscribe('deleteObject', (event) => this.deleteOneModel(event.datas));
    gameController.subscribe('deleteGroupObjects', (event) => this.deleteModels(event.datas));
  }
}