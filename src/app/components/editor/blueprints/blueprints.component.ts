import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';
import { GameControllerService }  from '../../../../services';
import { ObjectService } from "../../../../services/object.service";

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../../../rules/';

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
  private itemName;

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

    // display name:
    this.itemName = this.objInfo.name;

    console.log(this.objInfo);
    //console.log(id);
    this.saveRules();
  }

  private saveRules() {
    this.objInfo.object["rules"] = [];

    // stocker html dans this.rules:
    this.rules = document.getElementById("rulesContainer").innerText;
    this.rules = this.rules.split('\n');
    // delete last elem of the list:
    this.rules.pop();

    var newRule = null;

    // for each rule in this.rules:
    for (var rule of this.rules)
    {
      // reset newRule:
      newRule = new NewRule();

      newRule.id = rule;

      // ici add les conf des rules if needed (chaque regle a des config différentes)
      if (rule === "ChangeColor")
        newRule.conf.color = "0x0000FF";
      else if (rule === "MoveDiag")
        newRule.conf.movement = 1;
      else if (rule === "MoveForward")
        newRule.conf.movement = 1;
      else // TestRuleTrue et False
        newRule.conf.movement = null;

      this.objInfo.object.rules.push(newRule);
      //console.log("rule before updating obj : " + JSON.stringify(this.objInfo.object.rules));

      // update de l'objet qui add les rules
      this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);
    }
    //this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);
  }
};

class NewRule {
    private id;
    private conf = {
      color: <string> null,
      movement: <number> null,
    };
};
