import { Component }    from '@angular/core';

@Component({
  selector: 'forum-bloc-lfg',
  template: `
  <div class="discussion-item">
    <div class="discussion-avatar">
      <img src="https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80">
    </div>
    <div class="discussion-title-all">
      <span class="discussion-title-tag"><i class="fa fa-lightbulb-o"></i></span>
      <a href="#">
        <span class="discussion-title">lorem ipsum (idées)</span>
      </a>
    </div>
    <p class="discussion-tags">
      <span class="discussion-author">
        <span class="discussion-user-logo"><i class="fa fa-user"></i></span>
      <a href="#" title>Tokiro</a>
      </span>
      <span class="discussion-time">
        <span class="discussion-time-logo"><i class="fa fa-clock-o"></i></span>
      <a href="#" title>Il y a 42 minutes</a>
      </span>
      <span class="discussion-com">
        <span class="discussion-com-logo"><i class="fa fa-comment-o"></i></span>
      <a href="#" title>42 commentaires</a>
      </span>
      <span class="discussion-like">
        <span class="discussion-like-logo"><i class="fa fa-heart-o"></i></span>
      <a href="#" title>48 likes</a>
      </span>
      <span class="discussion-game">
        <span class="discussion-game-logo"><i class="fa fa-puzzle-piece"></i></span>
      <a href="#" title>Tic-Tac-Toe</a>
      </span>
    </p>
    <div class="discussion-blue"></div>
  </div>
  `,
  styles    : [
    require('../forum.component.css')
  ]
})

export class BlocLfgComponent {
}
