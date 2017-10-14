import {
  Component,
  OnInit,
}                           from '@angular/core';
import { EventDispatcher }  from 'three';

import {
  GameControllerService,
}                           from '../../../services/gameController.service';
import {
  RULES_DEF,
}                           from '../../../rules/';

@Component({
  selector: 'ia-blueprint',
  templateUrl: './blueprint.component.html',
  styleUrls: [
    './blueprint.component.css',
  ],
})
export class BlueprintComponent implements OnInit {
  private dispatcher: EventDispatcher;
  private gameController;

  private selectedObject;       // l'objet sélectionné
  private availableRules = [];  // les règles disponible qui ne sont pas déjà appliqué
  private staticRules = [];     // liste de toutes les règles existantes
  private appliedRules = [];    //  règles appliqués à l'objet

  constructor(private gameControllerService: GameControllerService) {
    this.gameController = this.gameControllerService.gameController;
    this.dispatcher = new EventDispatcher();

    // Quand on clique sur l'objet il appelle la fonction ici pour le sélectionner
    this.dispatcher.addEventListener('selectObject', (e: any) => {
      this.selectObject(e.object);
    });

    // Récupère le nom de la classe pour faire une liste des règles disponibles
    this.staticRules = [ ...Object.keys(RULES_DEF) ];
  }

  public ngOnInit() {

  }

  /**
   * Set l'objet sélectionné
   */
  public selectObject(value) {
    this.selectedObject = value;
    this.updateListRules();
  }

  /**
   * Déselectionne l'objet
   */
  public unselectObject() {
    this.selectedObject = undefined;
  }

  /**
   * Update la liste des règles qui restent à appliquer
   */
  private updateListRules() {
    this.appliedRules = (this.selectedObject && this.selectedObject.rules) ? Object.keys(this.selectedObject.rules) : [];

    // Donne les règles restante non assigné à un objet
    this.availableRules = [...this.staticRules].filter((value) => {
      if (!this.selectedObject || !this.selectedObject.rules)
        return true;
      return !this.selectedObject.rules[value];
    });
  }

  private addRule(ruleName) {
    if (!RULES_DEF[ruleName] || !this.selectedObject)
      return;

    const conf = {
      color: '0xffffff',
      movement: 1,
    };
    const rule = new RULES_DEF[ruleName](null, this.selectedObject, conf);

    if (!this.selectedObject.rules)
      this.selectedObject.rules = { [ruleName]: rule };
    else
      this.selectedObject.rules[ruleName] = rule;
    this.updateListRules();
  }

  private removeRule(ruleName) {
    if (!this.selectedObject || !this.selectedObject.rules || !this.selectedObject.rules[ruleName])
      return;

    delete this.selectedObject.rules[ruleName];
    this.updateListRules();
  }
}
