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
    .on('drag', function (el) {
      el.className = el.className.replace('ex-moved', '');
      console.log("draggin");
    })
    .on('drop', function (el, target, source) {
        var newRule;
        var deleteRule = false;
        el.className += ' ex-moved';

        console.log("droppin");

        if (target.id === "rulesContainerSource" && source.id === "rulesContainer")
        {
          deleteRule = true;
          console.log("drag&drop droite vers gauche");
          console.log("deleteRule: " + deleteRule);
            // enlever doublons
            var arr = document.getElementById("rulesContainerSource").innerText.split('\n');
            var cnt = 0;
            var newArr = [];
            for (var line of arr)
            {
              if (line == el.id)
              {
                if (cnt === 0)
                {
                  newArr.push("<div id=\"" + line + "\">" + line + "</div>");
                }
                cnt += 1;
              }
              else
              {
                newArr.push("<div id=\"" + line + "\">" + line + "</div>");
              }
            }
            document.getElementById("rulesContainerSource").innerHTML = newArr.join('\n');

            // patcher bug du save rule quand la regle a ete enlevee
            for (var i = 0; i < rulesList.length; i++)
            {
              if (rulesList[i].id == el.id)
              {
                rulesList.splice(i, 1);
                break;
              }
            }


          el = "<div>" + el.innerText + "</div>";
          if (document.getElementById("rulesContainer").childElementCount === 0)
          {
            document.getElementById("right").innerHTML = "";
          }
        }
        else if (target.id === "rulesContainer" && source.id === "rulesContainerSource")
        {
          console.log("drag&drop gauche vers droite");

          var myBool = false;
          var myArr = document.getElementById("rulesContainerSource").innerText.split('\n');
          for (var myI of myArr)
          {
            if (myI == el.innerText)
            {
              myBool = true;
            }
          }


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


            // remettre rule a gauche
            if (myBool == false)
              document.getElementById("rulesContainerSource").innerHTML += "<div id=\"" + el.id + "\">" + el.id + "</div>";


            // enlever doublons
            var arr = document.getElementById("rulesContainer").innerText.split('\n');
            var cnt = 0;
            var newArr = [];
            for (var line of arr)
            {
              if (line == el.id)
              {
                if (cnt === 0)
                {
                  newArr.push("<div id=\"" + line + "\">" + line + "</div>");
                }
                cnt += 1;
              }
              else
              {
                newArr.push("<div id=\"" + line + "\">" + line + "</div>");
              }
            }
            document.getElementById("rulesContainer").innerHTML = newArr.join('\n');
          // } ?





          // user can choose a color and a movement number:
          // associate ngModel to both values. Set to attributes of object currently selected. Simply change currently selected object when a drop happens.
          // Win. (Maybe have to copy values.)
        }

        if (deleteRule == true)
        {
          console.log("is tru!!");
          for (var i = 0; i < rulesList.length; i++)
          {
            console.log("i: " + i);
            console.log(rulesList[i]);
            if (rulesList[i].id == el.id)
            {

              rulesList.splice(i, 1);
              //console.log("yoloswagXXlol");
            }
          }
        }
        else if (cnt <= 1)
        {
          console.log("is fal!!");
          var cnt = 0;
          for (var rule of rulesList)
          {
            if (newRule.id == rule.id)
            {
              cnt += 1;
            }
          }
          if (cnt == 0)
          {
            rulesList.push(newRule);
            currRule = newRule;
          }
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

        if (this.objInfo.rules == undefined)
        {
          this.objInfo.rules = [];
        }

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

console.log(rulesList);
    for (let r of rulesList) {
      console.log("regles d'avant (qui doivent partir) + actuelles: ");
      //console.log(r);
      //console.log(rulesList);

      if (true) // if rule n'y est pas
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
