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
	Http
}                              from '@angular/http';

// Angular 2 Router
//import {
//		ROUTER_PROVIDERS
//}                             from '@angular/router';

// Other
import { Md5 } from 'ts-md5/dist/md5';

const OTHER = [
	//Md5
];


/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
const APPLICATION_PROVIDERS = [
];

export const PROVIDERS = [
	...APPLICATION_PROVIDERS,
	OTHER
];
