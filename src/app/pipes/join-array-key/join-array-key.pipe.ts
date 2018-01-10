import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'joinArrayKey',
})
export class JoinArrayKeyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let joined = value.map((obj) => obj.name).join(', ').slice(0, 150);

    if (joined.length === 150)
      joined = joined + '...';

    return joined;
  }

}
