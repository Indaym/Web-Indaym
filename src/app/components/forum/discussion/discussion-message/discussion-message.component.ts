import { Component }  from '@angular/core';
import { Message }  from './message'
import { DiscussionMessageService }  from './discussion-message.service'

@Component({
  selector  : 'ia-forum-discussion-message',
  template  : require('./discussion-message.component.html'),
  styles    : [
    require('../../forum.component.css'),
    require('../discussion.component.css')
  ],
  providers: [DiscussionMessageService]
})

export class DiscussionMessageComponent {
  currentMessage: Message[] = [];
  constructor(private _postService : DiscussionMessageService){
    this.currentMessage = _postService.getAll();
  }
}
