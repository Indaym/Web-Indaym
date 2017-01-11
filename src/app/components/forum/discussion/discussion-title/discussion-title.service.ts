import { User }  from '../../user'
import { Title }  from '../../title'

export class DiscussionTitleService {
  getAll(): Title[] {
      return [
          {
          title: "Lorem Ipsum",
          categorie: { categorieName: "Avis", categorieSymbol: "fa fa-exclamation" },
          time: "42 minutes",
          comment: { commentNb: 50, commentLink: "#" },
          like: { likeNb: 10, likeLink: "#" },
          game: { gameName: "Tic-Tac-Toe", gameLink: "#" },
          currentUser: { name: { nameName: "Tokiro", nameLink: "#" }, avatar: 'https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80' }
      }
    ]
  }
}
