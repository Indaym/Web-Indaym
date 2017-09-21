/**
 * Created by nicolas on 5/5/17.
 */

import {
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
}                         from 'three';

import { ModelViewer }    from './model.viewer';
import { TextureService}  from '../../services';

export class CaseModelViewer extends ModelViewer {
  private _color;

  constructor(protected conf, protected textureService: TextureService, editorMode: Boolean = false) {
    super(conf, textureService, editorMode);
    this._color = (this.conf.color !== undefined) ? parseInt(this.conf.color.slice(1), 16) : 0xffffff;
  }

  /**
   * [ Override ]
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {
    this.material.opacity = (activate) ? 1 : 0.9;
    (this.material as MeshBasicMaterial).color.setHex((activate) ? this._color : 0xffffff);
    super.hover(activate);
  }

  /**
   * [ Override ]
   * Get the position to drop the object
   * @returns {Vector3}
   */
  public dropPosition(obj) {
    let pos = super.dropPosition(obj);
    return pos;
  }

  /**
   * Init case model
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    this.geometry = new PlaneGeometry(1, 1, 8, 8);
    if (this.material === undefined)
      this.material = new MeshBasicMaterial({color: this._color, side: DoubleSide, transparent: true, opacity: 0.9});
    let mesh = this.generateMesh();
    mesh.rotation.x = 90  * (Math.PI / 180);
    onLoad(mesh);
  }
}
