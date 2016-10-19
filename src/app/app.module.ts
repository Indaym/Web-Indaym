/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { MaterialModule}            from '@angular/material';

import { HomeComponent }            from './home';
import { EditorComponent }          from './editor';
import { PlayComponent }            from './play';
import { StoreComponent }           from './store';
import { ForumComponent }           from './forum/forum.component';
import { FORUM_COMPONENT}           from './forum';
import { ContactComponent }         from './contact';
import { LegalMentionsComponent }   from './legal-mentions';

import { NewsComponent }            from './home/news';
import { DesignerComponent }        from './editor/designer';
import { BlueprintsComponent }      from './editor/blueprints';
import { SideNavComponent}          from "./editor/designer/side-bar/sidenav.component.ts";
import { AppComponent }             from './app.component.ts';
import { Tab, Tabs }                from './editor/designer/side-bar/tab.component.ts';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                                   from '../platform';

import { routing }                  from './app.route';


@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      EditorComponent,
      PlayComponent,
      StoreComponent,
      ForumComponent,
      FORUM_COMPONENT,
      ContactComponent,
      LegalMentionsComponent,
      NewsComponent,
      DesignerComponent,
      BlueprintsComponent,
      Tab,
      Tabs,
      SideNavComponent
  ],
  bootstrap   : [AppComponent],
  imports     : [
      // modules
      MaterialModule.forRoot(),
      BrowserModule,
      MODULES,
      routing,
      // Forms
      // Application

      DIRECTIVES,
      ENV_PROVIDERS,
      PROVIDERS,
      PIPES,
  ]
})
export class AppModule {
}