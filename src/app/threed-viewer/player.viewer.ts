/**
 * Created by nicolas on 13/04/17.
 */

import {
  AxisHelper,
  Mesh,
  MeshBasicMaterial,
  Geometry,
  PlaneBufferGeometry,
  BackSide,
}                         from 'three';

import { SceneViewer }    from '.';
import { RulesInterface } from '../components/editor/preview/rulesInterface';

export class PlayerViewer extends SceneViewer {
  private _selected;
  private _intersectPlane;
  private _hovered;
  private rulesInterface: RulesInterface;

  constructor(conf: any = {}, rulesInterface?: RulesInterface) {
    super(conf);

    this._scene.add(new AxisHelper(1000));
    this._controls.enableKeys = false;
    this._intersectPlane = new Mesh(
      new PlaneBufferGeometry(500, 500, 8, 8),
      new MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0, depthWrite: false})
    );
    this._scene.add(this._intersectPlane);
    if (rulesInterface)
      this.rulesInterface = rulesInterface;
  }

  /**
   * Get the intersected objects by the mouse position
   * @param event : mouseEvent
   * @param objects : Objects to search in
   * @returns {Intersection[]}
   */
  public intersectObjects(event, objects = this._scene.children) {
    this.setIntersection(event);
    return this._raycaster.intersectObjects(objects.filter((elem) => elem instanceof Mesh), true);
  }

  /**
   * Select an object on 3D view
   * @param obj : Mesh to select
   */
  public selectObject(obj: Mesh) {
    if (this._selected !== undefined && this._selected.object !== undefined)
      this.unselectObject();
    this._selected = {
      object: obj,
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
  public unselectObject() {
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
  public hasSelection() {
    return (this._selected !== undefined && (this._selected.object !== undefined || this._selected.glow !== undefined));
  }

  /**
   * Get information if Object sent is Draggable or not
   * @param obj : Intersected object
   * @returns {boolean}
   */
  public isDraggable(obj) {
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
  public isDroppable(obj) {
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
  public getFirstDragOrDrop(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if (this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && (linkModel.object.draggable === true || linkModel.object.droppable === true));
    });
  }

  /**
   * Get First object that are Draggable
   * @param objs : Object ti search in
   * @param ignoreSelect : Ignore the object already selected
   * @returns {any}
   */
  public getFirstDraggable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if (this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.draggable === true);
    });
  }

  /**
   * Get First object that are Droppable
   * @param objs : Object ti search in
   * @param ignoreSelect : Ignore the object already selected
   * @returns {any}
   */
  public getFirstDroppable(objs, ignoreSelect = true) {
    return objs.find((val) => {
      if (ignoreSelect === true)
        if (this._selected !== undefined && (this._selected.object === val.object || this._selected.glow === val.object))
          return false;
      let linkModel = (val.object as any).LinkModel;
      return (linkModel !== undefined && linkModel.object.droppable === true);
    });
  }

  /**
   * Move selected object to Droppable object
   * @param drop : Droppable object
   */
  public moveToDroppable(drop) {
    if (drop === undefined || drop.object.LinkModel === undefined || drop.object.LinkModel.object.droppable === false)
      return;
    this._selected.object.position.copy(drop.object.LinkModel.threeDModel.dropPosition(this._selected.object));
    this._selected.glow.position.copy(this._selected.object.position);
    this._selected.oldPosition.copy(this._selected.object.position);
  }

  /**
   * Called when a mouse button is Down in 3D view
   * @param event : MouseEvent
   */
  public onMouseDown(event) {
    // TODO: add call rule here ?
    if (event.button === 0) {
      let intersected = this.intersectObjects(event);

      if (intersected.length > 0) {
        if (this.getFirstDraggable(intersected, false) !== undefined)
          this._controls.enableRotate = false;
        if (!this.hasSelection()) {
          let obj = this.getFirstDraggable(intersected);
          if (obj !== undefined)
            this.selectObject(obj.object);
        } else {
          let obj = this.getFirstDragOrDrop(intersected);
          if (obj === undefined) {
            this.unselectObject();
          } else {
            if (this.isDroppable(obj)) {
              if (this.execAllRules() == true) {
                this.moveToDroppable(obj);
              }
            } else {
              this.selectObject(obj.object);
            }

            // if (this.isDroppable(obj) && this.rulesInterface !== undefined) {
            //   this.rulesInterface.emit('canMoveObject', {
            //       source: this._selected,
            //       target: obj,
            //     },
            //     () => {
            //       this.moveToDroppable(obj);
            //     }
            //   );
            // } else {
            //   this.selectObject(obj.object);
            // }
          }
        }
        if (this.hasSelection())
          this._intersectPlane.position.copy(this._selected.object.position);
        this._intersectPlane.lookAt(this._camera.position);
      } else
        this.unselectObject();
    }
  }

  /**
   * Called when mouse move in 3D view
   * @param event : MouseEvent
   */
  public onMouseMove(event) {
    if (event.buttons === 1 && this.hasSelection()) {
      let intersected = this.intersectObjects(event, [this._intersectPlane]);
      if (intersected.length > 0) {
        this._intersectPlane.position.copy(intersected[0].point);
        this._intersectPlane.lookAt(this._camera.position);
        this._selected.object.position.copy(intersected[0].point);
        this._selected.glow.position.copy(intersected[0].point);
      }
    } else {
      let drop = this.getFirstDroppable(this.intersectObjects(event));
      if (drop !== undefined) {
        if (drop.object.LinkModel !== undefined && drop.object.LinkModel !== this._hovered) {
          if (this._hovered !== undefined)
            this._hovered.hover(false);
          this._hovered = drop.object.LinkModel.threeDModel;
          this._hovered.hover(true);
        }
      } else {
        if (this._hovered !== undefined)
          this._hovered.hover(false);
      }
    }
  }

  /**
   * Called when a mouse button is up on 3D view
   * @param event
   */
  public onMouseUp(event) {
    // TODO: add call rule here ?
    if (event.button === 0 && this._selected !== undefined && this._selected.object !== undefined) {
      let intersected = this.intersectObjects(event);
      let drop = this.getFirstDroppable(intersected);
      if (drop === undefined) {
        this._selected.object.position.copy(this._selected.oldPosition);
        this._selected.glow.position.copy(this._selected.oldPosition);
      } else
        if (this.execAllRules() == true) {
          this.moveToDroppable(drop);          
        }
        // if (this.rulesInterface !== undefined) {
        //   this.rulesInterface.emit('canMoveObject', {
        //       source: this._selected,
        //       target: drop,
        //     },
        //     () => {
        //       this.moveToDroppable(drop);
        //     },
        //     () => {
        //       this._selected.object.position.copy(this._selected.oldPosition);
        //       this._selected.glow.position.copy(this._selected.oldPosition);
        //     }
        //   );
        // }
    }
    this._controls.enableRotate = true;
  }

  private execAllRules(): boolean {
    if (this._selected.rules === undefined)
      return true;

    for (let rule in this._selected.rules) {
      if (this._selected.rules[rule].run() === false)
        return false;
    }

    return true;
  }
}
