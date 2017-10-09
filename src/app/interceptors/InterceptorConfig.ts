import { InterceptorConfigOptional } from './InterceptorConfigOptional';

export const DEFAULT_HEADER_NAME = 'Authorization';
export const DEFAULT_HEADER_PREFIX_BEARER = 'Bearer';

export class InterceptorConfig {

  headerName: string = DEFAULT_HEADER_NAME;
  headerPrefix: string = DEFAULT_HEADER_PREFIX_BEARER;
  noTokenError = false;

  constructor(config?: InterceptorConfigOptional) {
    config = config || {};
    Object.assign(this, config);
  }
}
