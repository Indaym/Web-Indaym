/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { FormsModule }    from '@angular/forms';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                         from '../platform';
import { routing }        from './app.route';

import {
  AppComponent,
  APP_COMPONENTS
}                         from './component';

import { ViewerComponent }    from './component/editor/designer/viewer/index';

@NgModule({
  declarations: [
    APP_COMPONENTS
  ],
  bootstrap   : [ AppComponent ],
  imports     : [
    // modules
    MaterialModule.forRoot(),
    BrowserModule,
    MODULES,
    routing,
    FormsModule,
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
