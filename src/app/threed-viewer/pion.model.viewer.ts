/**
 * Created by nicolas on 15/10/16.
 */

import {
  CylinderGeometry,
  MeshBasicMaterial,
}                             from 'three';

import { ModelViewer }        from './model.viewer';
import { TexturePoolViewer }  from './texture-pool.viewer';

export class PionModelViewer extends ModelViewer {
  private _textureLoader: TexturePoolViewer;
  private _texturesPaths = [
    'white.png'
  ];

  constructor(conf) {
    super(conf);
  }

  get texturesPaths(): string[] {
    return this._texturesPaths;
  }

  set texturesPaths(value: Array<string>) {
    this._texturesPaths = value;
  }

  public init(onLoad) {
    this._textureLoader = new TexturePoolViewer('/assets/img/three/');
    this.geometry = new CylinderGeometry(this.dimension.x, this.dimension.y, this.dimension.z, 40);

    this._textureLoader.load(this._texturesPaths, (textures) => {
      this.material = new MeshBasicMaterial({map: textures[0]});
      const mesh = this.generateMesh();
      onLoad(mesh);

    }, (texture, index) => {
    });
  }
}
