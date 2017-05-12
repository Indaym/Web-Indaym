/**
 * Created by nicolas on 13/10/16.
 */

import {
  Scene,
  Camera,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
  Vector3,
  Object3D,
  Raycaster,
  EventDispatcher,
  Color
} from 'three';

var OrbitControls = require('three-orbit-controls')(require('three'));

export class SceneViewer {
  protected _scene: Scene;
  protected _camera: Camera;
  protected _width: number = 300;
  protected _height: number = 300;
  protected _renderer: WebGLRenderer;
  protected _domElement: HTMLElement;
  protected _controls: any;

  protected _eventDispatcher: EventDispatcher;
  protected _raycaster: Raycaster;
  protected _mouse: Vector2 = new Vector2(0, 0);

  /**
   * @param conf : JSON object
   * {
   *  width: number
   *  height: number
   * }
   */
  constructor(conf: any = {}) {
    // Verification of variables
    if (typeof(conf.width) == 'number')
      this._width = conf.width;
    if (typeof(conf.height) == 'number')
      this._height = conf.height;

    // Initialisation Scene
    this._scene = new Scene();
    this._scene.background = new Color( 0xcccccc );

    //Initialisation Camera
    this._camera = new PerspectiveCamera(75, this._width / this._height, 0.1, 10000);
    this._camera.lookAt(new Vector3(0, 0, 0));

    // Initialisation Renderer
    this._renderer = new WebGLRenderer();
    this._renderer.setSize(this._width, this._height);
    this._renderer.setClearColor(0xdddddd);

    // Initialisation Orbital Control
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.constraint.enableDamping = true;
    this._controls.constraint.dampingFactor = 1;

    // Creation of Raycaster
    this._raycaster = new Raycaster();
  }

  /**
   * Default param for load a scene
   * @param container : id of container
   */
  defaultLoad(container) {
    this.container = container;
    this.cameraPosition = new Vector3(50.0, 50.0, 50.0);
    this.render();
    this.animate();
  }

  /**
   * Init dispatcher Events
   */
  initDispatcherEvents() {}

  /**
   * Get event Dispatcher
   * @returns {EventDispatcher}
   */
  get eventDispatcher(): EventDispatcher {
    return this._eventDispatcher;
  }

  /**
   * Set event Dispatcher
   * @param value
   */
  set eventDispatcher(value: EventDispatcher) {
    if (value !== undefined) {
      this._eventDispatcher = value;
      this.initDispatcherEvents();
    }
  }

  /**
   * Get the position of the camera
   * @returns {Vector3}
   */
  get cameraPosition(): Vector3 {
    return this._camera.position;
  }

  /**
   * Set the position of the camera
   * @param value
   */
  set cameraPosition(value: Vector3) {
    this._camera.position.copy(value);
  }

  /**
   * Get camera
   * @returns {Camera}
   */
  get camera(): Camera {
    return this._camera;
  }

  /**
   * Set camera
   * @param value
   */
  set camera(value: Camera) {
    this._camera = value;
  }

  /**
   * Set point where camera must target
   * @param target
   */
  set cameraTarget(target: Vector3) {
    this._camera.lookAt(target);
  }

  /**
   * Get width of the 3D scene
   * @returns {number}
   */
  get width(): number {
    return this._width;
  }

  /**
   * Set width of the 3D scene
   * @param value
   */
  set width(value: number) {
    this._width = value;
  }

  /**
   * Get height of the 3D scene
   * @returns {number}
   */
  get height(): number {
    return this._height;
  }

  /**
   * Set height of the 3D scene
   * @param value
   */
  set height(value: number) {
    this._height = value;
  }

  /**
   * Get Container of the 3D scene
   * @returns {string}
   */
  get container(): String {
    return this._domElement.id;
  }

  /**
   * Set Container of the 3D scene
   * @param value
   */
  set container(value: String) {
    this._domElement = document.getElementById(value.toString());
  }

  /**
   * Get domElement where scene is rendered
   * @returns {HTMLElement}
   */
  get domElement(): HTMLElement {
    return this._domElement;
  }

  /**
   * Add 3D Object in scene
   * @param obj
   */
  addInScene(obj: Object3D) {
    this._scene.add(obj);
  }

  /**
   * Delete 3D Object from scene
   * @param obj
   */
  deleteFromScene(obj: Object3D) {
    this._scene.remove(obj);
  }

  /**
   * Render the 3D scene
   * @returns {null}
   */
  render() {
    if (this._domElement == undefined)
      return null;
    this._renderer.setSize(this._width, this._height);
    this._domElement.appendChild(this._renderer.domElement);
    this._renderer.render(this._scene, this._camera);
  }

  /**
   * Animate controls and scene
   */
  animate() {
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => {
      this.animate()
    });
  }

  /**
   * Set intersection from Mouse position
   * @param event : MouseEvent
   * @returns {THREE.Vector3}
   */
  setIntersection(event) {
    this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this._height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this.getIntersection();
  }

  /**
   * Get Intersected Object
   * @returns {THREE.Vector3}
   */
  getIntersection() {
    let result = new Vector3(0, 10, 0);
    const a = this._raycaster.ray.origin;
    const b = new Vector3(a.x, a.y, a.z);

    b.add(this._raycaster.ray.direction);
    const t = (result.y - a.y) / (b.y - a.y);
    result.x = a.x + t * (b.x - a.x);
    result.y = a.y + t * (b.y - a.y);
    result.z = a.z + t * (b.z - a.z);

    return result;
  }
}
