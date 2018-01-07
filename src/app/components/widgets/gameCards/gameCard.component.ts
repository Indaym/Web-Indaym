import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ia-game-card',
  templateUrl: './gameCard.component.html',
  styleUrls: [ './gameCard.component.scss' ],
})
export class GameCardComponent {
  @Input() game: any;

  @Input() edit = false;
  @Input() delete = false;
  @Input() add = false;
  @Input() like = false;
  @Input() publish = false;

  @Output() deleteGame = new EventEmitter();
  @Output() editGame = new EventEmitter();
  @Output() addGame = new EventEmitter();
  @Output() toggleLikeGame = new EventEmitter();
  @Output() togglePublishGame = new EventEmitter();
  @Output() shouldRedirect = new EventEmitter();

  onDel() {
    console.log('event');
    this.deleteGame.emit(this.game.uuid);
  }

  onAdd() {
    this.addGame.emit(this.game.uuid);
  }

  onEdit() {
    this.editGame.emit(this.game.uuid);
  }

  onLike() {
    this.toggleLikeGame.emit(this.game.uuid);
  }

  onPublish() {
    this.togglePublishGame.emit(this.game.uuid);
  }

  redirect() {
    this.shouldRedirect.emit();
  }

  isPublished(): string {
    return this.game.published ? 'Publish' : 'Unpublish';
  }
}
