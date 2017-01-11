import { Component }  from '@angular/core';
import { User }  from '../user'
import { Post }  from './post'
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
  currentPost: Post[] = [];
  constructor(private _peopleService : PostService){
    this.currentPost = _peopleService.getAll();
  }
}
