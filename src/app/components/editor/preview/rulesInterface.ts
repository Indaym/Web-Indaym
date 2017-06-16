import { EventDispatcher }  from 'three';

export class RulesInterface {
  private readonly dispatcher: EventDispatcher = new EventDispatcher();

  constructor() {}

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
