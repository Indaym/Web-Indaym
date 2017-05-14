/**
 * Created by nicolas on 13/04/17.
 */

import {
  Mesh,
  Vector3,
  Object3D,
  GridHelper,
  AxisHelper
}                       from 'three';

import { SceneViewer }  from '.';

var TransformControls = require('threejs-transformcontrols');

export class EditorViewer extends SceneViewer {
  private _selected:Object3D;
  private _controller: any;
  private _controllerTypes = [
    'translate',
    'rotate',
    'scale'
  ];

  constructor(conf: any = {}) {
    super(conf);

    // Initialisation Transform Controller
    this._controller = new TransformControls(this._camera, this._renderer.domElement);
    this._controller.minScale = new Vector3(0.001, 0.001, 0.001);

    // Add Grid and Axis Helper
    this._scene.add(new GridHelper(1000, 1000));
    this._scene.add(new AxisHelper(1000));
  }

  /**
   * Init Events in Dispatcher for View Update
   */
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
  updateController() {
    this._controller.update();
  }

  /**
   * Select an Object
   * @param obj Object to select
   */
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

  /**
   * Unselect an Object
   * @param obj : Object to select
   */
  unselectObject(obj:Object3D) {
    const objSel = [obj, this._controller.object, this._selected].find((elem) => { return elem !== undefined });
    this._controller.detach(objSel);
    this._scene.remove(this._controller);
    this._selected = undefined;
  }

  /**
   * Delete selected object
   */
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
  onMouseDown(event) {
    this._mouse.x = ( event.offsetX / this.width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this.height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    var intersected = this._raycaster.intersectObjects(this._scene.children.filter((elem) => {
      return elem instanceof Mesh;
    }));
    if (intersected.length > 0)
      this.selectObject(intersected[0].object);
  }

}