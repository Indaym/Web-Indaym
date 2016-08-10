/**
 * Created by djavrell on 10/08/16.
 */

import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import {
		APP_DIRECTIVE,
		AppComponent
}    from './index';

/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import {
		PROVIDERS,
		PIPES,
		DIRECTIVES
}                           from '../platform/browser';
import {
		ENV_PROVIDERS
}                           from '../platform/environment';

@NgModule({
	bootstrap   : [AppComponent],
	imports     : [BrowserModule],
	declarations: [
		APP_DIRECTIVE,
		DIRECTIVES,
		PIPES
	],
	providers   : [
		...PROVIDERS,
		...ENV_PROVIDERS
	]
})
export class AppModule {
}
