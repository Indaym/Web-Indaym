import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {

  transform(dic: object): string[] {
    console.log('pipe');
    return Object.keys(dic);
  }
}
