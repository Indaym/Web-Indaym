/**
 * Created by nicolas on 5/5/17.
 */

import {
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
}                       from 'three';

import { ModelViewer }  from './model.viewer';

export class CaseModelViewer extends ModelViewer {
  constructor(conf) {
    super(conf);
  }

  /**
   * [ Override ]
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {
    this.material.opacity = (activate) ? 0.5 : 0;
    super.hover(activate);
  }

  /**
   * [ Override ]
   * Get the position to drop the object
   * @returns {Vector3}
   */
  public dropPosition(obj) {
    let pos = super.dropPosition(obj);
    pos.y = this.mesh.position.y + obj.scale.y / 2;
    return pos;
  }

  /**
   * Init case model
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    this.geometry = new PlaneGeometry(1, 1, 8, 8);
    this.material = new MeshBasicMaterial({color: 0xffffff, side: DoubleSide, transparent: true, opacity: 0});
    let mesh = this.generateMesh();
    mesh.rotation.x = 90  * (Math.PI / 180);
    onLoad(mesh);
  }
}
