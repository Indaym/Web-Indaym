/**
 * Created by djavrell on 16/08/16.
 */

import {
  RouterModule
} from '@angular/router';

import { TranslateModule } from 'ng2-translate/ng2-translate';

const TRANSLATE_MODULE = [
  TranslateModule.forRoot()
];


export const MODULES = [
  TRANSLATE_MODULE,
  RouterModule
];
