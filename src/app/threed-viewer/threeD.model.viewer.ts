import {
  MeshPhongMaterial,
  Vector3,
} from 'three';

const OBJLoader2 = require('threejsaddons');

export class ThreeDModelViewer {
  private objloader;

  constructor(private path:string) {
    this.objloader = new OBJLoader2();
  }

  public load(callback) {
    this.objloader.load(this.path, callback);
  }
}
