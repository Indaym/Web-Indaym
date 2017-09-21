/**
 * Created by nicolas on 14/04/17.
 */

import {
  BoardModelViewer,
  PawnModelViewer,
  CaseModelViewer,
  GridModelViewer,
} from '.';

import {
  TextureService
} from '../../services/';

import { RulesServices }  from '../../services/rules.service';


export class ModelsLoader {
  private types = {
    'board': BoardModelViewer,
    'pawn': PawnModelViewer,
    'case': CaseModelViewer,
    'grid': GridModelViewer,
  };
  private rulesService: RulesServices;

  constructor(private scene, private textureService: TextureService, private editorMode: Boolean = false) {
    this.rulesService = new RulesServices();  
  }

  /**
   * Load models on 3D view
   * @param models : models to load
   */
  public loadModels(models) {
    models.forEach((element) => {
      this.loadOneModel(element, false);
    });
    this.scene.render();
  }

  /**
   * Load one model on 3D view
   * @param model : model to load
   */
  public loadOneModel(model, render = true) {
    let modelViewer = this.types[model.object.type];

    if (modelViewer !== undefined) {
      model.threeDModel = new modelViewer(model.object, this.textureService, this.editorMode);

      const addin = () => {
        model.threeDModel.init((mesh) => {
          mesh.LinkModel = model;
          this.scene.addInScene(mesh);
          if (render)
            this.scene.render();
        });
      };
      if (model.textureRef != undefined) {
        this.textureService.getLocalTexture(model.textureRef, (texture) => {
          if (texture)
            model.threeDModel.texture = texture;
          addin();
        });
      } else {
        addin();

      if (model.object.rules != undefined) {

        model.rules = {};

        model.object.rules.forEach(
          (rule) => {
            const ruleDef = this.rulesService.getRules(rule.id);
            const ruleInstance = new ruleDef(this.scene, model, rule.conf);

            model.rules[ruleInstance.id] = ruleInstance;
          }
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
