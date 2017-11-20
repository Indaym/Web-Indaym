import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'toHexView',
})
export class ToHexViewPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace('0x', '#');
  }
}
