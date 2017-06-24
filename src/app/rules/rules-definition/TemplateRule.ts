//
// created by djavrell on Sat Jun 24 2017
//

/**
 * To create a new rule, copy/past this file in this
 * folder or a sub folder
 */

/**
 * WARNING: do not delete those import
 */
import {
  BaseRules,
  SceneViewer,
  ModelViewer,
  RULE_TYPE,
}                 from '../';

/**
 * the name of the class is used as ID, it's the one you will found in the 
 * database
 * 
 * To be sure, set the variable `this._id` same as the class name
 * 
 * the variable `this._name` is the name who will be use in the list of
 * rules in the UI
 * 
 * `this._description`, same as `this._name` but for the description of the rule
 *  PS: use the back quote for this one, you will be able to right multiline
 *  description thanks to them
 * 
 * keep `this._ruleType` as default for the moment
 * 
 * exemple from the `models/temporaryFilL.ts`
 * 
 * add the `rules` field, as you see, it's an array of json object
 * composed like this:
 * {
 *    id: '<className>',
 *    conf: { // what you want here \\ }
 * }
 * 
 * 
 * 
 * 
 * {
 *   name: 'blackPawn',
 *   object: {
 *    type: 'pawn',
 *     draggable: true,
 *     droppable: false,
 *     dimension: [3.5, 1.5, 3.5],
 *     position: [-10, 10, 10],
 *     texturesPaths: [
 *       'black.png',
 *     ],
 *     rules: [
 *       {id: 'SecondRule', conf: { name: 'plop', todo: 'nope' }},
 *       {id: 'TestRule', conf: { data: 'yolo' }},
 *     ],
 *   },
 * },
 * Go to the `index.ts` to know the following instructing to finish
 * properly the setup of your new rule
 * 
 */
export class TemplateRule extends BaseRules {
  constructor(scene: SceneViewer, model: ModelViewer, conf: any = {}) {
    super(scene, model, conf);

    this._id = 'TemplateRule';
    this._name = 'Template rule';
    this._description = `this is a Template rule with ${this.id} id`;
    this._ruleType = RULE_TYPE.default;
  }

  /**
   * this is the main method, it the one who will be called at the running
   * time
   * 
   * for the moment, you are not able to pass parameters
   * but you have access to the scene via
   *  > `this._refScene`
   * and to the object where the rule is attach via
   *  > `this._refObj`
   * 
   * if you passed a configuration object to your rule
   * you have access to it via
   *  > `this._configuration`
   * 
   * /!\ this method have to return a boolean value /!\
   * 
   * you are free to add intermediate method
   */
  public run(): boolean {
    return true;
  }
}
