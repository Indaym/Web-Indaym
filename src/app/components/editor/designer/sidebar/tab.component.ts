import {
  Component,
  Input,
}                         from '@angular/core';

import { TabsComponent }  from './tabs.component';

@Component({
  selector  : 'ia-tab',
  template  : `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  providers : [],
})
export class TabComponent {
  @Input() public tabTitle: string;
  public active: boolean;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }
}
