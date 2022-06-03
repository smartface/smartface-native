import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import FormData from '../formdata';
import { statuses, IXHR, XMLHttpRequestResponseType } from './xhr';
import { XHREvents } from './xhr-events';

const NativeXMLHttpRequest = requireClass('io.smartface.android.sfcore.net.XMLHttpRequest');

export default class XHRAndroid<TEvent extends string = XHREvents, TProps extends MobileOSProps = MobileOSProps> extends NativeEventEmitterComponent<TEvent | XHREvents, any, TProps> implements IXHR {
  static UNSENT = 0;
  static OPENED = 1;
  static HEADERS_RECEIVED = 2;
  static LOADING = 3;
  static DONE = 4;

  onabort: (...args: any[]) => void = () => {};
  onerror: (...args: any[]) => void = () => {};
  onload: (...args: any[]) => void = () => {};
  onloadend: (...args: any[]) => void = () => {};
  onloadstart: (...args: any[]) => void = () => {};
  onprogress: (...args: any[]) => void = () => {};
  onreadystatechange: (...args: any[]) => void = () => {};
  ontimeout: (...args: any[]) => void = () => {};

  private _timeout: number = 0;
  withCredentials: boolean = true;

  private _method: HTTPRequestMethods;
  private _url: string;
  private _readyState: number;
  private _status: number;
  private _response: string | object | null;
  private _requestHeaders: Map<string, object> | null;
  private _responseURL: string;
  private _responseType: XMLHttpRequestResponseType = XMLHttpRequestResponseType.empty;

  private _sendFlag: boolean;
  private _errorFlag: boolean;
  private _aborted: boolean;
  private _timedOut: boolean;

  private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    super();
    this._readyState = XHRAndroid.UNSENT;
  }

  get readyState(): number {
    return this._readyState;
  }

  get status(): number {
    return this._status;
  }

  get statusText(): string {
    if (this._readyState === XHRAndroid.UNSENT || this._readyState === XHRAndroid.OPENED || this._errorFlag) {
      return '';
    }
    return statuses[this._status];
  }

  get timeout(): number {
    return this._timeout;
  }

  set timeout(value: number) {
    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to set 'timeout' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._timeout = value;
  }

  get responseURL(): string {
    return this._responseURL;
  }

  get response(): object | string | null {
    if (this._responseType === XMLHttpRequestResponseType.empty || this._responseType === XMLHttpRequestResponseType.text) {
      if (this._readyState !== XHRAndroid.LOADING && this._readyState !== XHRAndroid.DONE) {
        return '';
      } else {
        return this._response;
      }
    } else {
      if (this._readyState !== XHRAndroid.DONE) {
        return null;
      } else {
        return this._response;
      }
    }
  }

  get responseText(): string {
    if (this._responseType !== '' && this._responseType !== 'text') {
      throw new Error(
        "Failed to read the 'responseText' property from 'XMLHttpRequest': " + "The value is only accessible if the object's 'responseType' is '' or 'text' " + `(was '${this._responseType}').`
      );
    }
    if (this.readyState < XHRAndroid.LOADING) {
      return '';
    }
    return this._response ? this._response.toString() : '';
  }

  get responseType(): XMLHttpRequestResponseType {
    return this._responseType;
  }

  set responseType(value: XMLHttpRequestResponseType) {
    if (value === XMLHttpRequestResponseType.blob) {
      throw new Error(`Response type of '${value}' not supported.`);
    } else if (value === XMLHttpRequestResponseType.arraybuffer) {
      throw new Error(`Response type of '${value}' not supported.`);
    } else if (value === XMLHttpRequestResponseType.empty || value in XMLHttpRequestResponseType) {
      this._responseType = value;
    } else {
      throw new Error(`Response type of '${value}' not supported.`);
    }
  }

  get upload(): XMLHttpRequestEventTarget {
    return this;
  }

  open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
    if (typeof async === 'boolean' && !async) {
      throw new Error('Every request must be asynchronous');
    }
    this._method = method;
    this._url = url;
    this._requestHeaders = new Map<string, object>();
    if (user) {
      this._requestHeaders['user'] = user;
    }
    if (password) {
      this._requestHeaders['password'] = password;
    }
    this._setReadyState(XHRAndroid.OPENED);
  }

  send(body?: string | FormData) {
    this._reset();

    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }

    try {
      if (body instanceof FormData) {
        const data = body.getParts();
        this._nativeObject.sendRequestWithFormData(this._method, this._url, data || null, this._requestHeaders, this._timeout, this.withCredentials);
      } else {
        const data = this.adjustBody(body);
        this._nativeObject.sendRequest(this._method, this._url, data, this._requestHeaders, this._timeout, this.withCredentials);
      }
      this._sendFlag = true;
      this._emitEvent('loadstart');
    } catch (error) {
      this._setResponseError(error);
      this._setReadyState(XHRAndroid.DONE);
    }
  }

  adjustBody(body?: string): string | null {
    if (this._method === 'POST') {
      return body ? body : '';
    }
    return body === '' || body ? body : null;
  }

  setRequestHeader(name: string, value: string) {
    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._requestHeaders!![name] = value;
  }

  abort() {
    this._nativeObject.abort();
    if ((this._readyState === XHRAndroid.OPENED && this._sendFlag) || this._readyState === XHRAndroid.HEADERS_RECEIVED || this._readyState === XHRAndroid.LOADING) {
      this._aborted = true;
      this._setResponseError('network error');
      this._setReadyState(XHRAndroid.DONE);
    }
    if (this._readyState === XHRAndroid.DONE) {
      this._readyState = XHRAndroid.UNSENT;
      this._setResponseError('network error');
    }
    this._reset();
  }

  getAllResponseHeaders(): string {
    if (this._readyState < XHRAndroid.HEADERS_RECEIVED || this._errorFlag) {
      return '';
    }
    const result = this.nativeObject.getAllResponseHeaders();
    return result.length >= 2 ? result.substr(0, result.length - 2) : result;
  }

  getResponseHeader(header: string): string | null {
    if (this._readyState > XHRAndroid.OPENED || this._errorFlag) {
      header = header.toLowerCase();
      return this.nativeObject.getResponse().headers().get(header);
    }
    return null;
  }

  addEventListener(eventName: XHREvents, handler: () => void) {
    const handlers = this._listeners.get(eventName) || [];
    handlers.push(handler);
    this._listeners.set(eventName, handlers);
  }

  removeEventListener(eventName: XHREvents, toDetach: () => void) {
    let handlers = this._listeners.get(eventName) || [];
    handlers = handlers.filter((handler) => handler !== toDetach);
    this._listeners.set(eventName, handlers);
  }

  dispatchEvent(event: XHREvents): boolean {
    this._emitEvent(event);
    return true;
  }

  protected createNativeObject() {
    const nativeObject = new NativeXMLHttpRequest();
    nativeObject.setCallbacks({
      onResponse: (stringResponse: string) => {
        const response = this._nativeObject.getResponse();
        this._status = response.code();
        this._responseURL = response.request().url().toString();
        this._setReadyState(XHRAndroid.HEADERS_RECEIVED);
        this._setReadyState(XHRAndroid.LOADING);
        if (this.responseType === XMLHttpRequestResponseType.text || this.responseType === XMLHttpRequestResponseType.empty) {
          this._response = stringResponse;
        } else if (this.responseType === XMLHttpRequestResponseType.json) {
          this._response = JSON.parse(stringResponse);
        }
        this._emitEvent('progress');
        this._sendFlag = false;
        this._setReadyState(XHRAndroid.DONE);
      },
      onFailure: (_timedOut: boolean, exception: object) => {
        this._timedOut = _timedOut;
        this._setResponseError(exception.toString());
        this._setReadyState(XHRAndroid.DONE);
      }
    });
    return nativeObject;
  }

  private _setReadyState(newState: number) {
    if (this._readyState !== newState) {
      this._readyState = newState;
      this._emitEvent('readystatechange');
    }
    if (newState === XHRAndroid.DONE) {
      if (this._aborted) {
        this._emitEvent('abort');
      } else if (this._errorFlag) {
        if (this._timedOut) {
          this._emitEvent('timeout');
        } else {
          this._emitEvent('error');
        }
      } else {
        this._emitEvent('load');
      }
      this._emitEvent('loadend');
    }
  }

  private _emitEvent(eventName: XHREvents, ...args: Array<any>) {
    // If eventName is error, an error occurs in the events dependency used by the event emitter.
    try {
      this.emit(eventName);
    } catch (error) {}
    this['on' + eventName]?.(...args);
    const handlers = this._listeners.get(eventName) || [];
    handlers.forEach((handler) => {
      handler(...args);
    });
  }

  private _reset(): void {
    this._response = null;
    this._status = 0;
    this._errorFlag = false;
    this._sendFlag = false;
    this._aborted = false;
    this._timedOut = false;
  }

  private _setResponseError(error: string): void {
    this._response = error;
    this._errorFlag = true;
    this._sendFlag = false;
  }
}
