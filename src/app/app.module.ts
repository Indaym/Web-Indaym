/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { RouterModule }     from '@angular/router';
import { MaterialModule} from '@angular/material';

import { HomeComponent }  from './components/home-component';
import { EditorComponent }  from './components/editor-component';
import { PlayComponent }    from './components/play-component';
import { StoreComponent }   from './components/store-component';
import { ForumComponent }   from './components/forum/forum.component';
import { FORUM_COMPONENT}   from './components/forum'
import { ContactComponent } from './components/contact-component';
import { LegalMentionsComponent } from './components/legalMentions-component';

import { NewsComponent } from './components/news-component';
import { DesignerComponent } from './components/designer-component';
import { BlueprintsComponent } from './components/blueprints-component';

import { Tab, Tabs } from './components/tab-component';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                           from '../platform';

import { AppComponent }     from './components/app.component';
import {SideNavComponent} from "./components/sidenav.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, EditorComponent,
      PlayComponent, StoreComponent, ForumComponent, FORUM_COMPONENT, ContactComponent,
      LegalMentionsComponent, NewsComponent, DesignerComponent,
      BlueprintsComponent, Tab, Tabs, SideNavComponent],
  bootstrap   : [AppComponent],
  imports     : [
      // modules
      MaterialModule.forRoot(),
      BrowserModule,
      RouterModule.forRoot([
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'editor',
            component: EditorComponent
        },
        {
            path: 'play',
            component: PlayComponent
        },
        {
            path: 'store',
            component: StoreComponent
        },
        {
            path: 'forum',
            component: ForumComponent
        },
        {
            path: 'contact',
            component: ContactComponent
        },
        {
            path: 'legalMentions',
            component: LegalMentionsComponent
        },
        {
            path: 'designer',
            component: DesignerComponent
        },
        {
            path: 'blueprints',
            component: BlueprintsComponent
        },
        {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full',
        },
      ]),
      MODULES,
      // Router
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