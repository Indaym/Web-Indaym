import { Component }  from '@angular/core';
import { User }  from '../user'
import { Title }  from '../title'
import { PostService }  from './post.service'

@Component({
    selector: 'ia-forum-post',
    template: require('./post.component.html'),
    styles: [
        require('../forum.component.css')
    ],
    providers: [PostService]
})
export class PostComponent {
  currentPost: Title[] = [];
  constructor(private _postService : PostService){
    this.currentPost = _postService.getAll();
  }
}
