import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';
import { GameControllerService }  from '../../../../services';
import { ObjectService } from "../../../../services/object.service";

@Component({
  selector  : 'ia-blueprints',
  template  : require('./blueprints.component.html'),
  styles    : [
    require('./blueprints.component.css')
  ],
  providers : []
})
export class BlueprintsComponent {
  private dispatcher: EventDispatcher;
  public  selectRules = (id) => {this.affRules(id)};
  private gameController;
  private objs;
  private objInfo;
  private rules;

  constructor(private gameControllerService:GameControllerService, private objectService:ObjectService) {
    this.dispatcher = new EventDispatcher();
    this.gameController = this.gameControllerService.gameController;
    this.objs = this.gameController.getObjects();
  }

  private affRules(id) {
    this.objInfo = this.objs.find((lm, index, array) => {
      if (lm.uuid == id)
        return true;
      else
        return false;
    });
    console.log("affRules");
    console.log(this.objInfo);
    console.log(id);
    this.saveRules();
  }

  private saveRules() {
    this.objInfo.object["rules"] = [];

    this.rules = document.getElementById("rulesContainer");
    console.log(this.rules);

    this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);
    console.log("update done");
  }
}