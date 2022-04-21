/*globals requireClass*/
import Blob from '../../global/blob';
import Network from '../../device/network';
import { ConnectionType } from '../../device/network/network';
import File from '../../io/file';
import FileStream from '../../io/filestream';
import Path from '../../io/path';
import AndroidConfig from '../../util/Android/androidconfig';
import { HttpBase, HttpRequest, IHttp } from './http';
import BlobAndroid from '../../global/blob/blob.android';
import ImageAndroid from '../../ui/image/image.android';

const OkHttpClientBuilder = requireClass('okhttp3.OkHttpClient$Builder');
const OkHttpRequestBuilder = requireClass('okhttp3.Request$Builder');
const RequestBody = requireClass('okhttp3.RequestBody');
const TimeUnit = requireClass('java.util.concurrent.TimeUnit');
const MediaType = requireClass('okhttp3.MediaType');
const SFHttpCallback = requireClass('io.smartface.android.sfcore.net.SFHttpCallback');
const SFHttp = requireClass('io.smartface.android.sfcore.net.SFHttp');
const NativeCookieJar = requireClass('okhttp3.CookieJar');

enum WITHOUT_BODY_METHODS {
  GET,
  HEAD,
  COPY,
  PURGE
}

const CONTENT_TYPE_KEY = 'CONTENT-TYPE';
const activity = AndroidConfig.activity;

const _instanceCollection: HttpAndroid[] = [];

export default class HttpAndroid extends HttpBase {
  protected __createNativeObject__() {
    return null;
  }
  private _clientBuilder: any;
  private _timeout: number;
  private _defaultHeaders: Record<string, string>;
  private _cookiePersistenceEnabled = false;
  private _client: any;
  constructor(params?: Partial<IHttp>) {
    super(params);
    this.timeout = 60000;
  }

  protected __init__(params?: Partial<Record<string, any>>): void {
    this._clientBuilder = new OkHttpClientBuilder();
    this._client = this._clientBuilder.build();

    _instanceCollection.push(this);
  }

  get timeout(): number {
    return this._timeout;
  }
  set timeout(value: number) {
    if (typeof value !== 'number') throw new Error('timeout must be a number.');

    this._timeout = value;
    this._clientBuilder.connectTimeout(this._timeout, TimeUnit.MILLISECONDS);
    this._clientBuilder.readTimeout(this._timeout, TimeUnit.MILLISECONDS);
    this._clientBuilder.writeTimeout(this._timeout, TimeUnit.MILLISECONDS);
  }

  get headers(): Record<string, string> {
    return this._defaultHeaders;
  }
  set headers(value: Record<string, string>) {
    value && (this._defaultHeaders = value);
  }

  get cookiePersistenceEnabled(): boolean {
    return this._cookiePersistenceEnabled;
  }
  set cookiePersistenceEnabled(value: boolean) {
    if (typeof value !== 'boolean') return;
    this._cookiePersistenceEnabled = value;
    if (this._cookiePersistenceEnabled) {
      this._clientBuilder.cookieJar(SFHttp.createCookieJar());
    } else {
      this._clientBuilder.cookieJar(NativeCookieJar.NO_COOKIES);
    }
  }

  static cancelAll(): void {
    for (let i = 0; i < _instanceCollection.length; i++) {
      _instanceCollection[i].cancelAll();
    }
  }

  cancelAll(): void {
    const dispatcher = this._client.dispatcher();
    dispatcher && dispatcher.cancelAll();
  }

  upload(params: Parameters<IHttp['upload']>['0']) {
    params && (params.params.method = 'POST');
    return this.request(params, true);
  }

  requestString(params: Parameters<IHttp['requestString']>['0']) {
    if (!params) {
      throw new Error('Required request parameters.');
    }
    const requestOnLoad = params.onLoad;
    params.onLoad = (e) => {
      if (e?.body) {
        e.string = e.body.toString();
      }
      requestOnLoad?.(e);
    };
    return this.request(params, false);
  }

  requestImage(params: Parameters<IHttp['requestImage']>['0']) {
    if (!params) {
      throw new Error('Required request parameters.');
    }

    const requestOnLoad = params.onLoad;

    params.onLoad = (e) => {
      if (e?.body) {
        e.image = ImageAndroid.createFromBlob(e.body as BlobAndroid);
      }
      requestOnLoad?.(e);
    };
    return this.request(params, false);
  }

  requestJSON(params: Parameters<IHttp['requestJSON']>['0']) {
    if (!params) throw new Error('Required request parameters.');

    const requestOnLoad = params.onLoad;
    params.onLoad = (e) => {
      if (e && e.body) {
        e.JSON = JSON.parse(e.string);
      }
      requestOnLoad?.(e);
    };
    return this.requestString(params);
  }

  requestFile(params: Parameters<IHttp['requestFile']>['0']) {
    if (!params) throw new Error('Required request parameters.');

    const requestOnLoad = params.onLoad;
    params.onLoad = (e) => {
      const cacheDir = activity.getCacheDir().getAbsolutePath();
      let path;
      if (params.fileName) path = cacheDir + Path.Separator + params.fileName;
      else path = cacheDir + params.url.substring(params.url.lastIndexOf('/'));
      const file = new File({
        path: path
      });
      if (e?.body) {
        const stream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.BINARY);
        stream?.write(e.body as unknown as string);
        stream?.close();
        e.file = file;
      }

      requestOnLoad && requestOnLoad(e);
    };

    return this.request(params, false);
  }

  request(params: Parameters<IHttp['request']>['0'], isMultipart?: boolean) {
    if (!this.checkInternet()) {
      params?.onError?.({
        message: 'No network connection'
      });
      return new HttpRequest();
    }

    const request = new HttpRequest();
    const callback = SFHttpCallback.getCallback({
      onFailure: (msg) => {
        params?.onError?.({
          message: msg
        });
      },
      onResponse: (isSuccessful, code, headers, bytes, message) => {
        let responseBody;
        const statusCode = code;
        const responseHeaders = this.getResponseHeaders(headers);
        if (statusCode !== 304 && bytes) {
          responseBody = new Blob(bytes, {
            type: 'file'
          });
        }

        if (isSuccessful) {
          params?.onLoad?.({
            statusCode: statusCode,
            headers: responseHeaders,
            body: responseBody
          });
        } else {
          params?.onError?.({
            statusCode: statusCode,
            headers: responseHeaders,
            message: message,
            body: responseBody
          });
        }
      }
    });
    const okhttpRequest = this.createRequest(params, isMultipart, this.headers);
    request.nativeObject = this._client.newCall(okhttpRequest);
    request.nativeObject.enqueue(callback);
    return request;
  }

  private createRequest(params: any, isMultipart?: boolean, httpManagerHeaders?: Record<string, string>) {
    if (!params || !params.url) {
      throw new Error('URL parameter is required.');
    }
    let keys;
    let builder = new OkHttpRequestBuilder();
    builder = builder.url(params.url);

    let contentType = '';
    if (params.headers) {
      keys = Object.keys(params.headers);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].toUpperCase() === CONTENT_TYPE_KEY) contentType = params.headers[keys[i]];
        builder.addHeader(keys[i], params.headers[keys[i]]);
      }
    }

    if (httpManagerHeaders) {
      keys = Object.keys(httpManagerHeaders);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].toUpperCase() === CONTENT_TYPE_KEY) {
          contentType = httpManagerHeaders[keys[i]];
        }
        builder.addHeader(keys[i], httpManagerHeaders[keys[i]]);
      }
    }

    if (params.method) {
      if (params.method in WITHOUT_BODY_METHODS) {
        builder = builder.method(params.method, null);
      } else {
        const body = this.createRequestBody(params.body, contentType, isMultipart);
        builder = builder.method(params.method, body);
      }
    }
    return builder.build();
  }

  createRequestBody(body, contentType, isMultipart) {
    if (!body) {
      return RequestBody.create(null, array([], 'byte'));
    }
    if (!isMultipart || body instanceof BlobAndroid) {
      let mediaType = null;
      if (contentType) {
        mediaType = MediaType.parse(contentType);
      }
      let content: any = null;
      if (body instanceof BlobAndroid) {
        content = array(body.parts, 'byte');
      } else if (typeof body === 'string') {
        content = body;
      }
      return RequestBody.create(mediaType, content);
    } else {
      return this.createMultipartBody(body);
    }
  }

  createMultipartBody(bodies) {
    const MultipartBody = requireClass('okhttp3.MultipartBody');
    const builder = new MultipartBody.Builder();
    builder.setType(MultipartBody.FORM);

    let mediaType;
    let body;

    for (let i = 0; i < bodies.length; i++) {
      if (!bodies[i].name) {
        throw new Error('Name of the upload part data cannot be empty.');
      }
      if (bodies[i].contentType) mediaType = MediaType.parse(bodies[i].contentType);
      if (bodies[i].value) body = RequestBody.create(mediaType, array(bodies[i].value.parts, 'byte'));
      if (!body) {
        throw new Error('Upload method must include request body.');
      }
      let fileName = null;
      if (bodies[i].fileName) fileName = bodies[i].fileName;
      builder.addFormDataPart(bodies[i].name, fileName, body);
    }
    return builder.build();
  }

  // TODO: [AND-3663] To obfuscate okttp3.Headers class, implement this function in java side.
  getResponseHeaders(headers) {
    const responseHeaders = {};
    const headersSize = headers.size();
    for (let i = 0; i < headersSize; i++) {
      responseHeaders[headers.name(i)] = headers.value(i);
    }
    return responseHeaders;
  }

  checkInternet() {
    return !(Network.connectionType === ConnectionType.NONE);
  }
}
