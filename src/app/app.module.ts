/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                           from '../platform';

import { AppComponent }     from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap   : [AppComponent],
  imports     : [
      // modules
      BrowserModule,
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
