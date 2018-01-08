import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  UserService,
} from '../../../services';

@Component({
  selector: 'ia-game-card',
  templateUrl: './gameCard.component.html',
  styleUrls: [ './gameCard.component.scss' ],
})
export class GameCardComponent {

  constructor(private userService: UserService) {}

  @Input() game: any;

  @Input() edit = false;
  @Input() delete = false;
  @Input() remove = false;
  @Input() add = false;
  @Input() like = false;
  @Input() publish = false;

  @Output() deleteGame = new EventEmitter();
  @Output() removeGame = new EventEmitter();
  @Output() editGame = new EventEmitter();
  @Output() addGame = new EventEmitter();
  @Output() toggleLikeGame = new EventEmitter();
  @Output() togglePublishGame = new EventEmitter();
  @Output() shouldRedirect = new EventEmitter();

  onDel() {
    this.deleteGame.emit(this.game.uuid);
  }

  onRemove() {
    this.removeGame.emit(this.game.uuid);
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
    this.shouldRedirect.emit(this.game.uuid);
  }

  isOwner() {
    return this.game.owner === this.userService.user.uuid;
  }

  isPublished(): string {
    return this.game.published ? 'Unpublish' : 'Publish';
  }
}
