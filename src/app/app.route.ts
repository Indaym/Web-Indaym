/**
 * Created by nicolas on 19/10/16.
 */

import { ModuleWithProviders } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { AuthGuard } from './guards';

import { HomeComponent } from './components/home';
import {
  EditorComponent,
  PreviewComponent,
  DesignerComponent,
  BlueprintsComponent,
} from './components/editor';
import { GamesListComponent } from './components/gameslist';
import { ScenesListComponent } from './components/sceneslist';
import { PlayComponent } from './components/play';
import { StoreComponent } from './components/store';
import { RateGameComponent } from './components/rategame';
import { ForumComponent } from './components/forum';
import { ContactComponent } from './components/contact';
import { LegalMentionsComponent } from './components/legal-mentions';
import {
  LoginComponent,
  RegisterComponent
} from './components/auth';

export const routes: Routes = [
  { path: '',               redirectTo: '/home',              pathMatch: 'full' },
  { path: 'home',           component: HomeComponent },
  { path: 'forum',          component: ForumComponent },
  { path: 'contact',        component: ContactComponent },
  { path: 'legalMentions',  component: LegalMentionsComponent },
  { path: 'register',       component: RegisterComponent },
  { path: 'login',          component: LoginComponent },
  { path: 'gameslist',      component: GamesListComponent,    canActivate: [ AuthGuard ] },
  { path: 'sceneslist',     component: ScenesListComponent,   canActivate: [ AuthGuard ] },
  { path: 'editor',         component: EditorComponent,       canActivate: [ AuthGuard ],
    children: [
      { path: '',           redirectTo: 'designer',           pathMatch: 'full' },
      { path: 'designer',   component: DesignerComponent },
      { path: 'blueprints', component: BlueprintsComponent },
      { path: 'preview',    component: PreviewComponent },
    ],
  },
  { path: 'play',           component: PlayComponent,       canActivate: [ AuthGuard ] },
  { path: 'rategame',       component: RateGameComponent,   canActivate: [ AuthGuard ] },
  { path: 'store',          component: StoreComponent,      canActivate: [ AuthGuard ] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
