/**
 * Created by Caro on 08/01/2017.
 */

import { serverConfig } from '../../config/server.conf';

export class DefaultService {
  protected setted = false;
  protected serverUrl;
  protected settedErrorMessage = 'URL not setted';

  constructor() {
    this.serverUrl = serverConfig.serverURL;
  }

  public isSetted(message = false) {
    if (this.setted === true) {
      return true;
    } else {
      if (message === true)
        console.error(this.settedErrorMessage);
      return false;
    }
  }
}
