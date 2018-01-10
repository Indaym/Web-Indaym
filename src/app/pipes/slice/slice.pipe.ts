import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {

  transform(items: any, offset: any, length): any {
    if (!items)
      return items;
    return items.slice(offset * length, (offset + 1) * length);
  }
}
