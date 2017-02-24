import { Injectable } from '@angular/core';
import { User }  from '../user'
import { Title }  from '../title'
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
/* Remember
Avis : fa fa-exclamation
Discussion : fa fa-comment
Help : fa fa-users
Idea : fa fa-lightbulb-o
Lfg : fa fa-address-card-o
*/

@Injectable()
export class PostService {
    private forumUrl = 'http://localhost:3000/forum';
    private forum = [];

    constructor(private http: Http) { }

/*
    getForum() {
      console.log("Loading Forum");

      this.http.get(this.forumUrl)
          .flatMap((res) => res.json())
          .subscribe(data => {this.forum.push(data);});
      return this.forum;
    }
*/

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
            },
            {
                title: "Ceci est un autre titre",
                categorie: { categorieName: "Help", categorieSymbol: "fa fa-users" },
                time: "10 minutes",
                comment: { commentNb: 21, commentLink: "#" },
                like: { likeNb: 4, likeLink: "#" },
                game: { gameName: "Tic-Tac-Toe", gameLink: "#" },
                currentUser: { name: { nameName: "Tokiro", nameLink: "#" }, avatar: 'https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80' }
            },
            {
                title: "Another one",
                categorie: { categorieName: "Idea", categorieSymbol: "fa fa-lightbulb-o" },
                time: "5 mois",
                comment: { commentNb: 200000, commentLink: "#" },
                like: { likeNb: 4128, likeLink: "#" },
                game: { gameName: "Tic-Tac-Toe", gameLink: "#" },
                currentUser: { name: { nameName: "Tokiro", nameLink: "#" }, avatar: 'https://s.gravatar.com/avatar/909ecf5782b2ea2ee8888221dd8beba8?s=80' }
            }
        ]
    }; 
}
