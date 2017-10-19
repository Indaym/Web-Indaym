import {
  Component,
  OnInit,
  Input,
  ViewChild,
}                                 from '@angular/core';

import { GameControllerService }  from '../../../services';

@Component({
  selector: 'ia-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css'],
})
export class ObjectListComponent implements OnInit {
  @Input() public eventDispatcher;
  @Input() public set multiSelect(value) { this._multiSelect = true; }
  private _multiSelect = false;
  private gameController;
  private objects;
  private itemsIcons = [];
  private readonly icons = ['board3x3', 'board1x9', 'blackpawn', 'whitepawn'];

  private selectedElements = [];

  @ViewChild('itemsList') private itemslist;

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

  private cleanViewSelected() {
    for (const child of this.itemslist.nativeElement.children) {
      if (child.classList.contains('selected'))
        child.classList.remove('selected');
    }
  }

  private selectObject(objectId, event) {
    const object = this.gameController.getObjects().find((value) => {
      return value.uuid === objectId;
    });
    const li = event.path.find((element) => element.tagName === 'LI');
    const index = this.selectedElements.indexOf(object);

    if (event.shiftKey && this._multiSelect) {
      (index === -1) ? this.selectedElements.push(object) : this.selectedElements.splice(index, 1);
    } else {
      this.cleanViewSelected();
      this.selectedElements = [ object ];
    }
    (index === -1) ? li.classList.add('selected') : li.classList.remove('selected');

    this.eventDispatcher.dispatchEvent({
      type: 'selectObject',
      objects: [ ...this.selectedElements ],
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
