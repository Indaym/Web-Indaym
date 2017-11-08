/**
 * Created by Caro on 08/01/2017.
 */

import { serverConfig } from '../../../config/server.conf';

export class DefaultService {
  protected server;
  protected setted = false;
  protected serverUrl;
  protected settedErrorMessage = 'URL not setted';

  constructor() {
    this.serverUrl = serverConfig.serverURL;
    this.server = serverConfig.server;
  }

  protected joiner = (join: string): (string) => (string) => string =>
                      (left: string): (string) => string =>
                      (right: string): string =>
                        `${left}${join}${right}`

  // TODO: change serverUrl in the config by removing the / at the end
  protected composeUrl(chunk: string): (string) => string {
    return function(piece: string): string {
      return `${chunk}/${piece}`;
    };
  }

  public isSetted(message = false) {
    if (this.setted === true) {
      return true;
    } else {
      if (message === true) {
        console.error(this.settedErrorMessage);
      }
      return false;
    }
  }
}
