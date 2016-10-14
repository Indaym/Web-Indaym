/**
 * Created by nicolas on 13/10/16.
 */

import {
    Scene,
    Camera,
    PerspectiveCamera,
    Renderer,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector2,
    Vector3,
    Object3D,
    Raycaster,
    GridHelper,
    AxisHelper
} from 'three';

var OrbitControls = require('three-orbit-controls')(require('three'));
var TransformControls = require('three-transformcontrols');

import {ModelViewer} from "./model.viewer";


export class SceneViewer {
    private scene: Scene;
    private camera: Camera;
    private width: number = 300;
    private height: number = 300;
    private renderer: WebGLRenderer;
    private container: String;
    private controls: any;
    private controler: any;
    private raycaster: Raycaster;
    private mouse: Vector2 = new Vector2(0, 0);

    /*
    parameter : conf > type: json object
        {
            width: number
            height: number
        }
     */
    constructor(conf:any = {}) {
        if (typeof(conf.width) == 'number')
            this.width = conf.width;
        if (typeof(conf.height) == 'number')
            this.height = conf.height;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 75, this.width / this.height, 0.1, 10000 );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize( this.width, this.height );
        this.renderer.setClearColor( 0xdddddd );
        this.controls = new OrbitControls( this.camera);
        this.controls.constraint.enableDamping = true;
        this.controls.constraint.dampingFactor = 1;
        this.scene.add(new GridHelper( 1000, 1000 ));
        this.scene.add(new AxisHelper(1000));
        this.controler = new TransformControls(this.camera, this.renderer.domElement);
        console.dir(this.scene);
        this.raycaster = new Raycaster();
    }

    setCameraPosition(pos:Vector3) {
        this.camera.position.copy(pos);
    }

    setCameraTarget(target:Vector3) {
        this.camera.lookAt(target);
    }

    setSize(width:number, height:number) {
        this.width = width;
        this.height = height;
    }

    getSize() {
        return {
            width:this.width,
            height:this.height
        };
    }

    setContainer(container: String) {
        this.container = container;
    }

    getContainer() {
        return this.container;
    }

    addInScene(obj:Object3D) {
        this.scene.add(obj);
    }

    render() {
        this.renderer.setSize( this.width, this.height );
        document.getElementById(this.container.toString()).appendChild( this.renderer.domElement );
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => { this.animate() });
    }

    onMouseDown(event) {
        console.log(this.mouse);
        this.mouse.x = ( event.offsetX / this.width ) * 2 - 1;
        this.mouse.y = - ( event.offsetY / this.height ) * 2 + 1;
        this.raycaster.setFromCamera( this.mouse, this.camera );

        var intersected = this.raycaster.intersectObjects( this.scene.children.filter((elem) => { return elem instanceof Mesh; }) );
        if (intersected.length > 0){
            this.controler.attach(intersected[0].object);
            this.scene.add(this.controler);
        }
    }

    defaultGenerate() {
        var mod = new ModelViewer({
            position: [0, -2, -4],
            dimensions: [2, 5, 3]
        });
        mod.defaultGenerate();
        this.addInScene(mod.getMesh());
        this.setCameraPosition(new Vector3(5,5,5));
        this.setCameraTarget(new Vector3(0, 0, 0));
    }
}
