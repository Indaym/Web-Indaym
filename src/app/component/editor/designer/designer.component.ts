import { Component }    from '@angular/core';
import { Tab }          from './sidebar/tab.component.ts';

@Component({
  selector  : 'ia-designer',
  template  : require('./designer.component.html'),
  styles    : [
    require('./designer.component.css')
  ],
  providers : []
})
export class DesignerComponent {
}
