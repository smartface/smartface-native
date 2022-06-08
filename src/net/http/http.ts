import NativeComponent from '../../core/native-component';
import { INativeMobileComponent, MobileOSProps, NativeMobileComponent, WithMobileOSProps } from '../../core/native-mobile-component';
import Blob from '../../global/blob';
import File from '../../io/file';
import { IImage } from '../../ui/image/image';

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
export interface HttpIOSProps {
  /**
   * Determines whether to use the pinned certificates to validate the server trust.
   */
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

type ImageRequestParams = RequestParamsType<{}, { image: IImage | null }>;
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

export interface IHttp extends INativeMobileComponent<any, MobileOSProps<HttpIOSProps, {}>> {
  /**
   * Toggles if the instance should keep the cookies from the server.
   */
  cookiePersistenceEnabled: boolean;
  /**
   * Get/sets the default timeout value. It is recommended to set this on constructor.
   * @default 10000
   * @example
   * import Http from '@smartface/native/net/http';
   * const http = new Http({
   *  timeout: 5000,
   * //...other values
   * });
   */
  timeout: number;
  headers: Record<string, string>;
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
  /**
   * Uploads something. Accepts blob as type.
   */
  upload(params: UploadParams): HttpRequest;
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
  protected createNativeObject() {
    return null;
  }
  constructor(params?: { nativeObject?: any }) {
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
