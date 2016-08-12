/*
 *
 */

import { BrowserModule }    from '@angular/platform-browser';
import { HttpModule }       from '@angular/http';
import { RouterModule }     from '@angular/router';
import { FormsModule }      from '@angular/forms';

import { AppComponent }   from './AppComponent';
import { FORUM_DIRECTIVES } from './forum';

export { AppComponent }   from './AppComponent';
export { AppModule }      from './AppModule.module';

export const APP_DIRECTIVE = [
	AppComponent,
	FORUM_DIRECTIVES
];

export const ANGULAR_2_MODULES = [
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot([], {
			useHash: true
		})
];