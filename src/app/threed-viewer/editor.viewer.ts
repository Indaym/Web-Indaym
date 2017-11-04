/**
 * Created by nicolas on 13/04/17.
 */

import {
  Mesh,
  Vector3,
  Object3D,
  GridHelper,
  AxisHelper,
  DirectionalLight,
  Group,
  Box3,
  Matrix4,
} from 'three';

import { SceneViewer } from './scene.viewer';
import { ThreeDModelViewer } from './threeD.model.viewer';

// const TransformControls = require('threejs-transformcontrols');
import * as TransformControls from 'threejs-transformcontrols';

export class EditorViewer extends SceneViewer {
  private _selected: Object3D;
  private _controller: any;
  private _controllerTypes = [
    'translate',
    'rotate',
    'scale',
  ];
  private _hovered;

  constructor(conf: any = {}) {
    super(conf);

    // Initialisation Transform Controller
    this._controller = new TransformControls(this._camera, this._renderer.domElement);
    this._controller.minScale = new Vector3(0.001, 0.001, 0.001);

    // Add Grid and Axis Helper
    this._scene.add(new GridHelper(1000, 1000));
    this._scene.add(new AxisHelper(1000));
    const light = new DirectionalLight(0xffffff, 1);
    this._scene.add(light);

    /*
    // Test of loading a 3D model
    const model = new ThreeDModelViewer('/assets/models/Pawn.OBJ');
    model.load((mesh) => {
      const child = mesh.children[0];
      // child.geometry.applyMatrix( new Matrix4().makeTranslation(-0.322944 * 1.5, 0.000000, -0.400028 * 1.5) );
      child.material.emissive.setHex(0x303030);
      child.scale.multiply(new Vector3(5, 5, 5));
      this._scene.add(child);
    });
    */
  }

  /**
   * Init Events in Dispatcher for View Update
   */
  public initDispatcherEvents() {
    if (this._eventDispatcher !== undefined) {
      this._eventDispatcher.addEventListener('updateObjectView', (e: any) => {
        if (this.selected !== undefined) {
          if (e.position !== undefined)
            this.selected.position.copy(e.position);
          if (e.rotation !== undefined)
            this.selected.rotation.copy(e.rotation);
          if (e.dimension !== undefined) {
            for (const i of ['x', 'y', 'z']) {
              this.selected.scale[i] = (e.dimension[i] < this._controller.minScale[i]) ? this._controller.minScale[i] : e.dimension[i];
            }
          }
          this.updateController();
        }
      });

      this._eventDispatcher.addEventListener('updateController', (e: any) => {
        this.modeController = e.modeController;
      });
    }
  }

  /**
   * Set controller mode for 3D helper
   * @param mode
   */
  set modeController(mode: string) {
    this._controller.setMode(mode);
  }

  /**
   * Get controller mode for 3D helper
   * @returns {any}
   */
  get modeController(): string {
    return this._controller.getMode();
  }

  /**
   * Get controllerTypes for 3D helper
   * @returns {(string|string|string)[]}
   */
  get controllerTypes(): string[] {
    return this._controllerTypes;
  }

  /**
   * Update Controller
   */
  public updateController() {
    this._controller.update();
  }

  /**
   * Select an Object
   * @param obj Object to select
   */
  public selectObject(obj: Object3D) {
    if (obj !== undefined) {
      this.unselectObject(undefined);
      this._selected = obj;
      this._controller.attach(obj);
      this._scene.add(this._controller);
      this._eventDispatcher.dispatchEvent({
        type : 'updateObjectInputs',
        position : this._selected.position,
        dimension : this._selected.scale,
        rotation : this._selected.rotation,
      });
      this._eventDispatcher.dispatchEvent({
        type : 'setMinimumScale',
        minimumScale : this._controller.minScale,
      });
    }
  }

  public selectObjects(objs) {
    if (objs) {
      this.unselectObject(undefined);

      const grp = new Group();

      // Define center of all selected objects
      const center = new Vector3();
      objs.forEach((child) => center.add(child.position));
      center.divideScalar(objs.length);
      grp.position.add(center);

      // Add all objects to group and change relative position
      objs.forEach((el) => {
        el.position.sub(center);
        grp.add(el);
      });

      this._scene.add(grp);
      this.selectObject(grp);
    }
  }

  /**
   * Unselect an Object
   * @param obj : Object to select
   */
  public unselectObject(obj: Object3D) {
    const objSel = [obj, this._controller.object, this._selected].find((elem) => elem !== undefined);
    this._controller.detach(objSel);
    this._scene.remove(this._controller);

    if (this._selected instanceof Group) {
      while (this._selected.children.length > 0) {
        // Remove child from group, set correct position and add to scene
        const element = this._selected.children[0];
        this._selected.remove(element);
        element.position.add(this._selected.position);
        this._scene.add(element);
      }
      this._scene.remove(this._selected);
    }
    this._selected = undefined;
  }

  /**
   * Delete selected object
   */
  public deleteSelected() {
    const objSel = [this._selected, this._controller.object].find((elem) => elem !== undefined);
    if (this._selected instanceof Group) {
      console.log(this._selected);
//      objSel.push(...this._selected.children);
    }
    if (objSel !== undefined) {
      this.unselectObject(objSel);
      this._scene.remove(objSel);
      this._eventDispatcher.dispatchEvent({
        type: 'updateObjectInputs',
        position: new Vector3(),
        dimension: new Vector3(),
        rotation: new Vector3(),
      });
    }
  }

  /**
   * Get selected Object
   * @returns {Object3D}
   */
  get selected(): Object3D {
    return this._selected;
  }

  /**
   * Called when a mouse button is down in 3D view
   * @param event : MouseEvent
   */
  public onMouseDown(event) {
    this.setIntersection(event);
    const childs = this._scene.children.filter((elem) => elem instanceof Mesh);
    this._scene.children.forEach((element) => {
      if (element instanceof Group)
        childs.push(...element.children);
    });
    const intersected = this._raycaster.intersectObjects(childs);
    if (intersected.length > 0)
      if (event.shiftKey) {
        const arr = (this._selected instanceof Group) ? [ ...this._selected.children ] : [ this._selected ];
        const index = arr.findIndex((element) => element === intersected[0].object);
        if (index !== -1)
          arr.splice(index, 1);
        else
          arr.push(intersected[0].object);
        this.selectObjects(arr);
      } else {
        this.selectObject(intersected[0].object);
      }
  }

  public onMouseMove(event) {
    this.setIntersection(event);
    const intersected = this._raycaster.intersectObjects(this._scene.children.filter((elem) => elem instanceof Mesh));

    if (intersected !== undefined && intersected.length > 0) {
      const obj = intersected[0].object as any;
      if (obj.LinkModel !== undefined && obj.LinkModel !== this._hovered) {
        // TODO: add call rule here ?
        this._hovered = obj.LinkModel.threeDModel;
        this._hovered.hover(true);
      }
    } else {
      if (this._hovered !== undefined)
        this._hovered.hover(false);
    }
  }
}
