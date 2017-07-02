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
  constructor(conf, private editMode: Boolean = false) {
    super(conf, editMode);
  }

  /**
   * [ Override ]
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {
    if (this.editMode === false)
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
    if (this.editMode === true)
      this.material.opacity = 0.5;
    onLoad(mesh);
  }
}
