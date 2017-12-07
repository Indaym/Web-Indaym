import {
  Pipe,
  PipeTransform,
}                     from '@angular/core';

import { OrderType }  from './order-type.enum';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(items: any, orderVar: any, orderType: OrderType): any {
    items = [...items];

    const sortCallback = (a, b) => {
      const A = a[orderVar].toUpperCase();
      const B = b[orderVar].toUpperCase();
      return (A < B) ? -1 : (A > B) ? 1 : 0;
    };

    if (orderType === OrderType.ASC)
      return items.sort(sortCallback);
    if (orderType === OrderType.DESC)
      return items.sort((a, b) => sortCallback(b, a));
    return items;
  }

}
