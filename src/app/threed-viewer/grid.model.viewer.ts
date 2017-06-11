/**
 * Created by nicolas on 5/5/17.
 */

import {
  CaseModelViewer,
} from '.';

export class GridModelViewer extends CaseModelViewer {
  private cases = [];
  private objs = [];

  constructor(private conf) {
    super(conf);
    let config = Object.assign({}, {
      caseX: 3,
      caseY: 3,
      caseWidth: 5,
      caseHeight: 5,
      gap: 1,
    }, conf);

    this.dimension.x = (config.caseWidth + config.gap) * config.caseX + config.gap;
    this.dimension.y = (config.caseHeight + config.gap) * config.caseY + config.gap;
    const topPos = [- this.dimension.x / 2, this.dimension.y / 2];
    for (let x = 0; x < config.caseX; x++) {
      this.cases[x] = [];
      for (let y = 0; y < config.caseY; y++) {
        this.cases[x][y] = new CaseModelViewer({
          dimension: [config.caseWidth, config.caseHeight, 1],
          position: [
            topPos[0] + x * (config.caseWidth + config.gap) + config.gap + (config.caseWidth / 2),
            topPos[1] - y * (config.caseHeight + config.gap) - config.gap - (config.caseHeight / 2),
            -0.01,
          ],
        });
        this.cases[x][y].init((mesh) => {
          mesh.rotation.x = 0;
          this.objs.push(mesh);
          this.cases[x][y].hover(true);
        })
      }
    }
  }

  /**
   * [ Override ]
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {}

  /**
   * [ Override ]
   * Get the position to drop the object
   * @returns {Vector3}
   */
  public dropPosition(obj) {
    let pos = super.dropPosition(obj);
    return pos;
  }

  /**
   * Init case model
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    super.init((mesh) => {
      this.objs.forEach((val) => {
        val.scale.divide(mesh.scale);
        val.position.divide(mesh.scale);
        mesh.add(val);
        val.material.color.setHex(0x00ff00);
      });
      super.hover(true);
      onLoad(mesh);
    });
  }
}
