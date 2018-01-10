/**
 * Created by nicolas on 20/10/16.
 */

import { AppComponent }           from './app.component';
import { ContactComponent }       from './contact';
import { EditorListComponent }    from './editorList';
import { ScenesListComponent }    from './sceneslist';
import { EDITOR_COMPONENTS }      from './editor';
import { HOME_COMPONENTS }        from './home';
import { LegalMentionsComponent } from './legal-mentions';
import { StoreComponent }         from './store';
import { RateGameComponent }      from './rategame';
import { AUTH_COMPONENTS }        from './auth';
import {
  PlayComponent,
  PlayerComponent,
}                                 from './play';
import {
  LoginComponent,
  RegisterComponent,
}                                 from './auth';
import { SnackBarComponent }      from './snackBar';

export { AppComponent }           from './app.component';
export { SnackBarComponent }      from './snackBar';
export { GridPopupComponent }     from './editor';

export { WIDGETS }                from './widgets';

export const APP_COMPONENTS = [
  EDITOR_COMPONENTS,
  HOME_COMPONENTS,
  AUTH_COMPONENTS,
  AppComponent,
  ContactComponent,
  EditorListComponent,
  ScenesListComponent,
  LegalMentionsComponent,
  PlayComponent,
  PlayerComponent,
  StoreComponent,
  RateGameComponent,
  LoginComponent,
  RegisterComponent,
  SnackBarComponent,
];
