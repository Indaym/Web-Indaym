import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {

  transform(dic: object): string[] {
    return Object.keys(dic);
  }
}
