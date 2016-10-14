/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES
}                           from '../platform';

import { AppComponent }     from './app.component';

import { ViewerEditorComponent }    from './viewer-editor/index';

@NgModule({
  declarations: [
      AppComponent,
      ViewerEditorComponent
  ],
  bootstrap   : [AppComponent],
  imports     : [
      // modules
      BrowserModule,
      MODULES,
      // Router
      FormsModule,
      // Application

      DIRECTIVES,
      ENV_PROVIDERS,
      PROVIDERS,
      PIPES,
  ]
})
export class AppModule {
}
