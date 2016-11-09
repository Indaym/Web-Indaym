/**
 * Created by nicolas on 13/10/16.
 */

import {
  CubeGeometry,
  MeshBasicMaterial,
  MeshFaceMaterial,
}                             from 'three';

import { ModelViewer }        from './model.viewer';
import { TexturePoolViewer }  from './texture-pool.viewer';

export class BoardModelViewer extends ModelViewer {
  private TextureLoader: TexturePoolViewer;
  private TexturesPaths = [
    'side.png', 'side.png',
    'board.png', 'side.png',
    'side.png', 'side.png',
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
    this.geometry = new CubeGeometry(this.dimension.x, this.dimension.y, this.dimension.z, 1, 1, 1);

    const materials = new Array(6);

    this.TextureLoader.load(this.TexturesPaths, (textures) => {
      this.material = new MeshFaceMaterial(materials);
      const mesh = this.generateMesh();
      onLoad(mesh);

    }, (texture, index) => {
      // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      if (index > -1)
        materials[index] = new MeshBasicMaterial({ map: texture });
    });
  }
}
