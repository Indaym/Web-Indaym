/**
 * Created by nicolas on 14/04/17.
 */

import {
  BoardModelViewer,
  PawnModelViewer
} from '.'

export class ModelsLoader {
  private types = {
    'board': BoardModelViewer,
    'pawn': PawnModelViewer
  };

  constructor(private scene) {}

  /**
   * Load models on 3D view
   * @param models : models to load
   */
  loadModels(models) {
    models.forEach((element) => {
      this.loadOneModel(element);
    })
  }

  /**
   * Load one model on 3D view
   * @param model : model to load
   */
  loadOneModel(model) {
    let modelViewer = this.types[model.object.type];

    if (modelViewer !== undefined) {
      model.threeDModel = new modelViewer({
        dimension: model.object.dimension,
        position: model.object.position
      });
      if (model.object.texturesPaths != undefined)
        model.threeDModel.texturesPaths = model.object.texturesPaths;
      model.threeDModel.init((mesh) => {
        mesh.LinkModel = model;
        this.scene.addInScene(mesh);
        this.scene.render();
      });
    }
  }

  /**
   * Delete group of models
   * @param models : Models to load
   */
  deleteModels(models) {}

  /**
   * Delete one model
   * @param model : Model to load
   */
  deleteOneModel(model) {}

  /**
   * Init Event to load and delete models
   * @param gameController : gameController to init events
   */
  initEvents(gameController) {
    gameController.subscribe('addObject', (event) => this.loadOneModel(event.datas));
    gameController.subscribe('addGroupObjects', (event) => this.loadModels(event.datas));
    gameController.subscribe('deleteObject', (event) => this.deleteOneModel(event.datas));
    gameController.subscribe('deleteGroupObjects', (event) => this.deleteModels(event.datas));
  }
}