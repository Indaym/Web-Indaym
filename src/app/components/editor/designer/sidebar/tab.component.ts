import {
  Component,
  Input
}                   from '@angular/core';

import { Tabs }     from './tabs.component';

@Component({
  selector  : 'tab',
  template  : `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {

  active: boolean;

  @Input() tabTitle: string;

  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}
