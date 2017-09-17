import { Component } from '@angular/core';
import { User }  from '../../user'
import { Title }  from '../../title'
import { DiscussionTitleService }  from './discussion-title.service'

@Component({
  selector  : 'ia-forum-discussion-title',
  template  : require('./discussion-title.component.html'),
  styles    : [
    require('../../forum.component.css'),
    require('../discussion.component.css')
  ],
  providers: [DiscussionTitleService]
})

export class DiscussionTitleComponent {
  currentPost: Title[] = [];
  constructor(private _postService : DiscussionTitleService){
    this.currentPost = _postService.getAll();
  }
}
