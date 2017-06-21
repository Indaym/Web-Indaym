import {
  Component,
  Input,
}                   from '@angular/core';

import { TabsComponent }     from './tabs.component';

@Component({
  selector  : 'ia-tab',
  template  : `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabComponent {
  public active: boolean;
  @Input() public tabTitle: string;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
