/**
 * Created by nicolas on 20/10/16.
 */

import { AppComponent }           from './app.component';
import { ContactComponent }       from './contact';
import { EDITOR_COMPONENTS }      from "./editor";
import { FORUM_COMPONENTS }       from './forum';
import { HOME_COMPONENTS }        from './home';
import { LegalMentionsComponent } from './legal-mentions';
import { PlayComponent }          from './play';
import { StoreComponent }         from './store';

export { AppComponent }           from './app.component';

export const APP_COMPONENTS = [
  AppComponent,
  ContactComponent,
  EDITOR_COMPONENTS,
  FORUM_COMPONENTS,
  HOME_COMPONENTS,
  LegalMentionsComponent,
  PlayComponent,
  StoreComponent
];