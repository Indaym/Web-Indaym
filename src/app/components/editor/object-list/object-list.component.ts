import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  ViewChild,
}                                 from '@angular/core';

import { GameControllerService }  from '../../../services';
import {
  OrderType,
  glyphs,
}                                 from '../../../pipes/order-by/order-type.enum';

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
  private categories = [];
  private readonly icons = ['board3x3', 'board1x9', 'blackpawn', 'whitepawn'];
  private filter = '';
  private order = OrderType.DEFAULT;

  private selectedElements = [];
  @ViewChildren('itemsList') private itemslist;
  @ViewChild('glyph') private glyph;

  private updateSwitch = true;
  private trackSwitch = (index, value) => {
    return this.updateSwitch;
  }

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
    this.setIcons();
  }

  ngOnInit() {
    this.objects = this.gameController.getObjects();
    this.gameController.subscribe('addObject', () => this.setIcons());
    this.gameController.subscribe('addGroupObjects', () => this.setIcons());
    this.gameController.subscribes(['deleteObject', 'deleteObjectToService'], () => this.setIcons());
    this.gameController.subscribe('deleteGroupObjects', () => this.setIcons());
  }

  private cleanViewSelected() {
    this.itemslist.forEach((element) => {
      for (const child of element.nativeElement.children) {
        if (child.classList.contains('selected'))
          child.classList.remove('selected');
      }
    });
  }

  private selectObject(objectId, event) {
    const object = this.gameController.getObjects().find((value) => {
      return value.uuid === objectId;
    });
    const li = event.path.find((element) => element.tagName === 'LI');
    const index = this.selectedElements.indexOf(object);
    let toRemove = false;

    if (event.shiftKey && this._multiSelect) {
      if (index === -1)
        this.selectedElements.push(object);
      else {
        this.selectedElements.splice(index, 1);
        toRemove = true;
      }
    } else {
      this.cleanViewSelected();
      this.selectedElements = (index !== -1 && this.selectedElements.length === 1) ? [] : [ object ];
      if (this.selectedElements.length === 0)
        toRemove = true;
    }
    (toRemove) ? li.classList.remove('selected') : li.classList.add('selected');

    this.eventDispatcher.dispatchEvent({
      type: 'selectObject',
      objects: [ ...this.selectedElements ],
    });
  }

  private selectTypeObjects(type, event) {
    const  objects = this.gameController.getObjects().filter((element) => element.object.type === type);
    const every = objects.every((element) => this.selectedElements.findIndex((el) => el === element) !== -1);
    this.selectedElements = this.selectedElements.filter((element) => objects.findIndex((el) => el === element) === -1);
    let toRemove = false;

    if (event.shiftKey && this._multiSelect) {
      if (!every)
        this.selectedElements.push(...objects);
      else
        toRemove = true;
    } else {
      this.cleanViewSelected();
      this.selectedElements = objects;
    }

    for (const item of event.srcElement.parentElement.children) {
      if (item.tagName === 'LI')
        (toRemove) ? item.classList.remove('selected') : item.classList.add('selected');
    }
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
      obj = { name: elem.name, type: elem.object.type, uuid: elem.uuid };
      if (this.icons.indexOf(elem.name) >= 0)
        obj['icon'] = '/assets/icons/' + elem.name + '.png';
      this.itemsIcons.push(obj);
    }
    this.categories.splice(0, this.categories.length);
    for (const item of this.objects) {
      if (this.categories.indexOf(item.object.type) === -1)
        this.categories.push(item.object.type);
    }
    this.updateSwitch = !this.updateSwitch;
    return this.itemsIcons;
  }

  private switchOrder() {
    this.order = (this.order === OrderType.DESC) ? OrderType.DEFAULT : this.order + 1;
    this.glyph.nativeElement.className = glyphs[this.order];
  }

  private updateSelected() {
    for (const element of this.selectedElements) {
      console.log(element);
    }
  }
}
