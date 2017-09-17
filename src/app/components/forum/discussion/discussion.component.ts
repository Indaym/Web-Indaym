import { Component }  from '@angular/core';

@Component({
  selector  : 'ia-forum-discussion',
  template  : require('./discussion.component.html'),
  styles    : [
    require('./discussion.component.css'),
    require('../forum.component.css')
  ],
    providers : []
})
export class DiscussionComponent {
}
