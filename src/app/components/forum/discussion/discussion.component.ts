import { Component }  from '@angular/core';
import { DiscussionTitleComponent }  from './discussion-title/index';
import { DiscussionMessageComponent }  from './discussion-message';
import { DiscussionReponseOneComponent } from './discussion-reponse-one';

@Component({
  selector  : 'ia-forum-discussion',
  template  : require('./discussion.component.html'),
  styles    : [
    require('./discussion.component.css'),
    require('../forum.component.css')
  ]
})

export class DiscussionComponent {
}

export const DISCUSSION_COMPONENTS  = [
  DiscussionTitleComponent,
  DiscussionMessageComponent,
  DiscussionReponseOneComponent
]
