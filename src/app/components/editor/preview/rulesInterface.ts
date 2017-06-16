import { EventDispatcher }  from 'three';

export class RulesInterface {
  private readonly dispatcher: EventDispatcher = new EventDispatcher();

  constructor() {
    // Exemple that of subscribe that can be put in rules
    this.subscribe('canMoveObject', (obj) => {
      /*
       * Here on obj you have
       * {
       *  type: 'canMoveObject',
       *  datas: {
       *    source: <= here the object that want to move
       *    target: <= here the object where the source want to move (exemple the case)
       *  },
       *  success: <= a callback to call in case of success of the rules (allow move)
       *  fail: <= a callback to call in case of fail of rules (forbid move)
       * }
       */
      console.log(obj);
      // Check if it can move
      // if it can call success, else call fail
      obj.success();

    });
  }

  public subscribe(type, listener) {
    this.dispatcher.addEventListener(type, listener);
  }

  public emit(type, datas, success = (data) => {}, fail = (data) => {}) {
    this.dispatcher.dispatchEvent({
      type: type,
      datas: datas,
      success: success,
      fail: fail,
    });
  }
}
