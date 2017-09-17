/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
}                         from '@angular/core';

import {
  EditorViewer,
  ModelsLoader,
}                         from '../../../../threed-viewer';
import {
  GameControllerService,
  ObjectService,
  TextureService,
 }                        from '../../../../../services/';
import { buttonsDefault } from '../../../../../models/';

@Component({
  selector  : 'ia-viewer',
  template  : require('./viewer.component.html'),
  styles    : [
    require('./viewer.component.css'),
  ],
  providers : [],
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Input() public eventDispatcher;
  public scene: EditorViewer;

  private modelsLoader: ModelsLoader;
  private gameController;

  constructor(private gameControllerService: GameControllerService, private objectService: ObjectService, private textureService: TextureService) {
    this.gameController = gameControllerService.gameController;
  }

  public ngOnInit(): void {
    const dom = document.getElementById('editorContainer');
    this.scene = new EditorViewer({
      width: () => window.innerWidth,
      height: () => window.innerHeight - dom.offsetTop - 5,
    });
    this.scene.defaultLoad('editorContainer');
    this.scene.domElement.addEventListener('mousedown', (event) => this.scene.onMouseDown(event), false);
    this.scene.domElement.addEventListener('mousemove', (event) => this.scene.onMouseMove(event), false);
    this.scene.eventDispatcher = this.eventDispatcher;
    this.modelsLoader = new ModelsLoader(this.scene, this.textureService, true);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);

    this.eventDispatcher.addEventListener('updateTexture', (e: any) => {
      if (this.scene.selected !== undefined) {
        this.textureService.getLocalTexture(e.texture, (texture) => {
          const selected = this.scene.selected as any;
          selected.LinkModel.threeDModel.texture = texture;
          selected.LinkModel.textureRef = e.texture;
          this.objectService.updateObject({textureRef: e.texture}, selected.LinkModel.uuid);
        });
      }
    });
  }

  public ngOnDestroy() {
    this.savePositions();
  }

  public savePositions() {
    const objs = this.gameController.getObjects();

    objs.forEach((elem) => {
      if (['position', 'rotation', 'dimension'].every((v, i) => this.equals(elem.threeDModel[v].toArray(), elem.object[v])))
        return;
      elem.object.position = [];
      elem.threeDModel.position.toArray(elem.object.position);
      elem.object.dimension = [];
      elem.threeDModel.dimension.toArray(elem.object.dimension);
      elem.object.rotation = [];
      elem.threeDModel.rotation.toArray(elem.object.rotation);
      this.objectService.updateObject({ object: elem.object }, elem.uuid);
    });
  }

  public deleteObject() {
    const selected = <any>this.scene.selected;
    if (selected !== undefined && selected.LinkModel !== undefined) {
      this.objectService.deleteObject(selected.LinkModel.uuid, (ret) => {
        this.scene.deleteSelected();
        this.gameController.deleteObject(selected.LinkModel.uuid);

      });
    }
  }

  public addObject(args: any) {
    if (args.mouseEvent != undefined) {
      this.scene.setIntersection(args.mouseEvent);
      let coord = this.scene.getIntersection();
      if (args.dragData != undefined) {
        let obj = buttonsDefault[args.dragData];
        let old = obj.object.position;
        obj.object.position = coord.toArray();
        this.gameController.addObject(obj, true, 'Both', (objq) => {
          if (old === undefined)
            delete obj.object['position'];
          else
            obj.object.position = old;
        });
      }
    }
  }

  private equals(arrA, arrB) {
    return arrA.every((v, i) => (arrB !== undefined && v === arrB[i]));
  }
}
