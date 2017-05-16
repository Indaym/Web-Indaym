/**
 * Created by nicolas on 13/10/16.
 */

import {
  CubeGeometry,
  MeshBasicMaterial,
  MultiMaterial,
}                             from 'three';

import { ModelViewer }        from './model.viewer';
import { TexturePoolViewer }  from './texture-pool.viewer';

export class BoardModelViewer extends ModelViewer {
  private _textureLoader: TexturePoolViewer;
  private _texturesPaths = [
    'side.png', 'side.png',
    'board.png', 'side.png',
    'side.png', 'side.png',
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
   * Init pawn model with textures
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    this._textureLoader = new TexturePoolViewer('/assets/img/three/');
    this.geometry = new CubeGeometry(1, 1, 1, 1, 1, 1);

    const materials = new Array(6);

    this._textureLoader.load(this._texturesPaths, (textures) => {
      this.material = new MultiMaterial(materials);
      const mesh = this.generateMesh();
      onLoad(mesh);
    }, (texture, index) => {
      // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      if (index > -1)
        materials[index] = new MeshBasicMaterial({ map: texture });
    });
  }
}
