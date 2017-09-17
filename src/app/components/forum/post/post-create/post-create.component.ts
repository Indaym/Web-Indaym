import { Component }  from '@angular/core';

@Component({
  selector  : 'ia-post-create',
  template  : require('./post-create.component.html'),
  styles    : [
    require('../../forum.component.css'),
    require('../post.component.css')
  ]
})
export class PostCreateComponent {
}
