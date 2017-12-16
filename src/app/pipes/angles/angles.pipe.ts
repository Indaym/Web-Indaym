import {
  Pipe,
  PipeTransform,
}               from '@angular/core';
import { Math } from 'three';

@Pipe({
  name: 'angles',
})
export class AnglesPipe implements PipeTransform {

  transform(value: any, angle: any): any {
    return (angle === 'deg') ? value * Math.RAD2DEG : value;
  }

}
