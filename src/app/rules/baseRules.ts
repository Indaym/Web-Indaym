// 
// created by djavrell on Fri Jun 02 2017 
// 

import {
  SceneViewer,
  ModelViewer,
}                           from '../threed-viewer';

export const enum RULE_TYPE {
  'mouvement',
  'update',
  'default',
}

export abstract class BaseRules {
  protected _id: string;
  protected _ruleType: RULE_TYPE = RULE_TYPE.default;
  protected _description: string;
  protected _name: string = 'rule';
  protected _configuration: any;
  protected _refScene: SceneViewer;
  protected _refObj: ModelViewer;

  /**
   * RFELXION
   *  - clic + dnd sur un obj => run les règles de ce type lié à l'obj
   *  - send un event avec ca pose pour executer d'autres règles
   *
   */

  constructor(scene: SceneViewer, obj: ModelViewer, conf: any = {}) {
    this._refScene = scene;
    this._refObj = obj;
    this._configuration = conf;
  }

  public run(): boolean {
    return true;
  }

  get id(): string {
    return this._id;
  }

  get ruleType(): RULE_TYPE {
    return this._ruleType;
  }

  get name(): string {
    return this._name;
  }

  set description(text: string) {
    this._description = text;
  }

  get description(): string {
    return this._description;
  }
}
