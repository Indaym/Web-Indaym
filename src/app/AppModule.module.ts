/**
 * Created by djavrell on 10/08/16.
 */

import { NgModule }         from '@angular/core';

import {
		PROVIDERS,
		PIPES,
		DIRECTIVES
}                           from '../platform/browser';
import {
		ENV_PROVIDERS
}                           from '../platform/environment';

import {
		ANGULAR_2_MODULES,
		APP_DIRECTIVE,
		AppComponent
}                           from './index';

@NgModule({
	bootstrap   : [AppComponent],
	imports     : [
		ANGULAR_2_MODULES
	],
	declarations: [
		APP_DIRECTIVE,
		DIRECTIVES,
		PIPES
	],
	providers   : [
		PROVIDERS,
		ENV_PROVIDERS
	]
})
export class AppModule {
}
