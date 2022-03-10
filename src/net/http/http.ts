import { INativeComponent } from '../../core/inative-component';
import Blob from '../../global/blob';
import File from '../../io/file';
import Image from '../../ui/image';

/**
 * Uses the pinned certificates to validate the server trust. The server trust is considered valid if one of the pinned certificates match one of the server certificates.
 * By validating both the certificate chain and host, certificate pinning provides a very secure form of server trust validation mitigating most, if not all, MITM attacks.
 * Applications are encouraged to always validate the host and require a valid certificate chain in production environments.
 *
 * @property {Array}    sslPinning
 * @property {String}   sslPinning.host
 * @property {Array}    sslPinning.certificates Only DER format accepted.
 * @property {Boolean}  [sslPinning.validateCertificateChain=true]
 * @property {Boolean}  [sslPinning.validateHost=true]
 * @ios
 * @since 4.3.4
 */
export type iOSProps = Partial<{
  sslPinning?: { host: string; certificates: string[]; validateCertificateChain?: boolean; validateHost?: boolean }[];
}>;

type RequestOnload<T = {}> = (
  e: {
    statusCode: number;
    headers: { [key: string]: string };
  } & T
) => void;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type RequestParamsType<B = {}, L = {}> = {
  url: string;
} & B & {
    onLoad: RequestOnload<L>;
    onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
  };
type ImageRequestParams = RequestParamsType<{}, { image: Image }>;
type StringRequestParams = RequestParamsType<{}, { string: string }>;
type JSONType = { [key: string]: string | number | null | boolean };
type FileRequestParams = RequestParamsType<{ fileName?: string }, { file?: File }>;
type JSONRequestParams = RequestParamsType<{}, { JSON: JSONType }>;
type RequestParams = RequestParamsType<
  {
    method: RequestMethod;
    headers?: { [key: string]: string };
    user?: string;
    password?: string;
  },
  { body?: Blob }
>;
/**
 * @param {Object} params
 * @param {String} params.url URL
 * @param {Object} params.headers Headers
 * @param {String} params.method Http request method
 * @param {Object[]|Blob} params.body
 *
 * @param {String} params.body.name
 * @param {String} params.body.fileName
 * @param {String} params.body.contentType
 * @param {Blob} params.body.value
 * @param {String} params.user Username for authorization if needed
 * @param {String} params.password Password for authorization if needed
 * @param {Function} params.onLoad Callback for success case
 *
 */
type UploadParams = RequestParamsType<
  {
    body: {
      name: string;
      fileName: string;
      contentType: string;
      value: Blob;
      user: string;
      password: string;
    };
  },
  {
    body: Blob;
    statusCode: number;
    headers?: { [key: string]: string };
  }
> & {
  params: {
    url: string;
    headers?: { [key: string]: string };
    method: string;
    body: any[] | Blob;
  };
};

/**
 * @class Net.HttpRequest
 *
 * Http Request CANNOT be initialized. Use http's request methods instead.
 *
 *     @example
 *     const Http = require("@smartface/native/net/http");
 *
 *     var http = new Http();
 *     var myImageUrl = your-image-url;
 *     var request = HttpRequestImage({url: myImageUrl, onLoad: onLoad, onError: onError});
 *     request.cancel();
 *
 */
export class HttpRequestBase implements INativeComponent {
  constructor(params?: Partial<INativeComponent>) {}
  /**
   * @method cancel
   *
   * Stops listening the response of the request.
   *
   * @since 0.1
   */
  cancel() {
    throw new Error('Method not implemented');
  }
  suspend() {
    throw new Error('Method not implemented');
  }
  resume() {
    throw new Error('Method not implemented');
  }
  nativeObject: any;
}

export interface IHttp extends INativeComponent {
  cookiePersistenceEnabled: boolean;
  timeout: number;
  headers: { [key: string]: string };
  ios: iOSProps;
  /**
   * Cancels all requests.
   *
   * @method cancelAll
   * @android
   * @ios
   */
  cancelAll: () => void;
  /**
   * @method requestFile
   *
   * Sends an http request to given url and saves response file
   * to temp directory of application. If request ends successfully
   * onLoad callback will be called with received File object.
   *
   * @param {Object} params
   * @param {String} params.url URL of file
   * @param {String} params.fileName File name
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {IO.File} params.onLoad.e.file
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {String} params.onError.e.message
   * @param {Object} params.onError.e.body
   * @param {Number} params.onError.e.statusCode
   * @param {Object} params.onError.e.headers
   * @return {Net.HttpRequest}
   * @since 0.1
   */
  requestFile: (params: FileRequestParams) => HttpRequest;
  /**
   * @method requestImage
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received UI.Image object.
   *
   * @param {Object} params
   * @param {String} params.url URL of file
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {UI.Image} params.onLoad.e.image
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {String} params.onError.e.message
   * @param {Object} params.onError.e.body
   * @param {Number} params.onError.e.statusCode
   * @param {Object} params.onError.e.headers
   * @return {Net.HttpRequest}
   * @since 0.1
   */
  requestImage: (params: ImageRequestParams) => HttpRequest;
  /**
   * @method requestString
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received string.
   *
   * @param {Object} params
   * @param {String} params.url URL of file
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {String} params.onLoad.e.string
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {String} params.onError.e.message
   * @param {Object} params.onError.e.body
   * @param {Number} params.onError.e.statusCode
   * @param {Object} params.onError.e.headers
   * @return {Net.HttpRequest}
   * @since 0.1
   */
  requestString: (params: StringRequestParams) => HttpRequest;
  /**
   * @method requestJSON
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received JSON object.
   *
   * @param {Object} params
   * @param {String} params.url URL of file
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {Object} params.onLoad.e.JSON
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {String} params.onError.e.message
   * @param {Object} params.onError.e.body
   * @param {Number} params.onError.e.statusCode
   * @param {Object} params.onError.e.headers
   * @return {Net.HttpRequest}
   * @since 0.1
   */
  requestJSON: (params: JSONRequestParams) => HttpRequest;
  /**
   * @method request
   *
   * Sends an http request defined with parameters.
   *
   * @param {Object} params Parameters
   * @param {String} params.url URL
   * @param {Object} params.headers Headers
   * @param {String} params.method Http request method
   * @param {String} params.body Http request body
   * @param {String} params.user Username for authorization if needed
   * @param {String} params.password Password for authorization if needed
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {Blob} params.onLoad.e.body
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {String} params.onError.e.message Message of the error
   * @param {Object} params.onError.e.body Body of the error
   * @param {Number} params.onError.e.statusCode Error status code
   * @param {Object} params.onError.e.headers Headers sent with error
   * @return {Net.HttpRequest}
   * @since 0.1
   */
  request: (params: RequestParams) => HttpRequest;

  /**
   * @param {Object} params
   * @param {String} params.url URL
   * @param {Object} params.headers Headers
   * @param {String} params.method Http request method
   * @param {Object[]|Blob} params.body
   * @param {String} params.body.name
   * @param {String} params.body.fileName
   * @param {String} params.body.contentType
   * @param {Blob} params.body.value
   * @param {String} params.user Username for authorization if needed
   * @param {String} params.password Password for authorization if needed
   * @param {Function} params.onLoad Callback for success case
   * @param {Object} params.onLoad.e
   * @param {Blob} params.onLoad.e.body
   * @param {Number} params.onLoad.e.statusCode
   * @param {Object} params.onLoad.e.headers
   * @param {Function} params.onError Callback for error case
   * @param {Object} params.onError.e
   * @param {Object} params.onError.e.body Body of the error
   * @param {Number} params.onError.e.statusCode Error status code
   * @param {Object} params.onError.e.headers Headers sent with error
   */
  upload: (params: UploadParams) => HttpRequest;
}

export class HttpBase implements IHttp {
  constructor(params?: Partial<IHttp>) {}
  get cookiePersistenceEnabled(): boolean {
    throw new Error('Method not implemented.');
  }
  set cookiePersistenceEnabled(value: boolean) {
    throw new Error('Method not implemented.');
  }
  get timeout(): number {
    throw new Error('Method not implemented.');
  }
  set timeout(value: number) {
    throw new Error('Method not implemented.');
  }
  get headers(): { [key: string]: string } {
    throw new Error('Method not implemented.');
  }
  set headers(value: { [key: string]: string }) {
    throw new Error('Method not implemented.');
  }
  get ios(): iOSProps {
    throw new Error('Method not implemented.');
  }
  set ios(value: iOSProps) {
    throw new Error('Method not implemented.');
  }
  cancelAll() {
    throw new Error('Method not implemented.');
  }

  static cancelAll() {
    throw new Error('Method not implemented.');
  }
  requestFile(params: FileRequestParams): HttpRequest {
    throw new Error('Method not implemented.');
  }
  requestImage(params: ImageRequestParams): HttpRequest {
    throw new Error('Method not implemented');
  }
  requestString(params: StringRequestParams): HttpRequest {
    throw new Error('Method not implemented');
  }
  requestJSON(params: JSONRequestParams): HttpRequest {
    throw new Error('Method not implemented');
  }
  request(params: RequestParams): HttpRequest {
    throw new Error('Method not implemented');
  }
  upload(params: UploadParams): HttpRequest {
    throw new Error('Method not implemented');
  }
  nativeObject: any;
}
