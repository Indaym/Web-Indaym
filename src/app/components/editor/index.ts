/**
 * Created by nicolas on 19/10/16.
 */

import { GamesListComponent }   from '../gameslist/gameslist.component';
import { ScenesListComponent }  from '../sceneslist/sceneslist.component';

import { EditorComponent }      from './editor.component';
import { BlueprintsComponent }  from './blueprints';
import { DESIGNER_COMPONENTS }  from './designer';

import { BLUEPRINT_COMPONENTS } from './blueprints';
import { PreviewComponent }     from './preview';

export { BlueprintsComponent }  from './blueprints';
export { DesignerComponent }    from './designer';
export { PreviewComponent }     from './preview';
export { EditorComponent }      from './editor.component';
export { GamesListComponent }   from '../gameslist/gameslist.component';
export { ScenesListComponent }  from '../sceneslist/sceneslist.component';

export const EDITOR_COMPONENTS = [
  GamesListComponent,
  ScenesListComponent,
  EditorComponent,
  BlueprintsComponent,
  PreviewComponent,
  DESIGNER_COMPONENTS,
  BLUEPRINT_COMPONENTS,
];
