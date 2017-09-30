import {
  Component,
  Inject
} from '@angular/core';

import {
  MD_SNACK_BAR_DATA
} from '@angular/material';

@Component({
  selector  : 'ia-snack-bar',
  template  : `
  <span *ngIf="data.success">
    Object <strong>{{data.name}}</strong> of type <strong>{{data.object.type}}</strong> has been deleted
  </span>
  <span *ngIf="!data.success">
    <strong class="text-danger">Error :</strong>
    Can't delete object <strong>{{data.name}}</strong> of type <strong>{{data.object.type}}</strong>
  </span>
  `,
  providers : [],
})
export class SnackBarComponent {
  constructor(@Inject(MD_SNACK_BAR_DATA) public data: any) {
  }
}
