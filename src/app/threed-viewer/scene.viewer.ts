/**
 * Created by nicolas on 13/10/16.
 */

import {
  Scene as ThreeScene,
  Camera as ThreeCamera,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  Vector2,
  Vector3,
  Object3D,
  Raycaster as ThreeRaycaster,
  GridHelper,
  AxisHelper,
} from 'three';

const OrbitControls = require('three-orbit-controls')(require('three'));
const TransformControls = require('three-transformcontrols');

import { ModelViewer }  from './model.viewer';

export class SceneViewer {
  private Scene: ThreeScene;
  private Camera: ThreeCamera;
  private Width: number = 300;
  private Height: number = 300;
  private Renderer: WebGLRenderer;
  private DomElement: HTMLElement;
  private Controls: any;
  private Controller: any;
  private Raycaster: ThreeRaycaster;
  private Mouse: Vector2 = new Vector2(0, 0);
  private ControllerTypes = [
    'translate',
    'rotate',
    'scale',
  ];

  /*
   parameter : conf > type: json object
   {
   Width: number
   height: number
   }
   */
  constructor(conf: any = {}) {
    if (typeof(conf.width) === 'number')
      this.Width = conf.width;
    if (typeof(conf.height) === 'number')
      this.Height = conf.height;

    this.Scene = new ThreeScene();

    this.Camera = new PerspectiveCamera(75, this.Width / this.Height, 0.1, 10000);

    this.Renderer = new WebGLRenderer();
    this.Renderer.setSize(this.Width, this.Height);
    this.Renderer.setClearColor(0xdddddd);

    this.Controls = new OrbitControls(this.Camera, this.Renderer.domElement);
    this.Controls.constraint.enableDamping = true;
    this.Controls.constraint.dampingFactor = 1;

    this.Controller = new TransformControls(this.Camera, this.Renderer.domElement);

    this.Raycaster = new ThreeRaycaster();

    this.Scene.add(new GridHelper(1000, 1000));
    this.Scene.add(new AxisHelper(1000));

  }

  get cameraPosition(): Vector3 {
    return this.Camera.position;
  }

  set cameraPosition(value: Vector3) {
    this.Camera.position.copy(value);
  }

  get camera(): ThreeCamera {
    return this.Camera;
  }

  set camera(value: ThreeCamera) {
    this.Camera = value;
  }

  set cameraTarget(target: Vector3) {
    this.Camera.lookAt(target);
  }

  get width(): number {
    return this.Width;
  }

  set width(value: number) {
    this.Width = value;
  }

  get height(): number {
    return this.Height;
  }

  set height(value: number) {
    this.Height = value;
  }

  get container(): String {
    return this.DomElement.id;
  }

  set container(value: String) {
    this.DomElement = document.getElementById(value.toString());
  }

  get domElement(): HTMLElement {
    return this.DomElement;
  }

  set modeController(mode: string) {
    this.Controller.setMode(mode);
  }

  get modeController(): string {
    return this.Controller.getMode();
  }

  get controllerTypes(): string[] {
    return this.ControllerTypes;
  }

  public addInScene(obj: Object3D) {
    this.Scene.add(obj);
  }

  public deleteFromScene(obj: Object3D) {
    this.Scene.remove(obj);
  }

  public deleteSelected() {
    if (this.Controller.object !== undefined) {
      const obj = this.Controller.object;
      this.Controller.detach(obj);
      this.deleteFromScene(obj);
    }
  }

  public render() {
    if (this.DomElement == undefined)
      return null;
    this.Renderer.setSize(this.Width, this.Height);
    this.DomElement.appendChild(this.Renderer.domElement);
    this.Renderer.render(this.Scene, this.Camera);
  }

  public animate() {
    this.Controls.update();
    this.Renderer.render(this.Scene, this.Camera);
    requestAnimationFrame(() => {
      this.animate();
    });
  }

  public onMouseDown(event) {
    this.Mouse.x = ( event.offsetX / this.Width ) * 2 - 1;
    this.Mouse.y = -( event.offsetY / this.Height ) * 2 + 1;
    this.Raycaster.setFromCamera(this.Mouse, this.Camera);

    let intersected = this.Raycaster.intersectObjects(this.Scene.children.filter((elem) => {
      return elem instanceof Mesh;
    }));
    if (intersected.length > 0) {
      this.Controller.attach(intersected[0].object);
      this.Scene.add(this.Controller);
    }
  }

  // TO DELETE : Temporaire
  public defaultGenerate() {
    const mod = new ModelViewer({
      dimensions: [2, 5, 3],
      position: [0, -2, -4],
    });
    mod.defaultGenerate();
    this.addInScene(mod.mesh);
    this.cameraPosition = new Vector3(5, 5, 5);
    this.cameraTarget = new Vector3(0, 0, 0);
  }
}
