/**
 * Created by nicolas on 22/10/16.
 */

import { LeftSidebarComponent }   from './left-sidebar/';
import {
  RightSidebarComponent,
  ExpandInputComponent,
}                                 from './right-sidebar/';
import { TabComponent }           from './tab.component';
import { TabsComponent }          from './tabs.component';

export { LeftSidebarComponent }   from './left-sidebar/';
export { RightSidebarComponent }  from './right-sidebar/';
export { TabComponent }           from './tab.component';
export { TabsComponent }          from './tabs.component';

export const SIDEBAR_COMPONENTS = [
  LeftSidebarComponent,
  RightSidebarComponent,
  ExpandInputComponent,
  TabComponent,
  TabsComponent,
];
