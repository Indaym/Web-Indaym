/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
  ViewChild,
}                         from '@angular/core';

import {
  MeshBasicMaterial,
  Group,
}                         from 'three';

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
 }                        from '../../../../services';
import { buttonsDefault } from '../../../../models';
import { SnackBarType }   from '../../../snackBar';

@Component({
  selector  : 'ia-viewer',
  templateUrl   : './viewer.component.html',
  styleUrls    : [
    './viewer.component.scss',
  ],
  providers : [],
})
export class ViewerComponent implements OnInit, OnDestroy {
  @Input() public eventDispatcher;
  public scene: EditorViewer;

  private modelsLoader: ModelsLoader;
  private gameController;
  @ViewChild('editorContainer') container;

  constructor(
    private gameControllerService: GameControllerService,
    private gridCreationService: GridCreationService,
    private objectService: ObjectService,
    private textureService: TextureService,
    private snackBarService: SnackBarService,
  ) {
    this.gameController = gameControllerService.gameController;
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.scene.selected)
      this.deleteObject();
  }

  public ngOnInit(): void {
    this.scene = new EditorViewer({
      width: () => window.innerWidth,
      height: () => window.innerHeight - this.container.nativeElement.offsetTop - 100,
    });
    this.scene.defaultLoad(this.container.nativeElement);
    this.scene.domElement.addEventListener('mousedown', (event) => this.scene.onMouseDown(event), false);
    this.scene.domElement.addEventListener('mousemove', (event) => this.scene.onMouseMove(event), false);
    this.scene.eventDispatcher = this.eventDispatcher;
    this.modelsLoader = new ModelsLoader(this.scene, this.textureService, this.snackBarService, true);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);

    this.eventDispatcher.addEventListener('updateTexture', (e: any) => {
      if (this.scene.selected !== undefined) {
        this.textureService.getLocalTexture(e.texture, (texture) => {
          if (texture === undefined)
            return;
          const apply = (obj: any) => {
            obj.LinkModel.threeDModel.texture = texture;
            obj.LinkModel.textureRef = e.texture;
            this.objectService.updateObject({textureRef: e.texture}, obj.LinkModel.uuid);
          };

          if (this.scene.selected instanceof Group)
            this.scene.selected.children.forEach((element: any) => apply(element));
          else
            apply(this.scene.selected);
        });
      }
    });

    this.eventDispatcher.addEventListener('selectObject', (e: any) => {
      if (e.objects.length > 0) {
        if (e.objects.length === 1)
          this.scene.selectObject(e.objects[0].threeDModel.mesh);
        else
          this.scene.selectObjects(e.objects.map((element) => element.threeDModel.mesh));
      } else
        this.scene.unselectObject(undefined);
    });
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

    const selObjs = this.scene.unselectObject(undefined);
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
    this.scene.selectObjects(selObjs);
  }

  public deleteObject() {
    if (!this.scene.selected)
      return;

    const deleteObj = (obj: any) => {
      const config = {
        data: { ...obj.LinkModel },
      };
      this.objectService.deleteObject(obj.LinkModel.uuid, (ret) => {
        this.gameController.deleteObject(obj.LinkModel.uuid, true, 'ToService');
        this.snackBarService.open(
          `Object <strong>${obj.LinkModel.name}</strong> of type <strong>${obj.LinkModel.object.type}</strong> has been deleted`,
          config,
          SnackBarType.SUCCESS,
        );
      }, () => {
        this.snackBarService.open(
          `Can't delete <strong>${obj.LinkModel.name}</strong> of type <strong>${obj.LinkModel.object.type}</strong>`,
          config,
          SnackBarType.ERROR,
        );
      });
    };

    if (this.scene.selected instanceof Group)
      this.scene.selected.children.forEach(deleteObj);
    else
      deleteObj(this.scene.selected);

    this.scene.deleteSelected();
  }

  public addObject(args: any) {
    if (args.mouseEvent !== undefined) {
      this.scene.setIntersection(args.mouseEvent);
      const coord = this.scene.getIntersection();
      const name = args.dragData;

      if (name !== undefined && buttonsDefault[name] !== undefined) {
        const model = { ...buttonsDefault[name] };
        model.object = { ...model.object };
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
