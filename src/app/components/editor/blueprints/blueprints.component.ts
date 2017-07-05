import { Component }              from '@angular/core';
import { EventDispatcher }        from 'three';
import { GameControllerService }  from '../../../../services';
import { ObjectService } from "../../../../services/object.service";

import { dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../../../rules/';

var rulesList = [];
var currRule = null;
var color = "0x0000FF";
var movement = 1;

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
  private newRules;
  private color;
  private movement;

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

    dragula([document.getElementById("rulesContainerSource"), document.getElementById("rulesContainer")])
      .on('drop', function (el, target, source) {
        var newRule;
        el.className += ' ex-moved';
        if (target.id === "rulesContainerSource" && source.id === "rulesContainer")
        {
          el = "<div>" + el.innerText + "</div>";
          if (document.getElementById("rulesContainer").childElementCount === 0)
          {
            document.getElementById("right").innerHTML = "";
          }
        }
        else if (target.id === "rulesContainer" && source.id === "rulesContainerSource")
        {
          newRule = new NewRule();
          newRule.id = el.innerText;
          newRule.conf.color = color;
          newRule.conf.movement = movement;
          if (!document.getElementById("color"))
            document.getElementById("right").innerHTML = "<div>Color: <input type=\"color\" id=\"color\"  name=\"color\"><br>Movement: <input id=\"movement\" type=\"number\" name=\"movement\"><br></div>";
          if (rulesList.length !== 0)
          {
            currRule.conf.color = (<HTMLInputElement>document.getElementById("color")).value;
            currRule.conf.color = currRule.conf.color.replace("#", "0x");
            currRule.conf.movement = parseInt((<HTMLInputElement>document.getElementById("movement")).value);
          }
          rulesList.push(newRule);
          currRule = newRule;

          // user can choose a color and a movement number:
          // associate ngModel to both values. Set to attributes of object currently selected. Simply change currently selected object when a drop happens.
          // Win. (Maybe have to copy values.)
        }
      });

    //console.log(this.objInfo);
    //console.log(id);
  //  this.saveRules();
  }

  private saveRules() {
    this.objInfo.object["rules"] = [];

    if (currRule && document.getElementById("color")) {
        currRule.conf.color = String((<HTMLInputElement>document.getElementById("color")).value);
        currRule.conf.color = currRule.conf.color.replace("#", "0x");
        currRule.conf.movement = parseInt((<HTMLInputElement>document.getElementById("movement")).value);
    }

    // stocker html dans this.rules:
    /*
    this.rules = document.getElementById("rulesContainer").innerText;
    this.rules = this.rules.split('\n');
    // delete last elem of the list:
    this.rules.pop();

    var newRule = null;
    */
    // for each rule in this.rules:
    for (var rule of rulesList)
    {
      // reset newRule:
      /*
      newRule = new NewRule();

      newRule.id = rule;

      // ici add les conf des rules if needed (chaque regle a des config différentes)
      if (rule === "ChangeColor")
      {
        newRule.conf.color = "0x0000FF";
      }
      else if (rule === "MoveDiag")
        newRule.conf.movement = 1;
      else if (rule === "MoveForward")
        newRule.conf.movement = 1;
      else // TestRuleTrue et False
        newRule.conf.movement = null;
*/
      this.objInfo.object.rules.push(rule);
      //console.log("rule before updating obj : " + JSON.stringify(this.objInfo.object.rules));

      // update de l'objet qui add les rules
      this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);
    }
    rulesList = [];
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
