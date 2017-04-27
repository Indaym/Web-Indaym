import { Component, OnInit }  from '@angular/core';
import { User }  from '../user'
import { Title }  from '../title1'
import { PostService }  from './post.service'
import { HtmlService }  from './../../../../services/html.service'
import { PostCreateComponent } from './post-create';
declare var jQuery: any;

@Component({
  selector: 'ia-forum-post',
  providers: [HtmlService, PostService],
  template: require('./post.component.html'),
  styles: [
    require('../forum.component.css'),
    require('./post.component.css')
  ],
})

export class PostComponent implements OnInit {
  hideElement: boolean = false;
  errorMessage: string;
  Post: Title[];
  mode = 'Observable';
  constructor(private _postService: PostService) { }

  ngOnInit() { this.getPost(); }

  getPost() {
    this._postService.getPost().then(
      Post => this.Post = Post,
      error => this.errorMessage = <any>error);
    console.log(this.Post);
  }

  addPost(title: string, description: string) {
    console.log(title);
    if (!title && !description) { return; }
    this._postService.addPost(title, description)
      .then(
      currentPost => this.Post.push(currentPost),
      error => this.errorMessage = <any>error);
  }
}
