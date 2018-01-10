/**
 * Created by nicolas on 29/09/17.
 */

import {
  Shape,
  ExtrudeGeometry,
  MeshPhongMaterial,
  Mesh,
}                             from 'three';

import { ModelViewer }        from './model.viewer';
import { TextureService }     from '../services';

export class ArrowHelperViewer extends ModelViewer {

  constructor(conf, protected textureService: TextureService, editorMode = false) {
    super(conf, textureService, editorMode);
  }

  /**
   * Init arrow helper
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    const triangleShape = new Shape();
/*  triangleShape.moveTo( 8, 2 );
    triangleShape.lineTo( 4, 8 );
    triangleShape.lineTo( 12, 8 );
    triangleShape.lineTo( 8, 2 ); // close path
 */
    triangleShape.moveTo( 0, 0 );
    triangleShape.lineTo( -4, 6 );
    triangleShape.lineTo( 5, 6 );
    triangleShape.lineTo( 0, 0 ); // close path

    this.geometry = new ExtrudeGeometry(triangleShape, {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    });
    const mesh = this.generateMesh();
    onLoad(mesh);
  }
}
