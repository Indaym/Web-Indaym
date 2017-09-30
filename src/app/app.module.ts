/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { FormsModule }              from '@angular/forms';
import { DndModule }                from 'ng2-dnd';
import { HttpModule }               from '@angular/http';
import { FileUploadModule }         from 'ng2-file-upload';
import { ModalModule }              from 'ng2-modal';

import { routing }                  from './app.route';

import {
  AppComponent,
  SnackBarComponent,
  APP_COMPONENTS,
}                                   from './components';

import { AuthGuard }                from './guards';
import { HtmlService }              from './services/html.service';

import {
  DragulaModule,
  DragulaService
}                                   from 'ng2-dragula/ng2-dragula';

import { MaterialModule }           from '../materialModule';

@NgModule({
  declarations: [
    APP_COMPONENTS,
  ],
  bootstrap : [ AppComponent ],
  entryComponents: [
    SnackBarComponent
  ],
  providers : [
    HtmlService,
    AuthGuard,
  ],
  imports   : [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    FormsModule,
    DndModule.forRoot(),
    FileUploadModule,
    ModalModule,
    DragulaModule,
  ],
})
export class AppModule {
}
