/**
 * Created by nicolas on 19/10/16.
 */

import { GamesListComponent }   from '../gameslist/gameslist.component';
import { ScenesListComponent }  from '../sceneslist/sceneslist.component';

import { EditorComponent }      from './editor.component';
import { BlueprintsComponent }  from './blueprints';
import { BlueprintComponent }  from './blueprint/blueprint.component';
import { DESIGNER_COMPONENTS }  from './designer';

import { BLUEPRINT_COMPONENTS } from './blueprints';
import { PreviewComponent }     from './preview';
import { ObjectListComponent }  from './object-list';

export { BlueprintsComponent }  from './blueprints';
export { BlueprintComponent }   from './blueprint/blueprint.component';
export { PreviewComponent }     from './preview';
export { EditorComponent }      from './editor.component';
export { GamesListComponent }   from '../gameslist/gameslist.component';
export { ScenesListComponent }  from '../sceneslist/sceneslist.component';
export { DesignerComponent }    from './designer';

export const EDITOR_COMPONENTS = [
  GamesListComponent,
  ScenesListComponent,
  EditorComponent,
  BlueprintComponent,
  BlueprintsComponent,
  PreviewComponent,
  ObjectListComponent,
  DESIGNER_COMPONENTS,
  BLUEPRINT_COMPONENTS,
];
