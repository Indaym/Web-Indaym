/**
 * Created by nicolas on 5/5/17.
 */

import { CaseModelViewer }  from '.';
import { TextureService }   from '../../services';

import {
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
}                           from 'three';

export class GridModelViewer extends CaseModelViewer {
  private cases = [];
  private objs = [];

  constructor(protected conf, protected textureService: TextureService, private editorMode: Boolean = false) {
    super(conf, textureService, editorMode);
  }

  /**
   * [ Override ]
   * Hover function when we hover model
   * @param activate
   */
  public hover(activate = true) {}

  /**
   * Init case model
   * @param onLoad : Callback when loaded
   */
  public init(onLoad) {
    this.initialize(() => {
      super.init((mesh) => {
        this.objs.forEach((val) => {
          val.scale.divide(mesh.scale);
          val.position.divide(mesh.scale);
          mesh.add(val);
          if (this.editorMode)
            val.material.opacity = 1;
        });
        if (this.editorMode) {
          mesh.material.color.setHex(0x424242);
          mesh.material.opacity = 0.5;
        } else {
          mesh.material.opacity = 0;
        }
        onLoad(mesh);
      });
    });
  }

  private initialize(cb) {
    let config = Object.assign({}, {
      caseX: 3,
      caseY: 3,
      caseWidth: 5,
      caseHeight: 5,
      gap: 1,
    }, this.conf);

    this.dimension.x = (config.caseWidth + config.gap) * config.caseX + config.gap;
    this.dimension.y = (config.caseHeight + config.gap) * config.caseY + config.gap;
    const topPos = [- this.dimension.x / 2, this.dimension.y / 2];

    let textureEven;
    let textureOdd;

    const next = () => {
      for (let x = 0; x < config.caseX; x++) {
        this.cases[x] = [];
        for (let y = 0; y < config.caseY; y++) {
          let object = {
            dimension: [config.caseWidth, config.caseHeight, 1],
            position: [
              topPos[0] + x * (config.caseWidth + config.gap) + config.gap + (config.caseWidth / 2),
              topPos[1] - y * (config.caseHeight + config.gap) - config.gap - (config.caseHeight / 2),
              -0.01,
            ],
            droppable: true,
            draggable: false,
            coord: [x, y],
            color: this.conf.color,
            material: (config.alternate === true && (x + y) % 2 === 1) ? textureOdd.clone() : textureEven.clone(),
          };
          this.cases[x][y] = new CaseModelViewer(object, this.textureService, this.editorMode);
          this.cases[x][y].init((mesh) => {
            mesh.LinkModel = {
              threeDModel: this.cases[x][y],
              object: object,
            };
            mesh.rotation.x = 0;
            this.objs.push(mesh);
          });
        }
      }
      cb();
    };

    this.textureService.getLocalTexture(config.textureEven, (texture) => {
      new TextureLoader().load(texture, (t) => {
        textureEven = new MeshBasicMaterial({ map: t, side: DoubleSide, transparent: true, opacity: 0.8 });
        if (config.alternate === true) {
          this.textureService.getLocalTexture(config.textureOdd, (text) => {
            new TextureLoader().load(text, (tt) => {
              textureOdd = new MeshBasicMaterial({ map: tt, side: DoubleSide, transparent: true, opacity: 0.8 });
              next();
            });
          });
        } else {
          next();
        }
      });
    });
  }
}
