/**
 * Created by nicolas on 20/10/16.
 */

import { AppComponent }           from './app.component';
import { ContactComponent }       from './contact';
import { GamesListComponent }     from './gameslist';
import { ScenesListComponent }    from './sceneslist';
import { EDITOR_COMPONENTS }      from './editor';
import { FORUM_COMPONENTS }       from './forum';
import { HOME_COMPONENTS }        from './home';
import { LegalMentionsComponent } from './legal-mentions';
import { PlayComponent }          from './play';
import { StoreComponent }         from './store';
import { RateGameComponent }      from './rategame';
import { AUTH_COMPONENTS }        from './auth';
import {
  LoginComponent,
  RegisterComponent,
}                                 from './auth';
import { SnackBarComponent }      from './snackBar';

export { AppComponent }           from './app.component';
export { SnackBarComponent }      from './snackBar';

export const APP_COMPONENTS = [
  EDITOR_COMPONENTS,
  FORUM_COMPONENTS,
  HOME_COMPONENTS,
  AUTH_COMPONENTS,
  AppComponent,
  ContactComponent,
  GamesListComponent,
  ScenesListComponent,
  LegalMentionsComponent,
  PlayComponent,
  StoreComponent,
  RateGameComponent,
  LoginComponent,
  RegisterComponent,
  SnackBarComponent,
];
