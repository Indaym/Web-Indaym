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
  styleUrls: ['./object-list.component.scss'],
})
export class ObjectListComponent implements OnInit {
  @Input() public eventDispatcher;
  @Input() public set multiSelect(value) { this._multiSelect = true; }
  public categories = [];
  public filter = '';
  public order = OrderType.DEFAULT;
  public updateSwitch = true;

  private _multiSelect = false;
  private gameController;
  private objects;
  private itemsIcons = [];
  private readonly icons = ['board3x3', 'board1x9', 'blackpawn', 'whitepawn'];
  private selectedElements = [];
  @ViewChildren('itemsList') private itemslist;
  @ViewChild('glyph') private glyph;

  public trackSwitch = (index, value) => {
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
    this.eventDispatcher.addEventListener('refresh_object_list', () => this.setIcons());
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

    if (event.shiftKey && this._multiSelect)
      (index === -1) ? this.selectedElements.push(object) : this.selectedElements.splice(index, 1);
    else
      this.selectedElements = (index !== -1 && this.selectedElements.length === 1) ? [] : [ object ];

    this.eventDispatcher.dispatchEvent({
      type: 'selectObject',
      objects: [ ...this.selectedElements ],
    });
  }

  private selectTypeObjects(type, event) {
    const  objects = this.gameController.getObjects().filter((element) => element.object.type === type);
    const every = objects.every((element) => this.selectedElements.findIndex((el) => el === element) !== -1);
    this.selectedElements = this.selectedElements.filter((element) => objects.findIndex((el) => el === element) === -1);

    if (event.shiftKey && this._multiSelect) {
      if (!every)
      this.selectedElements.push(...objects);
    } else
      this.selectedElements = objects;

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

  public switchOrder() {
    this.order = (this.order === OrderType.DESC) ? OrderType.DEFAULT : this.order + 1;
    this.glyph.nativeElement.className = glyphs[this.order];
  }

  private isSelected(item) {
    return this.selectedElements.findIndex((e) => e.uuid === item.uuid) > -1;
  }
}
