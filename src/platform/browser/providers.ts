/*
 * These are globally available services in any component or any other service
 */

// Angular 2 core
import {
		provide
}                             from '@angular/core';

// Angular 2 common
import {
		FORM_PROVIDERS,
		HashLocationStrategy,
		LocationStrategy
}                              from '@angular/common';

// Angular 2 Http
import {
		HTTP_PROVIDERS,
		Http
}                              from '@angular/http';

// Angular 2 Router
import {
		ROUTER_PROVIDERS
}                             from '@angular/router-deprecated';

// ng2-translate
import {
		TranslateService,
		TranslateLoader,
		TranslateStaticLoader
}                              from 'ng2-translate/ng2-translate';

// Other
import { Md5 } from 'ts-md5/dist/md5';

const OTHER = [
	Md5
];

export const NG_TRANSLATE_PROVIDER = [
	TranslateService,
	provide(TranslateLoader, {
		useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
		deps      : [Http]
	})
];

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
	...FORM_PROVIDERS,
	...HTTP_PROVIDERS,
	...ROUTER_PROVIDERS,
	...NG_TRANSLATE_PROVIDER,
	{provide: LocationStrategy, useClass: HashLocationStrategy}
];

export const PROVIDERS = [
	...APPLICATION_PROVIDERS,
	...OTHER
];
