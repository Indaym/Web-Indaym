/**
 * Created by nicolas on 19/10/16.
 */

import { DesignerComponent }    from './designer.component';
import { SideNavComponent }     from './side-bar/sidenav.component';
import {
    Tab,
    Tabs
}                               from './side-bar/tab.component';

export { DesignerComponent }    from './designer.component';
export const DESIGNER_COMPONENTS = [
    DesignerComponent,
    SideNavComponent,
    Tabs,
    Tab
];