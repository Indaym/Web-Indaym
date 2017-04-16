/**
 * Created by nicolas on 13/04/17.
 */

import {
  AxisHelper,
  Mesh,
  MeshBasicMaterial
}                       from 'three';

import { SceneViewer }  from '.';

export class PlayerViewer extends SceneViewer {
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

  onMouseDown(event) {
    let intersected = this.intersectObjects(event);

    if (intersected.length > 0) {
      console.log(intersected[0].object);
      this._controls.enableRotate = false;
    }
    // if (intersected.length > 0) {
    //   let obj = <Mesh>intersected[0].object;
    //   let material = <MeshBasicMaterial>((obj.material.type === "MultiMaterial") ? obj.material.materials[2] : obj.material);
    //   console.log(obj);
    //   this._controls.enableRotate = false;
    //   material.color.setHex(0xff0000);
    // }
  }

  onMouseMove(event) {
    if(event.buttons === 1)
      console.log('MOOVE');
  }

  onMouseUp(event) {
    this._controls.enableRotate = true;
  }
}