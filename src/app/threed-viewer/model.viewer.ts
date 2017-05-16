/**
 * Created by nicolas on 13/10/16.
 */

import {
  Vector3,
  Mesh,
  Geometry,
  Material,
} from 'three';

export class ModelViewer {
  private _dimension: Vector3 = new Vector3(1, 1, 1);
  private _position: Vector3 = new Vector3(0, 0, 0);
  private _mesh: Mesh;
  private _geometry: Geometry;
  private _material: Material;

  /**
   *
   * @param conf => type: json object
   * {
   *   position: Array
   *   dimension: Array
   *   geometry: THREE.Geometry
   *   material: THREE.Material
   * }
   */
  constructor(conf: any = {}) {
    if (conf.position instanceof Array)
      this._position.copy(new Vector3().fromArray(conf.position));
    if (conf.dimension instanceof Array)
      this._dimension.copy(new Vector3().fromArray(conf.dimension));
    if (conf.geometry instanceof Geometry)
      this._geometry = conf.geometry;
    if (conf.material instanceof Material)
      this._material = conf.material;
  }

  /**
   * Get position of model
   * @returns {Vector3}
   */
  get position(): Vector3 {
    return this._position;
  }

  /**
   * Set position of model
   * @param value
   */
  set position(value: Vector3) {
    this._position.copy(value);
    if (this._mesh != null)
      this._mesh.position.copy(this._position);
  }

  /**
   * Get dimension of model
   * @returns {Vector3}
   */
  get dimension(): Vector3 {
    return this._dimension;
  }

  /**
   * Set dimension of model
   * @param value
   */
  set dimension(value: Vector3) {
    this._dimension.copy(value);
  }

  /**
   * Get geometry of model
   * @returns {Geometry}
   */
  get geometry(): Geometry {
    return this._geometry;
  }

  /**
   * Set geometry of model
   * @param value
   */
  set geometry(value: Geometry) {
    this._geometry = value;
  }

  /**
   * Get material of model
   * @returns {Material}
   */
  get material(): Material {
    return this._material;
  }

  /**
   * Set material of model
   * @param value
   */
  set material(value: Material) {
    this._material = value;
  }

  /**
   * Get Mesh of model
   * @returns {Mesh}
   */
  get mesh(): Mesh {
    return this._mesh;
  }

  /**
   * Set Mesh of model
   * @param value
   */
  set mesh(value: Mesh) {
    this._mesh = value;
  }

  /**
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {}

  /**
   * Get the position to drop the object
   * @returns {Vector3}
   */
  public dropPosition(obj) {
    let pos = this.mesh.position.clone();
    pos.y += this.mesh.scale.y / 2;
    if (obj !== undefined)
      pos.y += obj.scale.y / 2;
    return pos;
  }

  /**
   * Generate Mesh with model informations
   * @returns {any} : Mesh
   */
  public generateMesh() {
    if (this._geometry == null || this._material == null)
      return null;
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.copy(this._position);
    this._mesh.scale.copy(this._dimension);
    return this._mesh;
  }
}
