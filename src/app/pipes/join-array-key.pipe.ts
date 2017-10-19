import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArrayKey',
})
export class JoinArrayKeyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.map((obj) => obj.name).join(', ');
  }

}
