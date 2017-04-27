import { Injectable } from '@angular/core';
import { User }  from '../user'
import { Title }  from '../title1'
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
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

    constructor (private http: Http) {}

    addPost(title: string, description: string): Promise<Title>
    {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.forumUrl, { title, description}, options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }

    getPost(): Promise<Title[]> {
      return this.http.get(this.forumUrl)
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
    }

    deletePost(id:string): Promise<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(this.forumUrl + "/" + id, options)
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
      }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }
    /*getAll(): Title[] {
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
    };*/
}
