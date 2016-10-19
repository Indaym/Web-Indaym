import { Component }    from '@angular/core';
import { Tab }          from './side-bar/tab.component.ts';

@Component({
  selector  : 'designer-component',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css')
  ],
  providers : []
})
export class DesignerComponent {
}
