// const OBJLoader2 = require('threejsaddons');
import { OBJLoader2 } from 'threejsaddons';

export class ThreeDModelViewer {
  private objloader;

  constructor(private path: string) {
    this.objloader = new OBJLoader2();
  }

  public load(callback) {
    this.objloader.load(this.path, callback);
  }
}
