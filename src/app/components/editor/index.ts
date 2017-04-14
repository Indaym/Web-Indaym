/**
 * Created by nicolas on 19/10/16.
 */

import { EditorComponent }      from './editor.component';
import { BlueprintsComponent }  from './blueprints';
import { DESIGNER_COMPONENTS }  from './designer';
import { PreviewComponent }     from "./preview";

export { BlueprintsComponent }  from './blueprints';
export { DesignerComponent }    from './designer';
export { PreviewComponent }     from './preview';
export { EditorComponent }      from './editor.component';

export const EDITOR_COMPONENTS = [
  EditorComponent,
  BlueprintsComponent,
  PreviewComponent,
  DESIGNER_COMPONENTS
];