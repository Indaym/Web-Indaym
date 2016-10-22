import { Component }    from '@angular/core';

@Component({
  selector: 'forum-discussion',
  template: require('./discussion.component.html'),
  styles    : [
    require('./discussion.component.css'),
    require('../forum.component.css')
  ]
})

export class DiscussionComponent {
}
