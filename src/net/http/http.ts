import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';
import { NativeMobileComponent, WithMobileOSProps } from '../../core/native-mobile-component';
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
export interface iOSProps {
  sslPinning?: { host: string; certificates: string[]; validateCertificateChain?: boolean; validateHost?: boolean }[];
}

type RequestOnload<T = {}> = (
  e: {
    statusCode: number;
    headers?: Record<string, string>;
    body?: Record<string, any>;
  } & T
) => void;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type RequestParamsType<B = {}, L = {}> = {
  url: string;
  method: RequestMethod;
} & B & {
    onLoad: RequestOnload<L>;
    onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => void;
  };

type ImageRequestParams = RequestParamsType<{}, { image: Image | null }>;
type StringRequestParams = RequestParamsType<{}, { string: string }>;
type JSONType = { [key: string]: string | number | null | boolean };
type FileRequestParams = RequestParamsType<{ fileName?: string }, { file?: File }>;
type JSONRequestParams = RequestParamsType<{}, { JSON: JSONType; string: string }>;
type RequestParams = RequestParamsType<
  {
    method: RequestMethod;
    headers?: Record<string, string>;
    user?: string;
    password?: string;
  },
  { [key: string]: any }
>;
/**
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
      nativeObject?: any; //TODO: Added because it was used, no idea where.
    };
  },
  {
    body: Blob;
    statusCode: number;
    headers?: Record<string, string>;
  }
> & {
  params: {
    url: string;
    headers?: Record<string, string>;
    method: string;
    body: any[] | Blob;
  };
};

export interface IHttp extends INativeComponent {
  cookiePersistenceEnabled: boolean;
  timeout: number;
  headers: Record<string, string>;
  ios: Partial<iOSProps>;
  /**
   * Cancels all requests.
   *
   * @method cancelAll
   * @android
   * @ios
   */
  cancelAll(): void;
  /**
   * @method requestFile
   *
   * Sends an http request to given url and saves response file
   * to temp directory of application. If request ends successfully
   * onLoad callback will be called with received File object.
   * @since 0.1
   */
  requestFile(params: FileRequestParams): HttpRequest;
  /**
   * @method requestImage
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received UI.Image object.
   *
   * @since 0.1
   */
  requestImage(params: ImageRequestParams): HttpRequest;
  /**
   * @method requestString
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received string.
   *
   * @since 0.1
   */
  requestString(params: StringRequestParams): HttpRequest;
  /**
   * @method requestJSON
   *
   * Sends an http request to given url. If request ends successfully
   * onLoad callback will be called with received JSON object.
   *
   * @since 0.1
   */
  requestJSON(params: JSONRequestParams): HttpRequest;
  /**
   * @method request
   *
   * Sends an http request defined with parameters.
   *
   * @since 0.1
   */
  request(params: RequestParams, isMultipart?: boolean): HttpRequest;
  upload(params: UploadParams): HttpRequest;
}

export abstract class HttpBase extends NativeMobileComponent<any, WithMobileOSProps<IHttp, iOSProps, {}>> implements IHttp {
  constructor(params?: Partial<IHttp>) {
    super(params);
  }
  abstract cookiePersistenceEnabled: boolean;
  abstract get timeout(): number;
  abstract set timeout(value);
  abstract get headers(): Record<string, string>;
  abstract requestFile(params: FileRequestParams): HttpRequest;
  abstract requestImage(params: ImageRequestParams): HttpRequest;
  abstract requestString(params: StringRequestParams): HttpRequest;
  abstract requestJSON(params: JSONRequestParams): HttpRequest;
  abstract request(params: RequestParams): HttpRequest;
  abstract upload(params: UploadParams): HttpRequest;
  abstract cancelAll(): void;

  static cancelAll(): void {
    throw new Error('Method not implemented.');
  }
}

/**
 * @class Net.HttpRequest
 *
 * Http Request CANNOT be initialized. Use http's request methods instead.
 *
 *     @example
 *     import Http from '@smartface/native/net/http';
 *
 *     var http = new Http();
 *     var myImageUrl = your-image-url;
 *     var request = HttpRequestImage({url: myImageUrl, onLoad: onLoad, onError: onError});
 *     request.cancel();
 *
 */
export class HttpRequest extends NativeComponent {
  constructor(params: { nativeObject?: any }) {
    super(params);
    this.nativeObject = params?.nativeObject;
  }

  suspend(): void {
    this.nativeObject?.cancel();
  }

  resume(): void {
    this.nativeObject?.resume();
  }

  cancel(): void {
    this.nativeObject?.cancel();
  }
}
