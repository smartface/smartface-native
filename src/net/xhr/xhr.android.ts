import { HTTPRequestMethods, IXHR, XMLHttpRequestEventTarget } from '.';

import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { ResponseTypes, statuses, XMLHttpRequestResponseType } from './common';
import { FormData } from './common';
import { XHREventsEvents } from './xhr-events';

const NativeXMLHttpRequest = requireClass('io.smartface.android.sfcore.net.XMLHttpRequest');

export default class XHRAndroid<TEvent extends string = XHREventsEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | XHREventsEvents, any, TProps>
  implements IXHR
{
  public static UNSENT = 0;
  public static OPENED = 1;
  public static HEADERS_RECEIVED = 2;
  public static LOADING = 3;
  public static DONE = 4;

  public onabort: (...args: any[]) => void = () => {};
  public onerror: (...args: any[]) => void = () => {};
  public onload: (...args: any[]) => void = () => {};
  public onloadend: (...args: any[]) => void = () => {};
  public onloadstart: (...args: any[]) => void = () => {};
  public onprogress: (...args: any[]) => void = () => {};
  public onreadystatechange: (...args: any[]) => void = () => {};
  public ontimeout: (...args: any[]) => void = () => {};

  private _timeout: number = 0;
  public withCredentials: boolean = true;

  private _method: HTTPRequestMethods;
  private _url: string;
  private _readyState: number;
  private _status: number;
  private _response: string | object | null;
  private _requestHeaders: Map<string, object> | null;
  private _responseURL: string;
  private _responseType: ResponseTypes = '';

  private _sendFlag: boolean;
  private _errorFlag: boolean;
  private _aborted: boolean;
  private _timedOut: boolean;

  private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    super();
    this._readyState = XHRAndroid.UNSENT;
  }

  public get readyState(): number {
    return this._readyState;
  }

  public get status(): number {
    return this._status;
  }

  public get statusText(): string {
    if (this._readyState === XHRAndroid.UNSENT || this._readyState === XHRAndroid.OPENED || this._errorFlag) {
      return '';
    }
    return statuses[this._status];
  }

  public get timeout(): number {
    return this._timeout;
  }

  public set timeout(value: number) {
    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to set 'timeout' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._timeout = value;
  }

  public get responseURL(): string {
    return this._responseURL;
  }

  public get response(): object | string | null {
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

  public get responseText(): string {
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

  public get responseType(): ResponseTypes {
    return this._responseType;
  }

  public set responseType(value: ResponseTypes) {
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

  public get upload(): XMLHttpRequestEventTarget {
    return this;
  }

  public open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
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

  public send(body?: string | FormData) {
    this._reset();

    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }

    try {
      if (body instanceof FormData) {
        const data = body.getParts();
        this._nativeObject.sendRequestWithFormData(this._method, this._url, data || null, this._requestHeaders, this._timeout, this.withCredentials);
      } else {
        const data = body === '' || body ? body : null;
        this._nativeObject.sendRequest(this._method, this._url, data, this._requestHeaders, this._timeout, this.withCredentials);
      }
      this._sendFlag = true;
      this._emitEvent('loadstart');
    } catch (error) {
      this._setResponseError(error);
      this._setReadyState(XHRAndroid.DONE);
    }
  }

  public setRequestHeader(name: string, value: string) {
    if (this._readyState !== XHRAndroid.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._requestHeaders!![name] = value;
  }

  public abort() {
    this._nativeObject.abort();
    if ((this._readyState === XHRAndroid.OPENED && this._sendFlag) || this._readyState === XHRAndroid.HEADERS_RECEIVED || this._readyState === XHRAndroid.LOADING) {
      this._aborted = true;
      this._setResponseError('network error');
      this._setReadyState(XHRAndroid.DONE);
    }
    if(this._readyState === XHRAndroid.DONE) {
      this._readyState = XHRAndroid.UNSENT;
      this._setResponseError('network error');
    }
    this._reset();
  }

  public getAllResponseHeaders(): string {
    if (this._readyState < XHRAndroid.HEADERS_RECEIVED || this._errorFlag) {
      return '';
    }
    const result = this.nativeObject.getAllResponseHeaders();
    return result.length >= 2 ? result.substr(0, result.length - 2) : result;
  }

  public getResponseHeader(header: string): string | null {
    if (this._readyState > XHRAndroid.OPENED || this._errorFlag) {
      header = header.toLowerCase();
      return this.nativeObject.getResponse().headers().get(header);
    }
    return null;
  }

  public addEventListener(eventName: XHREventsEvents, handler: () => void) {
    const handlers = this._listeners.get(eventName) || [];
    handlers.push(handler);
    this._listeners.set(eventName, handlers);
  }

  public removeEventListener(eventName: XHREventsEvents, toDetach: () => void) {
    let handlers = this._listeners.get(eventName) || [];
    handlers = handlers.filter((handler) => handler !== toDetach);
    this._listeners.set(eventName, handlers);
  }

  public dispatchEvent(event: XHREventsEvents): boolean {
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

  private _emitEvent(eventName: XHREventsEvents, ...args: Array<any>) {
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
