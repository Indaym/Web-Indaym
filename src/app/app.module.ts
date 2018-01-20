/**
 * Created by djavrell on 16/08/16.
 */

import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule,
}                                   from '@angular/forms';
import { DndModule }                from 'ng2-dnd';
import {
  HttpModule,
  Http,
  XHRBackend,
  RequestOptions,
}                                   from '@angular/http';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
}                                   from '@angular/common/http';

import { FileUploadModule }         from 'ng2-file-upload';
import {
  DragulaModule,
  DragulaService,
}                                   from 'ng2-dragula/ng2-dragula';

import { MaterialModule }           from '../materialModule';
import { CryptoModule }             from '../cryptoModule';

import { routing }                  from './app.route';

import {
  AppComponent,
  SnackBarComponent,
  GridPopupComponent,
  APP_COMPONENTS,
  WIDGETS,
}                                   from './components';
import {
  CreateGameDialogComponent,
}                                   from './components/widgets/createGameDialog/createGameDialog.component';
import {
  CreateSceneDialogComponent,
}                                   from './components/widgets/createSceneDialog/createSceneDialog.component';
import { PIPES }                    from './pipes';

import { AuthGuard }                from './guards';

import { TokenService }             from './services/tokenStore.service';
import { AuthService }              from './services/auth.service';
import { UserService }              from './services/user.service';
import {
  HttpAuthInterceptor,
  Http401Interceptor,
}                                   from './interceptors';

@NgModule({
  declarations: [
    APP_COMPONENTS,
    PIPES,
    WIDGETS,
  ],
  bootstrap : [ AppComponent ],
  entryComponents: [
    SnackBarComponent,
    CreateGameDialogComponent,
    CreateSceneDialogComponent,
    GridPopupComponent,
  ],
  providers : [
    AuthGuard,
    AuthService,
    UserService,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Http401Interceptor,  multi: true },
  ],
  imports   : [
    MaterialModule,
    CryptoModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    FileUploadModule,
    DragulaModule,
  ],
})
export class AppModule {
}
