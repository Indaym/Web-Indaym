import { Component }    from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector  : 'ia-tabs',
  template  : `
  <nav>
    <ul>
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
        {{tab.tabTitle}}
      </li>
    </ul>
    </nav>
    <ng-content></ng-content>
  `,
  styles    : [
    require('./tabs.css'),
  ],
})
export class TabsComponent {
  public tabs: TabComponent[] = [];

  public selectTab(tab: TabComponent) {
    this.tabs.forEach((inTab) => {
      inTab.active = false;
    });
    tab.active = true;
  }

  public addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}
