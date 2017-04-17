/**
 * Created by nicolas on 13/04/17.
 */

import {
  AxisHelper,
  Mesh,
  MeshBasicMaterial,
  Geometry,
  BackSide
}                       from 'three';

import { SceneViewer }  from '.';

export class PlayerViewer extends SceneViewer {
  private _selected;

  constructor(conf: any = {}) {
    super(conf);

    this._scene.add(new AxisHelper(1000));
    this._controls.enableKeys = false;
  }

  intersectObjects(event) {
    this._mouse.x = ( event.offsetX / this._width ) * 2 - 1;
    this._mouse.y = -( event.offsetY / this._height ) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this._raycaster.intersectObjects(this._scene.children.filter((elem) => elem instanceof Mesh));
  }

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

  asSelection() {
    return (this._selected !== undefined && (this._selected.object !== undefined || this._selected.glow !== undefined))
  }

  isDraggable(obj) {
    let linkModel = (obj.object as any).LinkModel;
    if (linkModel === undefined)
      return false;
    return (linkModel.object.draggable === true);
  }

  isDroppable(obj) {
    let linkModel = (obj.object as any).LinkModel;
    if (linkModel === undefined)
      return false;
    return (linkModel.object.droppable === true);
  }

  getFirstDragOrDrop(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && (linkModel.object.draggable === true || linkModel.object.droppable === true))
    });
  }

  getFirstDraggable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.draggable === true)
    });
  }
  getFirstDroppable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if(this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.droppable === true)
    });
  }

  moveToDroppable(drop) {
    if (drop === undefined || drop.object.LinkModel === undefined || drop.object.LinkModel.object.droppable === false)
      return;
    this._selected.object.position.copy(drop.object.position);
    this._selected.object.position.y += (drop.object.scale.y / 2) + (this._selected.object.scale.y / 2);
    this._selected.glow.position.copy(this._selected.object.position);
    this._selected.oldPosition.copy(this._selected.object.position);
  }

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
            if (this.isDraggable(obj))
              this.selectObject(obj.object);
            else
              this.moveToDroppable(obj);
          }
        }
      }
      else
        this.unselectObject();
    }
  }

  onMouseMove(event) {
    if(event.buttons === 1) {
      let intersected = this.intersectObjects(event);
      if (intersected.length > 0 && this._selected !== undefined && intersected[0].object == this._selected.object) {
        let pos = this.setIntersection(event);
        this._selected.object.position.copy(pos);
        this._selected.glow.position.copy(pos);
      }
    }
  }

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
