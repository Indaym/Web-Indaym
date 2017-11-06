import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(items: any, filter: any): any {
    if (!filter)
      return items;
    const keys = Object.keys(filter);
    return items.filter((item) => {
      const bol = keys.every((key) => item.hasOwnProperty(key) && item[key] === filter[key]);
      return bol;
    });
  }

}
