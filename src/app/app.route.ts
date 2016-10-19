/**
 * Created by nicolas on 19/10/16.
 */


import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { HomeComponent }            from './home';
import { EditorComponent }          from './editor';
import { PlayComponent }            from './play';
import { StoreComponent }           from './store';
import { ForumComponent }           from './forum/forum.component';
import { ContactComponent }         from './contact';
import { LegalMentionsComponent }   from './legal-mentions';
import { DesignerComponent }        from './editor/designer';
import { BlueprintsComponent }      from './editor/blueprints';


export const routes: Routes = [
    //{ path: '', component: <a component> },
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
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);