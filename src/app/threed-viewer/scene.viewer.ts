/**
 * Created by nicolas on 13/10/16.
 */

import {
  Scene,
  Camera,
  PerspectiveCamera,
  Renderer,
  WebGLRenderer,
  Mesh,
  Vector2,
  Vector3,
  Object3D,
  Raycaster,
  GridHelper,
  AxisHelper,
  EventDispatcher
} from 'three';

var OrbitControls = require('three-orbit-controls')(require('three'));
var TransformControls = require('threejs-transformcontrols');

export class SceneViewer {
  private _scene: Scene;
  private _camera: Camera;
  private _width: number = 300;
  private _height: number = 300;
  private _renderer: WebGLRenderer;
  private _domElement: HTMLElement;
  private _controls: any;
  private _controller: any;
  private _eventDispatcher: EventDispatcher;
  private _raycaster: Raycaster;
  private _mouse: Vector2 = new Vector2(0, 0);
  private _controllerTypes = [
    'translate',
    'rotate',
    'scale'
  ];
  private _selected: Object3D;
  /*
   parameter : conf > type: json object
   {
   width: number
   height: number
   }
   */
  constructor(conf: any = {}) {
    if (typeof(conf.width) == 'number')
      this._width = conf.width;
    if (typeof(conf.height) == 'number')
      this._height = conf.height;

    this._scene = new Scene();

    this._camera = new PerspectiveCamera(75, this._width / this._height, 0.1, 10000);

    this._renderer = new WebGLRenderer();
    this._renderer.setSize(this._width, this._height);
    this._renderer.setClearColor(0xdddddd);

    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.constraint.enableDamping = true;
    this._controls.constraint.dampingFactor = 1;

    this._controller = new TransformControls(this._camera, this._renderer.domElement);
    this._controller.minScale = new Vector3(0.001, 0.001, 0.001);

    this._raycaster = new Raycaster();

    this._scene.add(new GridHelper(1000, 1000));
    this._scene.add(new AxisHelper(1000));

    this._selected = undefined;
  }

  initDispatcherEvents() {
    if (this._eventDispatcher !== undefined) {
      this._eventDispatcher.addEventListener("updateObjectView", (e:any) => {
        if (this.selected !== undefined) {
          if (e.position !== undefined)
            this.selected.position.copy(e.position);
          if (e.rotation !== undefined)
            this.selected.rotation.copy(e.rotation);
          if (e.dimension !== undefined) {
            for (var i of ['x', 'y', 'z']) {
              this.selected.scale[i] = (e.dimension[i] < this._controller.minScale[i]) ? this._controller.minScale[i] : e.dimension[i];
            }
          }
          this.updateController();
        }
      });
    }
  }

  get eventDispatcher(): EventDispatcher {
    return this._eventDispatcher;
  }

  set eventDispatcher(value: EventDispatcher) {
    if (value !== undefined) {
      this._eventDispatcher = value;
      this.initDispatcherEvents();
    }
  }

  get cameraPosition(): Vector3 {
    return this._camera.position;
  }

  set cameraPosition(value: Vector3) {
    this._camera.position.copy(value);
  }

  get camera(): Camera {
    return this._camera;
  }

  set camera(value: Camera) {
    this._camera = value;
  }

  set cameraTarget(target: Vector3) {
    this._camera.lookAt(target);
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get container(): String {
    return this._domElement.id;
  }

  set container(value: String) {
    this._domElement = document.getElementById(value.toString());
  }

  get domElement(): HTMLElement {
    return this._domElement;
  }

  set modeController(mode: string) {
    this._controller.setMode(mode);
  }

  get modeController(): string {
    return this._controller.getMode();
  }

  get controllerTypes(): string[] {
    return this._controllerTypes;
  }

  get selected(): Object3D {
    return this._selected;
  }

  addInScene(obj: Object3D) {
    this._scene.add(obj);
  }

  deleteFromScene(obj: Object3D) {
    this._scene.remove(obj);
  }

  updateController() {
    this._controller.update();
  }

  selectObject(obj: Object3D) {
    if (obj !== undefined) {
      this._selected = obj;
      this._controller.attach(obj);
      this._scene.add(this._controller);
      this._eventDispatcher.dispatchEvent({
        type : "updateObjectInputs",
        position : this._selected.position,
        dimension : this._selected.scale,
        rotation : this._selected.rotation
      });
      this._eventDispatcher.dispatchEvent({
        type : "setMinimumScale",
        minimumScale : this._controller.minScale
      });
    }
  }

  unselectObject(obj:Object3D) {
    const objSel = [obj, this._controller.object, this._selected].find((elem) => { return elem !== undefined });
    this._controller.detach(objSel);
    this._scene.remove(this._controller);
    this._selected = undefined;
  }

  deleteSelected() {
    const objSel = [this._selected, this._controller.object].find((elem) => { return elem !== undefined });
    if (objSel !== undefined) {
      this.unselectObject(objSel);
      this._scene.remove(objSel);
      this._eventDispatcher.dispatchEvent({
        type:"updateObjectInputs",
        position: new Vector3(),
        dimension: new Vector3(),
        rotation: new Vector3()
      });
    }
  }

  render() {
    if (this._domElement == undefined)
      return null;
    this._renderer.setSize(this._width, this._height);
    this._domElement.appendChild(this._renderer.domElement);
    this._renderer.render(this._scene, this._camera);
  }

  animate() {
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => {
      this.animate()
    });
  }

  setIntersection(event) {
    this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this._height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this.getIntersection();
  }

  getIntersection() {
    let result = new Vector3(0, 0, 0);
    const a = this._raycaster.ray.origin;
    const b = new Vector3(a.x, a.y, a.z);

    b.add(this._raycaster.ray.direction);
    const t = (result.y - a.y) / (b.y - a.y);
    result.x = a.x + t * (b.x - a.x);
    result.z = a.z + t * (b.z - a.z);

    return result;
  }

  onMouseDown(event) {
    this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this._height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    var intersected = this._raycaster.intersectObjects(this._scene.children.filter((elem) => {
      return elem instanceof Mesh;
    }));
    if (intersected.length > 0)
      this.selectObject(intersected[0].object);
  }
}
