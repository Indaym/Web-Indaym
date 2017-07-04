import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Rx';
import { NgForm }         from '@angular/forms';
import { GameService }    from '../../../services/game.service';
import { Comment }        from '../../../models/comment'

@Component({
  selector  : 'ia-rategame',
  template  : require('./rategame.component.html'),
  styles    : [
    require('./rategame.component.css'),
  ],
  providers : [ GameService ],
})
export class RateGameComponent {
  public item;
  public gameId;
  public subscription: Subscription;
  public comment: string;
  public rating: number;
  public parseComment;

  model = new Comment(42, 'Your message...', 0);


  constructor(private games: GameService, private route: ActivatedRoute) {
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getGame(queryParam)
    );
  }

  public getGame(queryParam) {
    this.gameId = queryParam['gameId'];

    this.games.getOneGame(this.gameId, (data) => {
      this.item = data;
      this.parseComment = this.item.comments.split("//");
    });
  }

  public postComments(queryParam) {
    this.model = new Comment(this.gameId, this.model.message, this.model.rating);
    var comments = JSON.parse(this.item.comments);

    comments += "//" + this.model.message + " Note : " + this.model.rating 
    this.games.postComment(comments, this.gameId,
      (data) => {
      this.item = data;
      this.parseComment = this.item.comments.split("//");
      console.log(this.parseComment);
      });
  }
}