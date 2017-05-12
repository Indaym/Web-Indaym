/**
 * Created by nicolas on 14/10/16.
 */

import {
  Texture,
  TextureLoader
} from 'three';

export class TexturePoolViewer {
  private processing: boolean = false;
  private queue: Array<String>;
  private dones: Array<Texture>;
  private poolLength: number = 0;
  private pushed: number = 0;
  private path: string = undefined;

  constructor(path) {
    this.path = path;
  }

  /**
   * Load all texture
   * @param textures : Textures
   * @param onLoad : Callback when loaded
   * @param onProgress : Callback when each texture is laoded
   * @returns {boolean}
   */
  load(textures, onLoad, onProgress?) {
    if (this.processing == true || textures === undefined || textures.length == 0)
      return false;
    this.processing = true;
    this.poolLength = textures.length;
    this.queue = textures.slice();
    this.dones = new Array(this.poolLength);
    for (let tex of this.queue) {
      this.loadImage(tex, onLoad, onProgress);
    }
  }

  /**
   * Load one texture
   * @param img : Image to load
   * @param onLoad : Callback when loaded
   * @param onProgress : Callback when each texture is laoded
   */
  private loadImage(img, onLoad, onProgress?) {
    const textureLoader = new TextureLoader();
    textureLoader.load((this.path != undefined) ? this.path + img : img, (texture) => {
      const index = this.queue.indexOf(img, 0);
      if (index > -1) {
        this.queue[index] = null;
        this.dones[index] = texture;
        this.pushed += 1;
      }
      if (onProgress)
        onProgress(texture, index);
      if (this.pushed == this.poolLength)
        this.finished(onLoad);
    });
  }

  /**
   * Called when load of texture is finished
   * @param onLoad : Callback when loaded
   * @returns {boolean}
   */
  private finished(onLoad) {
    if (this.processing == false)
      return false;
    this.processing = false;
    this.queue = null;
    this.poolLength = 0;
    this.pushed = 0;
    onLoad(this.dones);
  }
}