/**
 * Created by nicolas on 13/10/16.
 */

import {
  Vector3,
  Mesh,
  Geometry,
  Material,
  MeshBasicMaterial,
  TextureLoader,
  Euler,
  DoubleSide,
}                         from 'three';

import { TextureService } from '../services';

export class ModelViewer {
  private _dimension: Vector3 = new Vector3(1, 1, 1);
  private _rotation: Euler = new Euler(0, 0, 0);
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
  constructor(conf: any = {}, protected textureService: TextureService, editorMode = false) {
    if (conf.position instanceof Array)
      this._position.copy(new Vector3().fromArray(conf.position));
    if (conf.dimension instanceof Array)
      this._dimension.copy(new Vector3().fromArray(conf.dimension));
    if (conf.rotation instanceof Array)
      this._rotation.copy(new Euler().fromArray(conf.rotation));
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
    const pos = new Vector3();
    if (this.mesh !== undefined)
      pos.setFromMatrixPosition(this.mesh.matrixWorld);
    return pos;
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
    if (this.mesh !== undefined)
      this._dimension.copy(this.mesh.scale);
    return this._dimension;
  }

  /**
   * Set dimension of model
   * @param value
   */
  set dimension(value: Vector3) {
    this._dimension.copy(value);
    if (this.mesh !== undefined)
      this.mesh.scale.copy(this._dimension);
  }

  /**
   * Get rotation of model
   * @returns {Vector3}
   */
  get rotation(): Euler {
    if (this.mesh !== undefined)
      this._rotation.copy(this.mesh.rotation);
    return this._rotation;
  }

  /**
   * Set rotation of model
   * @param value
   */
  set rotation(value: Euler) {
    this._rotation.copy(value);
    if (this.mesh !== undefined)
      this.mesh.rotation.copy(this._rotation);
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
   * Set texture by url
   */
  set texture(texture) {
    this._material = new MeshBasicMaterial({ map: new TextureLoader().load(texture), side: DoubleSide, transparent: true, opacity: 1 });
    this._material.needsUpdate = true;
    if (this.mesh !== undefined)
      this.mesh.material = this._material;
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
    const pos = new Vector3();
    pos.setFromMatrixPosition(this.mesh.matrixWorld);
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
    if (this._geometry === undefined)
      return null;
    if (this._material === undefined)
      this._material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide, transparent: true, opacity: 1 });
    this._mesh = new Mesh(this._geometry, this._material);
    this._mesh.position.copy(this._position);
    this._mesh.scale.copy(this._dimension);
    this._mesh.rotation.copy(this._rotation);
    return this._mesh;
  }
}
