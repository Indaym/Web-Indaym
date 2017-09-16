import { Component }        from '@angular/core';
import { EventDispatcher }  from 'three';
import { dragula }          from 'ng2-dragula/ng2-dragula';

import {
  GameControllerService,
  ObjectService,
}                           from '../../../../services';
import { RULES_DEF }        from '../../../rules/';

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
  //private newRules;
  private color;
  private movement;

  constructor(private gameControllerService:GameControllerService, private objectService:ObjectService) {
    this.dispatcher = new EventDispatcher();
    this.gameController = this.gameControllerService.gameController;
    this.objs = this.gameController.getObjects();
  }


  private affRules(id) {


 /*
for ()
{
    var newRule = new NewRule();

    rulesList.push(newRule);
  }
 */


    this.objInfo = this.objs.find((lm, index, array) => {
      if (lm.uuid == id)
        return true;
      else
        return false;
    });

    // display object name:
    this.itemName = this.objInfo.name;


    dragula([document.getElementById("rulesContainerSource"), document.getElementById("rulesContainer")])
      .on('drop', function (el, target, source) {
        var newRule;
        el.className += ' ex-moved';
        if (target.id === "rulesContainerSource" && source.id === "rulesContainer")
        {
          console.log("drag&drop droite vers gauche");
          el = "<div>" + el.innerText + "</div>";
          if (document.getElementById("rulesContainer").childElementCount === 0)
          {
            document.getElementById("right").innerHTML = "";
          }
        }
        else if (target.id === "rulesContainer" && source.id === "rulesContainerSource")
        {
          console.log("drag&drop gauche vers droite");
          newRule = new NewRule();
          newRule.id = el.innerText;
          newRule.conf.color = color;
          newRule.conf.movement = movement;
          if (!document.getElementById("color"))
            document.getElementById("right").innerHTML = "<div>Color: <input type=\"color\" id=\"color\"  name=\"color\"><br>Movement: <input id=\"movement\" type=\"number\" name=\"movement\" value=1><br></div>";
          if (rulesList.length !== 0)
          {
            currRule.conf.color = (<HTMLInputElement>document.getElementById("color")).value;
            currRule.conf.color = currRule.conf.color.replace("#", "0x");
            if (parseInt((<HTMLInputElement>document.getElementById("movement")).value) === null)
              currRule.conf.movement = 1;
            else
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
    /* if (this.objInfo.object.rules === undefined) */
      this.objInfo.object["rules"] = [];

    if (currRule && document.getElementById("color")) {
        currRule.conf.color = String((<HTMLInputElement>document.getElementById("color")).value);
        currRule.conf.color = currRule.conf.color.replace("#", "0x");
        currRule.conf.movement = parseInt((<HTMLInputElement>document.getElementById("movement")).value);
    }

    // for each rule in this.rules:
    for (var rule of rulesList)
    {
      this.objInfo.object.rules.push(rule);
      //console.log("rule before updating obj : " + JSON.stringify(this.objInfo.object.rules));

      // update de l'objet qui add les rules
      this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);

      let index = this.objs.findIndex((element) => element.uuid === this.objInfo.uuid);
      this.objs.splice(index, 1, this.objInfo);

      const ruleDef = RULES_DEF[rule.id];
      if (ruleDef !== undefined) {
        const ruleInstance = new ruleDef(null, this.objInfo, rule.conf);
        this.objInfo.rules[ruleInstance.id] = ruleInstance;
      }

      this.reloadRules(this.objInfo.uuid);
    }

    rulesList = [];
    //this.objectService.updateObject({object:this.objInfo.object}, this.objInfo.uuid);
  }

  private reloadRules(objId){
    document.getElementById("rulesContainer").innerText = "";
    if (this.objs === undefined)
      return;
    console.log(this.objs);
    let obj = this.objs.find(element => element.uuid === objId);
    if (obj === undefined || obj.rules === undefined)
      return;
    let rules = Object.values(obj.rules);

    document.getElementById("previousContainer").innerHTML = "<div>Rules currently applied to this item: </div><div id=\"previousRules\"></div>";

    for (let r of rules) {
      console.log("regles d'avant (qui doivent partir) + actuelles: ");
      console.log(r);
      if (true) // TODO Caro : recup objet depuis la db et voir ses vraies regles actuelles
      {
        document.getElementById("previousContainer").innerHTML += "<div> " + r.id + "</div>";
      }
    }
  }
}

class NewRule {
    public id;
    public conf = {
      color: <string> null,
      movement: <number> null,
    };
}
