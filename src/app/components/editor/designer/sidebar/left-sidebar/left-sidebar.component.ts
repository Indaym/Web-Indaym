/**
 * Created by nicolas on 22/10/16.
 */

import {
  Component,
  Input,
  OnDestroy
}                         from '@angular/core';
import { 
  ActivatedRoute, 
  Router 
}                         from '@angular/router';
import { Subscription }   from "rxjs/Rx";

import { HtmlService }    from "../../../../../../services/html.service";
import { ObjectService }  from "../../../../../../services/object.service";
import {GameControllerService} from "../../../../../../services/gameController.service";

@Component({
  selector  : 'ia-left-sidebar',
  providers : [HtmlService, ObjectService, GameControllerService],
  template  : require('./left-sidebar.component.html'),
  styles    : [
    require('./left-sidebar.component.css'),
    require('../sidebars.css')
  ]
})
export class LeftSidebarComponent implements OnDestroy {
  @Input() start;
  @Input() eventDispatcher;
  items = {
    boards: {
      "board3x3": "Add Board 3x3",
      "board1x9": "Add Board 1x9",
    },
    pawns: {
      "pawnWhite": "Add White Pawn",
      "pawnBlack": "Add Black Pawn",
    }
  };

  lsObjects = [];
  gameId;
  sceneId;
  subscription: Subscription;
  gameController;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(public html: HtmlService, private objects: ObjectService,
              private gameControllerService:GameControllerService,private route: ActivatedRoute, private router: Router) {
    this.gameController = this.gameControllerService.gameController;
    this.subscription = route.queryParams.subscribe(
        (queryParam: any) => this.getObjectsList(queryParam)
    );
  }

  public getObjectsList(queryParam) {
    var cow = this;
    this.gameId = queryParam['gameId'];
    this.sceneId = queryParam['sceneId'];
    this.objects.setIds(this.gameId, this.sceneId);
    this.objects.getObjects(cow, this.handleObjects);
    console.log(this.lsObjects);
  }

  public handleObjects(data, cow) {
    cow.lsObjects.push(data);
    cow.gameController.addGroupObjects(data);
  }

  private toggleMode() {
    this.start.mode = (this.start.mode == 'side') ? 'over' : 'side';
  }

  public addObject(name: string) {
    this.eventDispatcher.dispatchEvent({ type: "addObject", name: name });
  }
}
