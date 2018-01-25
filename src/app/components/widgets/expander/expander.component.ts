import {
  Component,
  ContentChild,
  TemplateRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector  : 'ia-expander',
  templateUrl   : './expander.component.html',
  styleUrls    : [
    './expander.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ExpanderComponent {
  @Input() type;
  @Input() checked = false;
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  constructor() {
  }
}
