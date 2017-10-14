import {
  Component,
  OnInit,
  OnDestroy,
}                           from '@angular/core';
import { DragulaService }   from 'ng2-dragula';
import { EventDispatcher }  from 'three';

import {
  GameControllerService,
  ObjectService,
}                           from '../../../services/';
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
export class BlueprintComponent implements OnInit, OnDestroy {
  private dispatcher: EventDispatcher;
  private gameController;

  private selectedObject;       // l'objet sélectionné
  private availableRules = [];  // les règles disponible qui ne sont pas déjà appliqué
  private staticRules = [];     // liste de toutes les règles existantes
  private appliedRules = [];    // règles appliqués à l'objet
  private selectedRule;         // règle sélectionné pour la configuration

  constructor(
    private dragulaService: DragulaService,
    private gameControllerService: GameControllerService,
    private objectService: ObjectService,
  ) {
    this.gameController = this.gameControllerService.gameController;
    this.dispatcher = new EventDispatcher();

    // Quand on clique sur l'objet il appelle la fonction ici pour le sélectionner
    this.dispatcher.addEventListener('selectObject', (e: any) => {
      this.selectObject(e.object);
    });

    // Récupère le nom de la classe pour faire une liste des règles disponibles
    this.staticRules = [ ...Object.keys(RULES_DEF) ];

    /*
     * Détecte au drop si la liste où on veut mettre la règle est :
     *   - la liste de règle déjà appliqué à l'objet
     * = ou =
     *   - la liste de règles disponible.
     * En fonction on créé ou supprime la règle
     */
    this.dragulaService.drop.subscribe((value) => {
      switch (value[2].id) {
        case 'applied-rules':
          this.addRule(value[1].innerText);
          break;
        case 'available-rules':
          this.removeRule(value[1].innerText);
          break;
        default:
          this.updateListRules();
      }
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.saveRules();
  }

  /**
   * Set l'objet sélectionné
   */
  public selectObject(value) {
    this.selectedObject = value;
    this.unselectRule();
    this.updateListRules();
  }

  /**
   * Déselectionne l'objet
   */
  public unselectObject() {
    this.selectedObject = undefined;
  }

  /**
   * Sélectionne une règle
   */
  public selectRule(value) {
    if (!this.selectedObject || !this.selectedObject.rules)
      return;
    this.selectedRule = this.selectedObject.rules[value];
  }

  /**
   * Déselectionne une règle
   */
  public unselectRule() {
    this.selectedRule = undefined;
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
    this.saveRules();
    this.updateListRules();
  }

  /**
   * Supprime une règles des instances et sauvegarde l'object en base de données
   * @param ruleName
   */
  private removeRule(ruleName) {
    if (!this.selectedObject || !this.selectedObject.rules || !this.selectedObject.rules[ruleName])
      return;
    delete this.selectedObject.rules[ruleName];
    this.saveRules();
    this.updateListRules();
  }

  /**
   * Transforme les instances des règles dans l'objet qui pourra être envoyé à la base de données
   */
  private serializeRules() {
    this.selectedObject.object.rules = [];
    for (const key in this.selectedObject.rules) {
      if (!this.selectedObject.rules[key])
        continue;
      this.selectedObject.object.rules.push({
        id: this.selectedObject.rules[key].id,
        conf: this.selectedObject.rules[key].config,
      });
    }
  }

  /**
   * Sauvegarde la configuration des règles dans la base de données
   */
  private saveRules() {
    if (!this.selectedObject || !this.selectedObject.rules)
      return;
    this.serializeRules();
    this.objectService.updateObject({ object: this.selectedObject.object }, this.selectedObject.uuid);
  }
}
