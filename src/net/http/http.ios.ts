import { INativeComponent } from '../../core/inative-component';
import Blob from '../../global/blob';
import { BlobBase } from '../../global/blob/blob';
import File from '../../io/file';
import { FileBase } from '../../io/file/file';
import Image from '../../ui/image';
import { HttpBase, HttpRequestBase, IHttp, iOSProps } from './http';

export default class HttpIOS extends HttpBase {
  private _sslPinning: iOSProps;
  constructor(params?: Partial<IHttp>) {
    super(params);

    if (!this.nativeObject) {
      this.nativeObject = new __SF_Http();
    }

    for (const param in params) {
      this[param] = params[param];
    }
  }

  get timeout(): number {
    return this.nativeObject.timeoutIntervalForRequest * 1000;
  }
  set timeout(value: number) {
    this.nativeObject.timeoutIntervalForRequest = value / 1000;
  }

  get headers(): { [key: string]: string } {
    return this.nativeObject.defaultHTTPHeaders;
  }
  set headers(value: { [key: string]: string }) {
    this.nativeObject.defaultHTTPHeaders = value;
  }

  get ios(): iOSProps {
    return this._sslPinning;
  }
  set ios(value: iOSProps) {
    this._sslPinning = value;

    const trustPolicies =
      Array.isArray(value) && value.length > 0
        ? value.map((value) => {
            const { certificates, host, validateCertificateChain = true, validateHost = true } = value;

            const nSURLCertificates = certificates.map((path) => {
              const certFile = new File({
                path: path
              });
              return certFile.ios.getNSURL();
            });
            return __SF_SMFServerTrustPolicy.createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(host, nSURLCertificates, validateCertificateChain, validateHost);
          })
        : undefined;

    this.nativeObject.serverTrustPolicies = trustPolicies;
  }

  cancelAll() {
    this.nativeObject.cancelAll();
  }

  requestFile(
    params: { url: string } & { fileName?: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { file?: FileBase }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ): HttpRequest {
    const url = params.url;
    const fileName = params.fileName;
    const onLoad = params.onLoad;
    const onError = params.onError;

    return new HttpRequest(
      this.nativeObject.requestFile(
        url,
        fileName,
        (e: any) => {
          // Native returns file path first.
          // Convert to sf-core file object.
          if (e.file) {
            e.file = new File({
              path: e.file
            });
          }
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }

  requestImage(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { image: ImageBase }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ): HttpRequest {
    const url = params.url;
    const onLoad = params.onLoad;
    const onError = params.onError;

    return new HttpRequest(
      this.nativeObject.requestImage(
        url,
        (e: any) => {
          // Native returns UIImage instance.
          // Convert to sf-core Image object.
          if (e.image) {
            e.image = Image.createFromImage(e.image);
          }
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }

  requestString(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { string: string }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ): HttpRequest {
    const url = params.url;
    const onLoad = params.onLoad;
    const onError = params.onError;

    return new HttpRequest(
      this.nativeObject.requestString(
        url,
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }

  requestJSON(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { JSON: { [key: string]: string | number | boolean } }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ): HttpRequest {
    const url = params.url;
    const onLoad = params.onLoad;
    const onError = params.onError;

    return new HttpRequest(
      this.nativeObject.requestJSON(
        url,
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }

  request(
    params: { url: string } & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; headers?: { [key: string]: string }; user?: string; password?: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { body?: BlobBase }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ): HttpRequest {
    const onLoad = params.onLoad;
    const onError = params.onError;

    return new HttpRequest(
      this.nativeObject.request(
        params,
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }

  upload(
    params: { url: string } & { body: { name: string; fileName: string; contentType: string; value: BlobBase; user: string; password: string } } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { body: BlobBase; statusCode: number; headers?: { [key: string]: string } }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    } & { params: { url: string; headers?: { [key: string]: string }; method: string; body: any[] | BlobBase } }
  ): HttpRequest {
    const onLoad = params.onLoad;
    const onError = params.onError;

    // Get NSData inside JS object
    if (Object.prototype.toString.call(params.body) === '[object Array]') {
      for (let i = 0; i < params.body.length; i++) {
        params.body[i].value = params.body[i].value.nativeObject;
      }
    } else {
      params.body = params.body.nativeObject;
    }

    return new HttpRequest(
      this.nativeObject.upload(
        params,
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onLoad?.(e);
        },
        (e: any) => {
          if (e.body) {
            e.body = new Blob(e.body);
          }
          onError?.(e);
        }
      )
    );
  }
}

export class HttpRequest extends HttpRequestBase {
  constructor(params?: Partial<INativeComponent>) {
    super(params);
    if (params.nativeObject) {
      this.nativeObject = params.nativeObject;
    }
  }

  suspend(): void {
    this.nativeObject && this.nativeObject.cancel();
  }

  resume(): void {
    this.nativeObject && this.nativeObject.resume();
  }

  cancel(): void {
    this.nativeObject && this.nativeObject.cancel();
  }
}
