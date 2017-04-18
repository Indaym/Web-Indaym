/**
 * Created by nicolas on 13/04/17.
 */

import {
  AxisHelper,
  Mesh,
  MeshBasicMaterial,
  Geometry,
  PlaneBufferGeometry,
  BackSide
}                       from 'three';

import { SceneViewer }  from '.';

export class PlayerViewer extends SceneViewer {
  private _selected;
  private _intersectPlane;

  constructor(conf: any = {}) {
    super(conf);

    this._scene.add(new AxisHelper(1000));
    this._controls.enableKeys = false;
    this._intersectPlane = new Mesh(new PlaneBufferGeometry(500, 500, 8, 8), new MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0}));
    this._scene.add(this._intersectPlane);
  }

  /**
   * Get the intersected objects by the mouse position
   * @param event : mouseEvent
   * @param objects : Objects to search in
   * @returns {Intersection[]}
   */
  intersectObjects(event, objects = this._scene.children) {
    this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this._height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this._raycaster.intersectObjects(objects.filter((elem) => elem instanceof Mesh));
  }

  /**
   * Select an object on 3D view
   * @param obj : Mesh to select
   */
  selectObject(obj: Mesh) {
    if (this._selected !== undefined && this._selected.object !== undefined)
      this.unselectObject();
    this._selected = {
      object:obj
    };
    let outlineMaterial1 = new MeshBasicMaterial( { color: 0xff0000, side: BackSide } );
    this._selected.glow = new Mesh(<Geometry>obj.geometry, outlineMaterial1);
    this._selected.glow.position.copy(obj.position);
    this._selected.glow.scale.copy(obj.scale);
    this._selected.glow.scale.addScalar(0.5);
    this._selected.oldPosition = obj.position.clone();
    this._scene.add(this._selected.glow);
  }

  /**
   * Unselect the selected object
   */
  unselectObject() {
    if (this._selected === undefined)
      return;
    if (this._selected.glow !== undefined) {
      this._scene.remove(this._selected.glow);
      delete this._selected.glow;
    }
    if (this._selected.object !== undefined)
      delete this._selected.object;
  }

  /**
   * Get information if there is an object already selected
   * @returns {boolean}
   */
  asSelection() {
    return (this._selected !== undefined && (this._selected.object !== undefined || this._selected.glow !== undefined))
  }

  /**
   * Get information if Object sent is Draggable or not
   * @param obj : Intersected object
   * @returns {boolean}
   */
  isDraggable(obj) {
    let linkModel = (obj.object as any).LinkModel;
    if (linkModel === undefined)
      return false;
    return (linkModel.object.draggable === true);
  }

  /**
   * Get information if Object sent is Droppable or not
   * @param obj : Intersected object
   * @returns {boolean}
   */
  isDroppable(obj) {
    let linkModel = (obj.object as any).LinkModel;
    if (linkModel === undefined)
      return false;
    return (linkModel.object.droppable === true);
  }

  /**
   * Get First object that are Draggable or Droppable
   * @param objs : Object ti search in
   * @param ignoreSelect : Ignore the object already selected
   * @returns {any}
   */
  getFirstDragOrDrop(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && (linkModel.object.draggable === true || linkModel.object.droppable === true))
    });
  }

  /**
   * Get First object that are Draggable
   * @param objs : Object ti search in
   * @param ignoreSelect : Ignore the object already selected
   * @returns {any}
   */
  getFirstDraggable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.draggable === true)
    });
  }

  /**
   * Get First object that are Droppable
   * @param objs : Object ti search in
   * @param ignoreSelect : Ignore the object already selected
   * @returns {any}
   */
  getFirstDroppable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.droppable === true)
    });
  }

  /**
   * Move selected object to Droppable object
   * @param drop : Droppable object
   */
  moveToDroppable(drop) {
    if (drop === undefined || drop.object.LinkModel === undefined || drop.object.LinkModel.object.droppable === false)
      return;
    this._selected.object.position.copy(drop.object.position);
    this._selected.object.position.y += (drop.object.scale.y / 2) + (this._selected.object.scale.y / 2);
    this._selected.glow.position.copy(this._selected.object.position);
    this._selected.oldPosition.copy(this._selected.object.position);
  }

  /**
   * Called when a mouse button is Down in 3D view
   * @param event : MouseEvent
   */
  onMouseDown(event) {
    if(event.button === 0) {
      let intersected = this.intersectObjects(event);

      if (intersected.length > 0) {
        if (this.getFirstDraggable(intersected, false) !== undefined)
          this._controls.enableRotate = false;
        if (!this.asSelection()) {
          let obj = this.getFirstDraggable(intersected);
          if (obj !== undefined) {
            this.selectObject(obj.object);
          }
        }
        else {
          let obj = this.getFirstDragOrDrop(intersected);
          if (obj === undefined)
            this.unselectObject();
          else {
            if (this.isDroppable(obj))
              this.moveToDroppable(obj);
            else
              this.selectObject(obj.object);
          }
        }
        this._intersectPlane.position.copy(this._selected.object.position);
        this._intersectPlane.lookAt(this._camera.position);
      }
      else
        this.unselectObject();
    }
  }

  /**
   * Called when mouse move in 3D view
   * @param event : MouseEvent
   */
  onMouseMove(event) {
    if(event.buttons === 1 && this.asSelection()) {
      let intersected = this.intersectObjects(event, [this._intersectPlane]);
      if (intersected.length > 0) {
        this._intersectPlane.position.copy(intersected[0].point);
        this._intersectPlane.lookAt(this._camera.position);
        this._selected.object.position.copy(intersected[0].point);
        this._selected.glow.position.copy(intersected[0].point);
      }
    }
  }

  /**
   * Called when a mouse button is up on 3D view
   * @param event
   */
  onMouseUp(event) {
    if (event.button === 0 && this._selected !== undefined && this._selected.object !== undefined) {
      let intersected = this.intersectObjects(event);
      let drop = this.getFirstDroppable(intersected);
      if(drop === undefined) {
        this._selected.object.position.copy(this._selected.oldPosition);
        this._selected.glow.position.copy(this._selected.oldPosition);
      }
      else
        this.moveToDroppable(drop);
    }
    this._controls.enableRotate = true;
  }
}
