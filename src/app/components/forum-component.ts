import { Component }    from '@angular/core';
import { SearchComponent }     from './forum/search/search.component';

@Component({
  selector  : 'forum-component',
  template  : require('./forum/forum.html'),
  styleUrls    : ['app/styles/forum.css'],
  providers : []
})
export class ForumComponent {
}
