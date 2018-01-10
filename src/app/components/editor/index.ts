/**
 * Created by nicolas on 19/10/16.
 */

import { EditorListComponent }   from '../editorList/editorList.component';
import { ScenesListComponent }  from '../sceneslist/sceneslist.component';

import { EditorComponent }      from './editor.component';
import { BlueprintsComponent }  from './blueprints';
import { DESIGNER_COMPONENTS }  from './designer';

import { PreviewComponent }     from './preview';
import { ObjectListComponent }  from './object-list';

export { BlueprintsComponent }  from './blueprints';
export { PreviewComponent }     from './preview';
export { EditorComponent }      from './editor.component';
export { EditorListComponent }   from '../editorList/editorList.component';
export { ScenesListComponent }  from '../sceneslist/sceneslist.component';
export {
  DesignerComponent,
  GridPopupComponent,
}                               from './designer';

export const EDITOR_COMPONENTS = [
  EditorListComponent,
  ScenesListComponent,
  EditorComponent,
  BlueprintsComponent,
  PreviewComponent,
  ObjectListComponent,
  DESIGNER_COMPONENTS,
];
