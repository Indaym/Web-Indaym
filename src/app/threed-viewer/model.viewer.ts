/**
 * Created by nicolas on 13/10/16.
 */

import {
  Vector3,
  Mesh as ThreeMesh,
  Geometry as ThreeGeometry,
  Material as ThreeMaterial,
  BoxGeometry,
  MeshBasicMaterial,
  MeshFaceMaterial,
} from 'three';

export class ModelViewer {
  private Dimension: Vector3 = new Vector3(1, 1, 1);
  private Position: Vector3 = new Vector3(0, 0, 0);
  private Mesh: ThreeMesh;
  private Geometry: ThreeGeometry;
  private Material: ThreeMaterial;

  /*
   parameter : conf => type: json object
   {
   position: Array
   dimensions: Array
   geometry: THREE.ThreeGeometry
   material: THREE.ThreeMaterial
   }
   */
  constructor(conf: any = {}) {
    if (conf.position instanceof Array)
      this.Position.copy(new Vector3().fromArray(conf.position));
    if (conf.dimension instanceof Array)
      this.Dimension.copy(new Vector3().fromArray(conf.dimension));
    if (conf.geometry instanceof ThreeGeometry)
      this.Geometry = conf.geometry;
    if (conf.material instanceof ThreeMaterial)
      this.Material = conf.material;
  }

  get position(): Vector3 {
    return this.Position;
  }

  set position(value: Vector3) {
    this.Position.copy(value);
    if (this.Mesh != null)
      this.Mesh.position.copy(this.Position);
  }

  get dimension(): Vector3 {
    return this.Dimension;
  }

  set dimension(value: Vector3) {
    this.Dimension.copy(value);
  }

  get geometry(): ThreeGeometry {
    return this.Geometry;
  }

  set geometry(value: ThreeGeometry) {
    this.Geometry = value;
  }

  get material(): ThreeMaterial {
    return this.Material;
  }

  set material(value: ThreeMaterial) {
    this.Material = value;
  }

  get mesh(): ThreeMesh {
    return this.Mesh;
  }

  set mesh(value: ThreeMesh) {
    this.Mesh = value;
  }

  public generateMesh() {
    if (this.Geometry == null || this.Material == null)
      return null;
    this.Mesh = new ThreeMesh(this.Geometry, this.Material);
    this.Mesh.position.copy(this.Position);
    return this.Mesh;
  }

  // TO DELETE : Temporaire
  public defaultGenerate() {
    this.Geometry = new BoxGeometry(this.Dimension.x, this.Dimension.y, this.Dimension.z);
    this.Material = new MeshFaceMaterial([
        new MeshBasicMaterial({ color: 0xff0000 }),
        new MeshBasicMaterial({ color: 0xff0000 }),
        new MeshBasicMaterial({ color: 0x00ff00 }),
        new MeshBasicMaterial({ color: 0x00ff00 }),
        new MeshBasicMaterial({ color: 0x0000ff }),
        new MeshBasicMaterial({ color: 0x0000ff }),
      ]
    );
    this.generateMesh();
  }
}
