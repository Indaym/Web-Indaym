/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { MaterialModule}            from '@angular/material';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                                   from '../platform';
import { routing }                  from './app.route';

import {
  AppComponent,
  APP_COMPONENTS
}                                   from './component';

@NgModule({
  declarations: [
    APP_COMPONENTS
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