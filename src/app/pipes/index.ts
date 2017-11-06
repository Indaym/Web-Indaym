import { KeysPipe }         from './keys/keys.pipe';
import { ToHexViewPipe }    from './to-hex-view/to-hex-view.pipe';
import { JoinArrayKeyPipe } from './join-array-key/join-array-key.pipe';
import { FilterPipe }       from './filter/filter.pipe';

export const PIPES = [
  KeysPipe,
  ToHexViewPipe,
  JoinArrayKeyPipe,
  FilterPipe,
];
