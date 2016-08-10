/*
 *
 */

import { AppComponent }   from './AppComponent';
import { FORUM_DIRECTIVES } from './forum';

export { AppComponent }   from './AppComponent';
export { AppModule }      from './AppModule.module';

export const APP_DIRECTIVE = [
	AppComponent,
	FORUM_DIRECTIVES
];
