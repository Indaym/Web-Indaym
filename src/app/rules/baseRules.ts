// 
// created by djavrell on Fri Jun 02 2017 
// 
 
import { EventDispatcher } from 'three'; 
 
export const enum RULE_TYPE { 
  "mouvement", 
  "update", 
  "default" 
} 
 
export abstract class BaseRules { 
  protected _id: string; 
  protected _ruleType: RULE_TYPE = RULE_TYPE.default; 
  protected _description: string;
  // TODO: ajouter une ref sur la scène et l'obj
 
  /**
   * RFELXION
   *  - clic + dnd sur un obj => run les règles de ce type lié à l'obj
   *  - send un event avec ca pose pour executer d'autres règles
   * 
   */

  abstract run(): boolean; 
 
  get id(): string { 
    return this._id; 
  } 
 
  get ruleType(): RULE_TYPE { 
    return this._ruleType 
  } 
 
  set description(text: string) { 
    this._description = text; 
  } 
 
  get description(): string { 
    return this._description 
  } 
}
