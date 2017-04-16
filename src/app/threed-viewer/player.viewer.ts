/**
 * Created by nicolas on 13/04/17.
 */

import {
  AxisHelper
}                       from 'three';

import { SceneViewer }  from '.';

export class PlayerViewer extends SceneViewer {
  constructor(conf: any = {}) {
    super(conf);

    this._scene.add(new AxisHelper(1000));
  }
}