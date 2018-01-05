import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'ia-game-card',
  templateUrl: './gameCard.component.html',
  styleUrls: [ './gameCard.component.css' ],
})
export class GameCardComponent {
  @Input() game: any;

  @Input() canEdit = false;
  @Input() canDelete = false;
}
