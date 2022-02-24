/*globals requireClass*/
import Blob from '../../global/blob';
import Network from '../../device/network';
import File from '../../io/file';
import FileStream from '../../io/filestream';
import Path from '../../io/path';
import Image from '../../ui/image';
import AndroidConfig from '../../util/Android/androidconfig';
import { HttpBase, HttpRequestBase, IHttp } from './http';

const OkHttpClientBuilder = requireClass('okhttp3.OkHttpClient$Builder');
const OkHttpRequestBuilder = requireClass('okhttp3.Request$Builder');
const RequestBody = requireClass('okhttp3.RequestBody');
const TimeUnit = requireClass('java.util.concurrent.TimeUnit');
const MediaType = requireClass('okhttp3.MediaType');
const SFHttpCallback = requireClass('io.smartface.android.sfcore.net.SFHttpCallback');
const SFHttp = requireClass('io.smartface.android.sfcore.net.SFHttp');

enum WITHOUT_BODY_METHODS {
  GET,
  HEAD,
  COPY,
  PURGE
}

const CONTENT_TYPE_KEY = 'CONTENT-TYPE';
const activity = AndroidConfig.activity;

export class HttpRequest extends HttpRequestBase {
  cancel(): void {
    this.nativeObject.cancel();
  }
}

const _instanceCollection: HttpAndroid[] = [];

export default class HttpAndroid extends HttpBase {
  private _clientBuilder: any;
  private _timeout: number;
  private _defaultHeaders: { [key: string]: string };
  private _cookiePersistenceEnabled = false;
  private _client: any;
  constructor(params?: Partial<IHttp>) {
    super(params);
    this._clientBuilder = new OkHttpClientBuilder();

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }

    _instanceCollection.push(this);

    if (!Number.isInteger(this.timeout)) {
      this.timeout = 60000;
    }
    this._client = this._clientBuilder.build();
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

  get headers(): { [key: string]: string } {
    return this._defaultHeaders;
  }
  set headers(value: { [key: string]: string }) {
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
      const NativeCookieJar = requireClass('okhttp3.CookieJar');
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

  upload(
    params: { url: string } & { body: { name: string; fileName: string; contentType: string; value: Blob; user: string; password: string } } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { body: Blob; statusCode: number; headers?: { [key: string]: string } }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    } & { params: { url: string; headers?: { [key: string]: string }; method: string; body: any[] | Blob } }
  ) {
    params && (params.params.method = 'POST');
    return this.request(params, true, true);
  }

  requestString(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { string: string }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ) {
    if (!params) throw new Error('Required request parameters.');
    const requestOnLoad = params.onLoad;
    params.onLoad = (e) => {
      if (e && e.body) e.string = e.body.toString();
      requestOnLoad && requestOnLoad(e);
    };
    return this.request(params, false, false);
  }

  requestImage(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { image: Image }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ) {
    if (!params) throw new Error('Required request parameters.');

    const requestOnLoad = params.onLoad;

    params.onLoad = (e) => {
      if (e && e.body) {
        e.image = Image.createFromBlob(e.body);
      }

      requestOnLoad && requestOnLoad(e);
    };
    return this.request(params, false, false);
  }

  requestJSON(
    params: { url: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { JSON: { [key: string]: string | number | boolean } }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ) {
    if (!params) throw new Error('Required request parameters.');

    const requestOnLoad = params.onLoad;
    params.onLoad = (e) => {
      if (e && e.body) {
        e.JSON = JSON.parse(e.string);
      }
      requestOnLoad && requestOnLoad(e);
    };
    return this.requestString(params, false, false);
  }

  requestFile(
    params: { url: string } & { fileName?: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { file?: File }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ) {
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
      if (e && e.body) {
        const stream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.BINARY);
        stream.write(e.body);
        stream.close();
        e.file = file;
      }

      requestOnLoad && requestOnLoad(e);
    };

    return this.request(params, false, false);
  }

  request(
    params: { url: string } & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; headers?: { [key: string]: string }; user?: string; password?: string } & {
      onLoad: (e: { statusCode: number; headers: { [key: string]: string } } & { body?: Blob }) => void;
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }) => void;
    }
  ) {
    if (!this.checkInternet()) {
      params?.onError?.({
        message: 'No network connection'
      });
      return;
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

        if (statusCode != 304 && bytes) {
          responseBody = new Blob(bytes, {
            type: {}
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

  createRequest(params, isMultipart, httpManagerHeaders) {
    if (!params || !params.url) {
      throw new Error('URL parameter is required.');
    }
    let keys;
    let builder = new OkHttpRequestBuilder();
    builder = builder.url(params.url);

    let contentType = null;
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
        if (keys[i].toUpperCase() === CONTENT_TYPE_KEY) contentType = httpManagerHeaders[keys[i]];
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
    if (!isMultipart || body instanceof Blob) {
      let mediaType = null;
      if (contentType) mediaType = MediaType.parse(contentType);
      let content = null;
      if (body instanceof Blob) content = array(body.parts, 'byte');
      else if (typeof body === 'string') content = body;
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
    return !(Network.connectionType === Network.ConnectionType.None);
  }
}
