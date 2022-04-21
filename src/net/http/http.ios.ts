import Blob from '../../global/blob';
import File from '../../io/file';
import FileIOS from '../../io/file/file.ios';
import Image from '../../ui/image';
import { HttpBase, HttpRequest, IHttp } from './http';

export default class HttpIOS extends HttpBase {
  protected createNativeObject() {
    return new __SF_Http();
  }
  cookiePersistenceEnabled: boolean;
  private _sslPinning: IHttp['ios']['sslPinning'];
  constructor(params?: Partial<IHttp>) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }

  private getIOSProps(): IHttp['ios'] {
    const self = this;
    return {
      get sslPinning() {
        return self._sslPinning;
      },
      set sslPinning(value) {
        self._sslPinning = value;
        let trustPolicies: __SF_SMFServerTrustPolicy[] | undefined = undefined;
        if (Array.isArray(value)) {
          trustPolicies = value.map((value) => {
            const { certificates, host, validateCertificateChain = true, validateHost = true } = value;

            const nSURLCertificates = certificates.map((path) => {
              const certFile = new FileIOS({
                path: path
              });
              return certFile.ios.getNSURL?.();
            });
            return __SF_SMFServerTrustPolicy.createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(host, nSURLCertificates, validateCertificateChain, validateHost);
          });
        }

        self.nativeObject.serverTrustPolicies = trustPolicies;
      }
    };
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

  cancelAll() {
    this.nativeObject.cancelAll();
  }

  requestFile(params: Parameters<IHttp['requestFile']>['0']): HttpRequest {
    const url = params.url;
    const fileName = params.fileName;
    const onLoad = (e: any) => {
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
      params.onLoad?.(e);
    };
    const onError = (e: any) => {
      if (e.body) {
        e.body = new Blob(e.body);
      }
      params.onError?.(e);
    };

    return new HttpRequest(this.nativeObject.requestFile(url, fileName, onLoad, onError));
  }

  requestImage(params: Parameters<IHttp['requestImage']>['0']): HttpRequest {
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

  requestString(params: Parameters<IHttp['requestString']>['0']): HttpRequest {
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

  requestJSON(params: Parameters<IHttp['requestJSON']>['0']): HttpRequest {
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

  request(params: Parameters<IHttp['request']>['0']): HttpRequest {
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

  upload(params: Parameters<IHttp['upload']>['0']): HttpRequest {
    const onLoad = params.onLoad;
    const onError = params.onError;

    if (Array.isArray(params.body)) {
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
