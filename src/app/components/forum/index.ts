import { ForumComponent }         from './forum.component';
import { SEARCH_COMPONENTS }      from './search';
import { DISCUSSION_COMPONENTS }  from './discussion';
import { POST_COMPONENTS }        from './post/index';

export { DiscussionComponent }    from './discussion';
export { ForumComponent }         from './forum.component';

export const FORUM_COMPONENTS = [
  ForumComponent,
  SEARCH_COMPONENTS,
  DISCUSSION_COMPONENTS,
  POST_COMPONENTS
];
