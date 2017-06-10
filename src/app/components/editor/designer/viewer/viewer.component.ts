/**
 * Created by Nicolas Delahaigue on 09/10/16.
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
}                                 from '@angular/core';

import {
  EditorViewer,
  ModelsLoader,
}                                 from '../../../../threed-viewer';
import { GameControllerService }  from '../../../../../services/';
import { buttonsDefault }         from '../../../../../models/';

@Component({
  selector  : 'ia-viewer',
  template  : require('./viewer.component.html'),
  styles    : [
    require('./viewer.component.css'),
  ],
})
export class ViewerComponent implements OnInit, OnDestroy {
  public scene: EditorViewer;
  @Input() public eventDispatcher;

  private modelsLoader: ModelsLoader;
  private gameController;

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = gameControllerService.gameController;
  }

  // To delete ??
  public saveScene() {
    // CARO Ici tu stockes la scene actuelle dans la DB
    // Faut que tu voies avec Nico comment et sous quelle forme les stocker, perso j'en ai pas la moindre idée
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
    this.modelsLoader = new ModelsLoader(this.scene);
    this.modelsLoader.loadModels(this.gameController.getObjects());
    this.modelsLoader.initEvents(this.gameController);
  }

  public ngOnDestroy() {}

  public addObject(args: any) {
    if (args.mouseEvent != undefined) {
      this.scene.setIntersection(args.mouseEvent);
      let coord = this.scene.getIntersection();
      if (args.dragData != undefined) {
        let obj = buttonsDefault[args.dragData];
        obj.object.position = coord.toArray();
        this.gameController.addObject(obj, true, 'Both');
      }
    }
  }
}
