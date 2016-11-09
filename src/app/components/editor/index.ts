/**
 * Created by nicolas on 19/10/16.
 */

import { EditorComponent }      from './editor.component';
import { BlueprintsComponent }  from './blueprints';
import { DESIGNER_COMPONENTS }  from './designer';

export { BlueprintsComponent }  from './blueprints';
export { DesignerComponent }    from './designer';
export { EditorComponent }      from './editor.component';

export const EDITOR_COMPONENTS = [
  EditorComponent,
  BlueprintsComponent,
  DESIGNER_COMPONENTS
];