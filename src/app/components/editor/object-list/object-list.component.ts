import {
  Component,
  OnInit,
  Input,
}                                 from '@angular/core';

import { GameControllerService }  from '../../../services';

@Component({
  selector: 'ia-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css'],
})
export class ObjectListComponent implements OnInit {
  @Input() public eventDispatcher;
  private gameController;
  private objects;
  private itemsIcons = [];
  private readonly icons = ['board3x3', 'board1x9', 'blackpawn', 'whitepawn'];

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
    this.setIcons();
  }

  ngOnInit() {
    this.objects = this.gameController.getObjects();
    this.gameController.subscribe('addObject', () => this.setIcons());
    this.gameController.subscribe('addGroupObjects', () => this.setIcons());
    this.gameController.subscribe('deleteObject', () => this.setIcons());
    this.gameController.subscribe('deleteGroupObjects', () => this.setIcons());
  }

  private selectObject(objectId) {
    const object = this.gameController.getObjects().find((value) => {
      return value.uuid === objectId;
    });
    this.eventDispatcher.dispatchEvent({
      type: 'selectObject',
      object,
    });
  }

  private setIcons() {
    let obj;

    this.itemsIcons.splice(0, this.itemsIcons.length);
    this.objects = this.gameController.getObjects();
    for (const elem of this.objects) {
      obj = { name: elem.name, uuid: elem.uuid };
      if (this.icons.indexOf(elem.name) >= 0)
        obj['icon'] = '/assets/icons/' + elem.name + '.png';
      this.itemsIcons.push(obj);
    }
    return this.itemsIcons;
  }
}
