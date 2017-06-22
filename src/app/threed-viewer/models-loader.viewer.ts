/**
 * Created by nicolas on 14/04/17.
 */

import {
  BoardModelViewer,
  PawnModelViewer,
  CaseModelViewer,
  GridModelViewer,
} from '.';

import { RulesServices }  from '../../services/rules.service';

export class ModelsLoader {
  private types = {
    'board': BoardModelViewer,
    'pawn': PawnModelViewer,
    'case': CaseModelViewer,
    'grid': GridModelViewer,
  };
  private rulesService: RulesServices;

  constructor(private scene, private editorMode: Boolean = false) {
    this.rulesService = new RulesServices();
  }

  /**
   * Load models on 3D view
   * @param models : models to load
   */
  public loadModels(models) {
    models.forEach((element) => {
      this.loadOneModel(element);
    });
  }

  /**
   * Load one model on 3D view
   * @param model : model to load
   */
  public loadOneModel(model) {
    let modelViewer = this.types[model.object.type];

    if (modelViewer !== undefined) {
      model.threeDModel = new modelViewer(model.object, this.editorMode);
      if (model.object.texturesPaths != undefined)
        model.threeDModel.texturesPaths = model.object.texturesPaths;
      model.threeDModel.init((mesh) => {
        mesh.LinkModel = model;
        this.scene.addInScene(mesh);
        this.scene.render();
      });

      if (model.object.rules != undefined) {
        model.object.rules.forEach(
          rule => model.rules.push(this.rulesService.newRules(rule.id, rule.conf))
        );
      }
    }
  }

  /**
   * Delete group of models
   * @param models : Models to load
   */
  public deleteModels(models) {}

  /**
   * Delete one model
   * @param model : Model to load
   */
  public deleteOneModel(model) {}

  /**
   * Init Event to load and delete models
   * @param gameController : gameController to init events
   */
  public initEvents(gameController) {
    gameController.subscribe('addObject', (event) => this.loadOneModel(event.datas));
    gameController.subscribe('addGroupObjects', (event) => this.loadModels(event.datas));
    gameController.subscribe('deleteObject', (event) => this.deleteOneModel(event.datas));
    gameController.subscribe('deleteGroupObjects', (event) => this.deleteModels(event.datas));
  }
}
