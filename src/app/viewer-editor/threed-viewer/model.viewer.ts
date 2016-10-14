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

    private dimensions: Vector3 = new Vector3(1, 1, 1);
    private position: Vector3 = new Vector3(0, 0, 0);
    private mesh: Mesh;
    protected geometry: Geometry;
    protected material: Material;

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
            this.position.copy(new Vector3().fromArray(conf.position));
        if (conf.dimensions instanceof Array)
            this.dimensions.copy(new Vector3().fromArray(conf.dimensions));
        if (conf.geometry instanceof Geometry)
            this.geometry = conf.geometry;
        if (conf.material instanceof Material)
            this.material = conf.material;
    }

    setPosition(pos: Vector3) {
        this.position.copy(pos);
        if (this.mesh != null)
            this.mesh.position.copy(this.position);
    }

    getPosition() {
        return this.position;
    }

    setDimensions(pos: Vector3) {
        this.position.copy(pos);
    }

    getDimensions() {
        return this.dimensions;
    }

    generateMesh() {
        if (this.geometry == null || this.material == null)
            return null;
        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.copy(this.position);
        return this.mesh;
    }

    setMesh(mesh:Mesh) {
        this.mesh = mesh;
    }

    getMesh() {
        return this.mesh;
    }

    defaultGenerate() {
        this.geometry = new BoxGeometry(this.dimensions.x, this.dimensions.y, this.dimensions.z);
        this.material = new MeshFaceMaterial([
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