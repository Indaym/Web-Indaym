import { Component }  from '@angular/core';
import { User }  from '../user'
import { Title }  from '../title'
import { PostService }  from './post.service'
import { HtmlService }  from './../../../../services/html.service'
import { PostCreateComponent } from './post-create';
declare var jQuery:any;

@Component({
    selector: 'ia-forum-post',
    providers : [HtmlService, PostService],
    template: require('./post.component.html'),
    styles: [
        require('../forum.component.css'),
        require('./post.component.css')
    ],
})
export class PostComponent {
  hideElement:boolean = false;
  /*
  currentPost;
  constructor(public html: HtmlService, private _postService : PostService){
    this.currentPost = this._postService.getForum();
  }*/
  currentPost: Title[] = [];
  constructor(private _postService : PostService){
    this.currentPost = _postService.getAll();
  }
}
