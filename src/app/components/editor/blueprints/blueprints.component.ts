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
import { RULES_DEF }        from '../../../rules/';

@Component({
  selector: 'ia-blueprints',
  templateUrl: './blueprints.component.html',
  styleUrls: [
    './blueprints.component.css',
  ],
})
export class BlueprintsComponent implements OnInit, OnDestroy {
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

  /**
   * Créé les instances de règles
   * Utile quand on refresh la page et que l'on passe pas par le ModelLoader qui instancie les règles en temps normal
   */
  public ngOnInit() {
    const callback = () => {
      for (const obj of this.gameController.getObjects()) {
        if (!obj.object.rules)
          continue;
        obj.rules = [];
        for (const rule of obj.object.rules) {
          this.addRule(rule.id, obj, rule.conf, false, false);
        }
      }
      this.gameController.unsubscribe('addGroupObjects', callback);
    };
    this.gameController.subscribe('addGroupObjects', callback);
  }

  /**
   * Sauvegarde la règle en cours d'édition lorsque l'on quitte la page blueprints
   */
  public ngOnDestroy() {
    this.saveRules();
  }

  /**
   * Set l'objet sélectionné
   * Annexe : délectionne la règle précédemment édité et met à jour la list de règle appliqué et applicable
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
   * Met à jour la liste des règles qui restent à appliquer et celles déjà appliqué
   */
  private updateListRules() {
    // Donne les règles de l'objet sélectionné (règles déjà appliqués)
    this.appliedRules = (this.selectedObject && this.selectedObject.rules) ? Object.keys(this.selectedObject.rules) : [];

    // Donne les règles restante non assigné à un objet
    this.availableRules = this.staticRules.filter((value) => {
      if (!this.selectedObject || !this.selectedObject.rules)
        return true;
      return !this.selectedObject.rules[value];
    });
  }

  /**
   * Ajoute une règle à l'objet sélectionné
   * @param ruleName Nom de la règle
   */
  private addRule(ruleName, obj = this.selectedObject, conf?, save = true, update = true) {
    if (!ruleName || !RULES_DEF[ruleName] || !obj)
      return;

    conf = conf || {
      color: '#ffffff',
      movement: 1,
    };
    const rule = new RULES_DEF[ruleName](null, obj, conf);

    if (!obj.rules)
      obj.rules = { [ruleName]: rule };
    else
      obj.rules[ruleName] = rule;
    if (save)
      this.saveRules();
    if (update)
      this.updateListRules();
  }

  /**
   * Supprime une règles des instances et sauvegarde l'object en base de données
   * @param ruleName Nom de la règle
   */
  private removeRule(ruleName) {
    if (!this.selectedObject || !this.selectedObject.rules || !this.selectedObject.rules[ruleName])
      return;
    delete this.selectedObject.rules[ruleName];
    this.saveRules();
    this.updateListRules();
  }

  /**
   * Transforme les instances des règles dans l'objet en données qui pourrnt être envoyé à la base de données
   */
  private serializeRules() {
    this.selectedObject.object.rules = [];
    for (const key in this.selectedObject.rules) {
      if (!this.selectedObject.rules[key])
        continue;
      const obj = {
        id: this.selectedObject.rules[key].id,
        conf: this.selectedObject.rules[key].config,
      };
      this.selectedObject.object.rules.push(obj);
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

  private viewToHex(event) {
    console.log(event);
    this.selectedRule.config.color = event.replace('#', '0x');
  }
}
