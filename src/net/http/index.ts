import { HttpBase, HttpRequest } from './http';

declare class HttpImpl extends HttpBase {
  constructor(params?: Partial<HttpBase>);
  cookiePersistenceEnabled: boolean;
  get timeout(): number;
  set timeout(value: number);
  get headers(): Record<string, string>;
  requestFile(params: Parameters<HttpBase['requestFile']>['0']): HttpRequest;
  requestImage(params: Parameters<HttpBase['requestImage']>['0']): HttpRequest;
  requestString(params: Parameters<HttpBase['requestString']>['0']): HttpRequest;
  requestJSON(params: Parameters<HttpBase['requestJSON']>['0']): HttpRequest;
  request(params: Parameters<HttpBase['request']>['0']): HttpRequest;
  upload(params: Parameters<HttpBase['upload']>['0']): HttpRequest;
  cancelAll(): void;
  protected createNativeObject(params?: Partial<Record<string, any>>);
}

const Http: typeof HttpImpl = require(`./http.${Device.deviceOS.toLowerCase()}`).default;
type Http = HttpImpl;

export default Http;
