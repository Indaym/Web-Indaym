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
  private TextureLoader: TexturePoolViewer;
  private TexturesPaths = [
    'white.png',
  ];

  constructor(conf) {
    super(conf);
  }

  get texturesPaths(): string[] {
    return this.TexturesPaths;
  }

  set texturesPaths(value: Array<string>) {
    this.TexturesPaths = value;
  }

  public init(onLoad) {
    this.TextureLoader = new TexturePoolViewer('/assets/img/three/');
    this.geometry = new CylinderGeometry(this.dimension.x, this.dimension.y, this.dimension.z, 40);

    this.TextureLoader.load(this.TexturesPaths, (textures) => {
      this.material = new MeshBasicMaterial({map: textures[0]});
      const mesh = this.generateMesh();
      onLoad(mesh);
    });
  }
}
