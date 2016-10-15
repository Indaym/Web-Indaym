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

    private _scene: Scene;
    private _camera: Camera;
    private _width: number = 300;
    private _height: number = 300;
    private _renderer: WebGLRenderer;
    private _container: String;
    private _controls: any;
    private _controller: any;
    private _raycaster: Raycaster;
    private _mouse: Vector2 = new Vector2(0, 0);

    /*
    parameter : conf > type: json object
        {
            width: number
            height: number
        }
     */
    constructor(conf:any = {}) {
        if (typeof(conf.width) == 'number')
            this._width = conf.width;
        if (typeof(conf.height) == 'number')
            this._height = conf.height;

        this._scene = new Scene();

        this._camera = new PerspectiveCamera( 75, this._width / this._height, 0.1, 10000 );

        this._renderer = new WebGLRenderer();
        this._renderer.setSize( this._width, this._height );
        this._renderer.setClearColor( 0xdddddd );

        this._controls = new OrbitControls( this._camera);
        this._controls.constraint.enableDamping = true;
        this._controls.constraint.dampingFactor = 1;

        this._scene.add(new GridHelper( 1000, 1000 ));
        this._scene.add(new AxisHelper(1000));

        this._controller = new TransformControls(this._camera, this._renderer.domElement);

        this._raycaster = new Raycaster();
    }

    get cameraPosition():Vector3 {
        return this._camera.position;
    }

    set cameraPosition(value:Vector3) {
        this._camera.position.copy(value);
    }

    get camera():Camera {
        return this._camera;
    }

    set camera(value:Camera) {
        this._camera = value;
    }

    set cameraTarget(target:Vector3) {
        this._camera.lookAt(target);
    }

    get width():number {
        return this._width;
    }

    set width(value:number) {
        this._width = value;
    }

    get height():number {
        return this._height;
    }

    set height(value:number) {
        this._height = value;
    }

    get container():String {
        return this._container;
    }

    set container(value:String) {
        this._container = value;
    }

    set modeController(mode:string) {
        this._controller.setMode( mode );
    }

    get modeController():string {
        return this._controller.getMode();
    }

    addInScene(obj:Object3D) {
        this._scene.add(obj);
    }

    deleteFromScene(obj:Object3D) {
        this._scene.remove(obj);
    }

    deleteSelected() {
        if (this._controller.object !== undefined) {
            var obj = this._controller.object;
            this._controller.detach(obj);
            this.deleteFromScene(obj);

        }

    }

    render() {
        this._renderer.setSize( this._width, this._height );
        document.getElementById(this._container.toString()).appendChild( this._renderer.domElement );
        this._renderer.render(this._scene, this._camera);
    }

    animate() {
        this._controls.update();
        this._renderer.render(this._scene, this._camera);
        requestAnimationFrame(() => { this.animate() });
    }

    onMouseDown(event) {
        this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
        this._mouse.y = - ( event.offsetY / this._height ) * 2 + 1;
        this._raycaster.setFromCamera( this._mouse, this._camera );

        var intersected = this._raycaster.intersectObjects( this._scene.children.filter((elem) => { return elem instanceof Mesh; }) );
        if (intersected.length > 0){
            console.log('add _controller');
            this._controller.attach(intersected[0].object);
            this._scene.add(this._controller);
        }
    }

    defaultGenerate() {
        var mod = new ModelViewer({
            position: [0, -2, -4],
            dimensions: [2, 5, 3]
        });
        mod.defaultGenerate();
        this.addInScene(mod.mesh);
        this.cameraPosition = new Vector3(5, 5, 5);
        this.cameraTarget = new Vector3(0, 0, 0);
    }
}
