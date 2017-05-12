/**
 * Created by nicolas on 15/10/16.
 */

import {
  CylinderGeometry,
  MeshBasicMaterial
}                             from 'three';

import { ModelViewer }        from './model.viewer';
import { TexturePoolViewer }  from './texture-pool.viewer';

export class PawnModelViewer extends ModelViewer {
  private _textureLoader: TexturePoolViewer;
  private _texturesPaths = [
    'white.png'
  ];

  constructor(conf) {
    super(conf);
  }

  /**
   * Get textures paths
   * @returns {string[]}
   */
  get texturesPaths(): string[] {
    return this._texturesPaths;
  }

  /**
   * Set textures paths
   * @param value
   */
  set texturesPaths(value: Array<string>) {
    this._texturesPaths = value;
  }

  /**
   * Init pion model with textures
   * @param onLoad : Callback when loaded
   */
  init(onLoad) {
    this._textureLoader = new TexturePoolViewer('/assets/img/three/');
    this.geometry = new CylinderGeometry(1, 1, 1, 40);

    this._textureLoader.load(this._texturesPaths, (textures) => {
      this.material = new MeshBasicMaterial({map: textures[0]});
      const mesh = this.generateMesh();
      onLoad(mesh);
    }, (texture, index) => {
    });
  }
}