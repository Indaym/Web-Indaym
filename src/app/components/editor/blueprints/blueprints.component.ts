import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';

@Component({
  selector  : 'ia-blueprints',
  template  : require('./blueprints.component.html'),
  styles    : [
    require('./blueprints.component.css')
  ],
  providers : []
})
export class BlueprintsComponent {
  private dispatcher: EventDispatcher;

  constructor() {
    this.dispatcher = new EventDispatcher();
  }
}
