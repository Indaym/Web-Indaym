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
  public ratings: number;
  public tmpNum: number = 0;
  public parseComment;
  public globalRating: number;
  model = new Comment(42, '', 0);


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
      this.ratings = this.parseComment.length - 1;

      for (var comm of this.parseComment)
      {
        if (comm == this.parseComment[0]) continue;
        this.tmpNum += Number.parseInt(comm.match(/\d+/)[0].toString());
      }
      this.globalRating = this.tmpNum / this.ratings;
    });
  }

  public postComments(queryParam) {
    this.model = new Comment(this.gameId, this.model.message, this.model.rating);
    var comments = JSON.parse(this.item.comments);

    comments = "//" + this.model.message + " Note : " + this.model.rating + comments;
    this.games.postComment(comments, this.gameId,
      (data) => {
      this.item = data;
      this.parseComment = this.item.comments.split("//");
      this.ratings = this.parseComment.length - 1;
      for (var comm of this.parseComment)
      {
        if (comm == this.parseComment[0]) continue;
        this.tmpNum += Number.parseInt(comm.match(/\d+/)[0].toString());
      }
      this.globalRating = this.tmpNum / this.ratings;

      });
    window.location.reload();
  }

}