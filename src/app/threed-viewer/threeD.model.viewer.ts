const OBJLoader2 = require('threejsaddons');

export class ThreeDModelViewer {
  private objloader;

  constructor(scene) {
    this.objloader = new OBJLoader2();
    this.objloader.load('/assets/models/Pawn.OBJ', (suc) => {
      scene.add(suc);
    });
  }
}
