import { Component }      from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Rx';
import { NgForm }         from '@angular/forms';
import { GameService }    from '../../services/game.service';
import { Comment }        from '../../models/comment';

@Component({
    selector  : 'ia-rategame',
    templateUrl   : './rategame.component.html',
    styleUrls    : [
        './rategame.component.scss',
    ],
    providers : [ GameService ],
})
export class RateGameComponent {
    public evaluatedGame;
    public subscription: Subscription;
    public ratings = Number();
    public parsedComments = [];
    public newComment = new Comment('', 0);

    constructor(private games: GameService, private route: ActivatedRoute) {
        this.subscription = route.queryParams.subscribe(
            (queryParam: any) => this.initGame(queryParam),
        );
    }

    public initComments(queryParam) {
        console.log('initComments');
    }

    public initGame(queryParam) {
        this.games.getOneGame(queryParam['gameId'], (data) => {
            this.evaluatedGame = data;
            if (this.evaluatedGame.comments !== null && this.evaluatedGame.comments !== '') {
                this.parsedComments = this.evaluatedGame.comments.slice(1, -1)
                    .replace(new RegExp('"', 'g'), ' ').replace(new RegExp('message : ', 'g'), '')
                    .replace(new RegExp(' , rating :', 'g'), ' Note : ').split('}{');

                for (let i = 0, len = this.parsedComments.length; i < len; i++) {
                    console.log(this.parsedComments[i][this.parsedComments[i].length - 1]);
                    this.ratings = this.ratings + parseFloat(this.parsedComments[i][this.parsedComments[i].length - 1]);

                }
                console.log('ratings');
                console.log(this.ratings);
                console.log('Comments != null');
                console.log(this.evaluatedGame);
                console.log(this.parsedComments.length);
                console.log(this.ratings / this.parsedComments.length);
                console.log('endInitgameCallback');
            }
        });
        console.log('initgame');
        this.initComments(queryParam);
    }

  public postComments(queryParam) {
      console.log('postComments');
      // sends Comment ( message + ratings ) to db
      this.newComment = new Comment(this.newComment.message, this.newComment.rating);
      console.log(this.newComment);
      const jsonComment = JSON.stringify(this.newComment);
      console.log(jsonComment);
      this.games.postComment(this.evaluatedGame.comments + jsonComment, this.evaluatedGame.uuid,
          (data) => {
              console.log('success postComment');
          }, (data) => {
              console.log('error postComment');
          });
      this.updateGame(queryParam);
  }

    public updateGame(queryParam) {
        console.log('updateGame');
        this.updateRatings(queryParam);
        // location.reload();
        // calls update rating and refresh page
    }

    public updateRatings(queryParam) {
        console.log('updateRatings');
        console.log(this.ratings + this.newComment.rating);
        this.games.updateRating((this.ratings + this.newComment.rating) / (this.parsedComments.length + 1) , this.evaluatedGame.uuid,
            (data) => {
                console.log('updateRatingSuccess');
            },
            (data) => {
                console.log('updateRatingError');
                location.reload();
            });
        // update average ratings
    }
}
