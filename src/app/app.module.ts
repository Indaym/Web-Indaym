/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { FormsModule }              from '@angular/forms';
import { DndModule }                from 'ng2-dnd';
import {
  HttpModule,
  Http,
  XHRBackend,
  RequestOptions,
}               from '@angular/http';
import { FileUploadModule }         from 'ng2-file-upload';
import { ModalModule }              from 'ng2-modal';
import {
  DragulaModule,
  DragulaService,
}                                   from 'ng2-dragula/ng2-dragula';

import { MaterialModule }           from '../materialModule';

import { routing }                  from './app.route';

import {
  AppComponent,
  APP_COMPONENTS,
}                                   from './components';

import { AuthGuard }                from './guards';
import { HtmlService }              from './services/html.service';
import { AuthService }              from './services/auth.service';
import { getHttpAuth }              from './interceptors';

const interceptor = {
  provide: Http,
  useFactory: getHttpAuth,
  deps: [
    XHRBackend,
    RequestOptions,
    AuthService,
  ],
};

@NgModule({
  declarations: [
    APP_COMPONENTS,
  ],
  bootstrap : [ AppComponent ],
  providers : [
    HtmlService,
    AuthGuard,
    AuthService,
    interceptor,
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
