/**
 * Created by nicolas on 19/10/16.
 */


import { ModuleWithProviders }    from '@angular/core';
import {
  Routes,
  RouterModule
}                                 from '@angular/router';

import { HomeComponent }          from './component/home';
import { EditorComponent }        from './component/editor';
import { PlayComponent }          from './component/play';
import { StoreComponent }         from './component/store';
import { ForumComponent }         from './component/forum';
import { ContactComponent }       from './component/contact';
import { LegalMentionsComponent } from './component/legal-mentions';
import { DesignerComponent }      from './component/editor/designer';
import { BlueprintsComponent }    from './component/editor/blueprints';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editor',
    children: [
      {
        path: '',
        component: EditorComponent
      },
      {
        path: 'designer',
        component: DesignerComponent
      },
      {
        path: 'blueprints',
        component: BlueprintsComponent
      }
    ]
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);