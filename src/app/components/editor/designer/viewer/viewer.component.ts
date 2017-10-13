/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
}                             from '@angular/core';
import { MdSnackBar }         from '@angular/material';

// temporaire
import {
  MeshBasicMaterial,
} from 'three';

import {
  EditorViewer,
  ModelsLoader,
  ArrowHelperViewer,
}                         from '../../../../threed-viewer';
import {
  GameControllerService,
  ObjectService,
  TextureService,
  GridCreationService,
  SnackBarService,
 }                            from '../../../../services';
import { buttonsDefault }     from '../../../../models';
import { SnackBarType }       from '../../../snackBar';

@Component({
  selector  : 'ia-viewer',
  templateUrl   : './viewer.component.html',
  styleUrls    : [
    './viewer.component.css',
  ],
  providers : [],
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Input() public eventDispatcher;
  public scene: EditorViewer;

  private modelsLoader: ModelsLoader;
  private gameController;

  constructor(
    private gameControllerService: GameControllerService,
    private gridCreationService: GridCreationService,
    private objectService: ObjectService,
    private textureService: TextureService,
    private snackBarService: SnackBarService,
  ) {
    this.gameController = gameControllerService.gameController;
  }

  @HostListener('document:keypress', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete')
      this.deleteObject();
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
          if (texture === undefined)
            return;
          const selected = this.scene.selected as any;
          selected.LinkModel.threeDModel.texture = texture;
          selected.LinkModel.textureRef = e.texture;
          this.objectService.updateObject({textureRef: e.texture}, selected.LinkModel.uuid);
        });
      }
    });

    this.eventDispatcher.addEventListener('selectObject', (e: any) => this.scene.selectObject(e.object));
    this.eventDispatcher.addEventListener('deleteSelected', (e: any) => this.deleteObject());
    this.eventDispatcher.addEventListener('savePositions', (e: any) => this.savePositions());

  /*
    const arrow = new ArrowHelperViewer({
      rotation: [-90 * (Math.PI / 180), 0, 0],
      material: new MeshBasicMaterial({ color: 0xaa0000 })
    }, this.textureService, true);
    arrow.init((mesh) => {
      this.scene.addInScene(mesh);
      this.scene.render();
    });
 */
  }

  public ngOnDestroy() {
    this.savePositions();
  }

  public savePositions() {
    const objs = this.gameController.getObjects();

    objs.forEach((elem) => {
      if (['position', 'rotation', 'dimension'].every((v, i) => {
        if (elem.object[v] === undefined)
          return false;
        return this.equals(elem.threeDModel[v].toArray(), elem.object[v]);
      }))
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
    const selected = (this.scene.selected as any);

    if (selected !== undefined && selected.LinkModel !== undefined) {
      const config = {
        data: { ...selected.LinkModel },
      };

      this.objectService.deleteObject(selected.LinkModel.uuid, (ret) => {
        this.scene.deleteSelected();
        this.gameController.deleteObject(selected.LinkModel.uuid);
        this.snackBarService.open(
          `Object <strong>${selected.LinkModel.name}</strong> of type <strong>${selected.LinkModel.object.type}</strong> has been deleted`,
          config,
          SnackBarType.SUCCESS,
        );
      }, () => {
        this.snackBarService.open(
          `Can't delete <strong>${selected.LinkModel.name}</strong> of type <strong>${selected.LinkModel.object.type}</strong>`,
          config,
          SnackBarType.ERROR,
        );
      });
    }
  }

  public addObject(args: any) {
    if (args.mouseEvent !== undefined) {
      this.scene.setIntersection(args.mouseEvent);
      const coord = this.scene.getIntersection();
      const name = args.dragData;

      if (name !== undefined && buttonsDefault[name] !== undefined) {
        const model = Object.assign({}, buttonsDefault[name]);
        const cb = (datas) => {
          model.object.position = coord.toArray();
          if (name === 'grid')
            this.gridCreationService.assignToGridModel(model, datas);
          this.gameController.addObject(model, true, 'Both');
        };
        if (name === 'grid')
          this.gridCreationService.open(cb);
        else
          cb({});
      }
    }
  }

  private equals(arrA, arrB) {
    return arrA.every((v, i) => (arrB !== undefined && v === arrB[i]));
  }
}
