import { Component }  from '@angular/core';
import { Reponse }  from './reponse-one';
import { DiscussionReponseOneService }  from './discussion-reponse-one.service';

@Component({
  selector  : 'ia-forum-discussion-reponse-one',
  template  : require('./discussion-reponse-one.component.html'),
  styles    : [
    require('../../forum.component.css'),
    require('../discussion.component.css')
  ],
  providers: [DiscussionReponseOneService]
})

export class DiscussionReponseOneComponent {
  currentPost: Reponse[] = [];
  constructor(private _postService : DiscussionReponseOneService) {
    this.currentPost = _postService.getAll();
  }
}
