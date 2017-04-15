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
    let modelViewer = this.types[model.object.type];

    if (modelViewer !== undefined) {
      model.threeDModel = new modelViewer({
        dimension: model.object.dimension,
        position: model.object.position
      });
      model.threeDModel.texturesPaths = model.object.texturePaths;
      model.threeDModel.init((mesh) => {
        this.scene.addInScene(mesh);
        this.scene.render();
      });
    }
  }
}