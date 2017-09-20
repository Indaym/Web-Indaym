/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { MaterialModule }   from '@angular/material';
import { FormsModule }      from '@angular/forms';
import { DndModule }        from 'ng2-dnd';
import { HttpModule }       from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule }      from 'ng2-modal';

import {
  ENV_PROVIDERS,
  DIRECTIVES,
  PIPES,
  PROVIDERS,
  MODULES,
}                           from '../platform';
import { routing }          from './app.route';

import {
  AppComponent,
  APP_COMPONENTS,
}                           from './components';

import { HtmlService }      from '../services/html.service';

@NgModule({
  declarations: [
    APP_COMPONENTS,
  ],
  bootstrap : [ AppComponent ],
  providers : [ HtmlService ],
  imports   : [
    MaterialModule.forRoot(),
    BrowserModule,
    MODULES,
    HttpModule,
    DIRECTIVES,
    ENV_PROVIDERS,
    PROVIDERS,
    PIPES,
    routing,
    FormsModule,
    DndModule.forRoot(),
    FileUploadModule,
    ModalModule,
  ],
})
export class AppModule {
}
