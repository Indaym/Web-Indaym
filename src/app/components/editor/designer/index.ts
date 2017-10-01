/**
 * Created by nicolas on 19/10/16.
 */

import { DesignerComponent }  from './designer.component';
import { SIDEBAR_COMPONENTS } from './sidebar';
import { ViewerComponent }    from './viewer';
import { GridPopupComponent } from './grid-popup';

export { DesignerComponent }  from './designer.component';

export const DESIGNER_COMPONENTS = [
  DesignerComponent,
  ViewerComponent,
  GridPopupComponent,
  SIDEBAR_COMPONENTS,
];
