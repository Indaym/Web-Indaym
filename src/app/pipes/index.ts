import { KeysPipe }         from './keys/keys.pipe';
import { ToHexViewPipe }    from './to-hex-view/to-hex-view.pipe';
import { JoinArrayKeyPipe } from './join-array-key/join-array-key.pipe';
import { FilterPipe }       from './filter/filter.pipe';
import { OrderByPipe }      from './order-by/order-by.pipe';
import { AnglesPipe }       from './angles/angles.pipe';

export const PIPES = [
  KeysPipe,
  ToHexViewPipe,
  JoinArrayKeyPipe,
  FilterPipe,
  OrderByPipe,
  AnglesPipe,
];
