import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import { OrderType } from './order-type.enum';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(items: any, orderVar: any, orderType: OrderType): any {
    items = [...items];
    if (orderType === OrderType.ASC) {
      return items.sort((a, b) => {
        const A = a[orderVar].toUpperCase(); // ignore upper and lowercase
        const B = b[orderVar].toUpperCase(); // ignore upper and lowercase
        return (A < B) ? -1 : (A > B) ? 1 : 0;
      });
    }
    if (orderType === OrderType.DESC) {
      return items.sort((a, b) => {
        const A = a[orderVar].toUpperCase(); // ignore upper and lowercase
        const B = b[orderVar].toUpperCase(); // ignore upper and lowercase
        return (A > B) ? -1 : (A < B) ? 1 : 0;
      });
    }
    return items;
  }

}
