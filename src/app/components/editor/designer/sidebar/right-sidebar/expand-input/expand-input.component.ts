import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector  : 'ia-expand-input',
  templateUrl   : './expand-input.component.html',
  styleUrls    : [
    './expand-input.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExpandInputComponent {
  public checked = false;
  @Input() type;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor() {
  }
}
