/**
 * Created by nicolas on 13/10/16.
 */

import {
    Vector3,
    Mesh,
    Geometry,
    Material
} from 'three';

import {
    BoxGeometry,
    MeshBasicMaterial,
    MeshFaceMaterial
} from 'three';

export class ModelViewer {

    private _dimension: Vector3 = new Vector3(1, 1, 1);
    private _position: Vector3 = new Vector3(0, 0, 0);
    private _mesh: Mesh;
    private _geometry: Geometry;
    private _material: Material;

    /*
    parameter : conf => type: json object
        {
            position: Array
            dimensions: Array
            geometry: THREE.Geometry
            material: THREE.Material
        }
     */
    constructor(conf:any = {}) {
        if (conf.position instanceof Array)
            this._position.copy(new Vector3().fromArray(conf.position));
        if (conf.dimension instanceof Array)
            this._dimension.copy(new Vector3().fromArray(conf.dimension));
        if (conf.geometry instanceof Geometry)
            this._geometry = conf.geometry;
        if (conf.material instanceof Material)
            this._material = conf.material;
    }

    get position():Vector3 {
        return this._position;
    }

    set position(value:Vector3) {
        this._position.copy(value);
        if (this._mesh != null)
            this._mesh.position.copy(this._position);
    }

    get dimension():Vector3 {
        return this._dimension;
    }

    set dimension(value:Vector3) {
        this._dimension.copy(value);
    }

    get geometry():Geometry {
        return this._geometry;
    }

    set geometry(value:Geometry) {
        this._geometry = value;
    }

    get material():Material {
        return this._material;
    }

    set material(value:Material) {
        this._material = value;
    }

    get mesh():Mesh {
        return this._mesh;
    }

    set mesh(value:Mesh) {
        this._mesh = value;
    }

    generateMesh() {
        if (this._geometry == null || this._material == null)
            return null;
        this._mesh = new Mesh(this._geometry, this._material);
        this._mesh.position.copy(this._position);
        return this._mesh;
    }

    defaultGenerate() {
        this._geometry = new BoxGeometry(this._dimension.x, this._dimension.y, this._dimension.z);
        this._material = new MeshFaceMaterial([
            new MeshBasicMaterial({color: 0xff0000}),
            new MeshBasicMaterial({color: 0xff0000}),
            new MeshBasicMaterial({color: 0x00ff00}),
            new MeshBasicMaterial({color: 0x00ff00}),
            new MeshBasicMaterial({color: 0x0000ff}),
            new MeshBasicMaterial({color: 0x0000ff})
        ]
        );
        this.generateMesh();
    }
}