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
}                                   from '@angular/http';
import { FileUploadModule }         from 'ng2-file-upload';
import { ModalModule }              from 'ng2-modal';
import {
  DragulaModule,
  DragulaService,
}                                   from 'ng2-dragula/ng2-dragula';

import { MaterialModule }           from '../materialModule';
import { CryptoModule }             from '../cryptoModule';

import { routing }                  from './app.route';

import {
  AppComponent,
  APP_COMPONENTS,
}                                   from './components';

import { AuthGuard }                from './guards';

import { TokenService }             from './services/tokenStore.service';
import { HtmlService }              from './services/html.service';
import { AuthService }              from './services/auth.service';
import { UserService }              from './services/user.service';
import { HttpAuthInterceptor }      from './interceptors';

@NgModule({
  declarations: [
    APP_COMPONENTS,
  ],
  bootstrap : [ AppComponent ],
  providers : [
    HtmlService,
    AuthGuard,
    AuthService,
    UserService,
    TokenService,
    { provide: Http, useClass: HttpAuthInterceptor },
  ],
  imports   : [
    MaterialModule,
    CryptoModule,
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
